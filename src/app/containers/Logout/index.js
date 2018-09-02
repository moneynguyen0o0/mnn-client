import React, { Component } from 'react';
import { object, func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { actions as sessionActions } from 'app/store/reducers/session';

class Logout extends Component {
  static displayName = 'Logout';

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    history: object.isRequired,
    logout: func.isRequired
  }

  componentDidMount() {
    const { logout, history, cookies } = this.props;

    logout(() => {
      cookies.remove('auth');
      history.push('/');
    });
  }

  render() {
    return (
      <div>
        Logging out...
      </div>
    );
  }
}

export default withRouter(withCookies(connect(null, {
  logout: sessionActions.requestLogout
})(Logout)));
