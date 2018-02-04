import React, {Component} from 'react';
// import attributeData from './data/attributes.json';
import AttributeList from './components/AttributeList';
import AttributeReaderService from './services/AttributeReaderService';
import fileDownload from 'js-file-download';
import 'lib/css/bootstrap.min.css';
import 'App.css';
import 'components/AttributeList/AttributeList.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onNewAnimalSubmitted = this.onNewAnimalSubmitted.bind(this);

    // TODO read the animal definition file animals.json location from user:
    this.animalDefinition = require('./data/animals.json');
  }

  onNewAnimalSubmitted(newAnimal) {
    this.animalDefinition.push(newAnimal);
    const animalDefinition = JSON.stringify(this.animalDefinition);
    fileDownload(animalDefinition, 'test.json');
  }

  render() {
    let a = new AttributeReaderService();
    const attributeMap = a.readFile;

    return (
      <AttributeList attributeMap={ attributeMap } onNewAnimalSubmitted={this.onNewAnimalSubmitted}/>
    );
  }
}

export default App;
