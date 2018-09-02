import React, { PureComponent } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { actions as userActions, selectors as userSelectors } from 'app/store/reducers/user';

const Wrapper = styled.div`
  background: green;
`;

class UserList extends PureComponent {
  static displayName = 'UserList';

  static propTypes = {
    requestUsers: func.isRequired,
    users: array,
    session: object
  }

  componentDidMount() {
    const {
      session: {
        authenticated,
        data: auth
      },
      users,
      requestUsers
    } = this.props;

    if (!users.length && authenticated) {
      requestUsers(auth);
    }
  }

  render() {
    const { users } = this.props;

    return (
      <Wrapper>
        {
          users.map((user, index) => <Link key={ index } to={ `/users/${user.id}` }><div>{user.fullname}</div></Link>)
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: userSelectors.getFilteredUsers(state),
    session: state.session
  };
};

export default connect(mapStateToProps, {
  requestUsers: userActions.requestUsers
})(UserList);
