import React from 'react';
import Attribute from './Attribute';
import AttributeModel from 'models/Attribute';
import NewAttributeValue from './NewAttributeValue';
import PropTypes from 'prop-types';

function AttributeGroup(props) {
  const attributeType = props.attributeType;
  const attributes = props.attributes;
  const onAttributeChange = props.onAttributeChange;
  const onAddNewAttributeFromParent = props.onNewAttributeAdded;

  function _onNewAttributeAdded(attribute) {
    onAddNewAttributeFromParent(attributeType, attribute);
  }

  const attributesContent = Object.keys(attributes).sort().map((attributeName, index) => {
    return <Attribute key={ index } type={ attributeType }
                      attribute={ new AttributeModel(attributeName, attributes[attributeName]) }
                      onAttributeChange={ onAttributeChange }/>
  });

  // make a table with header here
  return (
    <table className="table table-striped">
      <thead>
      <tr className="row">
        <th colSpan="3" className="col-sm-12">{ attributeType }</th>
      </tr>
      </thead>
      <tbody>
      { attributesContent }
      <NewAttributeValue
        attributeType={ attributeType }
        newAttributeIndex={ Object.keys(attributes).length }
        onNewAttributeAdded={ _onNewAttributeAdded }/>
      </tbody>
    </table>
  )
}

AttributeGroup.propTypes = {
  attributeType: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  onAttributeChange: PropTypes.func.isRequired,
  onNewAttributeAdded: PropTypes.func.isRequired
};

export default AttributeGroup;