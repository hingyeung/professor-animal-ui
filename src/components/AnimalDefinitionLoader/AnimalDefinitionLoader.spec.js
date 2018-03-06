import React from 'react';
import AnimalDefinitionLoader from "./AnimalDefinitionLoader";
import {shallow} from 'enzyme';

describe('AnimalDefinitionLoader', function () {
  const mockOnFileLoaded = jest.fn();

  it('should render properly', function () {
    const wrapper = shallow(<AnimalDefinitionLoader onFileLoaded={mockOnFileLoaded}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onFileLoaded in props on change', function () {
    const dummyFileReader = {
      readAsText: function() {this.onload()},
      onload: function() {},
      result: 'file content'
    };
    const mockFile = {name: 'somefile', type: 'application/json'};
    const originalFileReader = window.FileReader;
    window.FileReader = jest.fn(() => dummyFileReader);

    const wrapper = shallow(<AnimalDefinitionLoader onFileLoaded={mockOnFileLoaded}/>);
    wrapper.find('input').simulate('change', {target: {files: [mockFile]}});

    expect(mockOnFileLoaded).toHaveBeenCalledTimes(1);
    expect(mockOnFileLoaded).toHaveBeenCalledWith('file content');

    // restore FileReader
    window.FileReader = originalFileReader;
  })
});