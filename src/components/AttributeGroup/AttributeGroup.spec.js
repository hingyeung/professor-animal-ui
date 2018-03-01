import React from 'react';
import {shallow, mount} from 'enzyme';
import AttributeGroup from "./AttributeGroup";
import Attribute from "../../models/Attribute";

const mockOnAttributeChange = jest.fn();
const mockOnNewAttributeAdded = jest.fn();
const attributes = {a: true, b: false, c: true, d: false};

jest.mock('components/NewAttributeValue');

describe('AttributeGroup', function () {
  it('should render properly', function () {
    const wrapper = shallow(
      <AttributeGroup attributeType={ 'attributeType' } attributes={ attributes }
                      onAttributeChange={ mockOnAttributeChange } onNewAttributeAdded={ mockOnNewAttributeAdded }/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onAddNewAttributeFromParent in props when new attribute is added', function () {
    const wrapper = mount(
      <AttributeGroup attributeType={ 'attributeType' } attributes={ attributes }
                      onAttributeChange={ mockOnAttributeChange } onNewAttributeAdded={ mockOnNewAttributeAdded }/>
    );

    // the stub version of NewAttributeValue is a button that call its onNewAttributeAdded() when clicked
    wrapper.find('NewAttributeValue #mock-new-attribute-value').simulate('click');
    expect(mockOnNewAttributeAdded).toHaveBeenCalledWith('attributeType', new Attribute('new attribute', true));
  })
});