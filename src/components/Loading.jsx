import React from 'react';
import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

const primaryBlue = '#0f2850';
const primaryOrange = '#f77414';

//Create functional component
export function Loading() {
  return (
    <Wrapper className='loading-container spinner'>
      <Oval
        visible={true}
        height='80'
        width='80'
        ariaLabel='color-ring-loading'
        color={primaryOrange}
        secondaryColor={primaryBlue}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
