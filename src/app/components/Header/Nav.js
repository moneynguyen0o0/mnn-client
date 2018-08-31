import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavLink = ({ item, className }) => <Link to={ item.url } className={ className }>{item.text}</Link>;

const StyledLink = styled(NavLink)`
  color: white;
`;

const Nav = styled.nav`
  overflow: hidden;
`;

const LinkWrapper = styled.li`
  float: left;
  margin-left: 10px;
`;

export default ({ menu = [], ...props }) => (
  <Nav { ...props }>
    <ul>
      { menu.map((item, index) => <LinkWrapper key={ index }><StyledLink item={ item } /></LinkWrapper>) }
    </ul>
  </Nav>
);
