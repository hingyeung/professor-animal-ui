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
    this.attributeMap = props.attributeMap;
    this.onNewAnimalSubmitted = props.onNewAnimalSubmitted;

    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateAnimalName = this.updateAnimalName.bind(this);
    this.onAddNewAttribute = this.onAddNewAttribute.bind(this);
    this.onNewAnimalSubmittedWrapper = this.onNewAnimalSubmittedWrapper.bind(this);

    // TODO read the animal definition file animals.json location from user:
    this.state = {
      animalName: undefined,
      attributeMap: props.attributeMap,
      // TODO and I think the animal definition should be passed into this component
      animalDefinition: require('data/animals.json')
    };
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
    // console.log(attributeName + ' changed to ' + value);
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
    // const content = this.attributeMap.map((attribute, index) => {
    //   return <Attribute key={index} name={attribute.name} />
    // });
    let attributeGroupContent = [];
    Object.keys(this.attributeMap).forEach((attrType, index) => {
      // skipping the animalName field
      if (typeof this.attributeMap[attrType] === 'string') return;
      attributeGroupContent.push(<AttributeGroup key={ index } type={ attrType }
                                                 attributes={ this.attributeMap[attrType] }
                                                 onAttributeChange={ this.onAttributeChange }
                                                 onAddNewAttribute={ this.onAddNewAttribute }/>)
    });

    return (
      <Router>
        <div className="attribute-list-container container-fluid">
          <div className="row">
            <div className="col-sm-3 left-container">
                <Link to="/new">New</Link>
              <AnimalList animals={ this.state.animalDefinition }/>
            </div>
            <div className="col-sm-9 right-container">
              <Route exact path="/new" render={() =>
                <NewAnimalForm
                  onFormSubmit={this.onFormSubmit}
                  updateAnimalName={this.updateAnimalName}
                  attributeGroupContent={attributeGroupContent}/>
              }/>
            </div>
          </div>
        </div>
      </Router>
  );
  }
}

export default AttributeList