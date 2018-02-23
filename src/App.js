import 'lib/css/bootstrap.min.css';
import 'App.css';

import React from 'react';
import AttributeList from './components/AttributeList';
import fileDownload from 'js-file-download';
import AnimalDefinition from 'models/AnimalDefinition';

const App = function (props) {
  function onExport(allAnimals) {
    fileDownload(
      JSON.stringify(AnimalDefinition.convertFromAppModelToFileModel(allAnimals)),
      'test.json');
  }

  return (
    <div>
      <AttributeList onExport={ onExport } x="y"/>
    </div>
  );
};

export default App;
