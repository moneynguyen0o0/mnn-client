import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions as userActions, selectors as userSelectors } from 'app/store/reducers/user';

const Wrapper = styled.div`
  background: green;
`;

class UserList extends PureComponent {
  static displayName = 'UserList';

  static propTypes = {
    users: PropTypes.array,
    requestUsers: PropTypes.func.isRequired
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
          users.map((user, index) => <div key={ index }>{user.fullname}</div>)
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: userSelectors.getFilteredUsers(state)
  };
};

export default connect(mapStateToProps, {
  requestUsers: userActions.requestUsers
})(UserList);
