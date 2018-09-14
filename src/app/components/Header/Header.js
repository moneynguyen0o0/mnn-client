import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Nav from './Nav';
import Lang from './Lang';

const StyledLogo = styled(Logo)`
  margin-left: 15px;
`;

const StyledNav = styled(Nav)`
  margin-right: 15px;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background-color: wheat;
`;

export default ({ menu }) => {
  return (
    <Wrapper>
      <StyledLogo />
      <StyledNav menu={ menu } />
      <Lang />
    </Wrapper>
  );
};
