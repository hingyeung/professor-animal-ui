import './AttributeList.css';

import React, {Component} from 'react';
import AttributeGroup from './AttributeGroup';
import AnimalList from './AnimalList';
import Animal from 'models/Animal';
import NewAnimalForm from './NewAnimalForm'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class AttributeList extends Component {
  ATTRIBUTE_TYPES = ['physical', 'types', 'behaviours', 'diet', 'possible_behaviours', 'considerations'];
  constructor(props) {
    super(props);
    this.onNewAnimalSubmitted = props.onNewAnimalSubmitted;

    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateAnimalName = this.updateAnimalName.bind(this);
    this.onAddNewAttribute = this.onAddNewAttribute.bind(this);
    this.onNewAnimalSubmittedWrapper = this.onNewAnimalSubmittedWrapper.bind(this);
    this.makeAttributeGroupContentForNewAnimal = this.makeAttributeGroupContentForNewAnimal.bind(this);
    // this.makeAttributeGroupContentForExistingAnimal = this.makeAttributeGroupContentForExistingAnimal.bind(this);
    this.updateCurrentAttributeMapForForm = this.updateCurrentAttributeMapForForm.bind(this);

    this.state = {
      animalName: undefined,
      // The attribute definition loaded from file as the base template for new animal form.
      // e.g. { physical: [{_name: "fins", _value: true}]}
      attributeDefinition: props.attributeDefinition,
      // animal definition initially loaded from file. This should be updated using values in attributeMap
      // on form submit.
      // e.g. [{ name: "Lion", physical: ["legs"], ... }]
      animalDefinition: props.animalDefinition,
      // This is the state of the current form. It has the same structure as attributeMap.
      // This should be updated on attribute value change
      currentAttributeMapForForm: {}
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      animalDefinition: nextProps.animalDefinition
    });
  }

  onNewAnimalSubmittedWrapper(newAnimal) {
    this.setState({
      animalDefinition: this.state.animalDefinition.concat(newAnimal)
    }, () => this.onNewAnimalSubmitted(this.state.animalDefinition));
  }

  updateAnimalName(animalName) {
    this.setState({
      animalName: animalName
    });
  }

  areAllAttributesAreAllSet(attributeMap) {
    if (!this.state.animalName) {
      console.log('animal name has no value');
      return false;
    }

    const mapToCheck = {...attributeMap};
    for (let attrType in mapToCheck) {
      // skipping animalName
      const attributeThatHasNoValue = mapToCheck[attrType].find((attribute) => {
        return (attribute.value === undefined)
      });
      if (attributeThatHasNoValue) {
        console.log('attribute has no value:');
        console.dir(attributeThatHasNoValue);
        return false;
      }
    }
    return true;
  }

  onFormSubmit(e) {
    e.preventDefault();

    if (this.areAllAttributesAreAllSet(this.state.currentAttributeMapForForm)) {
      const animal = new Animal(this.state.animalName, this.state.currentAttributeMapForForm);
      this.onNewAnimalSubmittedWrapper(animal);
    }
  }

  onAttributeChange(attributeType, attributeName, value) {
    // TODO this doesn't work with the new currentAttributeMapForForm map-within-map structure
    // change attribute value in attributeDefinition in state
    const currentAttributeMapForForm = this.state.currentAttributeMapForForm;
    currentAttributeMapForForm[attributeType][attributeName] = (value.toLowerCase() === 'yes');
    this.setState(
      {
        currentAttributeMapForForm: currentAttributeMapForForm
      }
    )
  }

  onAddNewAttribute(attributeType, attribute) {
    // TODO this doesn't work with the new currentAttributeMapForForm map-within-map structure
    console.log(attributeType, attribute);
    const currentAttributeMap = this.state.currentAttributeMapForForm;
    currentAttributeMap[attributeType].push(attribute);
    console.log(currentAttributeMap);
    this.setState({
      currentAttributeMapForForm: currentAttributeMap
    })
  }

  render() {
    return (
      <Router>
        <div className="attribute-list-container container-fluid">
          <div className="row">
            <div className="col-sm-3 left-container">
              <Link to="/new">New</Link>
              <AnimalList animals={ this.state.animalDefinition }/>
            </div>
            <div className="col-sm-9 right-container">
              <Route exact path="/new" render={ (routeProps) => {
                // let attributeGroupContent = this.makeAttributeGroupContentForNewAnimal();
                let newAttributeMapForForm = this.convertAttributeDefinitionToAttributeMapForForm();

                return (<NewAnimalForm
                  // location={routeProps.location}
                  onFormSubmit={ this.onFormSubmit }
                  updateAnimalName={ this.updateAnimalName }
                  onAttributeChange={ this.onAttributeChange }
                  onAddNewAttribute={ this.onAddNewAttribute }
                  onRefresh = {this.updateCurrentAttributeMapForForm}
                  attributeMapForForm = {newAttributeMapForForm}
                  // attributeGroupContent={ attributeGroupContent }
                />);
              }
              }/>
              <Route path={ '/animal/:id' } render={ (routeProps) => {
                const idOfAnimalBeingEdit = routeProps.match.params.id;
                const animalBeingEdit = this.state.animalDefinition.find(animal => {
                  return animal.id === idOfAnimalBeingEdit;
                });

                // it is possible that we try to render form for an animal before
                // loading the animal definition (bookmarked url with animal uuid)
                if (!animalBeingEdit) {
                  return <div/>;
                }

                // TODO this line is resetting the content of currentAttributeMapForForm the essentially what
                // is in the animalDefinition, discarding all the unsaved changes made on the form.
                // Since <NewAnimalForm> is re-rendered after each change to attribute, the change is immediately
                // discarded, making any change impossible.
                let newAttributeMapForForm = this.mergeAttributeMapAndAnimalDefinition(animalBeingEdit);
                return (<NewAnimalForm
                  name={ animalBeingEdit.name }
                  // location={routeProps.location}
                  onFormSubmit={ this.onFormSubmit }
                  updateAnimalName={ this.updateAnimalName }
                  onAttributeChange={ this.onAttributeChange }
                  onAddNewAttribute={ this.onAddNewAttribute }
                  attributeMapForForm = { newAttributeMapForForm }
                  onRefresh = {this.updateCurrentAttributeMapForForm}
                  // attributeGroupContent={ attributeGroupContent }
                />)
              }
              }/>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  updateCurrentAttributeMapForForm(currentAttributeMapForForm) {
    this.setState({
      currentAttributeMapForForm: currentAttributeMapForForm
    }, () => console.log('AttributeList: parent updated', currentAttributeMapForForm.id, currentAttributeMapForForm.name));

  }

  // merge attributeMapTemplate and the definition of the selected animal
  // return final "attributes" in a map
  mergeAttributeMapAndAnimalDefinition(definitionOfAnimalBeingEdit) {
    // const ATTRIBUTE_TYPES = ['physical', 'types', 'behaviours', 'diet', 'possible_behaviours', 'considerations'];
    let newAttributeMap = {};
    this.ATTRIBUTE_TYPES.forEach(ATTRIBUTE_TYPE => {
      newAttributeMap[ATTRIBUTE_TYPE] =
        this.mergeAttributeMapAndAnimalDefinitionForAttributeType(
          definitionOfAnimalBeingEdit, ATTRIBUTE_TYPE);
    });
    // add name and id
    newAttributeMap.name = definitionOfAnimalBeingEdit.name;
    newAttributeMap.id = definitionOfAnimalBeingEdit.id;

    // TODO: load custom attributes
    return newAttributeMap;
  }

  // merge attributeMapTemplate and the definition of the selected attribute type of an selected animal
  // return final "attributes" in a map
  mergeAttributeMapAndAnimalDefinitionForAttributeType(definitionOfAnimalBeingEdit, attributeType) {
    const attributeMapTemplate = this.state.attributeDefinition;
    // animalDefinition = this.state.animalDefinition;

    // build a new, empty attributeMap
    let newAttributeMapForAttributeType = {};

    // loop through the attributeMapTemplate and use the value from there if
    // the same attribute doesn't also exist in the animalDefinition. Otherwise,
    // use the one from animalDefinition instead.
    // first use values from attributeMapTemplate
    attributeMapTemplate[attributeType].forEach(attribute => {
      newAttributeMapForAttributeType[attribute.name] = attribute.value;
    });

    // then overwrite with values from animalDefinition
    // TODO it would help if AnimalDefinition was a class
    // the current animal may not have all the attributeType in the attribute template
    definitionOfAnimalBeingEdit[attributeType] &&
      definitionOfAnimalBeingEdit[attributeType].forEach(attribute => {
      // "attribute" from animalDefinition is just a string
      newAttributeMapForAttributeType[attribute] = true;
    });

    return newAttributeMapForAttributeType;
  }

  convertAttributeDefinitionToAttributeMapForForm() {
    const attributeMapTemplate = this.state.attributeDefinition;
    // animalDefinition = this.state.animalDefinition;

    // build a new, empty attributeMap
    let newAttributeMap = {};

    this.ATTRIBUTE_TYPES.forEach(attributeType => {
      newAttributeMap[attributeType] = {};
      attributeMapTemplate[attributeType].forEach(attribute => {
        newAttributeMap[attributeType][attribute.name] = attribute.value;
      });
    });

    return newAttributeMap;
  }

  makeAttributeGroupContentForNewAnimal() {
    let attributeGroupContent = [];
    Object.keys(this.state.attributeDefinition).forEach((attrType, index) => {
      // skipping the animalName and id field. TODO there must be a better way to do it.
      if (typeof this.state.attributeDefinition[attrType] === 'string') return;
      attributeGroupContent.push(
        <AttributeGroup key={ index } type={ attrType }
                        attributes={ this.state.attributeDefinition[attrType] }
                        onAttributeChange={ this.onAttributeChange }
                        onAddNewAttribute={ this.onAddNewAttribute }
        />)
    });
    return attributeGroupContent;
  }
}

export default AttributeList