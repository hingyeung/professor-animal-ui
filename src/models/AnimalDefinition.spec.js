import AnimalDefinition from './AnimalDefinition';

describe('AnimalDefinition', function () {
  const APP_MODEL = {
    uuid1: {
      id: "uuid1",
      name: "Lion",
      attributeMap: {
        physical: {
          legs: true,
          tail: true,
          "a": false,
          "b": false
        },
        types: {
          vertebrate: true,
          mammal: true
        },
        considerations: {
          "friendly to human": true,
          "e": false,
          "f": false
        },
        diet: {
          steak: true,
          drumstick: true,
          "c": false,
          "d": false
        },
        behaviours: {},
        possible_behaviours: {}
      }
    },
    uuid2: {
      id: "uuid2",
      name: "Snake",
      attributeMap: {
        physical: {
          scales: true,
          "long body": true,
          "a": false,
          "b": false
        },
        possible_behaviours: {
          "be poisonous": true
        },
        types: {
          reptile: true,
          "cold-blooded animal": true
        },
        behaviours: {
          "only eat meat": true,
          "climb tree": true
        },
        considerations: {
          "e": false,
          "f": false
        },
        diet: {
          "c": false,
          "d": false
        }
      }
    }
  };
  // not all attributes are set in file model
  const FILE_MODEL_WITH_INCOMPLETE_ATTRIBUTE = [{
    name: "Lion",
    id: "uuid1",
    physical: ["legs", "tail"],
    types: ["vertebrate", "mammal"],
    considerations: ["friendly to human"],
    diet: ["steak", "drumstick"]
  }, {
    name: "Snake",
    id: "uuid2",
    physical: ["scales", "long body"],
    possible_behaviours: ["be poisonous"],
    types: ["reptile", "cold-blooded animal"],
    behaviours: ["only eat meat", "climb tree"]
  }];
  const FILE_MODEL = [{
    name: "Lion",
    id: "uuid1",
    physical: ["legs", "tail"],
    types: ["vertebrate", "mammal"],
    considerations: ["friendly to human"],
    diet: ["steak", "drumstick"],
    behaviours: [],
    possible_behaviours: []
  }, {
    name: "Snake",
    id: "uuid2",
    physical: ["scales", "long body"],
    possible_behaviours: ["be poisonous"],
    types: ["reptile", "cold-blooded animal"],
    behaviours: ["only eat meat", "climb tree"],
    diet: [],
    considerations: []
  }];
  const ATTRIBUTE_DEFINITION = {
    "physical": {
      "a": false,
      "b": false
    },
    "diet": {
      "c": false,
      "d": false
    },
    "considerations": {
      "e": false,
      "f": false
    }
  };

  it('convertFromFileModelToAppModel', function () {
    expect(AnimalDefinition.convertFromFileModelToAppModel(FILE_MODEL_WITH_INCOMPLETE_ATTRIBUTE, ATTRIBUTE_DEFINITION)).toEqual(APP_MODEL);
  });

  it('convertFromAppModelToFileModel', function () {
    expect(AnimalDefinition.convertFromAppModelToFileModel(APP_MODEL)).toEqual(FILE_MODEL);
  });
});