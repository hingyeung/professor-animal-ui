import React, {Component} from 'react';

class NewAnimalForm extends Component {
  constructor(props) {
    super(props);

    // set the attribute state here?
    // and leave some other states in AttributeList?
  }

  componentDidMount() {
    console.log('componentDidMount()');
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  render() {
    return (
      <form onSubmit={ this.props.onFormSubmit }>
        <div>
          <button className="btn btn-primary">Save</button>
        </div>
        <div className="form-group row">
          <label htmlFor="animal-name" className="col-sm-2 col-form-label">Animal name</label>
          <div className="col-sm-6">
            <input id="animal-name" className="form-control" type="text" name="animalName"
                   onChange={ (e) => this.props.updateAnimalName(e.target.value) } value={ this.props.name }/>
          </div>
        </div>
        { this.props.attributeGroupContent }
        <div>
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    )
  }
}

export default NewAnimalForm;