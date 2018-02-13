import './AttributeList.css';

import React, {Component} from 'react';
import AnimalList from './AnimalList';
import AnimalForm from './AnimalForm';
import update from 'immutability-helper';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class AttributeList extends Component {
  ATTRIBUTE_TYPES = ['physical', 'types', 'behaviours', 'diet', 'possible_behaviours', 'considerations'];

  constructor(props) {
    super(props);

    // When the animal definition is loaded from file, each animal definition only contains attributes that it has,
    // but not the attributes that it doesn't have. This is done to save storage space. However, the AnimalForm
    // that should allow user to modify all attributes, regardless whether the attributes are currently selected
    // for an animal for not.
    // This function hydrates the animal definition loaded from file to make sure all animals have all attributes
    // selectable on the form (added attributes are default to false).
    function addUnusedAttributeToAnimals(oldAnimalDefinition) {
      let attributeDefinition = props.attributeDefinition;
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

      return hydratedAnimalDefinition;
    }

    this.state = {
      // The attribute definition loaded from file as the base template for new animal form.
      // e.g. { physical: [{_name: "fins", _value: true}]}
      attributeDefinition: props.attributeDefinition,
      // This is the state of the current animal definition. This should be updated when an attribute of
      // an animal is changed, a new attribute is added to an animal, or when a new animal is added.
      // e.g. {id: {name: "Lion", attributeMap: {physical: {tail: true, legs: true}}}}
      animalDefinition: addUnusedAttributeToAnimals(props.animalDefinition),
      // This is the state of the current animal definition, including updates from user using AnimalForm.
      // It has the same structure as attributeMap. This should be updated on attribute value change
      // currentAttributeMapForForm: {}
    };

    this.renderAttributeGroupsForThisAnimal = this.renderAttributeGroupsForThisAnimal.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onNewAttributeAdded = this.onNewAttributeAdded.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onAnimalNameUpdate = this.onAnimalNameUpdate.bind(this);
  }

  onFormSubmit() {
    this.props.onSave(this.state.animalDefinition);
  }

  onAttributeChange(animalId, attributeType, attributeName, attributeValue) {
    this.setState({
      animalDefinition: update(this.state.animalDefinition,
        this.updateObjectForAttribute(animalId, attributeType,
          attributeName, ('yes' === attributeValue.toLowerCase())))
    })
  }

  onNewAttributeAdded(animalId, attributeType, attribute) {
    this.setState({
      animalDefinition: update(this.state.animalDefinition,
        this.updateObjectForAttribute(animalId, attributeType, attribute.name, attribute.value))
    });
  }

  onAnimalNameUpdate(animalId, name) {
    this.setState({
      animalDefinition: update(this.state.animalDefinition, this.updateObjectForAnimalName(animalId, name))
    });
  }

  updateObjectForAnimalName(animalId, name) {
    return {
      [animalId]: {
        name: {$set: name}
      }
    }
  }

  updateObjectForAttribute(animalId, attributeType, attributeName, attributeValue) {
    return {
      [animalId]: {
        attributeMap: {
          [attributeType]: {
            [attributeName]: {$set: attributeValue}
          }
        }
      }
    }
  }

  renderAttributeGroupsForThisAnimal(animalId) {
    return <AnimalForm
      animal={ this.state.animalDefinition[animalId] }
      onFormSubmit={ this.onFormSubmit }
      onAnimalNameUpdate={ this.onAnimalNameUpdate }
      onNewAttributeAdded={ this.onNewAttributeAdded }
      onAttributeChange={ this.onAttributeChange }/>
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