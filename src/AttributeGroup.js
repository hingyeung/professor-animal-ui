import React, { Component } from 'react';
import Attribute from './Attribute';

class AttributeGroup extends Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.attributes = props.attributes;
  }

  render() {
    return this.attributes.map((attribute, index) => {
      return <Attribute key={index} name={attribute.name}/>
    })
  }
}

export default AttributeGroup;