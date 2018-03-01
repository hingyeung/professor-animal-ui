import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/Loading';

const LoadableAnimalForm = Loadable({
  loader: () => import('components/AnimalForm'),
  loading() {
    return <Loading/>;
  }
});

export default LoadableAnimalForm;