import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: orange;
`;

class UserDetailPage extends PureComponent {
  static displayName = 'UserDetailPage';

  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const { user } = this.props;

    return (
      <Wrapper>
        { user.fullname }
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    user
  } = state;

  return {
    user
  };
};

export default connect(
  mapStateToProps
)(UserDetailPage);
