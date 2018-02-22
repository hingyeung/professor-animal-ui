import React from 'react';

const AnimalDefinitionLoader = (props) => {
  function onChange(event) {
    const fileToOpen = event.target.files[0];

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

export default AnimalDefinitionLoader;