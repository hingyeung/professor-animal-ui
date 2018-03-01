import React from 'react';
import Attribute from "models/Attribute";

const NewAttributeValue = (props) => {
  const addNewAttribute = (e) => {
    props.onNewAttributeAdded(new Attribute('new attribute', true));
  };

  return <button id="mock-new-attribute-value" onClick={addNewAttribute}>Add new attribute</button>
};

export default NewAttributeValue;