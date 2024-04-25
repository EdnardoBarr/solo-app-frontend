import React from 'react';
import main from '../assets/images/main.svg';
import styled from 'styled-components';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Find Your Tribe. <span>Explore Together.</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, est.
            Laudantium quidem accusantium similique alias possimus? Esse fuga
            quos, commodi dignissimos deserunt veritatis illo rerum officiis
            quisquam, odio neque. Quis.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='friendship hands' className='img main-img' />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .logo {
  }
  .page {
    min-height: calc(100vh -var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: 5rem;
  }
  h1 {
    font-weight: 700;
    color: var(--primary-50);
    span {
      color: var(--orange-900);
      font-weight: bolder;
    }
  }
  p {
    color: var(--primary-50);
  }
  .main-img {
    display: none;
    color: #0f2850;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 8rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
