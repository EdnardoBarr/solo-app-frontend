import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../../assets/images/profile2.svg';
import { FaLocationArrow, FaRegSmileWink, FaWindowClose } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import activityService from '../../services/activity-service';
import { UserContext } from '../../contexts/user';
import qs from 'qs';
import { Loading } from '../../components/Loading';
import Avatar, { genConfig } from 'react-nice-avatar';

const AcceptedUser = ({ user, activityId, reload, setReload }) => {
  const { userDetails } = useContext(UserContext);
  const { id, email, givenName, surname, country, city, interests, bio } = user;
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (activityId) {
      setIsLoading(true);
      activityService
        .getById(activityId)
        .then((res) => setActivity(res.data))
        .catch();
      setIsLoading(false);
    }
  }, [activityId]);

  const handleRemove = () => {
    const params = {
      activityId: activityId,
      ownerId: userDetails?.id,
    };

    activityService
      .removeParticipant(id, params)
      .then(() => {
        toast.success(
          `${givenName} was successfully removed from the Activity`
        );
        setReload(!reload);
        navigate(`?activityId=${activityId}`);
      })
      .catch((error) => {
        toast.info(
          error?.response?.data?.message ||
            'An error occurred while processing the request'
        );
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  const config = email ? genConfig(email) : {};

  return (
    <>
      <Wrapper>
        <Avatar
          style={{ width: '10rem', height: '10rem' }}
          {...config}
          shape='rounded'
        />
        <div className='name-container'>
          <h4>
            {givenName} {surname}
          </h4>
        </div>
        {activity?.owner.id === userDetails?.id && (
          <button
            type='button'
            className='btn clear-btn'
            onClick={handleRemove}
          >
            <IoMdClose size={30} className='close-icon' />
          </button>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  border-top: 4px solid var(--orange-900);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  //max-width: 700px;
  img {
    width: 100px;
    height: auto;
    border-radius: var(--borderRadius);
  }
  .close-icon {
  }
  .btn-container {
    height: 100%;
    display: inline-block;
    justify-content: right;
  }
  .btn {
    all: unset;
    cursor: pointer;
    padding: 2rem 1rem;
    height: 100%;
    //position: relative;
    // right: 0;
    margin: 0 -2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button:hover {
    background: var(--grey-50);
    height: 100%;
  }
  .img-container {
    text-align: center;
  }
  .name-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h4 {
    text-align: center;
    margin: 0;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
`;

export default AcceptedUser;
