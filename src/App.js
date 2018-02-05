import React, {Component} from 'react';
// import attributeData from './data/attributes.json';
import AttributeList from './components/AttributeList';
import AttributeReaderService from './services/AttributeReaderService';
import AnimalList from 'components/AnimalList';
import fileDownload from 'js-file-download';
import 'lib/css/bootstrap.min.css';
import 'App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onNewAnimalSubmitted = this.onNewAnimalSubmitted.bind(this);

    // TODO read the animal definition file animals.json location from user:
    this.state = {
      animalDefinition: require('./data/animals.json')
    }
  }

  onNewAnimalSubmitted(newAnimal) {
    this.setState({
      animalDefinition: this.state.animalDefinition.concat(newAnimal)
    }, () => fileDownload(JSON.stringify(this.state.animalDefinition), 'test.json'));
  }

  render() {
    let a = new AttributeReaderService();
    const attributeMap = a.readFile;

    return (
      <div className="container">
        <div className="row">
          <div className="col-3 left-container">
            <AnimalList animals={ this.state.animalDefinition }/>
          </div>
          <div className="col-9 right-container">
            <AttributeList attributeMap={ attributeMap } onNewAnimalSubmitted={ this.onNewAnimalSubmitted }/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
