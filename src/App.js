import 'lib/css/bootstrap.min.css';
import 'App.css';

import React, {Component} from 'react';
// import attributeData from './data/attributes.json';
import AttributeList from './components/AttributeList';
import AttributeReaderService from './services/AttributeReaderService';
import fileDownload from 'js-file-download';

class App extends Component {
  constructor(props) {
    super(props);

    this.onNewAnimalSubmitted = this.onNewAnimalSubmitted.bind(this);
  }

  onNewAnimalSubmitted(allAnimals) {
    fileDownload(JSON.stringify(allAnimals), 'test.json');
  }

  render() {
    let a = new AttributeReaderService();
    const attributeMap = a.readFile;

    return (
      <AttributeList attributeMap={ attributeMap } onNewAnimalSubmitted={ this.onNewAnimalSubmitted }/>
    );
  }
}

export default App;
