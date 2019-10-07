import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.main`
  padding: 1em 4em;
`;

export default ({ routes, location, session }) => (
  <Wrapper>
    <Switch>
      {
        routes.map((route, index) => {
          if (route.requiresAuth && !session.authenticated) {
            return <Redirect key={ index } to={ {
              pathname: '/login',
              state: { from: location }
            } }
            />;
          }

          return <Route key={ index } { ...route } />;
        })
      }
    </Switch>
  </Wrapper>
);
