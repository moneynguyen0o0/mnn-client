import React, { Component } from 'react';
import Loading from 'app/components/Loading';

export default (loadingProp = 'isWaiting') => (WrappedComponent) => {
  return class LoadingHOC extends Component {
    static displayName = 'LoadingHOC'

    render() {
      return this.props[loadingProp] ? <Loading /> : <WrappedComponent { ...this.props } />;
    }
  };
};
