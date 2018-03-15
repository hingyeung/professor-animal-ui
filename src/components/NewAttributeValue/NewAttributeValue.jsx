import React from 'react';
import Attribute from 'models/Attribute';
import PropTypes from 'prop-types';

function NewAttributeValue(props) {

  const onNewAttributeAdded = props.onNewAttributeAdded;
  const attributeType = props.attributeType;
  const newAttributeIndex = props.newAttributeIndex;
  const INVALID_VALUE_CSS_CLASS = 'is-invalid';
  let input;

  function _addNewAttribute(attributeName) {
    if (!attributeName) {
      input.classList.add(INVALID_VALUE_CSS_CLASS);
      return;
    }

    onNewAttributeAdded(new Attribute(attributeName, true));
    input.classList.remove(INVALID_VALUE_CSS_CLASS);
    input.value = '';
  }

  function _onAddClicked(e) {
    e.preventDefault();
    _addNewAttribute(input.value);
  }

  function _handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      _addNewAttribute(input.value);
    }
  }

  return (
    <tr className={"attribute-row row attribute-group attribute-group-" + attributeType}>
      <td className="attribute-cell col-sm-6">
        <input type="text" name={ attributeType + '-' + newAttributeIndex }
               className="form-control new-attribute-value-input"
               ref={ ref => input = ref }
               onKeyPress={ _handleKeyPress }
        />
        <div className="invalid-feedback">
          Please provide an <span className="all-caps">{attributeType}</span> attribute.
        </div>
      </td>
      <td className="attribute-cell col-sm-6">
        <button className="btn btn-primary new-attribute-add-btn" onClick={ _onAddClicked }>Add</button>
      </td>
    </tr>
  )
}

NewAttributeValue.propTypes = {
  onNewAttributeAdded: PropTypes.func.isRequired,
  attributeType: PropTypes.string.isRequired,
  newAttributeIndex: PropTypes.number.isRequired
};

export default NewAttributeValue;