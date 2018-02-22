import 'lib/css/bootstrap.min.css';
import 'App.css';

import React, {Component} from 'react';
import AttributeList from './components/AttributeList';
import AttributeDefinitionReaderService from './services/AttributeDefinitionReaderService';
import fileDownload from 'js-file-download';
import AnimalDefinition from 'models/AnimalDefinition';

class App extends Component {
  constructor(props) {
    super(props);

    this.onExport = this.onExport.bind(this);
  }

  onExport(allAnimals) {
    fileDownload(
      JSON.stringify(AnimalDefinition.convertFromAppModelToFileModel(allAnimals)),
      'test.json');
  }

  render() {
    return (
      <div>
        <AttributeList onExport={ this.onExport }/>
      </div>
    );
  }
}

export default App;
