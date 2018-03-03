import React from 'react';
import {shallow, mount} from 'enzyme';
import AnimalForm from "./AnimalForm";
import Attribute from 'models/Attribute';

describe('AnimalForm', function () {
  const animalId = "animalId";
  const animal = {
    id: animalId,
    name: "animal1",
    attributeMap: {
      physical: {"attributeA": true},
      diet: {"attributeB": true}
    }
  };
  const mockOnFormSubmit = jest.fn();

  beforeEach(function () {
    mockOnFormSubmit.mockClear();
  });

  it('should render properly', function () {
    const wrapper = shallow(<AnimalForm animal={ animal } onFormSubmit={ mockOnFormSubmit }/>);
    expect(wrapper).toMatchSnapshot();
  });

  it(`should not call onFormSubmit when animal name is not filled and the Save button is clicked`, function () {
    const wrapper = shallow(<AnimalForm animal={ animal } onFormSubmit={ mockOnFormSubmit }/>);
    // The code under test relies on onChange event, simply filling in the text field using Enzyme doesn't
    // trigger the event.
    // https://github.com/airbnb/enzyme/issues/76#issuecomment-189606849
    wrapper.find('input#animal-name').simulate('change', {target: {value: ''}});
    wrapper.find('form').simulate('submit', {preventDefault: jest.fn()});

    expect(mockOnFormSubmit).toHaveBeenCalledTimes(0);
  });

  it('should call onFormSubmit when animal name is filled and the form is submitted', function () {
    const wrapper = shallow(<AnimalForm animal={ animal } onFormSubmit={ mockOnFormSubmit }/>);

    wrapper.find('input#animal-name').simulate('change', {target: {value: 'animal name'}});
    wrapper.find('form').simulate('submit', {preventDefault: jest.fn()});

    expect(mockOnFormSubmit).toHaveBeenCalledTimes(1);
    let expectedAnimal = Object.assign({}, animal);
    expectedAnimal.name = 'animal name';
    expect(mockOnFormSubmit).toHaveBeenCalledWith(expectedAnimal);
  });

  it('should update animal in state on attribute value change', function () {
    const wrapper = mount(<AnimalForm animal={ animal } onFormSubmit={ mockOnFormSubmit }/>);

    wrapper.instance().onAttributeChange('physical', 'attributeA', false);
    expect(wrapper.state().animal.attributeMap.physical.attributeA).toBe(false);
  });

  it('should update animal in state on new attribute added', function () {
    const wrapper = mount(<AnimalForm animal={ animal } onFormSubmit={ mockOnFormSubmit }/>);
    wrapper.instance().onNewAttributeAdded('physical', new Attribute('attributeC', true));
    expect(wrapper.state().animal.attributeMap.physical.attributeC).toBe(true);
  });

  it('should set animal in state when new animal received from props and the new animal has a different ID', function () {
    const wrapper = shallow(<AnimalForm animal={ animal } onFormSubmit={ mockOnFormSubmit }/>);
    const newAnimal = {name: 'new animal', id: 'new id', attributeMap: {}};
    wrapper.setProps({animal: newAnimal});
    expect(wrapper.instance().state.animal).toEqual(newAnimal);
  });

  it('should not set animal in state when new animal received from props and the new animal has the same ID', function () {
    const wrapper = shallow(<AnimalForm animal={ animal } onFormSubmit={ mockOnFormSubmit }/>);
    const newAnimal = {name: 'new animal', id: animalId, attributeMap: {}};
    wrapper.setProps({animal: newAnimal});
    expect(wrapper.instance().state.animal).toEqual(animal);
  });
});