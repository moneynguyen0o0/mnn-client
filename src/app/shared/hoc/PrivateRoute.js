import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, authenticated, ...rest }) => (
  <Route { ...rest }
    render={ props =>
      authenticated ? (
        <Component { ...props } />
      ) : (
        <Redirect
          to={ {
            pathname: '/login',
            state: { from: props.location }
          } }
        />
      )
    }
  />
);
