import React from 'react';
import renderer from 'react-test-renderer';
import Attribute from "./Attribute";
import AttributeModel from 'models/Attribute';
import {shallow} from 'enzyme';

describe('Attribute', function () {
  const ATTRIBUTE_MODEL = new AttributeModel('name', true);
  const ATTRIBUTE_TYPE = 'type';
  const MOCK_ON_ATTRIBUTE_CHANGE_CB = jest.fn();
  beforeEach(function () {
    MOCK_ON_ATTRIBUTE_CHANGE_CB.mockClear();
  });

  it('should render properly', function () {
    const tree = renderer
    .create(<Attribute attribute={ ATTRIBUTE_MODEL } type={ ATTRIBUTE_TYPE }
                       onAttributeChange={ MOCK_ON_ATTRIBUTE_CHANGE_CB }/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call onAttributeChange() in props when attribute value changes', function () {
    const wrapper = shallow(<Attribute attribute={ ATTRIBUTE_MODEL } type={ ATTRIBUTE_TYPE }
                                       onAttributeChange={ MOCK_ON_ATTRIBUTE_CHANGE_CB }/>);
    const noRadioButton = wrapper.find('input[value="no"]');
    const event = {target: {value: 'no'}};
    noRadioButton.simulate('change', event);
    expect(MOCK_ON_ATTRIBUTE_CHANGE_CB).toBeCalledWith('type', 'name', 'no');
  })
});