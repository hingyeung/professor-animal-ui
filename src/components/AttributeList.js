import React, {Component} from 'react';
import AttributeGroup from './AttributeGroup.js';

class AttributeList extends Component {
  constructor(props) {
    super(props);
    this.attributeMap = props.attributeMap;
    this.state = {
      attributeMap: props.attributeMap
    };
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateAnimalName = this.updateAnimalName.bind(this);
  }

  updateAnimalName(animalName) {
    const attributeMap = this.state.attributeMap;
    attributeMap.animalName = animalName;
    this.setState(
      {
        attributeMap: attributeMap
      }
    )
  }

  static areAllAttributesAreAllSet(attributeMap) {
    const mapToCheck = {...attributeMap};
    if (!mapToCheck.animalName) return false;
    for (let attrType in mapToCheck) {
      // skipping animalName
      if (typeof mapToCheck[attrType] === 'string') continue;
      const attributeThatHasNoValue = mapToCheck[attrType].find((attribute) => {
        return (!attribute.hasOwnProperty('value') || (attribute.value !== 'yes' && attribute.value !== 'no'))
      });
      if (attributeThatHasNoValue) {
        return false;
      }
    }
    return true;
  }

  onFormSubmit(e) {
    if (this.areAllAttributesAreAllSet(this.state.attributeMap)) {
      const animal = this.state.attributeMap;
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
    attributeListForType[matchedIndex].value = value;
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