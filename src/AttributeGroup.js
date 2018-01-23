import React, { Component } from 'react';
import Attribute from './Attribute';

class AttributeGroup extends Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.attributes = props.attributes;
  }

  render() {
    const attributesContent = this.attributes.map((attribute, index) => {
      return <Attribute key={index} name={attribute.name}/>
    });

    return (
      <div>
        <div class="attribute-type">{this.type}</div>
        {attributesContent}
      </div>
    )
  }
}

export default AttributeGroup;