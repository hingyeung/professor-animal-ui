import React, {Component} from 'react';

class Attribute extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.attribute = props.attribute;
    this.type = props.type;
    this.onAttributeChange = props.onAttributeChange;
  }

  onChange(attrType, attrName, e) {
    this.onAttributeChange(attrType, attrName, e.target.value);
  }

  render() {
    const yesId = this.type + '-' + this.attribute.name + '-yes',
          noId = this.type + '-' + this.attribute.name + '-no';

    return (
      <tr className="attribute-row row">
        <td className="attribute-cell col-sm-6">
          { this.attribute.name }
        </td>
        <td className="attribute-cell col-sm-3">
          <input className="form-check-label" type="radio" name={ this.type + '-' + this.attribute.name } value="yes"
                 id={ yesId }
                 onChange={ (e) => this.onChange(this.type, this.attribute.name, e) }
                 defaultChecked={this.attribute.value}/>
          <label className="form-check-label" htmlFor={ yesId }>YES</label>
        </td>
        <td className="attribute-cell col-sm-3">
          <input className="form-check-label" type="radio" name={ this.type + '-' + this.attribute.name } value="no"
                 id={ noId } onChange={ (e) => this.onChange(this.type, this.attribute.name, e) }
                 defaultChecked={!this.attribute.value}/>
          <label className="form-check-label" htmlFor={ noId }>NO</label>
        </td>
      </tr>
    )
  }
}

export default Attribute;