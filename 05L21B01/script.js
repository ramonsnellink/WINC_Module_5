fetch("http://swapi.dev/api/planets/1/")
  .then((response) => response.json())
  .then((myJson) => {
    document.body.innerHTML = "<pre>" + JSON.stringify(myJson, null, " ") + "</pre>";
  });
