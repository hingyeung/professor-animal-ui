import React from 'react';
import Attribute from 'models/Attribute';
import PropTypes from 'prop-types';

function NewAttributeValue(props) {

  const onNewAttributeAdded = props.onNewAttributeAdded;
  const attributeType = props.attributeType;
  const newAttributeIndex = props.newAttributeIndex;
  let input;

  function _addNewAttribute(attributeName) {
    if (!attributeName) {
      // TODO make the field red
      console.log('Empty attribute name');
      return;
    }

    onNewAttributeAdded(new Attribute(attributeName, true));
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
    <tr className="attribute-row row">
      <td className="attribute-cell col-sm-6">
        <input type="text" name={ attributeType + '-' + newAttributeIndex }
               className="form-control"
               ref={ ref => input = ref }
               onKeyPress={ _handleKeyPress }
          // onChange={ (e) => this.setState({newAttributeName: e.target.value}) }
        />
      </td>
      <td className="attribute-cell col-sm-6">
        <button className="btn btn-primary" onClick={ _onAddClicked }>Add</button>
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