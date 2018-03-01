import AttributeDefinition from "./AttributeDefinition";

describe('AttributeDefinition', function () {
  it('should have constructor behaving correctly', function () {
    const physical = {p: 1};
    const types = {t: 1};
    const behaviours = {b: 1};
    const possible_behaviours = {pb: 1};
    const diet = {d: 1};
    const considerations = {c: 1};

    const ad = new AttributeDefinition(
      physical,
      types,
      behaviours,
      possible_behaviours,
      diet,
      considerations
    );

    [
      'physical',
      'types',
      'behaviours',
      'possible_behaviours',
      'diet',
      'considerations'
    ].forEach((attr => expect(ad[attr]).toEqual(eval(attr))));
  });
});