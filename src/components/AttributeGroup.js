import React, {Component} from 'react';
import Attribute from './Attribute';
import NewAttributeValue from './NewAttributeValue';

class AttributeGroup extends Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.attributes = props.attributes;
    this.onAttributeChange = props.onAttributeChange;
    this.onAddNewAttributeFromParent = props.onAddNewAttribute;
    this._onAddNewAttribute = this._onAddNewAttribute.bind(this);
  }

  _onAddNewAttribute(attribute) {
    this.onAddNewAttributeFromParent(this.type, attribute);
  }

  render() {
    const attributesContent = this.attributes.map((attribute, index) => {
      return <Attribute key={ index } type={ this.type } attribute={ attribute }
                        onAttributeChange={ this.onAttributeChange }/>
    });

    // make a table with header here
    return (
      <table className="table table-striped">
        <thead>
        <tr className="row">
          <th colSpan="3" className="col-sm-12">{ this.type }</th>
        </tr>
        </thead>
        <tbody>
        { attributesContent }
        <NewAttributeValue newAttributeIndex={ Object.keys(this.attributes).length }
                           onAdd={ this._onAddNewAttribute }/>
        </tbody>
      </table>
    )
  }
}

export default AttributeGroup;