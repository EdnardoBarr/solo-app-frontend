import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import userInterests from '../utils/userInterests';
import FormRow from './FormRow';

const INITIAL_STATE = {
  givenName: '',
  interests: [],
  city: '',
};

const SearchUserContainer = ({ userFilter, setUserFilter }) => {
  const clearForm = () => {
    setUserFilter(INITIAL_STATE);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log('name', name);
    console.log('value', value);

    setUserFilter({ ...userFilter, [name]: value });
  };

  const handleSelectChange = (e) => {
    console.log('e', e);
    setUserFilter({ ...userFilter, interests: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h5>Filter Users</h5>
        <div className='row-container'>
          <FormRow
            type='text'
            name='givenName'
            labelText='Name'
            value={userFilter?.givenName || ''}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='city'
            labelText='City'
            value={userFilter?.city || ''}
            handleChange={handleChange}
          />
          <div className='form-row'>
            <label className='form-label'>Interests</label>
            <Select
              name='interests'
              value={userFilter?.interests || [{ id: 0, label: '', value: '' }]}
              onChange={handleSelectChange}
              options={userInterests}
              isMulti
              className='react-select-container'
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  background: '#d9e2ec',
                  minHeight: '35px',
                  height: '35px',
                  padding: '0 6px',
                }),
                valueContainer: (provided, state) => ({
                  ...provided,
                  height: '35px',
                  padding: '0 6px',
                }),
                input: (provided, state) => ({
                  ...provided,
                  margin: '0px',
                }),
                indicatorSeparator: (state) => ({
                  display: 'none',
                }),
                indicatorsContainer: (provided, state) => ({
                  ...provided,
                  minHeight: '35px',
                }),
              }}
            />
          </div>
        </div>
        <div className='btn-container'>
          <button type='reset' className='clear-btn btn' onClick={clearForm}>
            Clear
          </button>
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

export default SearchUserContainer;
