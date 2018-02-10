import React, {Component} from 'react';
import AttributeGroup from "./AttributeGroup";

class NewAnimalForm extends Component {
  constructor(props) {
    super(props);

    // set the attribute state here?
    // and leave some other states in AttributeList?
    // props.attributeMapForForm
    this.state = {
      currentAnimalId: undefined,
    }
  }

  componentDidMount() {
    console.log('componentDidMount()');
    this.updateParent();
  }

  componentWillReceiveProps(newProps) {
    console.log('new: ' + newProps.attributeMapForForm.id);
    console.log('old: ' + this.props.attributeMapForForm.id);
    this.updateParent(newProps.attributeMapForForm.id);
  }

  updateParentIfNeeded(attributeMapForForm) {
    if (this.props.onRefresh) {
      this.props.onRefresh(this.props.attributeMapForForm)
    }
  }

  updateParent(newAnimalId = undefined) {
    if (newAnimalId === undefined || this.state.currentAnimalId !== newAnimalId) {
      this.setState({
        currentAnimalId: newAnimalId
      }, this.updateParentIfNeeded(this.props.attributeMapForForm));
    }
  }

  render() {
    let attributeGroupContent = [];
    Object.keys(this.props.attributeMapForForm).forEach((attrType, index) => {
      if (typeof this.props.attributeMapForForm[attrType] === 'string') return;
      attributeGroupContent.push(
        <AttributeGroup key={ index } type={ attrType }
                        attributes={
                          // TODO update the following outdated comment
                          // merge the attributeMap (attribute template loaded from file) with
                          // animalDefinition (also loaded from file) to generate a map that contains
                          // all existing attributes of the animal as well as the new attributes that
                          // only exist in the attributeMap.
                          this.props.attributeMapForForm[attrType]
                        }
                        onAttributeChange={ this.props.onAttributeChange }
                        onAddNewAttribute={ this.props.onAddNewAttribute }
        />);
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
                   onChange={ (e) => this.props.updateAnimalName(e.target.value) } value={ this.props.name }/>
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

export default NewAnimalForm;