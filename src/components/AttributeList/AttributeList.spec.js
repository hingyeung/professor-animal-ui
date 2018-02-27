import React from 'react';
import renderer from 'react-test-renderer';
import AttributeList from './AttributeList';
import {MemoryRouter} from 'react-router';
import AnimalDefinitionLoader from 'components/AnimalDefinitionLoader';
import {mount} from 'enzyme';
import Greeting from "../Greeting";

describe('AttributeList', function () {
  const MOCK_ON_EXPORT = jest.fn();
  beforeEach(function () {
    MOCK_ON_EXPORT.mockClear();
  });

  it('should render home route', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/"}] }>
        <AttributeList onExport={ MOCK_ON_EXPORT }/>
      </MemoryRouter>
    );

    // TODO save snapshot
    expect(wrapper.find(Greeting)).toHaveLength(1);
    wrapper.unmount();
  });

  it('should render load-page route', function () {
    let context = {};
    const wrapper = mount(
      <MemoryRouter initialEntries={ [{pathname: "/load", state: {activeAnimalId: "id"}}] }>
        <AttributeList onExport={ MOCK_ON_EXPORT }/>
      </MemoryRouter>
    );

    // TODO save snapshot
    expect(wrapper.find(AnimalDefinitionLoader)).toHaveLength(1);
    wrapper.unmount();
  });

  // TODO implement this
  // it('should render animal route with greeting when animal is not loaded', function () {
  //   fail();
  // });
});