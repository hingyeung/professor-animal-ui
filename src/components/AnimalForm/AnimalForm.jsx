import React, {Component} from 'react';
import AttributeGroup from "components/AttributeGroup";
import update from 'immutability-helper';
import PropTypes from 'prop-types';

class AnimalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animal: props.animal
    };

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onNewAttributeAdded = this.onNewAttributeAdded.bind(this);
    this.onAnimalNameUpdate = this.onAnimalNameUpdate.bind(this);
  }

  onAttributeChange(attributeType, attributeName, attributeValue) {
    this.setState({
      animal: update(this.state.animal,
        this.updateObjectForAttribute(attributeType,
          attributeName, attributeValue))
    })
  }

  onNewAttributeAdded(attributeType, attribute) {
    this.setState({
      animal: update(this.state.animal,
        this.updateObjectForAttribute(attributeType, attribute.name, attribute.value))
    });
  }

  onAnimalNameUpdate(e) {
    this.setState({
      animal: update(this.state.animal,
        this.updateObjectForAnimalName(e.target.value))
    });
  }

  _onFormSubmit(e) {
    e.preventDefault();

    const invalidFields = this.findInvalidFields(this.state.animal);

    if (invalidFields.length !== 0) {
      // TODO make the field red
      console.log('Invalid field: ', [...invalidFields]);
      return;
    }

    this.props.onFormSubmit(this.state.animal);
  }

  findInvalidFields(animal) {
    if (!!animal.name) {
      return [];
    } else {
      return ['animalName'];
    }
  }

  updateObjectForAnimalName(name) {
    return {
      name: {$set: name}
    }
  }

  updateObjectForAttribute(attributeType, attributeName, attributeValue) {
    return {
      attributeMap: {
        [attributeType]: {
          [attributeName]: {$set: attributeValue}
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animal.id !== this.state.animal.id) {
      this.setState({
        animal: nextProps.animal
      });
    }
  }

  render() {
    let attributeGroupContent = [];

    const currentAnimal = this.state.animal;
    Object.keys(currentAnimal.attributeMap).forEach(attributeType => {
      attributeGroupContent.push(
        <AttributeGroup key={ attributeType + currentAnimal.id }
                        attributeType={ attributeType }
                        attributes={ currentAnimal.attributeMap[attributeType] }
                        onAttributeChange={ this.onAttributeChange }
                        onNewAttributeAdded={ this.onNewAttributeAdded }
        />
      );
    });

    return (
      <div className="animal-form-container container">
      <form className="animal-form" onSubmit={ this._onFormSubmit }>
        <div className="form-group row">
          <label htmlFor="animal-name" className="col-sm-2 col-form-label">Animal name</label>
          <div className="col-sm-6">
            <input id="animal-name" className="form-control" type="text" name="animalName"
                   onChange={ this.onAnimalNameUpdate } value={ currentAnimal.name ? currentAnimal.name : '' }/>
          </div>
          <div className="col-sm-4">
            <button type="submit" className="save-animal-btn btn btn-primary ml-5">Save</button>
          </div>
        </div>
        { attributeGroupContent }
        <div>
          <button type="submit" className="save-animal-btn btn btn-primary">Save</button>
        </div>
      </form>
      </div>
    )
  }
}

AnimalForm.propTypes = {
  animal: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default AnimalForm;