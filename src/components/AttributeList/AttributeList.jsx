import './AttributeList.css';

import React, {Component} from 'react';
import AnimalList from './AnimalList';
import AnimalForm from './AnimalForm';
import update from 'immutability-helper';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class AttributeList extends Component {
  static HOME = "/";

  constructor(props) {
    super(props);

    this.state = {
      // The attribute definition loaded from file as the base template for new animal form.
      // e.g. { physical: [{_name: "fins", _value: true}]}
      attributeDefinition: props.attributeDefinition,
      // This is the state of the current animal definition. This should be updated when an attribute of
      // an animal is changed, a new attribute is added to an animal, or when a new animal is added.
      // e.g. {id: {name: "Lion", attributeMap: {physical: {tail: true, legs: true}}}}
      animalDefinition: AttributeList.addUnusedAttributeToAnimals(props.animalDefinition, props.attributeDefinition)
    };

    this.renderAttributeGroupsForThisAnimal = this.renderAttributeGroupsForThisAnimal.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderAttributeGroupsForNewAnimal = this.renderAttributeGroupsForNewAnimal.bind(this);
    this.populateAnimalForNewAnimalForm = this.populateAnimalForNewAnimalForm.bind(this);
  }

  // When the animal definition is loaded from file, each animal definition only contains attributes that it has,
  // but not the attributes that it doesn't have. This is done to save storage space. However, the AnimalForm
  // that should allow user to modify all attributes, regardless whether the attributes are currently selected
  // for an animal for not.
  // This function hydrates the animal definition loaded from file to make sure all animals have all attributes
  // selectable on the form (added attributes are default to false).
  static addUnusedAttributeToAnimals(oldAnimalDefinition, attributeDefinition) {
    // let attributeDefinition = props.attributeDefinition;
    // must do deep cloning for hydratedAnimalDefinition would just be a
    // reference to oldAnimalDefinition
    let hydratedAnimalDefinition = JSON.parse(JSON.stringify(oldAnimalDefinition));

    Object.keys(attributeDefinition).forEach(attributeType => {
      Object.keys(attributeDefinition[attributeType]).forEach(attributeName => {
        Object.keys(hydratedAnimalDefinition).forEach(animalId => {
          if (!oldAnimalDefinition[animalId]['attributeMap'][attributeType][attributeName]) {
            hydratedAnimalDefinition[animalId]['attributeMap'][attributeType][attributeName] =
              // default value is false from attributeDefinition
              attributeDefinition[attributeType][attributeName];
          }
        });
      })
    });

    return hydratedAnimalDefinition;
  }

  onFormSubmit(animal, routeHistory) {
    this.setState({
      animalDefinition: update(this.state.animalDefinition, this.updateObjectForAnimal(animal))
    }, routeHistory.push("/"));
  }

  updateObjectForAnimal(animal) {
    return {
      [animal.id]: {
        $set: animal
      }
    }
  }

  // populate animal object with attributeDefinition for new animal form
  populateAnimalForNewAnimalForm() {
    return {
      name: undefined,
      id: AttributeList.guid(),
      attributeMap: this.state.attributeDefinition
    }
  };


  renderAttributeGroupsForNewAnimal(routeHistory) {
    return <AnimalForm
      animal={ this.populateAnimalForNewAnimalForm() } // new animal
      routeHistory={ routeHistory }
      onFormSubmit={ this.onFormSubmit }
    />
  }

  renderAttributeGroupsForThisAnimal(animalId, routeHistory) {
    let animal = this.state.animalDefinition[animalId];
    if (!animal) {
      routeHistory.push(AttributeList.HOME)
      return null;
    }
    return <AnimalForm
      animal={ this.state.animalDefinition[animalId] }
      routeHistory={ routeHistory }
      onFormSubmit={ this.onFormSubmit }/>
  }

  onExport(e) {
    e.preventDefault();
    this.props.onExport(this.state.animalDefinition);
  }

  // TODO move this out of the component
  static guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  render() {
    const BlankPage = () => <div className="blank-page"/>;

    // TODO fix broken page with unknown ID. e.g. http://localhost:3000/animal/<unknown ID>
    return (
      <Router>
        <div>
          <div className={ 'animal-list-container left-container col-3' }>
            <AnimalList animals={ this.state.animalDefinition }/>
          </div>
          <div className={ 'animal-form-container right-container col-9' }>
            <a className="btn btn-primary" href="/new">New</a>
            <button className="btn btn-primary" onClick={ (e) => this.onExport(e) }>Export</button>
            <Switch>
              <Route exact path={ AttributeList.HOME } component={ BlankPage }/>
              <Route exact path="/new"
                     render={ routeProps => this.renderAttributeGroupsForNewAnimal(routeProps.history) }/>
              <Route path="/animal/:id"
                     render={ routeProps => this.renderAttributeGroupsForThisAnimal(routeProps.match.params.id, routeProps.history) }/>
              <Route component={ BlankPage }/>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

}

export default AttributeList