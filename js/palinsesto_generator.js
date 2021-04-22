function generaPalinsesto() {
  $.getJSON("../data.txt", function (film) {
    // console.log(film);
    test(film);
  });
  //["tt0035423"];
}

//scrivi il palinsesto su localstorage
function test(film) {
  //   console.log(film);
  writeOnLocalStorage(film);
}

function writeOnLocalStorage(dizionario) {
  if (typeof localStorage.palinsesto == "undefined")
    localStorage.palinsesto = "";
  localStorage.palinsesto = JSON.stringify(dizionario);
}
