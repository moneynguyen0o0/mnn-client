import React, { PureComponent } from 'react';
import { object, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions as userActions } from 'app/store/reducers/user';
import withLoading from 'app/hoc/withLoading';

const Wrapper = styled.div`
  background: orange;
`;

class UserDetailPage extends PureComponent {
  static displayName = 'UserDetailPage';

  static propTypes = {
    match: object.isRequired,
    requestUser: func.isRequired,
    session: object,
    user: object,
    error: object,
    isWaiting: bool
  }

  componentDidMount() {
    const {
      session: {
        authenticated,
        data: auth
      },
      match,
      user,
      requestUser
    } = this.props;

    const id = match.params.id;

    if (user._id !== id && authenticated) {
      requestUser(id, auth);
    }
  }

  render() {
    const { fullname = '' } = this.props.user;

    return (
      <Wrapper>
        { fullname }
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user, session }) => {
  const { data, error, isWaiting } = user;

  return {
    session,
    user: data,
    error,
    isWaiting
  };
};

export default connect(mapStateToProps, {
  requestUser: userActions.requestUser
})(withLoading()(UserDetailPage));
