import React from 'react';
import Attribute from './Attribute';
import AttributeModel from 'models/Attribute';
import NewAttributeValue from './NewAttributeValue';

function AttributeGroup(props) {
  const attributeType = props.attributeType;
  const attributes = props.attributes;
  const onAttributeChange = props.onAttributeChange;
  const onAddNewAttributeFromParent = props.onAddNewAttribute;

  function _onAddNewAttribute(attribute) {
    onAddNewAttributeFromParent(attributeType, attribute);
  }

  const attributesContent = Object.keys(attributes).map((attributeName, index) => {
    return <Attribute key={ index } type={ attributeType }
                      attribute={ new AttributeModel(attributeName, attributes[attributeName]) }
                      animalId={ props.animalId }
                      onAttributeChange={ props.onAttributeChange }/>
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
      <NewAttributeValue newAttributeIndex={ Object.keys(attributes).length }
                         onAdd={ _onAddNewAttribute }/>
      </tbody>
    </table>
  )
}

export default AttributeGroup;