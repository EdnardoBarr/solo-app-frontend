import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaRegTrashAlt, MdCancel, FaCheck } from 'react-icons/fa';
import moment from 'moment';
import activityCommentService from '../services/activity-comment-service';
import { toast } from 'react-toastify';
import FormRow from './FormRow';

const Comment = ({ commentInfo, userInfo, reload, setReload }) => {
  const { comment, createdAt, updatedAt, id } = commentInfo;
  const { givenName } = userInfo || '';
  const [commentText, setCommentText] = useState({ comment: comment });
  const [isEdit, setIsEdit] = useState(false);
  const formattedCreatedAt = createdAt
    ? moment(createdAt).format('LLL')
    : createdAt;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCommentText({ [name]: value });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    console.log('commentInfo', commentInfo);
    activityCommentService
      .delete(id)
      .then(() => {
        toast.success('Comment deleted succesfully');
        setReload(!reload);
      })
      .catch((error) => {
        console.log('errorComment', error.data);
        toast.error('Error deleting comment');
      });
  };
  return (
    <Wrapper>
      {isEdit ? (
        <div className='form-row'>
          <textarea
            type='text'
            rows='2'
            name='comment'
            value={commentText?.comment || ''}
            onChange={handleChange}
            className='form-textarea'
          />
        </div>
      ) : (
        <p>{comment}</p>
      )}
      <div className='footer-container'>
        <div className='user-info'>
          {isEdit ? null : (
            <span>
              {givenName} on {formattedCreatedAt}
            </span>
          )}
        </div>
        <div className='btn-container'>
          <button className='btn-action' onClick={handleEdit}>
            <FaPencilAlt />
          </button>
          <button className='btn-action' onClick={handleDelete}>
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
