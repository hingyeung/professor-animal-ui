import React, {Component} from 'react';
import Attribute from 'models/Attribute';

class NewAttributeValue extends Component {
  constructor(props) {
    super(props);

    this.onNewAttributeAdded = props.onNewAttributeAdded;
    this.attributeType = props.type;
    this.newAttributeIndex = props.newAttributeIndex;
    this.onAddClicked = this.onAddClicked.bind(this);
  }

  onAddClicked(e) {
    e.preventDefault();

    const attributeName = this.input.value;
    if (!attributeName) return;

    this.onNewAttributeAdded(new Attribute(attributeName, true));
  }

  render() {
    // TODO enter doesn't work when new attribute field is in focus
    // TODO adding empty new attribute crashes the app
    return (
      <tr className="attribute-row row">
        <td className="attribute-cell col-sm-6">
          <input type="text" name={ this.attributeType + '-' + this.newAttributeIndex }
                 className="form-control"
                 ref={ref => this.input = ref}
                 onChange={ (e) => this.setState({newAttributeName: e.target.value}) }/>
        </td>
        <td className="attribute-cell col-sm-6">
          <button className="btn btn-primary" onClick={ this.onAddClicked }>Add</button>
        </td>
      </tr>
    )
  }
}

export default NewAttributeValue;