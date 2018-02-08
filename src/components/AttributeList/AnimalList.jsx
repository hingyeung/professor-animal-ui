import React from 'react';

function AnimalList(props) {
  const animals = props.animals;

  return (
    <div className="container">
      <div className="row">
          <ul className="nav flex-column">
            { animals.map((animal) =>
              <li className="nav-item" key={ animal.name }>
                <a className={'nav-link'} href={ '/animal/' + animal.id }>{ animal.name }</a>
              </li>
            ) }
          </ul>
      </div>
    </div>
  )
}

export default AnimalList;