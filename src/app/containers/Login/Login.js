import React, { Component } from 'react';
import { object, func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { actions as sessionActions } from 'app/store/reducers/session';

import Input from 'app/components/Input';

class Login extends Component {
  static displayName = 'Login';

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    history: object.isRequired,
    session: object.isRequired,
    login: func.isRequired
  }

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  onSubmit = () => {
    const { login, cookies } = this.props;
    const { user } = this.state;

    login(user, (auth) => {
      cookies.set('auth', auth, {
        path: '/',
        expires: new Date(auth.expires),
        // maxAge: 3600,
        // secure: true,
        // httpOnly: true
      });
    });
  }

  onChange = (e) => {
    const { value, name } = e.target;
    const { user } = this.state;

    user[name] = value;

    this.setState({ user });
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

    const {
      user: { email, password }
    } = this.state;

    const { message, errors } = error || {};

    return (
      <div>
        <h3>LOGIN</h3>
        <div>{isWaiting}</div>
        <ul>
          { errors ? errors.map((error, index) => <li key={index}>{error.messages}</li>) : message }
        </ul>
        <Input
          name="email"
          value={ email }
          label="Email"
          type="email"
          onChange={ this.onChange }
        />
        <Input
          name="password"
          value={ password }
          label="Password"
          type="password"
          onChange={ this.onChange }
        />
        <button type="submit" onClick={ this.onSubmit }>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => ({ session });

export default withCookies(connect(mapStateToProps, {
  login: sessionActions.requestLogin
})(Login));
