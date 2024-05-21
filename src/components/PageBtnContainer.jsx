import React from 'react';
import styled from 'styled-components';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = ({ totalPages, page, setPage }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > totalPages - 1) {
      newPage = 0;
    }
    console.log('newpage', newPage);
    setPage(newPage);
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 0) {
      newPage = totalPages - 1;
    }
    console.log('prevPage', newPage);
    setPage(newPage);
  };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={pageNumber - 1 === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => setPage(pageNumber - 1)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type='button' className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--primary-100);
    border-radius: var(--borderRadius);
    border: 2px solid var(--primary-900);
  }
  .pageBtn {
    background: var(--white);
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-right: 1px solid var(--primary-900);
    cursor: pointer;
  }
  .pageBtn:hover {
    background: var(--grey-100);
  }
  .active {
    background: var(--orange-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    border: 2px solid var(--primary-900);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--grey-100);
  }
  @media (max-width: 576px) {
    section {
      flex-direction: column;
    }
  }
`;

export default PageBtnContainer;
