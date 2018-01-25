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
  }

  onAttributeChange(attributeType, attributeName, value) {
    console.log(attributeName + ' changed to ' + value);
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
      attributeGroupContent.push(<AttributeGroup key={ index } type={ attrType }
                                                 attributes={ this.attributeMap[attrType] }
                                                 onAttributeChange={ this.onAttributeChange }/>)
    });

    return (
      <form className="">
        { attributeGroupContent }
      </form>
    );
  }
}

export default AttributeList