import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/images/volleyball.jpg';
import { ActivityInfo } from '.';
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import { UserContext } from '../contexts/user';
import activityService from '../services/activity-service';
import { toast } from 'react-toastify';

const ActivityDetails = () => {
  const locationActivity = useLocation();
  const { userDetails } = useContext(UserContext);
  const { activityDetails, isOwner } = locationActivity.state;
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
    title,
  } = activityDetails;

  const requestToJoin = () => {
    const activityId = id;
    const userId = userDetails?.id;

    activityService
      .joinActivity(activityId, userId)
      .then((res) => console.log(res.data))
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
        <ActivityInfo
          icon={<FaBriefcase />}
          text={category.toLowerCase() || ''}
        />
      </div>
      <footer className='btn-container'>
        {isOwner ? (
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
  .activity-info {
    /* display: flex;
    justify-content: center; */
  }
  .btn {
    width: 8rem;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
  }
  .btn-disabled {
    cursor: default;
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
