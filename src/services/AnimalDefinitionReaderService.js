class AnimalDefinitionReaderService {
  onNewAnimalSubmitted(allAnimals) {
    fileDownload(JSON.stringify(allAnimals), 'test.json');
  }

  loadAllAnimalsFromFile(event) {
    const file = event.target.files[0];

    // generate a new FileReader object
    let reader = new FileReader();

    // inject an image with the src url
    let that = this;
    reader.onload = function (event) {
      let content = event.target.result;
      that.setState({
        animalDefinition: JSON.parse(content)
      });
    };

    // when the file is read it triggers the onload event above.
    reader.readAsText(file);
    // this allows the same file to be opened again
    event.target.value = null;
  }
}