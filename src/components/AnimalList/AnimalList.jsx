import React from 'react';

function AnimalList(props) {
  const animals = props.animals;

  return (
    <ol>
      {animals.map((animal) => <li key={animal.name}>{animal.name}</li>)}
    </ol>
  )
}

export default AnimalList;