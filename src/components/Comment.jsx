import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaRegTrashAlt, FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import moment from 'moment';
import activityCommentService from '../services/activity-comment-service';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/user';

const Comment = ({
  commentsArray,
  commentInfo,
  userInfo,
  reload,
  setReload,
}) => {
  const { comment, createdAt, updatedAt, id } = commentInfo;
  const { givenName } = userInfo || '';
  const { userDetails } = useContext(UserContext);
  const [isOwner, setIsOwner] = useState(false);
  const [commentText, setCommentText] = useState({ [`comment${id}`]: comment });
  const [isEdit, setIsEdit] = useState(false);
  const formattedCreatedAt = createdAt
    ? moment(createdAt).format('LLL')
    : createdAt;
  const formatedUpdatedAt = updatedAt
    ? moment(updatedAt).format('LLL')
    : updatedAt;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCommentText({ [name]: value });
  };

  const handleEdit = (e) => {
    setCommentText({ [`comment${id}`]: comment });
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    setIsOwner(userInfo?.id === userDetails?.id);
  }, [userDetails]);

  const handleSubmitEdit = () => {
    let params = {};
    params.comment = commentText[`comment${id}`];
    activityCommentService
      .update(id, params)
      .then(() => {
        toast.success('Comment edited succesfully');
        setIsEdit(false);
        setReload(!reload);
      })
      .catch((error) => {});
  };

  const handleDelete = () => {
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

  useEffect(() => {});
  return (
    <Wrapper className='comment-container'>
      {isEdit ? (
        <div className='form-row'>
          <textarea
            type='text'
            rows='2'
            name={`comment${id}`}
            value={commentText[`comment${id}`] || ''}
            onChange={handleChange}
            className='form-textarea'
          />
        </div>
      ) : (
        <p>{comment}</p>
      )}
      <div className='footer-container'>
        <div className='user-info'>
          <span>
            {givenName} {updatedAt ? `edited` : `wrote`} on{' '}
            {updatedAt ? formatedUpdatedAt : formattedCreatedAt}
          </span>
        </div>
        <div className='btn-container'>
          {!isOwner ? null : isEdit ? (
            <>
              <button className='btn-action' onClick={handleSubmitEdit}>
                <FaCheck />
              </button>
              <button className='btn-action' onClick={handleCancelEdit}>
                <MdCancel />
              </button>
            </>
          ) : (
            <>
              <button className='btn-action' onClick={handleEdit}>
                <FaPencilAlt />
              </button>
              <button className='btn-action' onClick={handleDelete}>
                <FaRegTrashAlt />
              </button>
            </>
          )}
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
  .comment-container:hover {
    box-shadow: var(--shadow-2);
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
  .btn-action:hover {
    box-shadow: var(--shadow-2);
    border-radius: var(--borderRadius);
    color: var(--primary-900);
  }
`;

export default Comment;
