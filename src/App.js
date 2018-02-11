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

    this.state = {
      animalDefinition: this.loadAnimalDefinition(),
      attributeDefinition: this.loadAttributeDefinition()
    };

    this.onNewAnimalSubmitted = this.onNewAnimalSubmitted.bind(this);
  }

  loadAnimalDefinition() {
    // TODO upload from file or read from url using AnimalDefinitionRaaderService
    return AnimalDefinition.convertFromFileModel(require('data/animals.json'));
  }

  loadAttributeDefinition() {
    let attributeDefinitionReaderService = new AttributeDefinitionReaderService();
    return attributeDefinitionReaderService.readFile;
  }

  onNewAnimalSubmitted(allAnimals) {
    fileDownload(JSON.stringify(allAnimals), 'test.json');
  }

  // tmp(oldAttributeDefinition) {
  //   let newAttributeDefinition = {};
  //   Object.keys(oldAttributeDefinition).forEach(attributeGroup => {
  //     newAttributeDefinition[attributeGroup] = {};
  //     const attributeListInAttributeGroup = oldAttributeDefinition[attributeGroup];
  //     attributeListInAttributeGroup.forEach(attributeObj => {
  //       newAttributeDefinition[attributeGroup][attributeObj.name] = attributeObj.value;
  //     });
  //   });
  //   console.log(JSON.stringify(newAttributeDefinition));
  // }

  render() {
    // this.tmp(this.state.attributeDefinition);
    return (
      <div>
        <AttributeList animalDefinition={ this.state.animalDefinition }
                       attributeDefinition={ this.state.attributeDefinition }
                       onNewAnimalSubmitted={ this.onNewAnimalSubmitted }/>
      </div>
    );
  }
}

export default App;
