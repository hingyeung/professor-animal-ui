import React from 'react';
import renderer from 'react-test-renderer';
import Greeting from "./Greeting";

describe('Greeting', function () {
  it('should render correctly', () => {
    const tree = renderer
    .create(<Greeting/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
