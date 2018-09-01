import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Input from 'app/components/Input';

const Wrapper = styled.h1`
  background: yellow;
`;

class Home extends PureComponent {
  static displayName = 'Home';

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      name: cookies.get('name') || 'Money'
    };
  }

  onChange = (e) => {
    const { value } = e.target;

    this.setState({ value });
  }

  onSubmit = () => {
    const { value } = this.state;
    const { cookies } = this.props;

    cookies.set('name', value, { path: '/' });
    this.setState({ name: value });
  }

  render() {
    const { name, value } = this.state;

    return (
      <Wrapper>
        <div>Hello { name }!</div>
        <Input
          name="value"
          value={ value }
          onChange={ this.onChange }
        />
        <button type="submit" onClick={ this.onSubmit }>Submit</button>
      </Wrapper>
    );
  }
}

export default withCookies(Home);
