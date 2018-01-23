import React, {Component} from 'react';
import AttributeGroup from './AttributeGroup.js';

class AttributeList extends Component {
  constructor(props) {
    super(props);
    this.attributeMap = props.attributeMap;
  }

  render() {
    // const content = this.attributeMap.map((attribute, index) => {
    //   return <Attribute key={index} name={attribute.name} />
    // });
    let attributeGroupContent = [];
    Object.keys(this.attributeMap).forEach((attrType, index) => {
      attributeGroupContent.push(<AttributeGroup key={index} type={ attrType } attributes={ this.attributeMap[attrType] }/>)
    });

    return (
      <div>
        { attributeGroupContent }
      </div>
    );
  }
}

export default AttributeList