import Loadable from 'react-loadable';
import Loading from 'components/common/Loading';

const asyncImport = function(mod) {
  switch (mod) {
    case 'AnimalList':
      return importAnimalList();
    case 'AnimalForm':
      return importAnimalForm();
    default:
      throw new Error('Unknown module to load: ' + mod);
  }

  // If I did:
  // let a = 'components/AttributeList/AnimalForm';
  // import(a);
  // I would get "Critical dependency: the request of a dependency is an expression"
  // and it import can't resolve the module anyway. It looks like the path-to-module
  // must not be an expression (i.e. must be hard-coded string!).
  // I think this blog is trying to explain it:
  // https://qiita.com/inuscript/items/ac458e5adc3a6e110a1c
  // https://github.com/webpack/webpack-dev-server/issues/212#issuecomment-242449586
  function importAnimalList() {
    return Loadable({
      loader: () => import('components/AttributeList/AnimalList'),
      loading: Loading,
    });
  }

  function importAnimalForm() {
    return Loadable({
      loader: () => import('components/AttributeList/AnimalForm'),
      loading: Loading,
    });
  }
};


export {asyncImport};