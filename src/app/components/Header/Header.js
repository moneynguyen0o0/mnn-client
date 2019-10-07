import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Nav from './Nav';

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

export default ({ menu, session }) => {
  const { authenticated } = session;
  const filteredMenu = authenticated ?
    menu.filter(item => item.loggedIn || item.loggedIn === undefined) :
    menu.filter(item => !item.loggedIn);

  return (
    <Wrapper>
      <StyledLogo />
      <StyledNav menu={ filteredMenu } />
    </Wrapper>
  );
};
