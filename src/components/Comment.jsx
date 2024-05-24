import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';

const Comment = ({ commentInfo, userInfo }) => {
  const { comment, createdAt, updatedAt } = commentInfo;
  const { givenName } = userInfo || '';
  return (
    <Wrapper>
      <p>{comment}</p>
      <div className='footer-container'>
        <div className='user-info'>
          <span>
            {givenName}, on {createdAt}
          </span>
        </div>
        <div className='btn-container'>
          <button className='btn-action'>
            <FaPencilAlt />
          </button>
          <button className='btn-action'>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: var(--borderRadius);
  background: var(--grey-50);
  border: 1px solid var(--grey-100);
  box-shadow: var(--shadow-2);

  span {
    font-style: italic;
    font-size: smaller;
  }

  p {
    text-align: justify;
    text-justify: inter-word;
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: end;
    /* margin: 0;
    gap: 0.1rem; */
  }
  .btn-container {
    gap: 0.3rem;
  }
  .btn-action {
    cursor: pointer;
    // color: var(--w);
    background: var(--transparent);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: none;
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
  }
`;

export default Comment;
