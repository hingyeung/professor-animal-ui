import React, {Component} from 'react';

class Attribute extends Component {
  constructor(props) {
    super(props);

    this.attribute = props.attribute;
    this.type = props.type;
    this.onAttributeChange = props.onAttributeChange;

    this.state = {
      attributeValue: props.attribute.value
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      attributeValue: nextProps.attribute.value
    });
  }

  onChange(attrType, attrName, e) {
    const selectedValue = e.target.value;
    console.log(e.target.value);

    this.setState({
      attributeValue: selectedValue === 'yes'
    });
    this.onAttributeChange(attrType, attrName, selectedValue);
  }

  render() {
    const attributeName = this.attribute.name,
      yesId = this.type + '-' + attributeName + '-yes',
      noId = this.type + '-' + attributeName + '-no',
      // Initially this.state.attributeValue is undefined (before animals are loaded),
      // and it makes the radio button "uncontrolled", then later when this.state.attributeValue
      // is populated with either true or false and the radio button becomes "controlled".
      // ReactJS doesn't like it and would give warning. Making sure its value is either true
      // or false prevents the problem.
      // https://github.com/facebook/react/issues/6779#issuecomment-222162404
      yesIsChecked = this.state.attributeValue ? this.state.attributeValue : false;

    return (
      <tr className="attribute-row row">
        <td className="attribute-cell col-sm-6">
          { attributeName }
        </td>
        <td className="attribute-cell col-sm-3">
          <input type="radio" value="yes"
                 id={ yesId }
                 onChange={ (e) => this.onChange(this.type, attributeName, e) }
                 checked={ yesIsChecked }
          />
          <label className="form-check-label" htmlFor={ yesId }>YES { this.state.attributeValue }</label>
        </td>
        <td className="attribute-cell col-sm-3">
          <input type="radio" value="no"
                 id={ noId } onChange={ (e) => this.onChange(this.type, attributeName, e) }
                 checked={ !yesIsChecked }
          />
          <label className="form-check-label" htmlFor={ noId }>NO</label>
        </td>
      </tr>
    )
  }
}

export default Attribute;