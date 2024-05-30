import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/images/volleyball.jpg';
import { ActivityInfo } from '.';
import {
  FaLocationArrow,
  FaCalendarAlt,
  FaBriefcase,
  FaListUl,
} from 'react-icons/fa';
import { UserContext } from '../contexts/user';
import activityService from '../services/activity-service';
import { toast } from 'react-toastify';

const ActivityDetails = () => {
  const locationActivity = useLocation();
  const { userDetails } = useContext(UserContext);
  const [status, setStatus] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  const [updateStatus, setUpdateStatus] = useState(false);

  const { activityDetails } = locationActivity.state;
  const {
    id,
    active,
    category,
    createdAt,
    startsAt,
    finishesAt,
    description,
    location,
    maxParticipants,
    mediaLocation,
    owner,
    title,
  } = activityDetails;

  const disableButton = () => {
    const lowerCaseStatus = status?.toLocaleLowerCase();
    return lowerCaseStatus === 'owner' || lowerCaseStatus === 'pending';
  };

  useEffect(() => {
    setIsOwner(userDetails?.id === owner?.id);
  }, [userDetails, owner]);

  useEffect(() => {
    const params = {
      userId: userDetails?.id,
      activityId: id,
    };

    activityService
      .getStatus(params)
      .then((res) => {
        setStatus(isOwner ? 'owner' : res?.data.toLowerCase().slice(7));
      })
      .catch((error) => console.log(error.response));
  }, [activityDetails, isOwner, updateStatus]);

  const requestToJoin = () => {
    let params = {};
    params.activityId = id;
    params.userId = userDetails?.id;

    activityService
      .joinActivity(params)
      .then(() => {
        setUpdateStatus(!updateStatus);
        toast.success('Your request to join the activity is pending approval');
      })
      .catch((error) => console.log(error));
  };
  return (
    <Wrapper>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className='activity-info'>
        <img src={img} alt='' />
        <ActivityInfo
          icon={<FaLocationArrow />}
          text={`${location.address} - ${location.city}, ${location.country}`}
        />
        <ActivityInfo icon={<FaCalendarAlt />} text={startsAt || ''} />
        <ActivityInfo icon={<FaListUl />} text={category.toLowerCase() || ''} />
        <div className={`status ${status}`}>{status}</div>
      </div>
      <footer className='btn-container'>
        {disableButton() ? (
          <button
            type='button'
            className='btn btn-block btn-disabled'
            onClick={(e) => e.preventDefault()}
          >
            join
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-block'
            onClick={requestToJoin}
          >
            join
          </button>
        )}
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 0 auto;
  border-radius: var(--borderRadius);
  max-width: 800px;
  background: var(--white);
  padding: 3rem;
  box-shadow: var(--shadow-2);
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  h2 {
    text-align: center;
  }
  img {
    width: 100%;
    height: auto;
    border-radius: var(--borderRadius);
  }
  p {
    max-width: fit-content;
    text-align: justify;
    text-justify: inter-word;
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }
  .owner {
    background: #e0e8f9;
    color: #647acb;
  }
  .available {
    background: var(--primary-700);
    color: var(--primary-100);
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .accepted {
    background: #3a8c57;
    color: #c3f5d4;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .removed {
    color: var(--grey-400);
    background: var(--grey-50);
  }
  .btn {
    width: 8rem;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
  }
  .btn-disabled {
    cursor: not-allowed;
    background: var(--grey-100);
    color: var(--grey-300);
    border: 1px solid var(--grey-100);
    box-shadow: none;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media (max-width: 576px) {
    .btn-container {
      flex-direction: column;
    }
  }
  @media (max-width: 576px) {
    .btn {
      width: 100%;
    }
  }
`;

export default ActivityDetails;
