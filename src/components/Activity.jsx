import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../assets/images/volleyball.jpg';
import ActivityInfo from './ActivityInfo';
import {
  FaCalendarAlt,
  FaLocationArrow,
  FaListUl,
  FaHandsHelping,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/user';
import activityService from '../services/activity-service';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/auth';

const Activity = ({ activity }) => {
  const { userDetails } = useContext(UserContext);
  const {
    id,
    active,
    owner,
    category,
    createdAt,
    startsAt,
    finishesAt,
    description,
    location,
    maxParticipants,
    participantsJoined,
    mediaLocation,
    title,
  } = activity;
  const { isLoading, setIsLoading } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [status, setStatus] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    const params = {
      userId: userDetails?.id,
      activityId: id,
    };

    if (userDetails && id) {
      activityService
        .getStatus(params)
        .then((res) => {
          setStatus(
            userDetails.id === owner.id
              ? 'owner'
              : res?.data.toLowerCase().slice(7)
          );
        })
        .catch((error) => console.log(error.response));
    }
  }, [id, userDetails, updateStatus]);

  const disableButton = () => {
    const lowerCaseStatus = status?.toLocaleLowerCase();
    return (
      lowerCaseStatus === 'owner' ||
      lowerCaseStatus === 'pending' ||
      lowerCaseStatus === 'accepted'
    );
  };

  const handleRequest = () => {
    if (maxParticipants === participantsJoined) {
      toast.info(
        'The activity has already reached its maximum number of participants'
      );
      return;
    }
    const params = {
      userId: userDetails?.id,
      activityId: id,
    };

    setIsLoading(true);

    activityService
      .joinActivity(params)
      .then(() => {
        setUpdateStatus(!updateStatus);
        toast.info('Your request to join the activity is pending approval.');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });

    setIsLoading(false);
  };
  return (
    <Wrapper>
      <header>
        <div className='img-container'>
          <img src={img} alt='' />
        </div>
        <div className='info'>
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ActivityInfo
            icon={<FaLocationArrow />}
            text={location?.city || ''}
          />
          <ActivityInfo icon={<FaCalendarAlt />} text={startsAt || ''} />
          <ActivityInfo
            icon={<FaListUl />}
            text={category.toLowerCase() || ''}
          />
          <ActivityInfo
            icon={<FaHandsHelping />}
            text={`participants: ${participantsJoined} / ${maxParticipants}`}
          />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            {/* {disableButton() ? (
              <Link
                className='btn clear-btn btn-block btn-disabled'
                onClick={(e) => e.preventDefault()}
              >
                Join
              </Link>
            ) : (
              <Link className='btn clear-btn btn-block' onClick={handleRequest}>
                Join
              </Link>
            )} */}

            <Link
              to='/activity-details'
              className='btn btn-block btn-more'
              state={{
                activityDetails: activity,
                status: status,
              }}
            >
              more
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  border-top: 4px solid var(--orange-900);
  //max-width: 700px;
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    /* display: grid;
    grid-template-columns: auto 1fr;
    align-items: center; */
    h5 {
      letter-spacing: 0;
    }
  }
  img {
    width: 300px;
    height: auto;
    border-radius: var(--borderRadius);
  }
  .img-container {
    text-align: center;
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
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      text-align: justify;
      text-justify: inter-word;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
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
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .actions {
    display: flex;
    gap: 1rem;
    text-align: center;
  }
  .btn-more {
    height: 35px;
    color: var(--white);
    text-align: center;
  }
  .btn-disabled {
    cursor: not-allowed;
    background: var(--grey-100);
    color: var(--grey-300);
    border: 1px solid var(--grey-100);
    box-shadow: none;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.5rem;
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
  footer {
    margin-top: 1rem;
  }
  &:hover .actions {
    visibility: visible;
  }
  @media (max-width: 576px) {
    .actions {
      flex-direction: column;
    }
  }
`;

export default Activity;
