import React, {Component} from 'react';
import AttributeGroup from "./AttributeGroup";

class AnimalForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let attributeGroupContent = [];

    const currentAnimal = this.props.animal;
    Object.keys(currentAnimal.attributeMap).forEach(attributeType => {
      attributeGroupContent.push(
        <AttributeGroup key={ attributeType + currentAnimal.id }
                        attributeType={ attributeType }
                        attributes={ currentAnimal.attributeMap[attributeType] }/>
      );
    });

    return (
      <form onSubmit={ this.props.onFormSubmit }>
        <div>
          <button className="btn btn-primary">Save</button>
        </div>
        <div className="form-group row">
          <label htmlFor="animal-name" className="col-sm-2 col-form-label">Animal name</label>
          <div className="col-sm-6">
            <input id="animal-name" className="form-control" type="text" name="animalName"
                   onChange={ (e) => this.props.updateAnimalName(e.target.value) } value={ currentAnimal.name }/>
          </div>
        </div>
        { attributeGroupContent }
        <div>
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    )
  }
}

export default AnimalForm;