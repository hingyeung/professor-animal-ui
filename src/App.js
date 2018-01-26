import React, { Component } from 'react';
// import attributeData from './data/attributes.json';
import AttributeList from './components/AttributeList';
import AttributeReaderService from './services/AttributeReaderService';
import './lib/css/bootstrap.min.css';
import './App.css';
import './components/AttributeList.css';

class App extends Component {
  render() {
    let a = new AttributeReaderService();
    const attributeMap = a.readFile;

    return (
      <AttributeList attributeMap={attributeMap} />
    );
  }
}

export default App;
