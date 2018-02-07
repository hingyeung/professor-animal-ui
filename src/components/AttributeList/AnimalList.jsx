import React from 'react';

function AnimalList(props) {
  const animals = props.animals;

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <ul className="nav">
            { animals.map((animal) => <li className="nav-item" key={ animal.name }>{ animal.name }</li>) }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AnimalList;