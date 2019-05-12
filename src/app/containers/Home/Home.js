import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { translate } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.h1`
  background: yellow;
`;

class Home extends PureComponent {
  static displayName = 'Home';

  static propTypes = {
    t: func.isRequired
  }

  render() {
    const { t } = this.props;

    return (
      <Wrapper>
        {t('welcome')}
      </Wrapper>
    );
  }
}

export default translate('home')(Home);
