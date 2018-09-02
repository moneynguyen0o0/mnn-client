import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions as userActions } from 'app/store/reducers/user';

const Wrapper = styled.div`
  background: orange;
`;

class UserDetailPage extends PureComponent {
  static displayName = 'UserDetailPage';

  static propTypes = {
    match: object.isRequired,
    requestUser: func.isRequired,
    session: object,
    user: object
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
    
    if (!user.data && authenticated) {
      requestUser(match.params.id, auth);
    }
  }

  render() {
    const { fullname = '' } = this.props.user.data || {};

    return (
      <Wrapper>
        { fullname }
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ session, user }) => ({ session, user });

export default connect( mapStateToProps, {
  requestUser: userActions.requestUser
})(UserDetailPage);
