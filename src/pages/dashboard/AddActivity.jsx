import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FormRow } from '../../components';
import { toast } from 'react-toastify';
import activityService from '../../services/activity-service';
import { UserContext } from '../../contexts/user';

const initialState = {
  title: '',
  description: '',
  address: '',
  city: '',
  country: '',
  coords: '',
  startsAt: '',
  finishesAt: '',
  category: '',
  maxParticipants: 1,
  active: true,
};

const AddActivity = () => {
  const { userDetails } = useContext(UserContext);
  const [data, setData] = useState(initialState);

  const clearForm = () => {
    setData(initialState);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    const {
      title,
      description,
      address,
      city,
      country,
      coords,
      startsAt,
      finishesAt,
      category,
      maxParticipants,
      active,
    } = data;
    const ownerId = userDetails?.id || null;

    e.preventDefault();

    if (
      !title ||
      !description ||
      !address ||
      !city ||
      !country ||
      !startsAt ||
      !category ||
      !maxParticipants
    ) {
      toast.error('Please fill out all the required fields');
      return;
    }

    activityService
      .create(
        title,
        description,
        address,
        city,
        country,
        coords,
        startsAt,
        finishesAt,
        category,
        maxParticipants,
        active,
        ownerId
      )
      .then((res) => {
        // clearForm();
        toast.success('Activity saved');
      })
      .catch((error) =>
        toast.error(error.response.data?.detail || 'Error saving activity')
      );
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-center'>
          <h3>Add Activity</h3>
          <FormRow
            type='text'
            name='title'
            labelText='Title *'
            handleChange={handleChange}
            value={data?.title || ''}
          />
          <label htmlFor='' className='form-label'>
            Description *
          </label>
          <textarea
            type='text'
            rows='4'
            name='description'
            onChange={handleChange}
            className='form-textarea'
            value={data?.description || ''}
          />
          <FormRow
            type='text'
            name='address'
            labelText='address *'
            handleChange={handleChange}
            value={data?.address || ''}
          />
          <div className='container-row'>
            <FormRow
              type='text'
              name='city'
              labelText='city *'
              handleChange={handleChange}
              value={data?.city || ''}
            />
            <FormRow
              type='text'
              name='country'
              labelText='country *'
              handleChange={handleChange}
              value={data?.country || ''}
            />
          </div>
          <div className='container-row'>
            <FormRow
              type='datetime-local'
              name='startsAt'
              labelText='starts at *'
              handleChange={handleChange}
              value={data?.startsAt || ''}
            />
            <FormRow
              type='datetime-local'
              name='finishesAt'
              labelText='finishes at'
              handleChange={handleChange}
              value={data?.finishesAt || ''}
            />
          </div>
          <div className='container-row'>
            <FormRow
              type='text'
              name='category'
              labelText='category *'
              handleChange={handleChange}
              value={data?.category || ''}
            />
            <div className='form-row'>
              <label htmlFor='' className='form-label'>
                How Many People Can Join? *
              </label>
              <input
                type='number'
                name='maxParticipants'
                onChange={handleChange}
                className='form-input'
                min='1'
                value={data?.maxParticipants || ''}
              />
            </div>
          </div>
          <div className='btn-container'>
            <button className='btn clear-btn' type='reset'>
              clear
            </button>
            <button className='btn btn-block' type='submit'>
              add
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
    gap: 10px;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--white);
    color: var(--primry-900);
    border: 2px solid var(--orange-900);
  }
  .clear-btn:hover {
    background: var(--grey-100);
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

export default AddActivity;
