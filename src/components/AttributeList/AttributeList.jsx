import './AttributeList.css';

import React, {Component} from 'react';
import {guid} from 'services/GUID';
import update from 'immutability-helper';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'components/common/Loading';

// If I did:
// let a = 'components/AttributeList/AnimalForm';
// import(a);
// I would get "Critical dependency: the request of a dependency is an expression"
// and it import can't resolve the module anyway. It looks like the path-to-module
// must not be an expression (i.e. must be hard-coded string!).
// I think this blog is trying to explain it:
// https://qiita.com/inuscript/items/ac458e5adc3a6e110a1c
const AnimalList = Loadable({
  loader: () => import('components/AttributeList/AnimalList'),
  loading: Loading,
});

const AnimalForm = Loadable({
  loader: () => import('components/AttributeList/AnimalForm'),
  loading: Loading,
});

class AttributeList extends Component {
  static HOME = "/";
  static NEW = "/new";

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
    this.renderAnimalList = this.renderAnimalList.bind(this);
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
      id: guid(),
      attributeMap: this.state.attributeDefinition
    }
  };

  renderAttributeGroupsForNewAnimal(routeProps) {
    const routeHistory = routeProps.history;
    return <AnimalForm
      animal={ this.populateAnimalForNewAnimalForm() } // new animal
      routeHistory={ routeHistory }
      onFormSubmit={ this.onFormSubmit }
    />
  }

  renderAttributeGroupsForThisAnimal(routeProps) {
    const animalId = routeProps.match.params.id;
    const routeHistory = routeProps.history;
    const animal = this.state.animalDefinition[animalId];

    if (!animal) {
      routeHistory.push(AttributeList.HOME);
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

  renderAnimalList(routeProps) {
    const activeAnimalId = routeProps.location.state && routeProps.location.state.activeAnimalId ?
      routeProps.location.state.activeAnimalId :
      undefined;
    return <AnimalList activeAnimalId={ activeAnimalId } animals={ this.state.animalDefinition }/>
  }

  render() {
    const BlankPage = () => <div className="blank-page"/>;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-sm">
            <div className="navbar-nav d-flex flex-row">
              <Link className="nav-item nav-link mx-2" to={AttributeList.NEW}>New</Link>
              <button className="nav-item btn btn-primary mx-2" onClick={ (e) => this.onExport(e) }>Export</button>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div className={ ' left-container col-3 d-flex' }>
                <Route path="/"
                       render={ routeProps => this.renderAnimalList(routeProps) }/>
              </div>
              <div className={ ' right-container col-9 d-flex' }>
                <Switch>
                  <Route exact path={ AttributeList.HOME } component={ BlankPage }/>
                  <Route exact path={AttributeList.NEW}
                         render={ routeProps => this.renderAttributeGroupsForNewAnimal(routeProps) }/>
                  <Route path="/animal/:id"
                         render={ routeProps => this.renderAttributeGroupsForThisAnimal(routeProps) }/>
                  <Route component={ BlankPage }/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default AttributeList