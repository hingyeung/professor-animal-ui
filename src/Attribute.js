import React, { Component } from 'react';

class Attribute extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
  }

  render() {
    return (
      <div class="attribute-row">
        <div class="attribute-cell">
          {this.name}
        </div>
        <div class="attribute-cell">
          <label htmlFor={this.name + '-yes'}>YES</label>
          <input type="radio" name={this.name} value="yes" id={this.name + '-yes'}/>
        </div>
        <div class="attribute-cell">
          <label htmlFor={this.name + '-no'}>NO</label>
          <input type="radio" name={this.name} value="no" id={this.name + '-no'}/>
        </div>
      </div>
    )
  }
}

export default Attribute;