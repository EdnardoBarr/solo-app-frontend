import { Link } from 'react-router-dom';
import img from '../assets/images/error.svg';
import styled from 'styled-components';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>Oops! It looks like you've ventured off the trail.</h3>
        <p>
          {' '}
          Maybe try a different path or head <Link to='/'>back to safety</Link>?
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h3 {
    margin-bottom: 0.5rem;
    color: var(--orange-900);
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--primary-100);
    font-weight: bolder;
    text-align: center;
  }
  a {
    color: var(--orange-900);
    text-decoration: underline;

    // text-transform: capitalize;
  }
`;

export default Error;
