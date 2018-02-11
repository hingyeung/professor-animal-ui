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
    console.log('new: ' + newProps.attributeMapForForm.id, newProps.attributeMapForForm.name);
    console.log('old: ' + this.props.attributeMapForForm.id, this.props.attributeMapForForm.name);
    this.updateParent(newProps.attributeMapForForm);
  }

  updateParentIfNeeded(attributeMapForForm) {
    if (this.props.onRefresh) {
      console.log('updating parent', attributeMapForForm);
      this.props.onRefresh(attributeMapForForm)
    }
  }

  // This hack is to update parent with the current form content, specifically for immediately after
  // route change to show show existing animal (e.g. /animal/xyz).
  // The state of the form is controlled by parent and it needs to be updated (pre-fill the form)
  // whenever a different animal is chosen by the user. However, route change doesn't allow setState()
  // in the parent. So what I do is pass the pre-populated form object down here, then update the parent
  // with the same form object it just gave me in componentWillReceiveProps() and componentDidMount().
  updateParent(newAttributeMapForForm = undefined) {
    if (newAttributeMapForForm === undefined || this.state.currentAnimalId !== newAttributeMapForForm.id) {
      this.setState({
        currentAnimalId: newAttributeMapForForm ? newAttributeMapForForm.id : undefined
      }, this.updateParentIfNeeded(newAttributeMapForForm ? newAttributeMapForForm : this.props.attributeMapForForm));
    }
  }

  render() {
    let attributeGroupContent = [];
    Object.keys(this.props.attributeMapForForm).forEach((attrType, index) => {
      if (typeof this.props.attributeMapForForm[attrType] === 'string') return;
      attributeGroupContent.push(
        <AttributeGroup key={ index } type={ attrType }
                        attributes={
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