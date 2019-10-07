import React, { Component } from 'react';
import { object, func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { actions as sessionActions } from 'app/store/reducers/session';
import LoginForm from 'app/components/LoginForm';

class Login extends Component {
  static displayName = 'Login';

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    history: object.isRequired,
    session: object.isRequired,
    login: func.isRequired
  }

  onSubmit = user => {
    const { login, cookies } = this.props;

    login(user, auth => {
      cookies.set('auth', auth, {
        path: '/',
        expires: new Date(auth.expires)
      });
    });
  }

  render() {
    const {
      session: {
        data,
        isWaiting,
        error
      },
      location: {
        state: {
          from = '/'
        } = {}
      } = {}
    } = this.props;

    if (data) {
      return <Redirect to={ from } />;
    }

    return (
      <div>
        <div>{ isWaiting }</div>
        <LoginForm submit={ this.onSubmit } error={ error } />
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => ({ session });

export default withCookies(connect(mapStateToProps, {
  login: sessionActions.requestLogin
})(Login));
