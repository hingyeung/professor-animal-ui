import React, { Component } from 'react';
// import attributeData from './data/attributes.json';
import AttributeList from './AttributeList';
import AttributeReaderService from './services/AttributeReaderService';
import './App.css';

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
