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
  constructor(props) {
    super(props);
    this.onNewAnimalSubmitted = props.onNewAnimalSubmitted;

    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateAnimalName = this.updateAnimalName.bind(this);
    this.onAddNewAttribute = this.onAddNewAttribute.bind(this);
    this.onNewAnimalSubmittedWrapper = this.onNewAnimalSubmittedWrapper.bind(this);
    this.makeAttributeGroupContentForNewAnimal = this.makeAttributeGroupContentForNewAnimal.bind(this);
    this.makeAttributeGroupContentForExistingAnimal = this.makeAttributeGroupContentForExistingAnimal.bind(this);

    this.state = {
      animalName: undefined,
      // The attribute definition loaded from file as the base template for new animal form.
      // e.g. { physical: [{_name: "fins", _value: true}]}
      attributeMap: props.attributeMap,
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

    if (this.areAllAttributesAreAllSet(this.state.attributeMap)) {
      const animal = new Animal(this.state.animalName, this.state.attributeMap);
      this.onNewAnimalSubmittedWrapper(animal);
    }
  }

  onAttributeChange(attributeType, attributeName, value) {
    // change attribute value in attributeMap in state
    const currentAttributeMap = this.state.attributeMap;
    const attributeListForType = currentAttributeMap[attributeType];
    const matchedIndex = attributeListForType.findIndex(attrObj => {
      return attrObj.name === attributeName
    });
    attributeListForType[matchedIndex].value = (value.toLowerCase() === 'yes');
    this.setState(
      {
        attributeMap: currentAttributeMap
      }
    )
  }

  onAddNewAttribute(attributeType, attribute) {
    console.log(attributeType, attribute);
    const currentAttributeMap = this.state.attributeMap;
    currentAttributeMap[attributeType].push(attribute);
    console.log(currentAttributeMap);
    this.setState({
      attributeMap: currentAttributeMap
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
                let attributeGroupContent = this.makeAttributeGroupContentForNewAnimal();

                return (<NewAnimalForm
                  // location={routeProps.location}
                  onFormSubmit={ this.onFormSubmit }
                  updateAnimalName={ this.updateAnimalName }
                  attributeGroupContent={ attributeGroupContent }/>);
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

                let attributeGroupContent = this.makeAttributeGroupContentForExistingAnimal(animalBeingEdit);
                return (<NewAnimalForm
                  name={ animalBeingEdit.name }
                  // location={routeProps.location}
                  onFormSubmit={ this.onFormSubmit }
                  updateAnimalName={ this.updateAnimalName }
                  attributeGroupContent={ attributeGroupContent }/>)
              }
              }/>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  // merge attributeMapTemplate and the definition of the selected animal
  // return final "attributes" in a map
  mergeAttributeMapAndAnimalDefinition(definitionOfAnimalBeingEdit, attributeType) {
    // const ATTRIBUTE_TYPES = ['physical', 'types', 'behaviours', 'diet', 'possible_behaviours', 'considerations']
    const attributeMapTemplate = this.state.attributeMap;
    // animalDefinition = this.state.animalDefinition;

    // build a new, empty attributeMap
    let newAttributeMap = {};

    // loop through the attributeMapTemplate and use the value from there if
    // the same attribute doesn't also exist in the animalDefinition. Otherwise,
    // use the one from animalDefinition instead.
    // first use values from attributeMapTemplate
    attributeMapTemplate[attributeType].forEach(attribute => {
      newAttributeMap[attribute.name] = attribute.value;
    });

    // then overwrite with values from animalDefinition
    // TODO it would help if AnimalDefinition was a class
    // the current animal may not have all the attributeType in the attribute template
    definitionOfAnimalBeingEdit[attributeType] &&
      definitionOfAnimalBeingEdit[attributeType].forEach(attribute => {
      // "attribute" from animalDefinition is just a string
      newAttributeMap[attribute] = true;
    });

    return newAttributeMap;
  }

  makeAttributeGroupContentForExistingAnimal(animalBeingEdit) {
    let attributeGroupContent = [];

    if (!animalBeingEdit) {
      return attributeGroupContent;
    }

    Object.keys(this.state.attributeMap).forEach((attrType, index) => {
      // skipping the animalName and id field. TODO there must be a better way to do it.
      if (typeof this.state.attributeMap[attrType] === 'string') return;
      attributeGroupContent.push(
        <AttributeGroup key={ index } type={ attrType }
                        attributes={
                          // merge the attributeMap (attribute template loaded from file) with
                          // animalDefinition (also loaded from file) to generate a map that contains
                          // all existing attributes of the animal as well as the new attributes that
                          // only exist in the attributeMap.
                          this.mergeAttributeMapAndAnimalDefinition(animalBeingEdit, attrType)
                        }
                        onAttributeChange={ this.onAttributeChange }
                        onAddNewAttribute={ this.onAddNewAttribute }
        />);

    });

    // TODO: load custom attributes

    return attributeGroupContent;
  }

  makeAttributeGroupContentForNewAnimal() {
    let attributeGroupContent = [];
    Object.keys(this.state.attributeMap).forEach((attrType, index) => {
      // skipping the animalName and id field. TODO there must be a better way to do it.
      if (typeof this.state.attributeMap[attrType] === 'string') return;
      attributeGroupContent.push(
        <AttributeGroup key={ index } type={ attrType }
                        attributes={ this.state.attributeMap[attrType] }
                        onAttributeChange={ this.onAttributeChange }
                        onAddNewAttribute={ this.onAddNewAttribute }
        />)
    });
    return attributeGroupContent;
  }
}

export default AttributeList