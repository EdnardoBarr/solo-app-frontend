import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/user';
import { useAuth } from '../contexts/auth';
import img from '../assets/images/profile1.svg';
import ActivityInfo from './ActivityInfo';
import { FaLocationArrow, FaRegSmileWink } from 'react-icons/fa';
import friendshipService from '../services/friendship-service';
import { toast } from 'react-toastify';
import Avatar, { genConfig } from 'react-nice-avatar';

const Notification = ({ user, reload, setReload }) => {
  const { userDetails } = useContext(UserContext);
  const { id, email, givenName, surname, country, city, interests, bio } = user;

  const handleAccept = () => {
    const params = {
      fromId: id,
      toId: userDetails?.id,
      status: 'FRIENDSHIP_ACCEPTED',
    };

    friendshipService
      .update(params)
      .then(() => {
        setReload(!reload);
        toast.success(`You are now friends with ${givenName}`);
      })
      .catch((err) =>
        toast.error('An error occurred while processing the request')
      );
  };

  const handleDecline = () => {
    const params = {
      fromId: id,
      toId: userDetails?.id,
      status: 'FRIENDSHIP_DECLINED',
    };

    setIsLoading(true);

    friendshipService
      .update(params)
      .then(() => {
        setReload(!reload);
        toast.success(
          `You have declined the invitation to be friends with ${givenName}`
        );
      })
      .catch((err) =>
        toast.error('An error occurred while processing the request')
      );
    setIsLoading(false);
  };
  const config = email ? genConfig(email) : {};

  return (
    <Wrapper>
      <header>
        <div className='img-container'>
          <Avatar
            style={{ width: '20rem', height: '15rem' }}
            {...config}
            shape='rounded'
          />
        </div>
        <div className='info'>
          <h5>
            {givenName} {surname}
          </h5>
          <p>{bio}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ActivityInfo
            icon={<FaLocationArrow />}
            text={`${city}, ${country}` || ''}
          />
          <ActivityInfo
            icon={<FaRegSmileWink />}
            text={interests.join(', ').toLowerCase() || ''}
          />
        </div>
        <footer>
          <div className='actions'>
            <button
              type='button'
              className={`btn btn-block`}
              onClick={handleAccept}
            >
              accept
            </button>
            <button
              type='button'
              className={`btn clear-btn btn-block`}
              onClick={handleDecline}
            >
              decline
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
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
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
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
  .btn-disabled {
    cursor: not-allowed;
    background: var(--grey-100);
    color: var(--grey-300);
    border: 1px solid var(--grey-100);
    box-shadow: none;
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr;
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

export default Notification;
