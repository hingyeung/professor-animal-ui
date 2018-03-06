import React from 'react';
import AttributeList from './AttributeList';
import {MemoryRouter} from 'react-router';
import AnimalDefinitionLoader from 'components/AnimalDefinitionLoader';
import {mount} from 'enzyme';
import Greeting from "../Greeting";
import LoadableAnimalForm from "components/Loadables/LoadableAnimalForm";
import LoadableAnimalList from "components/Loadables/LoadableAnimalList";

jest.mock('components/Loadables/LoadableAnimalList');
jest.mock('components/Loadables/LoadableAnimalForm');

describe('AttributeList', function () {
  const MOCK_ON_EXPORT = jest.fn();
  const animalModel = [{ id: "animalId", name: "Lion", physical: ["legs", "tail"] }];
  const animalFile = JSON.stringify(animalModel);

  beforeEach(function () {
    MOCK_ON_EXPORT.mockClear();
  });

  it('should render home route', function () {
    // https://github.com/ReactTraining/react-router/issues/5579#issuecomment-333401692
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/", key: 'testKey'}] }>
        <AttributeList onExport={ MOCK_ON_EXPORT }/>
      </MemoryRouter>
    );

    expect(wrapper.find(Greeting)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('should render load-page route', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/load", key: 'testKey', state: {activeAnimalId: "id"}}] }>
        <AttributeList onExport={ MOCK_ON_EXPORT }/>
      </MemoryRouter>
    );

    expect(wrapper.find(AnimalDefinitionLoader)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('should render animal route with greeting when animal definition is not loaded', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/animal/animalId", key: 'testKey', state: {activeAnimalId: "animalId"}}] }>
        <AttributeList onExport={ MOCK_ON_EXPORT }/>
      </MemoryRouter>
    );

    expect(wrapper.find(Greeting)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('should render animal route with animal form when animal definition is loaded', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/animal/animalId", key: 'testKey'}] }>
        <AttributeList onExport={ MOCK_ON_EXPORT }/>
      </MemoryRouter>
    );
    const component = wrapper.find('AttributeList');

    component.instance().onAnimalDefinitionLoaded(animalFile);
    wrapper.update();

    expect(wrapper.find(LoadableAnimalList)).toHaveLength(1);
    expect(wrapper.find(LoadableAnimalForm)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    // setTimeout(() => validateDOM(wrapper), 1000);
    wrapper.unmount();
  });

  it('should call onExport() in props with animalDefinition in current state when export button is clicked', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/animal/animalId", key: 'testKey'}] }>
        <AttributeList onExport={ MOCK_ON_EXPORT }/>
      </MemoryRouter>
    );
    const component = wrapper.find('AttributeList').instance();

    component.onAnimalDefinitionLoaded(animalFile);
    wrapper.find('button#export-btn').simulate('click');
    expect(MOCK_ON_EXPORT).toHaveBeenCalledTimes(1);
    // https://stackoverflow.com/a/47318973
    expect(MOCK_ON_EXPORT).toHaveBeenCalledWith(component.state.animalDefinition);
  });

  it('should show blank form', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{pathname: "/new", key: "testKey"}]}>
        <AttributeList onExport={MOCK_ON_EXPORT}/>
      </MemoryRouter>
    );

    expect(wrapper.find(LoadableAnimalList)).toHaveLength(1);
    expect(wrapper.find(LoadableAnimalForm)).toHaveLength(1);
  });

  it('should call onExport function in props when onExport is called', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{pathname: "/new", key: "testKey"}]}>
        <AttributeList onExport={MOCK_ON_EXPORT}/>
      </MemoryRouter>
    );

    wrapper.find(AttributeList).instance().onExport({preventDefault: jest.fn()});
    expect(MOCK_ON_EXPORT).toHaveBeenCalledTimes(1);
  });

  it('should update state with the current animal when onFormSubmit is called', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{pathname: "/new", key: "testKey"}]}>
        <AttributeList onExport={MOCK_ON_EXPORT}/>
      </MemoryRouter>
    );

    const mockRouteHistory = {push: jest.fn()};
    const attributeListInstance = wrapper.find(AttributeList).instance();
    const mockAnimal = {id: "id"};
    attributeListInstance.onFormSubmit(mockAnimal, mockRouteHistory);
    expect(attributeListInstance.state.animalDefinition).toEqual({id: mockAnimal});
  })
});