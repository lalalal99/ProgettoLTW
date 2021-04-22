function generaPalinsesto() {
  $.getJSON("../data.txt", function (film) {
    test(film);
    IDs = indiciRandom();
    palinsesto = assemblaPalinsesto(IDs);
    writeOnLocalStorage(film["tt0035423"]);
    // writeOnLocalStorage(palinsesto);
  });
}

//["tt0035423"];

function indiciRandom() {
  var IDs;
  return IDs;
}

function assemblaPalinsesto(indici) {
  var palinsesto;
  return palinsesto;
}

function writeOnLocalStorage(dizionario) {
  //scrivi il palinsesto su localstorage
  if (typeof localStorage.palinsesto == "undefined")
    localStorage.palinsesto = "";
  localStorage.palinsesto = JSON.stringify(dizionario);
}
