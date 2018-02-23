import React from 'react';
import {
  Link
} from 'react-router-dom';
import AttributeList from 'components/AttributeList';
import PropTypes from 'prop-types';

function AnimalList(props) {
  let compareAnimalName = (a, b) => {
    let lowerCasedNameA = a.name.toLowerCase(),
      lowerCasedNameB = b.name.toLowerCase();

    if (lowerCasedNameA < lowerCasedNameB) {
      return -1;
    } else if (lowerCasedNameB < lowerCasedNameA) {
      return 1;
    } else {
      return 0;
    }
  };

  const animals = props.animals;
  const activeAnimalId = props.activeAnimalId;

  let animalListSortedByName = [];
  Object.keys(animals).forEach(animalId => {
    animalListSortedByName.push(animals[animalId]);
  });
  animalListSortedByName.sort(compareAnimalName);

  function isActive(animalId) {
    return animalId === activeAnimalId;
  }

  return (
    <div className="col-12 animal-list-container">
      <ul className="nav nav-pills flex-column">
        <li>
          <Link className="nav-link" to={AttributeList.NEW}>+ Add a new animal</Link>
        </li>
        {
          animalListSortedByName.map(animal => {
            return (
              <li className="nav-item" key={ animal.name }>
                <Link className={ ['nav-link', (isActive(animal.id) ? 'active' : '')].join(' ') }
                      to={ {pathname: '/animal/' + animal.id, state: {activeAnimalId: animal.id}} }>
                  { animal.name }
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

AttributeList.propTypes = {
  animal: PropTypes.object.isRequired,
  activeAnimalId: PropTypes.string.isRequired
};

export default AnimalList;