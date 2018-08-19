import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from './assets/logo.svg';

const Wrapper = styled.div`
  width: 70px;
  height: 70px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default ({ link = '/', ...props }) => (
  <Wrapper { ...props }>
    <Link to={ link }>
      <StyledImage src={ logo } alt="Logo" role="presentation" />
    </Link>
  </Wrapper>
);
