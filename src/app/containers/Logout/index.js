import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions as userActions } from 'app/store/reducers/user';

class Logout extends Component {
  static displayName = 'Logout';

  static propTypes = {
    history: object.isRequired,
    logout: func.isRequired
  }

  componentDidMount() {
    const { logout, history } = this.props;
    
    logout(() => history.push('/'));
  }

  render() {
    return (
      <div>
        Logging out...
      </div>
    );
  }
}

export default connect(null, {
  logout: userActions.requestLogout
})(withRouter(Logout));
