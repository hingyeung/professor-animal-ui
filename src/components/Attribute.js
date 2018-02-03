import React from 'react';

function Attribute(props) {
  const attribute = props.attribute;
  const type = props.type;
  const onAttributeChange = props.onAttributeChange;
  const yesId = type + '-' + attribute.name + '-yes',
    noId = type + '-' + attribute.name + '-no';

  function onChange(attrType, attrName, e) {
    onAttributeChange(attrType, attrName, e.target.value);
  }

  return (
    <tr className="attribute-row row">
      <td className="attribute-cell col-sm-6">
        { attribute.name }
      </td>
      <td className="attribute-cell col-sm-3">
        <input className="form-check-label" type="radio" name={ type + '-' + attribute.name } value="yes"
               id={ yesId }
               onChange={ (e) => onChange(type, attribute.name, e) }
               defaultChecked={ attribute.value }/>
        <label className="form-check-label" htmlFor={ yesId }>YES</label>
      </td>
      <td className="attribute-cell col-sm-3">
        <input className="form-check-label" type="radio" name={ type + '-' + attribute.name } value="no"
               id={ noId } onChange={ (e) => onChange(type, attribute.name, e) }
               defaultChecked={ !attribute.value }/>
        <label className="form-check-label" htmlFor={ noId }>NO</label>
      </td>
    </tr>
  )
}

export default Attribute;