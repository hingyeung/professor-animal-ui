import React, {Component} from 'react';
import AttributeGroup from './AttributeGroup.js';
import Animal from '../models/Animal';

class AttributeList extends Component {
  constructor(props) {
    super(props);
    this.attributeMap = props.attributeMap;
    this.state = {
      animalName: undefined,
      attributeMap: props.attributeMap
    };
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateAnimalName = this.updateAnimalName.bind(this);
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
    if (this.areAllAttributesAreAllSet(this.state.attributeMap)) {
      const animal = new Animal(this.state.animalName, this.state.attributeMap);
      console.dir(animal);
    }

    e.preventDefault();
  }

  onAttributeChange(attributeType, attributeName, value) {
    // console.log(attributeName + ' changed to ' + value);
    // change attribute value in attributeMap in state
    const currentAttributeMap = this.state.attributeMap;
    const attributeListForType = currentAttributeMap[attributeType];
    const matchedIndex = attributeListForType.findIndex(attrObj => {return attrObj.name === attributeName});
    attributeListForType[matchedIndex].value = (value.toLowerCase() === 'yes');
    this.setState(
      {
        attributeMap: currentAttributeMap
      }
    )
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
                                                 onAttributeChange={ this.onAttributeChange }/>)
    });

    return (
      <div className="attribute-list-container container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <form className=""  onSubmit={this.onFormSubmit}>
              <div><button className="btn btn-primary">Save</button></div>
              <div className="form-group row">
                <label htmlFor="animal-name" className="col-sm-2 col-form-label">Animal name</label>
                <div className="col-sm-6">
                  <input id="animal-name" className="form-control" type="text" name="animalName" onChange={(e) => this.updateAnimalName(e.target.value)}/>
                </div>
              </div>
              { attributeGroupContent }
              <div><button className="btn btn-primary">Save</button></div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributeList