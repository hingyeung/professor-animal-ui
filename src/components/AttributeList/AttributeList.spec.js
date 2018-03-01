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
    const animalFile = JSON.stringify([{ id: "animalId", name: "Lion", physical: ["legs", "tail"] }]);
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/animal/animalId", key: 'testKey', state: {activeAnimalId: "animalId"}}] }>
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
});