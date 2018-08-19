import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.h3`
  background: red;
`;

export default () => {
  return (
    <Wrapper>
      <p>Oops, Page was not found!</p>
    </Wrapper>
  );
};
