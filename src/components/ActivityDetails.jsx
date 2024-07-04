import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import img1 from '../assets/images/sport.jpg';
import img2 from '../assets/images/travel.jpg';
import img3 from '../assets/images/gym.jpg';
import img4 from '../assets/images/beach.jpg';
import img5 from '../assets/images/other.jpg';
import img6 from '../assets/images/trekking.jpg';
import img7 from '../assets/images/other.jpg';
import { ActivityInfo } from '.';
import {
  FaLocationArrow,
  FaCalendarAlt,
  FaListUl,
  FaHandsHelping,
} from 'react-icons/fa';
import { UserContext } from '../contexts/user';
import activityService from '../services/activity-service';
import { toast } from 'react-toastify';
import qs from 'qs';

const ActivityDetails = () => {
  const locationActivity = useLocation();
  const { userDetails } = useContext(UserContext);
  const [status, setStatus] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);
  const [img, setImg] = useState('');
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
    participantsJoined,
    mediaLocation,
    owner,
    title,
  } = activityDetails;
  const activityId = id;

  const queryParams = qs.stringify({
    activityId,
    participantsJoined,
    maxParticipants,
  });

  const queryAcceptedParams = qs.stringify({ activityId });

  const disableButton = () => {
    const lowerCaseStatus = status?.toLocaleLowerCase();
    return lowerCaseStatus === 'pending' || lowerCaseStatus === 'accepted';
  };

  const isOwner = () => {
    const lowerCaseStatus = status?.toLocaleLowerCase();
    return lowerCaseStatus === 'owner';
  };

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

  useEffect(() => {
    if (!category) {
      return;
    }
    switch (category.toUpperCase()) {
      case 'SPORT':
        setImg(img1);
        break;
      case 'TRAVEL':
        setImg(img2);
        break;
      case 'GYM':
        setImg(img3);
        break;
      case 'BEACH':
        setImg(img4);
        break;
      case 'OTHER':
        setImg(img5);
        break;
      case 'TREKKING':
        setImg(img6);
        break;
      default:
        setImg(img7);
        break;
    }
  }, [category]);

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
        <ActivityInfo
          icon={<FaHandsHelping />}
          text={
            <>
              <Link
                to={{
                  pathname: 'activity/participants/accepted',
                  search: `${queryAcceptedParams}`,
                }}
                className='participant-link'
              >
                participants
              </Link>
              : {participantsJoined} / {maxParticipants}
            </>
          }
        />
        <div className={`status ${status}`}>{status}</div>
      </div>
      <footer className='btn-container'>
        {isOwner() ? (
          <Link
            to={{
              pathname: 'activity/get-pending',
              search: `${queryParams}`,
            }}
            className='btn btn-block'
          >
            requests
          </Link>
        ) : disableButton() ? (
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
  .participant-link {
    font-weight: bolder;
  }
  .participant-link:hover {
    box-shadow: var(--shadow-4);
    text-decoration: underline;
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
    display: flex;
    width: 8rem;
    justify-content: center;
    align-items: center;
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
