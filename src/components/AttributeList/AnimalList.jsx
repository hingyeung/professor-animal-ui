import React from 'react';
import {
  Link
} from 'react-router-dom';

function AnimalList(props) {
  const animals = props.animals;

  return (
    <div className="container">
      <div className="row">
          <ul className="nav flex-column">
            { animals.map((animal) =>
              <li className="nav-item" key={ animal.name }>
                <Link className={'nav-link'} to={ '/animal/' + animal.id }>{ animal.name }</Link>
              </li>
            ) }
          </ul>
      </div>
    </div>
  )
}

export default AnimalList;