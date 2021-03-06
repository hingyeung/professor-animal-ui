import React from 'react';
import PropTypes from 'prop-types';

const AnimalDefinitionLoader = (props) => {
  function onChange(event) {
    // event.nativeEvent.testFile is used in cypress functional test to simulate file-type input
    // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/file-upload-react/index.html
    const fileToOpen = (event.nativeEvent && event.nativeEvent.testFile) || event.target.files[0];

    if (fileToOpen && fileToOpen.type === 'application/json') {
      let fileReader = new FileReader();

      fileReader.onload = function(e) {
        let jsonStr = fileReader.result;
        props.onFileLoaded(jsonStr);
      };

      fileReader.readAsText(fileToOpen);
    }
  }

  return (
    <div>
      <form>
        <input type="file" className="form-control" onChange={onChange}/>
      </form>
    </div>
  );
};

AnimalDefinitionLoader.propTypes = {
  onFileLoaded: PropTypes.func.isRequired
};

export default AnimalDefinitionLoader;