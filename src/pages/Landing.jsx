import React from 'react';
import logo from '../assets/images/logo.png';
import logo2 from '../assets/images/logo2.png';
import logoWhiteBg from '../assets/images/logo-removebg.png';
import main from '../assets/images/main.jpg';
import styled from 'styled-components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <h1 className='logo'>SOLO</h1>
        {/* <img src={logo2} alt='solo logo' className='logo' /> */}
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
          <button className='btn btn-hero'>Login/Register</button>
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
    h1 {
      color: var(--orange-900);
      font-size: 4rem;
      letter-spacing: 0.3em;
    }
  }
  .page {
    min-height: calc(100vh -var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    color: var(--primary-50);
    padding-top: 50px;
    span {
      color: var(--orange-900);
      font-weight: bolder;
    }
  }
  p {
    color: var(--primary-50);
    text-justify: inter-word;
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
