import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useLoading } from '../../contexts/loading';
import { toast } from 'react-toastify';
import { FormRow } from '../../components';
import userService from '../../services/user-service';
import { UserContext, UserDispatchContext } from '../../contexts/user';
import { Loading } from '../../components/Loading';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import userInterests from '../../utils/userInterests';

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  const { setUserDetails } = useContext(UserDispatchContext) || {};
  const { isLoading, setIsLoading } = useLoading();
  const [userData, setUserData] = useState({
    givenName: userDetails?.givenName || '',
    surname: userDetails?.surname || '',
    email: userDetails?.email || '',
    country: userDetails?.country || '',
    city: userDetails?.city || '',
    dateOfBirth: userDetails?.dateOfBirth || '',
    interests: userDetails?.interests || [{ id: 0, label: '', value: '' }],
    bio: userDetails?.bio || '',
  });

  useEffect(() => {
    setUserData({ ...userDetails });
  }, [userDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, givenName, surname, email, country, city, dateOfBirth, bio } =
      userData;
    const interests = userData?.interests.map((item) => {
      return item.value;
    });

    if (!givenName || !surname || !email || !country || !city) {
      toast.error('Please fill out all required fields');
      return;
    }
    userService
      .update(
        id,
        givenName,
        surname,
        email,
        country,
        city,
        interests,
        dateOfBirth,
        bio
      )
      .then((res) => {
        setUserDetails(null);
        toast.success('User has been updated');
      })
      .catch((error) =>
        toast.error(error?.response?.data.message || 'Unable to update user')
      );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const handleSelectChange = (e) => {
    console.log('e', e);
    setUserData({ ...userData, interests: e });
  };

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
              type='date'
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
            <label className='form-label'>Interests</label>
            <Select
              name='interests'
              value={userData?.interests || [{ id: 0, label: '', value: '' }]}
              onChange={handleSelectChange}
              options={userInterests}
              isMulti
              className='react-select-container'
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  background: '#d9e2ec',
                }),
              }}
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
          <Link to='/password/change'>
            Would You Like to Change Your Password?
          </Link>
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
  a:hover {
    // color: var(--primary-800);
    font-weight: bold;
    transition: var(--transition);
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
