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
      <div className="attribute-row">
        <div className="attribute-cell">
          {this.name}
        </div>
        <div className="attribute-cell">
          <label htmlFor={this.name + '-yes'}>YES</label>
          <input type="radio" name={this.name} value="yes" id={this.name + '-yes'} onChange={(e) => this.onChange(this.type, this.name, e)}/>
        </div>
        <div className="attribute-cell">
          <label htmlFor={this.name + '-no'}>NO</label>
          <input type="radio" name={this.name} value="no" id={this.name + '-no'} onChange={(e) => this.onChange(this.type, this.name, e)}/>
        </div>
      </div>
    )
  }
}

export default Attribute;