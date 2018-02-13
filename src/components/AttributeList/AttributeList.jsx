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
    // this.onAttributeChange = this.onAttributeChange.bind(this);
    // this.onNewAttributeAdded = this.onNewAttributeAdded.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.onAnimalNameUpdate = this.onAnimalNameUpdate.bind(this);
    this.renderAttributeGroupsForNewAnimal = this.renderAttributeGroupsForNewAnimal.bind(this);
  }

  onFormSubmit(animal) {
    // TODO this should now update the state, not exporting the file
    // this.props.onSave(this.state.animalDefinition);
    this.setState({
      animalDefinition: update(this.state.animalDefinition, this.updateObjectForAnimal(animal))
    })
  }

  updateObjectForAnimal(animal) {
    return {
      [animal.id]: {
        $set: animal
      }
    }
  }

  renderAttributeGroupsForNewAnimal() {
    // TODO I don't think the current state model would work with "new" animal form.
    // The current state model updates the state in AttributeList whenever some value
    // changes. It's okay for animals that already exist, but the state wouldn't know
    // anything about the new animal yet. How do we update the state?
    // May be we need to store local state in form and only update the top container
    // AttributeList on sumbit of the form.
    // return <AnimalForm
    //   animal={undefined} // new animal
    //   onFormSubmit={this.onFormSubmit}
    // />
  }

  renderAttributeGroupsForThisAnimal(animalId) {
    return <AnimalForm
      animal={ this.state.animalDefinition[animalId] }
      onFormSubmit={ this.onFormSubmit }
      onAnimalNameUpdate={ this.onAnimalNameUpdate }
      onNewAttributeAdded={ this.onNewAttributeAdded }
      onAttributeChange={ this.onAttributeChange }/>
  }

  static guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  render() {
    return (
      <Router>
        <div>
          <div className={ 'animal-list-container left-container col-3' }>
            <AnimalList animals={ this.state.animalDefinition }/>
          </div>
          <div className={ 'animal-form-container right-container col-9' }>
            <Route exact path="/new"
                   render={ routeProps => this.renderAttributeGroupsForNewAnimal()}/>
            <Route path="/animal/:id"
                   render={ routeProps => this.renderAttributeGroupsForThisAnimal(routeProps.match.params.id) }/>
          </div>
        </div>
      </Router>
    )
  }

}

export default AttributeList