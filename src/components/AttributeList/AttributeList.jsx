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
import Greeting from 'components/Greeting';
import AnimalDefinitionLoader from 'components/AnimalDefinitionLoader';
import {asyncImport} from 'services/AsyncImport';
import AnimalDefinition from "models/AnimalDefinition";
import AttributeDefinitionReaderService from 'services/AttributeDefinitionReaderService';
import PropTypes from 'prop-types';

const AnimalList = asyncImport('AnimalList');
const AnimalForm = asyncImport('AnimalForm');

class AttributeList extends Component {
  static get HOME() {
    return "/";
  }

  static get NEW() {
    return "/new";
  }

  static get LOADFILE() {
    return "/load";
  }

  static get ANIMAL_UPDATED() {
    return "/updated";
  }

  constructor(props) {
    super(props);

    this.state = {
      // The attribute definition loaded from file as the base template for new animal form.
      // e.g. { physical: [{_name: "fins", _value: true}]}
      attributeDefinition: {},
      // This is the state of the current animal definition. This should be updated when an attribute of
      // an animal is changed, a new attribute is added to an animal, or when a new animal is added.
      // e.g. {id: {name: "Lion", attributeMap: {physical: {tail: true, legs: true}}}}
      animalDefinition: {}
    };

    this.renderAttributeGroupsForThisAnimal = this.renderAttributeGroupsForThisAnimal.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderAttributeGroupsForNewAnimal = this.renderAttributeGroupsForNewAnimal.bind(this);
    this.populateAnimalForNewAnimalForm = this.populateAnimalForNewAnimalForm.bind(this);
    this.renderAnimalList = this.renderAnimalList.bind(this);
    this.onAnimalDefinitionLoaded = this.onAnimalDefinitionLoaded.bind(this);
    this.renderAnimalDefinitionLoader = this.renderAnimalDefinitionLoader.bind(this);
  }

  onFormSubmit(animal, routeHistory) {
    this.setState({
      animalDefinition: update(this.state.animalDefinition, this.updateObjectForAnimal(animal))
    }, routeHistory.push(AttributeList.ANIMAL_UPDATED));
  }

  updateObjectForAnimal(animal) {
    return {
      [animal.id]: {
        $set: animal
      }
    };
  }

  // populate animal object with attributeDefinition for new animal form
  populateAnimalForNewAnimalForm() {
    return {
      name: undefined,
      id: guid(),
      attributeMap: this.state.attributeDefinition
    };
  }

  renderAttributeGroupsForNewAnimal(routeProps) {
    const routeHistory = routeProps.history;
    return (
      <AnimalForm
      animal={ this.populateAnimalForNewAnimalForm() } // new animal
      routeHistory={ routeHistory }
      onFormSubmit={ this.onFormSubmit }
      />
    );
  }

  renderAttributeGroupsForThisAnimal(routeProps) {
    const animalId = routeProps.match.params.id;
    const routeHistory = routeProps.history;
    const animal = this.state.animalDefinition[animalId];

    if (!animal) {
      // cannot push anything to routeHistory as it will call
      // setState() eventually and it is not allowed during render().
      // routeHistory.push(AttributeList.LOADFILE);
      return <Greeting/>;
    }
    return <AnimalForm
      animal={ animal }
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

  onAnimalDefinitionLoaded(jsonStrLoadedFromFile) {
    this.setState({
      // animalDefinition: AttributeList.addUnusedAttributeToAnimals(
      //   AnimalDefinition.convertFromFileModelToAppModel(JSON.parse(jsonStrLoadedFromFile)),
      //   this.state.attributeDefinition)
      animalDefinition:
        AnimalDefinition.convertFromFileModelToAppModel(JSON.parse(jsonStrLoadedFromFile),
          this.state.attributeDefinition)
    });
  }

  renderAnimalDefinitionLoader(routeProps) {
    return <AnimalDefinitionLoader onFileLoaded={ this.onAnimalDefinitionLoaded }/>
  }

  componentDidMount() {
    let attributeDefinitionReaderService = new AttributeDefinitionReaderService();
    this.setState({
      attributeDefinition: attributeDefinitionReaderService.readFile
    })
  }

  render() {
    const BlankPage = () => <div className="blank-page"/>;
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-sm">
            <div className="navbar-nav d-flex flex-row">
              <Link className="nav-item nav-link mx-2" to={ AttributeList.LOADFILE }>Load</Link>
              <button className="nav-item btn btn-primary mx-2" onClick={ (e) => this.onExport(e) }>Export</button>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div className={ ' left-container col-3 d-flex' }>
                <Route path={ AttributeList.HOME }
                       render={ routeProps => this.renderAnimalList(routeProps) }/>
              </div>
              <div className={ ' right-container col-9 d-flex' }>
                <Switch>
                  <Route exact path={ AttributeList.HOME } component={ Greeting }/>
                  <Route exact path={ AttributeList.LOADFILE }
                         render={ routeProps => this.renderAnimalDefinitionLoader(routeProps) }/>
                  <Route exact path={ AttributeList.NEW }
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

AttributeList.propTypes = {
  onExport: PropTypes.func.isRequired
};

export default AttributeList