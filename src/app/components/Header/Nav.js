import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavLink = ({ link, className }) => <Link to={ link.url } className={ className }>{link.text}</Link>;

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

export default ({ links = [], ...props }) => (
  <Nav { ...props }>
    <ul>
      { links.map((link, index) => <LinkWrapper key={ index }><StyledLink link={ link } /></LinkWrapper>) }
    </ul>
  </Nav>
);
