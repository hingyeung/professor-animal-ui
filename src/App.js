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

    this.state = {
      animalDefinition: []
    };

    this.onNewAnimalSubmitted = this.onNewAnimalSubmitted.bind(this);
    this.loadAllAnimalsFromFile = this.loadAllAnimalsFromFile.bind(this);
  }

  onNewAnimalSubmitted(allAnimals) {
    fileDownload(JSON.stringify(allAnimals), 'test.json');
  }

  loadAllAnimalsFromFile(event) {
    const file = event.target.files[0];

    // generate a new FileReader object
    let reader = new FileReader();

    // inject an image with the src url
    let that = this;
    reader.onload = function (event) {
      let content = event.target.result;
      that.setState({
        animalDefinition: JSON.parse(content)
      });
    };

    // when the file is read it triggers the onload event above.
    reader.readAsText(file);
    // this allows the same file to be opened again
    event.target.value = null;
  }

  render() {
    let a = new AttributeReaderService();
    const attributeDefinition = a.readFile;

    return (
      <div>
        <input type="file" id="all-animals-load-control" onChange={ this.loadAllAnimalsFromFile }/>
        <AttributeList animalDefinition={ this.state.animalDefinition } attributeDefinition={ attributeDefinition } onNewAnimalSubmitted={ this.onNewAnimalSubmitted }/>
      </div>
    );
  }
}

export default App;
