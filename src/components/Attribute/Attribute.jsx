import React from 'react';
import PropTypes from 'prop-types';

function Attribute(props) {
  const attribute = props.attribute;
  const type = props.type;
  const onAttributeChange = props.onAttributeChange;
  const yesId = props.type + '-' + props.attribute.name + '-yes',
    noId = props.type + '-' + props.attribute.name + '-no',
    // Initially this.state.attributeValue is undefined (before animals are loaded),
    // and it makes the radio button "uncontrolled", then later when this.state.attributeValue
    // is populated with either true or false and the radio button becomes "controlled".
    // ReactJS doesn't like it and would give warning. Making sure its value is either true
    // or false prevents the problem.
    // https://github.com/facebook/react/issues/6779#issuecomment-222162404
    yesIsChecked = props.attribute.value ? props.attribute.value : false;

  function onChange(e) {
    let value = e.target.value.toLowerCase() === 'yes';
    onAttributeChange(type, attribute.name, value);
  }

  return (
    <tr className="attribute-row row">
      <td className="attribute-cell attribute-name col-sm-6">
        { attribute.name }
      </td>
      <td className="attribute-cell col-sm-3">
        <input className="form-check-label attribute-value-yes" type="radio" name={ type + '-' + attribute.name } value="yes"
               id={ yesId }
               onChange={ onChange }
               checked={ yesIsChecked }/>
        <label className="form-check-label" htmlFor={ yesId }>YES</label>
      </td>
      <td className="attribute-cell col-sm-3">
        <input className="form-check-label attribute-value-no" type="radio" name={ type + '-' + attribute.name } value="no"
               id={ noId } onChange={ onChange }
               checked={ !yesIsChecked }/>
        <label className="form-check-label" htmlFor={ noId }>NO</label>
      </td>
    </tr>
  )
}

Attribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onAttributeChange: PropTypes.func.isRequired
};

export default Attribute;