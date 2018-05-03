import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'
import Greeting from "./Greeting";

describe('Greeting', function () {
  it('should render correctly', () => {
    // https://stackoverflow.com/a/43775325
    const tree = renderer
      .create(<StaticRouter location="someLocation" context={{}}><Greeting/></StaticRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
