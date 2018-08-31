import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.main`
  padding: 1em 4em;
`;

const Main = ({ routes, authenticated, location }) => (
  <Wrapper>
    <Switch>
      {
        routes.map((route, index) => {
          if (route.requiresAuth && !authenticated) {
            return <Redirect key={ index } to={{
                pathname: '/login',
                state: { from: location }
              }}
            />;
          }

          return <Route key={ index } { ...route } />;
        })
      }
    </Switch>
  </Wrapper>
);

const mapStateToProps = ({ session, router }) => ({
  authenticated: session.authenticated,
  location: router.location
});

export default connect(mapStateToProps)(Main);
