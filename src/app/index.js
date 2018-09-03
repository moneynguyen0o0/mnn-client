import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import routes from 'routes';
import appConfig from './config/app';
import menu from './config/menu';
import theme from './config/themes/default';
import { Header, Main } from './components';

injectGlobal`
  body {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  a {
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  background: white;
`;

const App = ({ session, location }) => (
  <ThemeProvider theme={ theme }>
    <Wrapper>
      <Helmet { ...appConfig } />
      <Header menu={ menu } session={ session } />
      <Main routes={ routes } location={ location } session={ session } />
    </Wrapper>
  </ThemeProvider>
);

export default connect(({ session, router }) => ({
  location: router.location,
  session: session
}))(App);
