import React from 'react';
import AttributeGroup from "./AttributeGroup";

function AnimalForm(props) {
  const onAttributeChange = props.onAttributeChange,
    onFormSubmit = props.onFormSubmit,
    updateAnimalName = props.updateAnimalName,
    animal = props.animal;

  let attributeGroupContent = [];

  const currentAnimal = animal;
  Object.keys(currentAnimal.attributeMap).forEach(attributeType => {
    attributeGroupContent.push(
      <AttributeGroup key={ attributeType + currentAnimal.id }
                      animalId={ currentAnimal.id }
                      onAttributeChange={ onAttributeChange }
                      attributeType={ attributeType }
                      attributes={ currentAnimal.attributeMap[attributeType] }/>
    );
  });

  return (
    <form onSubmit={ onFormSubmit }>
      <div>
        <button className="btn btn-primary">Save</button>
      </div>
      <div className="form-group row">
        <label htmlFor="animal-name" className="col-sm-2 col-form-label">Animal name</label>
        <div className="col-sm-6">
          <input id="animal-name" className="form-control" type="text" name="animalName"
                 onChange={ (e) => updateAnimalName(e.target.value) } value={ currentAnimal.name }/>
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