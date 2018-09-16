import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import styled from 'styled-components';

const NavLink = ({ item, className, t }) => <Link to={ item.url } className={ className }>{t(item.key)}</Link>;

const TranslateNavLink = translate('common')(NavLink);

const StyledLink = styled(TranslateNavLink)`
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
