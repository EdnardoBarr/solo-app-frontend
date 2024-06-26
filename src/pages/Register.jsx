import { useState, useEffect } from 'react';
import { FormRow, Logo } from '../components';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import loginService from '../services/login-service';
import { useAuth } from '../contexts/auth';
import userService from '../services/user-service';
import localStorageService from '../services/localStorage-service';
import Select from 'react-select';
import userInterests from '../utils/userInterests';

const EMAIL_DEMO = 'ednardobl@gmail.com';
const PASSWORD_DEMO = '123';

const initialState = {
  email: '',
  password: '',
  matchingPassword: '',
  givenName: '',
  surname: '',
  country: '',
  city: '',
  dateOfBirth: '',
  isMember: true,
};

const Register = () => {
  const { token, setToken, setRefreshToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleDemoLogin = () => {
    userService
      .doLogin(EMAIL_DEMO, PASSWORD_DEMO)
      .then((res) => {
        console.log('res', res);
        const { token, refreshToken } = res.data;
        setToken(token);
        setRefreshToken(refreshToken);
        navigate('/', { replace: true });
        toast.success(`Good to see you again!`);
      })
      .catch((error) => {
        toast.error('Invalid login');
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      givenName,
      surname,
      email,
      password,
      matchingPassword,
      country,
      city,
      isMember,
    } = values;

    if (
      !email ||
      !password ||
      (!isMember && !givenName) ||
      (!isMember && !surname) ||
      (!isMember && !matchingPassword) ||
      (!isMember && !country) ||
      (!isMember && !city)
    ) {
      toast.error('Please fill out all the fields.');
      return;
    }

    if (!isMember && password !== matchingPassword) {
      toast.error('Passwords must match');
      return;
    }

    {
      isMember
        ? userService
            .doLogin(email, password)
            .then((res) => {
              console.log('res', res);
              const { token, refreshToken } = res.data;
              setToken(token);
              setRefreshToken(refreshToken);
              navigate('/', { replace: true });
              toast.success(`Good to see you again!`);
            })
            .catch((error) => {
              toast.error('Invalid login');
            })
        : userService
            .save(
              givenName,
              surname,
              email,
              password,
              matchingPassword,
              country,
              city
            )
            .then((res) => {
              toast.success(`Registered succesfully. Please Login`);
              toggleMember();
              navigate('/register', { replace: true });
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <div className='container-row'>
            <FormRow
              type='text'
              name='givenName'
              value={values.givenName}
              handleChange={handleChange}
              labelText='Name'
            />
            <FormRow
              type='text'
              name='surname'
              value={values.surname}
              handleChange={handleChange}
              labelText='Surname'
            />
          </div>
        )}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
          labelText='Email'
        />
        <div className='container-row'>
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
            labelText='Password'
          />
          {!values.isMember && (
            <FormRow
              type='password'
              name='matchingPassword'
              value={values.matchingPassword}
              handleChange={handleChange}
              labelText='Confirm Password'
            />
          )}
        </div>
        {!values.isMember && (
          <>
            <div className='container-row'>
              <FormRow
                type='text'
                name='country'
                value={values.country}
                handleChange={handleChange}
                labelText='Country'
              />
              <FormRow
                type='text'
                name='city'
                value={values.city}
                handleChange={handleChange}
                labelText='City'
              />
            </div>
          </>
        )}

        <div className='container-row'>
          <button type='submit' className='btn btn-block'>
            submit
          </button>
          <button
            type='button'
            className='btn btn-block clear-btn'
            onClick={handleDemoLogin}
          >
            demo user
          </button>
        </div>
        <div className='container-row'>
          <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}{' '}
            <button type='button' onClick={toggleMember} className='member-btn'>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .container-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .btn-demo {
    background: var(--orange-900);
  }
  .form {
    max-width: 700px;
    border-top: 5px solid var(--orange-900);
  }
  .form-row {
    width: 100%;
  }
  .form h3 {
    text-align: center;
  }
  .react-select-container {
    border-radius: var(--borderRadius);
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
    width: 30%;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    font-weight: bolder;
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
