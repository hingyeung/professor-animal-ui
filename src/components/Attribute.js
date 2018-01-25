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
      <div className="container">
        <div className="attribute-row row">
          <div className="attribute-cell col-sm">
            {this.name}
          </div>
          <div className="attribute-cell form-group form-check form-check-inline col-sm">
            <input className="form-check-label" type="radio" name={this.name} value="yes" id={this.name + '-yes'} onChange={(e) => this.onChange(this.type, this.name, e)}/>
            <label className="form-check-label" htmlFor={this.name + '-yes'}>YES</label>
          </div>
          <div className="attribute-cell form-group form-check form-check-inline col-sm">
            <input className="form-check-label" type="radio" name={this.name} value="no" id={this.name + '-no'} onChange={(e) => this.onChange(this.type, this.name, e)}/>
            <label className="form-check-label" htmlFor={this.name + '-no'}>NO</label>
          </div>
        </div>
      </div>
    )
  }
}

export default Attribute;