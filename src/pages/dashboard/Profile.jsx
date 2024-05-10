import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useLoading } from '../../contexts/loading';
import { toast } from 'react-toastify';
import { FormRow } from '../../components';
import userService from '../../services/user-service';
import { UserContext, UserDispatchContext } from '../../contexts/user';
import { Loading } from '../../components/Loading';

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  const { setUserDetails } = useContext(UserDispatchContext) || {};
  const { isLoading, setIsLoading } = useLoading();
  const [changePassword, setChangePassword] = useState(false);
  const [userData, setUserData] = useState({
    givenName: userDetails?.givenName || '',
    surname: userDetails?.surname || '',
    email: userDetails?.email || '',
    country: userDetails?.country || '',
    city: userDetails?.city || '',
    dateOfBirth: userDetails?.dateOfBirth || '',
    bio: userDetails?.bio || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      id,
      givenName,
      surname,
      email,
      country,
      city,
      dateOfBirth,
      bio,
      oldPassword,
      password,
      matchingPassword,
    } = userData;

    if (
      !givenName ||
      !surname ||
      !email ||
      !country ||
      !city ||
      (changePassword && (!oldPassword || !password || !matchingPassword))
    ) {
      toast.error('Please fill out all required fields');
      return;
    }
    userService
      .update(id, givenName, surname, email, country, city, dateOfBirth, bio)
      .then((res) => {
        setUserDetails(null);
        toast.success('User has been updated');
      })
      .catch((error) =>
        toast.error(error?.response?.data.message || 'Unable to update user')
      );
  };

  const toggleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    const username = userDetails?.username;
    if (username) {
      // function retrieveUserData() {
      userService
        .getUserByEmail(username)
        .then((res) => {
          // setIsLoading(true);
          setUserData(res?.data || {});
          // setIsLoading(false);
        })
        .catch((err) => toast.error('User not found'));
      // .finally(() => setIsLoading(true));

      // }
      // retrieveUserData();
    } else {
      setUserData({});
    }
  }, [userDetails?.username]);

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>Profile</h3>
        <div className='form-center'>
          <div className='container-row'>
            <FormRow
              type='text'
              name='givenName'
              labelText='name *'
              value={userData?.givenName || ''}
              handleChange={handleChange}
            />
            <FormRow
              type='text'
              name='surname'
              labelText='surname *'
              value={userData?.surname || ''}
              handleChange={handleChange}
            />
          </div>
          <div className='container-row'>
            <FormRow
              type='text'
              name='email'
              labelText='email *'
              value={userData?.email || ''}
              handleChange={handleChange}
            />
            <FormRow
              type='text'
              name='dateOfBirth'
              labelText='date of birth'
              value={userData?.dateOfBirth || ''}
              handleChange={handleChange}
            />
          </div>
          <div className='container-row'>
            <FormRow
              type='text'
              name='country'
              labelText='country *'
              value={userData?.country || ''}
              handleChange={handleChange}
            />
            <FormRow
              type='text'
              name='city'
              labelText='city *'
              value={userData?.city || ''}
              handleChange={handleChange}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='' className='form-label'>
              Bio
            </label>
            <textarea
              type='text'
              rows='4'
              name='bio'
              value={userData?.bio || ''}
              onChange={handleChange}
              className='form-textarea'
            />
          </div>
          <div className='container-checkbox'>
            <input
              type='checkbox'
              name='checkbox'
              value={changePassword}
              onChange={toggleChangePassword}
              className='form-checkbox'
              id='form-checkbox'
            />
            <label htmlFor='' className='form-label label-checkbox'>
              Would you like to change your password?
            </label>
          </div>
          {changePassword && (
            <div className='container-row'>
              <FormRow
                type='password'
                name='oldPassword'
                labelText='Old Password *'
                value={userData?.oldPassword || ''}
                handleChange={handleChange}
              />
              <FormRow
                type='password'
                name='password'
                labelText='New Password *'
                value={userData?.password || ''}
                handleChange={handleChange}
              />
              <FormRow
                type='password'
                name='matchingPassword'
                labelText='Confirm New Password *'
                value={userData?.matchingPassword || ''}
                handleChange={handleChange}
              />
            </div>
          )}
          <div className='btn-container'>
            <button className='btn btn-block' type='submit'>
              save
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .container-checkbox {
    padding-left: 2px;
    display: flex;
    gap: 10px;
  }
  .label-checkbox {
    margin: 0;
  }
  input[type='checkbox'] {
    transform: scale(1.5);
    color: var(--orange-900);
    cursor: pointer;
  }
  input[type='checkbox']:checked {
    background-color: var(--orange-900);
  }
  .container-row {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  .form-row {
    margin-bottom: 0;
    width: 100%;
  }
  .form-center {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn {
    width: 10%;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  @media (max-width: 768px) {
    .container-row {
      flex-direction: column;
    }
    .btn {
      width: 100%;
    }
  }
`;
export default Profile;
