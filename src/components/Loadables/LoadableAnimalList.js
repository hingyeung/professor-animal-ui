import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/Loading';

const LoadableAnimalList = Loadable({
  loader: () => import('components/AnimalList'),
  loading() {
    return <Loading/>;
  }
});

export default LoadableAnimalList;