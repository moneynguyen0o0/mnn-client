import React, { PureComponent } from 'react';
import { object, array, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { actions as userActions, selectors as userSelectors } from 'app/store/reducers/user';
import withLoading from 'app/shared/hoc/withLoading';

const Wrapper = styled.div`
  background: green;
`;

class UserList extends PureComponent {
  static displayName = 'UserList';

  static propTypes = {
    requestUsers: func.isRequired,
    users: array,
    error: object,
    isWaiting: bool
  }

  componentDidMount() {
    const {
      users,
      requestUsers
    } = this.props;

    if (!users.length) {
      requestUsers();
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

const mapStateToProps = (state) => {
  const { error, isWaiting } = state.users;

  return {
    users: userSelectors.getFilteredUsers(state),
    error,
    isWaiting
  };
};

export default connect(mapStateToProps, {
  requestUsers: userActions.requestUsers
})(withLoading()(UserList));
