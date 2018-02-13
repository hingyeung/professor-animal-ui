import React from 'react';
import AttributeGroup from "./AttributeGroup";

function AnimalForm(props) {
  const onAttributeChange = props.onAttributeChange,
    onFormSubmit = props.onFormSubmit,
    onAnimalNameUpdate = props.onAnimalNameUpdate,
    animal = props.animal,
    onNewAttributeAdded = props.onNewAttributeAdded;

  let attributeGroupContent = [];

  const currentAnimal = animal;
  Object.keys(currentAnimal.attributeMap).forEach(attributeType => {
    attributeGroupContent.push(
      <AttributeGroup key={ attributeType + currentAnimal.id }
                      animalId={ currentAnimal.id }
                      attributeType={ attributeType }
                      attributes={ currentAnimal.attributeMap[attributeType] }
                      onAttributeChange={ onAttributeChange }
                      onNewAttributeAdded={ onNewAttributeAdded }
      />
    );
  });

  function _onFormSubmit(e) {
    e.preventDefault();

    onFormSubmit(animal.id);
  }

  function _onAnimalNameUpdate(e) {
    onAnimalNameUpdate(animal.id, e.target.value)
  }

  return (
    <form onSubmit={ _onFormSubmit }>
      <div>
        <button className="btn btn-primary">Save</button>
      </div>
      <div className="form-group row">
        <label htmlFor="animal-name" className="col-sm-2 col-form-label">Animal name</label>
        <div className="col-sm-6">
          <input id="animal-name" className="form-control" type="text" name="animalName"
                 onChange={ _onAnimalNameUpdate } value={ currentAnimal.name }/>
        </div>
      </div>
      { attributeGroupContent }
      <div>
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  )
}

export default AnimalForm;