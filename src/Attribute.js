import React, { Component } from 'react';

class Attribute extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
  }

  render() {
    return (
      <div>
        <div>
          {this.name}
        </div>
        <div>
          <label htmlFor={this.name + '-yes'}>YES</label>
          <input type="radio" name={this.name} value="yes" id={this.name + '-yes'}/>
        </div>
        <div>
          <label htmlFor={this.name + '-no'}>NO</label>
          <input type="radio" name={this.name} value="no" id={this.name + '-no'}/>
        </div>
      </div>
    )
  }
}

export default Attribute;