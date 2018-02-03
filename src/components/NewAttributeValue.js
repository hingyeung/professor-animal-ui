import React, {Component} from 'react';
import Attribute from '../models/Attribute';

class NewAttributeValue extends Component {
  constructor(props) {
    super(props);

    this.onAdd = props.onAdd;
    this.attributeType = props.type;
    this.newAttributeIndex = props.newAttributeIndex;
    this.onAddClicked = this.onAddClicked.bind(this);
    this.state = {
      newAttributeName: ''
    };
  }

  onAddClicked(attributeType, attributeName) {
    const attribute = new Attribute(attributeName, true);
    this.onAdd(attributeType, attribute);
  }

  render() {
    return (
      <tr className="attribute-row row">
        <td className="attribute-cell col-sm-6">
          <input type="text" name={ this.attributeType + '-' + this.newAttributeIndex }
                 value={ this.state.newAttributeName } className="form-control"
                 onChange={ (e) => this.setState({newAttributeName: e.target.value}) }/>
        </td>
        <td className="attribute-cell col-sm-6">
          <button className="btn btn-primary" onClick={() => this.onAddClicked(this.attributeType, this.state.newAttributeName) }>Add</button>
        </td>
      </tr>
    )
  }
}

export default NewAttributeValue;