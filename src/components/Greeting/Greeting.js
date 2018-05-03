import React from 'react';
import AttributeList from "../AttributeList/AttributeList";
import {Link} from 'react-router-dom';

const Greeting = function (props) {
  return (
    <div className='greeting-container'>
      <div className="alert alert-light" role="alert">
        <Link to={ AttributeList.LOADFILE }>Load</Link> an existing animal
        definition.
      </div>
    </div>
  )
};

export default Greeting;