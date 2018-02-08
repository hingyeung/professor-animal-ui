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
    // this.animalDefinition = props.animalDefinition;

    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateAnimalName = this.updateAnimalName.bind(this);
    this.onAddNewAttribute = this.onAddNewAttribute.bind(this);
    this.onNewAnimalSubmittedWrapper = this.onNewAnimalSubmittedWrapper.bind(this);
    this.makeAttributeGroupContentForNewAnimal = this.makeAttributeGroupContentForNewAnimal.bind(this);
    this.makeAttributeGroupContentForExistingAnimal = this.makeAttributeGroupContentForExistingAnimal.bind(this);

    this.state = {
      animalName: undefined,
      attributeMap: props.attributeMap,
      animalDefinition: props.animalDefinition
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
    if (!this.state.animalName) return false;
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
                let attributeGroupContent = this.makeAttributeGroupContentForNewAnimal(routeProps);

                return (<NewAnimalForm
                  location={routeProps.location}
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

                let attributeGroupContent = this.makeAttributeGroupContentForExistingAnimal(routeProps, animalBeingEdit);
                console.log(routeProps.location);
                return (<NewAnimalForm
                  name={animalBeingEdit.name}
                  location={routeProps.location}
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

  makeAttributeGroupContentForExistingAnimal(routeProps, animalBeingEdit) {
    let attributeGroupContent = [];

    if (!animalBeingEdit) {
      return attributeGroupContent;
    }

    Object.keys(this.state.attributeMap).forEach((attrType, index) => {
      // skipping the animalName and id field. TODO there must be a better way to do it.
      if (typeof this.state.attributeMap[attrType] === 'string') return;
      attributeGroupContent.push(<AttributeGroup key={ index } type={ attrType }
                                                 attributes={
                                                   // loop through the attributeMap (all default fields)
                                                   // and set their values according to the current animal
                                                   // definition
                                                   this.state.attributeMap[attrType].map(attribute => {
                                                     // "!!" (NOT-NOT and it isn't an operator) cast
                                                     // value to boolean.
                                                     attribute.value = !!(animalBeingEdit[attrType] &&
                                                       animalBeingEdit[attrType].includes(attribute.name));
                                                     return attribute;
                                                   })
                                                 }
                                                 onAttributeChange={ this.onAttributeChange }
                                                 onAddNewAttribute={ this.onAddNewAttribute }
                                                 location={routeProps.location}/>)
    });

    // TODO: set new attributes (attributes that are created after the animal was defined)
    // TODO: load custom attributes

    return attributeGroupContent;
  }

  makeAttributeGroupContentForNewAnimal(routeProps) {
    let attributeGroupContent = [];
    Object.keys(this.state.attributeMap).forEach((attrType, index) => {
      // skipping the animalName and id field. TODO there must be a better way to do it.
      if (typeof this.state.attributeMap[attrType] === 'string') return;
      attributeGroupContent.push(<AttributeGroup key={ index } type={ attrType }
                                                 attributes={ this.state.attributeMap[attrType] }
                                                 onAttributeChange={ this.onAttributeChange }
                                                 onAddNewAttribute={ this.onAddNewAttribute }
                                                 location={routeProps.location}/>)
    });
    return attributeGroupContent;
  }
}

export default AttributeList