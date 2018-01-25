import React, {Component} from 'react';
import Attribute from './Attribute';

class AttributeGroup extends Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.attributes = props.attributes;
    this.onAttributeChange = props.onAttributeChange;
  }

  render() {
    const attributesContent = this.attributes.map((attribute, index) => {
      return <Attribute key={ index } type={ this.type } name={ attribute.name }
                        onAttributeChange={ this.onAttributeChange }/>
    });

    // make a table with header here
    return (
      <div>
        <div>
          <div>
          { this.type }
          </div>
        </div>
        { attributesContent }
      </div>
    )
  }
}

export default AttributeGroup;