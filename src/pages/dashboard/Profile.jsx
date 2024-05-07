import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoading } from '../../contexts/loading';
import { toast } from 'react-toastify';
import { FormRow } from '../../components';
import userService from '../../services/user-service';
import { UserContext } from '../../contexts/user';
import { Loading } from '../../components/Loading';

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  const { isLoading, setIsLoading } = useLoading();
  const [userData, setUserData] = useState({
    // givenName: user?.givenName || '',
    // surname: user?.surname || '',
    // email: user?.email || '',
    // country: user?.country || '',
    // city: user?.city || '',
    // dateOfbirth: user?.dateOfbirth || '',
    // bio: user?.bio || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, givenName, surname, email, country, city, dateOfBirth, bio } =
      userData;
    console.log('userData', userData);

    if (!givenName || !surname || !email || !country || !city) {
      toast.error('Please fill out all required fields');
      return;
    }
    userService
      .update(id, givenName, surname, email, country, city, dateOfBirth, bio)
      .then((res) => toast.success('User has been updated'))
      .catch((error) =>
        toast.error(error?.response?.data.message || 'Unable to update user')
      );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    const username = userDetails?.username || '';
    function retrieveUserData() {
      userService
        .getUserByEmail(username)
        .then((res) => {
          setIsLoading(true);
          setUserData(res?.data || {});
          setIsLoading(false);
        })
        .catch((err) => toast.error('User not found'));
      // .finally(() => setIsLoading(true));
    }
    retrieveUserData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='givenName'
            labelText='name *'
            value={userData.givenName}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='surname'
            labelText='surname *'
            value={userData.surname}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='email'
            labelText='email *'
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='country'
            labelText='country *'
            value={userData.country}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='city'
            labelText='city *'
            value={userData.city}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='dateOfBirth'
            labelText='birth'
            value={userData.dateOfbirth}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='bio'
            labelText='bio'
            value={userData.bio}
            handleChange={handleChange}
          />
          <button className='btn btn-block' type='submit'>
            save
          </button>
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
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
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
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
export default Profile;
