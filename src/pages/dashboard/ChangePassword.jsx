import React, { useState } from 'react';
import { FormRow } from '../../components';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import changePasswordService from '../../services/changePassword-service';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowAltCircleLeft,
  FaRegArrowAltCircleLeft,
} from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    oldPassword: '',
    password: '',
    matchingPassword: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, password, matchingPassword } = data;

    if (!oldPassword || !password || !matchingPassword) {
      toast.error('Please fill out the required fields');
      return;
    }

    if (password !== matchingPassword) {
      toast.error('Passwords must match');
      return;
    }

    changePasswordService
      .changePassword(oldPassword, password, matchingPassword)
      .then(() => {
        toast.success('Your password has been changed');
        navigate('/profile');
      })
      .catch((error) => {
        console.log('error', error.response);
        toast.error(error.response.data?.detail || 'Error updating password');
      });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-center'>
          <Link to='/profile'>
            <FaArrowRightFromBracket
              className='icon-return'
              size={30}
              style={{ transform: 'rotate(180deg)' }}
            />
          </Link>
          <h3>Change Your Password</h3>
          <div className='container-row'>
            <FormRow
              type='password'
              name='oldPassword'
              labelText='Old Password *'
              value={data?.oldPassword || ''}
              handleChange={handleChange}
            />
            <FormRow
              type='password'
              name='password'
              labelText='New Password *'
              value={data?.password || ''}
              handleChange={handleChange}
            />
            <FormRow
              type='password'
              name='matchingPassword'
              labelText='Confirm Password *'
              value={data?.matchingPassword || ''}
              handleChange={handleChange}
            />
          </div>
          <div className='btn-container'>
            <button className='btn btn-block' type='submit'>
              submit
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
    margin-top: 0.5rem;
  }
  a:link,
  a:visited {
    color: currentColor;
  }
  .icon-return {
    padding: 5px;
    margin-left: -5px;
  }
  .icon-return:hover {
    transition: var(--transition);
    box-shadow: var(--shadow-1);
    background: var(--grey-100);
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
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
    width: 15%;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
    button {
      height: 35px;
    }
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

export default ChangePassword;
