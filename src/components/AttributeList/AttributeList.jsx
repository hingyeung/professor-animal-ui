import './AttributeList.css';

import React, {Component} from 'react';
import AttributeGroup from './AttributeGroup';
import AnimalList from './AnimalList';
import Animal from 'models/Animal';
import AnimalForm from './AnimalForm'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class AttributeList extends Component {
  ATTRIBUTE_TYPES = ['physical', 'types', 'behaviours', 'diet', 'possible_behaviours', 'considerations'];

  constructor(props) {
    super(props);

    this.state = {
      animalName: undefined,
      // The attribute definition loaded from file as the base template for new animal form.
      // e.g. { physical: [{_name: "fins", _value: true}]}
      attributeDefinition: props.attributeDefinition,
      // animal definition initially loaded from file. This should be updated using values in attributeMap
      // on form submit.
      // e.g. [{ name: "Lion", physical: ["legs"], ... }]
      animalDefinition: props.animalDefinition,
      // This is the state of the current animal definition, including updates from user using AnimalForm.
      // It has the same structure as attributeMap. This should be updated on attribute value change
      // currentAttributeMapForForm: {}
    };
  }

  render() {
    return (
      <Router>
        <div>
          <AnimalList animals={ this.state.animalDefinition }/>
          <div className={ 'animal-form-container' }>
            {/*<AnimalForm animals={ this.state.animalDefinition }/>*/}
          </div>
        </div>
      </Router>
    )
  }

}

export default AttributeList