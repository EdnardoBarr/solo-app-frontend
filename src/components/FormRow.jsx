import React from 'react';
import styled from 'styled-components';

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor='' className='form-label'>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  );
};

const Wrapper = styled.div``;

export default FormRow;
