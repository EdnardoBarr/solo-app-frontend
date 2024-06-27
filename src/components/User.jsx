import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../assets/images/profile1.svg';
import { FaLocationArrow, FaRegSmileWink } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ActivityInfo from './ActivityInfo';
import friendshipService from '../services/friendship-service';
import { UserContext } from '../contexts/user';
import { toast } from 'react-toastify';
import Avatar, { genConfig } from 'react-nice-avatar';

const User = ({ user }) => {
  const [status, setStatus] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);
  const { userDetails } = useContext(UserContext);
  const { id, email, givenName, surname, country, city, interests, bio } = user;

  const handleRequest = () => {
    const params = {
      fromId: userDetails?.id,
      toId: id,
    };
    console.log('params', params);
    friendshipService
      .requestFriend(params)
      .then(() => {
        setUpdateStatus(!updateStatus);
        toast.success('Friendship request sent succesfully');
      })
      .catch((error) => console.log('erro', error.data));
  };

  const isPending = () => {
    const lowerCaseStatus = status.toLocaleLowerCase();
    console.log('lower', lowerCaseStatus);
    return lowerCaseStatus === 'pending';
  };

  useEffect(() => {
    if (!userDetails) {
      return;
    }
    const params = {
      fromId: userDetails?.id,
      toId: id,
    };

    friendshipService
      .getStatus(params)
      .then((res) => {
        console.log(res.data);
        setStatus(res.data.toLowerCase().slice(11));
      })
      .catch((error) => console.log('err', error.response));
  }, [userDetails, id, updateStatus]);

  const config = email ? genConfig(email) : {};

  return (
    <Wrapper>
      <header>
        {/* <div className='img-container'>*/}
        <div className='img-container'>
          <Avatar
            style={{ width: '20rem', height: '15rem' }}
            {...config}
            shape='rounded'
          />
        </div>
        {/* <img src={img} alt='' /> */}
        {/* </div> */}
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
            {isPending() ? (
              <Link
                className={`btn clear-btn btn-block btn-disabled`}
                onClick={(e) => e.preventDefault()}
              >
                pending
              </Link>
            ) : (
              <Link
                className={`btn clear-btn btn-block`}
                onClick={handleRequest}
              >
                connect
              </Link>
            )}
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
  .img {
  }
  .img-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    z-index: 1; /* Ensure avatar stays above other content */
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
  .content {
    padding: 1rem 1.5rem;
    position: relative; /* Ensure content position is relative */
    z-index: 0; /* Content should stay below avatar */
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

export default User;
