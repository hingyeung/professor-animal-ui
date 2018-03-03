import React from 'react';
import {shallow} from 'enzyme';
import AnimalList from "./AnimalList";
import {Link} from 'react-router-dom';

describe('AnimalList', function () {
  const animals = {id2: {name: "animal2"}, id1: {name: "animal1"}, id3: {name: "animal3"}};

  it('should render properly with sorted animal names', function () {
    const wrapper = shallow(<AnimalList animals={ animals }/>);
    expect(wrapper.find(Link)).toHaveLength(Object.keys(animals).length + 1);

    const linksToTest = [
      {link: wrapper.find(Link).at(1).prop('children'), name: "animal1"},
      {link: wrapper.find(Link).at(2).prop('children'), name: "animal2"},
      {link: wrapper.find(Link).at(3).prop('children'), name: "animal3"}
    ];

    // https://github.com/airbnb/enzyme/issues/692#issuecomment-262877586
    for (const link of linksToTest) {
      expect(shallow(<div>{ link.link }</div>).text()).toEqual(link.name);
    }

    expect(wrapper).toMatchSnapshot();
  });

  it('should highlight the active animal', function () {
    const wrapper = shallow(<AnimalList animals={ animals } activeAnimalId="id1"/>);
    expect(wrapper).toMatchSnapshot();
  })
});