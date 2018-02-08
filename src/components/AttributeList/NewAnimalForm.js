import React from 'react';

function NewAnimalForm(props) {
  return (
    <form className="" onSubmit={ props.onFormSubmit }>
      <div>
        <button className="btn btn-primary">Save</button>
      </div>
      <div className="form-group row">
        <label htmlFor="animal-name" className="col-sm-2 col-form-label">Animal name</label>
        <div className="col-sm-6">
          <input id="animal-name" className="form-control" type="text" name="animalName"
                 onChange={ (e) => props.updateAnimalName(e.target.value) } value={props.name}/>
        </div>
      </div>
      { props.attributeGroupContent }
      <div>
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  )
}

export default NewAnimalForm;