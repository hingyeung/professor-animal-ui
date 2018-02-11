import React from 'react';
import {
  Link
} from 'react-router-dom';

function AnimalList(props) {
  const animals = props.animals;

  return (
    <div className="row">
      <ul className="nav flex-column">
        {
          Object.keys(animals).map(animalId => {
            let animal = animals[animalId];
            return (
              <li className="nav-item" key={ animal.name }>
                <Link className={ 'nav-link' } to={ '/animal/' + animal.id }>{ animal.name }</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default AnimalList;