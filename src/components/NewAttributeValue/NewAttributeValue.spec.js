import React from 'react';
import renderer from 'react-test-renderer';
import NewAttributeValue from "./NewAttributeValue";
import {mount} from "enzyme/build/index";
import Attribute from "../../models/Attribute";
import toJson from 'enzyme-to-json';

const MOCK_ON_NEW_ATTRIBUTE_ADDED = jest.fn();
const ATTRIBUTE_TYPE = 'attribute_type';
const NEW_ATTRIBUTE_INDEX = 1;

describe('NewAttributeValue', function () {
  let wrapper;
  beforeEach(function() {
    MOCK_ON_NEW_ATTRIBUTE_ADDED.mockClear();
  });

  afterEach(function () {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('should render properly', function () {
    const tree = renderer.create(<NewAttributeValue onNewAttributeAdded={ MOCK_ON_NEW_ATTRIBUTE_ADDED }
                                                    attributeType={ ATTRIBUTE_TYPE }
                                                    newAttributeIndex={ NEW_ATTRIBUTE_INDEX }/>);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call onNewAttributeAdded in props when the input field is populated and the Add button is clicked', function () {
    // mount, not shallow, must be used when testing component reference
    wrapper = mount(<NewAttributeValue onNewAttributeAdded={ MOCK_ON_NEW_ATTRIBUTE_ADDED }
                                             attributeType={ ATTRIBUTE_TYPE }
                                             newAttributeIndex={ NEW_ATTRIBUTE_INDEX }/>);

    const newAttributeInput = wrapper.find('.new-attribute-value-input');
    // https://stackoverflow.com/a/46611142
    newAttributeInput.instance().value = "some new attribute";
    const addButton = wrapper.find('.new-attribute-add-btn');
    const clickEvent = {preventDefault: jest.fn()};
    addButton.simulate('click', clickEvent);

    expect(MOCK_ON_NEW_ATTRIBUTE_ADDED).toBeCalledWith(new Attribute('some new attribute', true));
  });

  it('should not call onNewAttributeAdded in props when the input field value is blank and Add button is clicked', function () {
    wrapper = mount(<NewAttributeValue onNewAttributeAdded={ MOCK_ON_NEW_ATTRIBUTE_ADDED }
                                             attributeType={ ATTRIBUTE_TYPE }
                                             newAttributeIndex={ NEW_ATTRIBUTE_INDEX }/>);

    const addButton = wrapper.find('.new-attribute-add-btn');
    const clickEvent = {preventDefault: jest.fn()};
    addButton.simulate('click', clickEvent);

    expect(MOCK_ON_NEW_ATTRIBUTE_ADDED).not.toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call onNewAttributeAdded in props when the input field is populated and Enter key is pressed', function () {
    wrapper = mount(<NewAttributeValue onNewAttributeAdded={ MOCK_ON_NEW_ATTRIBUTE_ADDED }
                                       attributeType={ ATTRIBUTE_TYPE }
                                       newAttributeIndex={ NEW_ATTRIBUTE_INDEX }/>);

    const newAttributeInput = wrapper.find('.new-attribute-value-input');
    newAttributeInput.instance().value = "some new attribute";
    const enterKeyEvent = {key: 'Enter', preventDefault: jest.fn()};
    newAttributeInput.simulate('keypress', enterKeyEvent);

    expect(MOCK_ON_NEW_ATTRIBUTE_ADDED).toBeCalledWith(new Attribute('some new attribute', true));
  });

  it('should not call onNewAttributeAdded in props when the input field is blank and Enter key is pressed', function() {
    wrapper = mount(<NewAttributeValue onNewAttributeAdded={ MOCK_ON_NEW_ATTRIBUTE_ADDED }
                                       attributeType={ ATTRIBUTE_TYPE }
                                       newAttributeIndex={ NEW_ATTRIBUTE_INDEX }/>);

    const newAttributeInput = wrapper.find('.new-attribute-value-input');
    const enterKeyEvent = {key: 'Enter', preventDefault: jest.fn()};
    newAttributeInput.simulate('keypress', enterKeyEvent);

    expect(MOCK_ON_NEW_ATTRIBUTE_ADDED).not.toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});