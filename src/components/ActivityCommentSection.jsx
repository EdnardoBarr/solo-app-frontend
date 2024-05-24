import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import activityCommentService from '../services/activity-comment-service';
import { UserContext } from '../contexts/user';
import { useLocation } from 'react-router-dom';
import Comment from './Comment';

const INITIAL_STATE = {
  comment: '',
};

const ActivityCommentSection = () => {
  const locationActivity = useLocation();
  const [data, setData] = useState(INITIAL_STATE);
  const [reload, setReload] = useState(false);
  const [comments, setComments] = useState([]);
  const { userDetails } = useContext(UserContext);
  const { activityDetails } = locationActivity.state;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ [name]: value });
  };

  const clearForm = () => {
    setData(INITIAL_STATE);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { comment } = data;
    const activityId = activityDetails?.id;
    const userId = userDetails?.id;
    let params = { activityId, userId, comment };
    console.log('params', params);

    if (!comment) {
      toast.error('Please fill out the required field');
      return;
    }

    if (comment.length > 1000) {
      toast.error('A comment can have up to 100 characters.');
      return;
    }

    activityCommentService
      .create(params)
      .then(() => {
        setComments([comment, ...comments]);
        setReload(!reload);
        toast.success('Comment added successfully');
      })
      .catch((error) =>
        toast.error(
          `Error: ${error.message}` ||
            'Please contact the administrator of the system'
        )
      );
  };

  useEffect(() => {
    const activityId = activityDetails?.id;
    activityCommentService
      .getAll(activityId)
      .then((res) => {
        console.log('res', res.data);
        setComments([...res.data]);
      })
      .catch();
  }, [reload]);

  return (
    <Wrapper>
      <header>
        <h2>Comment Section</h2>
      </header>
      <div className='form-row'>
        <textarea
          type='text'
          rows='3'
          name='comment'
          placeholder='Feel free to ask anything or leave a comment...'
          value={data?.comment || ''}
          onChange={handleChange}
          className='form-textarea'
        />
      </div>
      <footer className='btn-container'>
        <button type='reset' className='clear-btn btn' onClick={clearForm}>
          Clear
        </button>
        <button type='button' className='btn submit-btn' onClick={handleSubmit}>
          Submit
        </button>
      </footer>
      <div className='comment-container'>
        {comments.map((item, i) => {
          const { user: userInfo, comment, createdAt, updatedAt } = item;
          const commentInfo = { comment, createdAt, updatedAt };
          return (
            <Comment commentInfo={commentInfo} userInfo={userInfo} key={i} />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 2rem auto;
  border-radius: var(--borderRadius);
  max-width: 800px;
  background: var(--white);
  padding: 3rem;
  box-shadow: var(--shadow-2);
  h2 {
    text-align: center;
  }
  .form-row {
    width: 100%;
  }
  .btn-container {
    margin-top: 2rem;
    display: flex;
    justify-content: end;
    gap: 1.5rem;
  }
  .comment-container {
  }
  /* .btn {
    width: 35%;
  } */
  .clear-btn {
    width: 8rem;
    border: 2px solid var(--primary-800);
  }
  .submit-btn {
    width: 8rem;
    background: var(--primary-600);
    color: var(--white);
    border: 1px solid var(--primary-900);
  }
  .submit-btn:hover {
    background: var(--primary-900);
    transition: var(--transition);
  }
  @media (max-width: 576px) {
    .btn-container {
      flex-direction: column;
    }
  }
  @media (max-width: 576px) {
    .btn {
      width: 100%;
    }
  }
`;

export default ActivityCommentSection;
