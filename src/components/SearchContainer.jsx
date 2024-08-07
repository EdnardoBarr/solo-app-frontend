import React, { useState } from 'react';
import styled from 'styled-components';
import FormRow from './FormRow';
import activityCategories from '../utils/activityCategories';
import activityStatus from '../utils/activityStatus';

const INITIAL_STATE = {
  title: '',
  category: '',
  status: '',
  city: '',
  initialStartDate: '',
  endStartDate: '',
};

const SearchContainer = ({
  activityFilter,
  setActivityFilter,
  page,
  setPage,
}) => {
  const clearForm = () => {
    setActivityFilter(INITIAL_STATE);
    setPage(0);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setActivityFilter({ ...activityFilter, [name]: value });
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h5>Filter Activities</h5>
        <div className='row-container'>
          <FormRow
            type='text'
            name='title'
            labelText='Title'
            value={activityFilter?.title || ''}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='city'
            labelText='City'
            value={activityFilter?.city || ''}
            handleChange={handleChange}
          />
          <div className='form-row'>
            <label className='form-label'>Category</label>
            <select
              name='category'
              className='form-select'
              onChange={handleChange}
            >
              <option defaultValue=''>Select</option>
              {activityCategories.map((activityCategory) => {
                const { id, category, value } = activityCategory;
                return (
                  <option value={value} key={id}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-row'>
            <label className='form-label'>Status</label>
            <select
              name='status'
              className='form-select'
              onChange={handleChange}
            >
              <option defaultValue=''>Select</option>
              {activityStatus.map((item) => {
                const { id, status, value } = item;
                return (
                  <option value={value} key={id}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <FormRow
            type='text'
            name='category'
            labelText='Category'
            value={activityFilter?.category || ''}
            handleChange={handleChange}
          /> */}
          <FormRow
            type='date'
            name='initialStartDate'
            labelText='Initial Start Date'
            value={activityFilter?.initialStartDate || ''}
            handleChange={handleChange}
          />
          {/* <h6>Between</h6> */}
          <FormRow
            type='date'
            name='endStartDate'
            labelText='Final Start Date'
            value={activityFilter?.endStartDate || ''}
            handleChange={handleChange}
          />
        </div>
        <div className='btn-container'>
          <button type='reset' className='clear-btn btn' onClick={clearForm}>
            Clear
          </button>
          {/* <button type='button' className='btn filter-btn'>
            Filter
          </button> */}
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    margin-top: 1rem;
    border-top: 4px solid var(--primary-900);
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
    width: 100%;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  select {
    cursor: pointer;
  }
  h5 {
    font-weight: 700;
  }
  h6 {
    display: flex;
    justify-content: end;
    align-items: flex-end;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 992px) {
    .row-container {
      flex-direction: column;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
  .row-container {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
  }
  .btn-container {
    margin-top: 2rem;
    display: flex;
    justify-content: end;
    gap: 1.5rem;
  }
  .btn {
    width: 15%;
  }
  .clear-btn {
    border: 2px solid var(--primary-800);
  }
  .filter-btn {
    background: var(--primary-600);
    color: var(--white);
    border: 1px solid var(--primary-900);
  }
  .filter-btn:hover {
    background: var(--primary-900);
    transition: var(--transition);
  }
  @media (max-width: 992px) {
    .btn {
      width: 100%;
    }
  }
`;

export default SearchContainer;
