import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.h1`
  background: yellow;
`;

export default class Home extends PureComponent {
  static displayName = 'Home';

  render() {
    return (
      <Wrapper>
        Home Page
      </Wrapper>
    );
  }
}
