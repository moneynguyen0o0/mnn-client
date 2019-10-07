import React, { Component } from 'react';
import { func, any } from 'prop-types';

import Input from 'app/components/Input';

export default class LoginForm extends Component {
  static displayName = 'LoginForm';

  static propTypes = {
    submit: func.isRequired,
    error: any
  }

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  onSubmit = () => {
    const { submit } = this.props;
    const { user } = this.state;

    submit(user);
  }

  onChange = (e) => {
    const { value, name } = e.target;
    const { user } = this.state;

    user[name] = value;

    this.setState({ user });
  }

  render() {
    const {
      error
    } = this.props;
    const {
      user: { email, password }
    } = this.state;

    const { message, errors } = error || {};

    return (
      <div>
        <h3>LOGIN</h3>
        <div>{ errors ? errors.map((error, index) => <span key={ index }>{error.messages}</span>) : message }</div>
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
