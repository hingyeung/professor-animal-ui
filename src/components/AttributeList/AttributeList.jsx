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
      // The attribute definition loaded from file as the base template for new animal form.
      // e.g. { physical: [{_name: "fins", _value: true}]}
      attributeDefinition: props.attributeDefinition,
      // This is the state of the current animal definition. This should be updated when an attribute of
      // an animal is changed, a new attribute is added to an animal, or when a new animal is added.
      // e.g. {id: {name: "Lion", attributeMap: {physical: {tail: true, legs: true}}}}
      animalDefinition: props.animalDefinition,
      // This is the state of the current animal definition, including updates from user using AnimalForm.
      // It has the same structure as attributeMap. This should be updated on attribute value change
      // currentAttributeMapForForm: {}
    };

    this.renderAttributeGroupsForThisAnimal = this.renderAttributeGroupsForThisAnimal.bind(this);
  }

  // When the animal definition is loaded from file, each animal definition only contains attributes that it has,
  // but not the attributes that it doesn't have. This is done to save storage space. However, the AnimalForm
  // that should allow user to modify all attributes, regardless whether the attributes are currently selected
  // for an animal for not.
  // This function hydrates the animal definition loaded from file to make sure all animals have all attributes
  // selectable on the form (added attributes are default to false).
  addUnusedAttributeToAnimals() {
    const oldAnimalDefinition = this.state.animalDefinition,
      attributeDefinition = this.state.attributeDefinition;
    // must do deep cloning for hydratedAnimalDefinition would just be a
    // reference to oldAnimalDefinition
    let hydratedAnimalDefinition = JSON.parse(JSON.stringify(oldAnimalDefinition));

    Object.keys(attributeDefinition).forEach(attributeType => {
      Object.keys(attributeDefinition[attributeType]).forEach(attributeName => {

        Object.keys(hydratedAnimalDefinition).forEach(animalId => {
          if (!oldAnimalDefinition[animalId]['attributeMap'][attributeType][attributeName]) {
            hydratedAnimalDefinition[animalId]['attributeMap'][attributeType][attributeName] =
              // default value is false from attributeDefinition
              attributeDefinition[attributeType][attributeName];
          }
        });
      })
    });

    console.log(hydratedAnimalDefinition);
    return hydratedAnimalDefinition;
  }

  renderAttributeGroupsForThisAnimal(animalId) {
    let hydratedAnimalDefinition = this.addUnusedAttributeToAnimals();
    console.log(hydratedAnimalDefinition);
    return <AnimalForm animal={ hydratedAnimalDefinition[animalId] }/>
  }

  render() {
    return (
      <Router>
        <div>
          <div className={ 'animal-list-container left-container col-3' }>
            <AnimalList animals={ this.state.animalDefinition }/>
          </div>
          <div className={ 'animal-form-container right-container col-9' }>
            <Route path="/animal/:id"
                   render={ (routeProps) => this.renderAttributeGroupsForThisAnimal(routeProps.match.params.id) }/>
          </div>
        </div>
      </Router>
    )
  }

}

export default AttributeList