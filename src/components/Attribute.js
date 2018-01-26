import React, { Component } from 'react';

class Attribute extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.name = props.name;
    this.type = props.type;
    this.onAttributeChange = props.onAttributeChange;
  }

  onChange(attrType, attrName, e) {
    this.onAttributeChange(attrType, attrName, e.target.value);
  }

  render() {
    // console.log(this.props.name);
    return (
      <tr className="attribute-row row">
        <td className="attribute-cell col-sm-6">
          {this.name}
        </td>
        <td className="attribute-cell col-sm-3">
          <input className="form-check-label" type="radio" name={this.name} value="yes" id={this.name + '-yes'} onChange={(e) => this.onChange(this.type, this.name, e)}/>
          <label className="form-check-label" htmlFor={this.name + '-yes'}>YES</label>
        </td>
        <td className="attribute-cell col-sm-3">
          <input className="form-check-label" type="radio" name={this.name} value="no" id={this.name + '-no'} onChange={(e) => this.onChange(this.type, this.name, e)}/>
          <label className="form-check-label" htmlFor={this.name + '-no'}>NO</label>
        </td>
      </tr>
    )
  }
}

export default Attribute;