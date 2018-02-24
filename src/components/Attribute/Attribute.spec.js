import React from 'react';
import renderer from 'react-test-renderer';
import Attribute from "./Attribute";
import AttributeModel from 'models/Attribute';

describe('Attribute', function () {
  const attributeModel = new AttributeModel('name', true);
  const attributeType = 'type';
  const mockOnAttributeChange = jest.fn();
  beforeEach(function () {
    mockOnAttributeChange.mockClear();
  });

  it('should render properly', function () {
    const tree = renderer
    .create(<Attribute attribute={ attributeModel } type={ attributeType }
                       onAttributeChange={ mockOnAttributeChange }/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call onAttributeChange() in props when attribute value changes', function () {
    // const component = renderer.create(<Attribute attribute={ attributeModel } type={ attributeType }
    //                                              onAttributeChange={ mockOnAttributeChange }/>);
    // const event = {e: {target: {value: 'no'}}};
    // let attribute = new Attribute({
    //   attribute: attributeModel,
    //   type: attributeType,
    //   onAttributeChange: mockOnAttributeChange
    // });
    //
    // mockOnAttributeChange.toBeCalledWith('type', 'name', 'no');
  })
});