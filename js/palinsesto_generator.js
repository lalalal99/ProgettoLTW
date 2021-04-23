canali = [
  "Rai 1",
  "Rai 2",
  "Rai 3",
  "Rai 4",
  "Rai 5",
  "Rai Movie", //solo film
  "Rai Premium",
  "Rai Storia", //solo documentari
  "Rai Scuola", //solo documentari
  "Rai Sport", //genere sport
  "Rai YoYo", //solo animazione
  "Rete 4",
  "Canale 5",
  "Italia 1",
  "Italia 2",
  "IRIS",
  "La 5",
  "Top Crime", //genere crime
  "Mediaset Extra",
  "Boing", //solo animazione
  "La7",
  "Paramount Network", //solo film
  "NOVE",
  "Giallo", //genere crime
  "DMAX",
];

function generaPalinsesto() {
  $.getJSON("../data.txt", function (film) {
    IDs = indiciRandom(film);
    palinsesto = assemblaPalinsesto(IDs, film);
    writeOnLocalStorage(film["tt0035423"]);
    // writeOnLocalStorage(palinsesto);
  });
}
//["tt0035423"];

function indiciRandom(film) {
  //serie di mattina film di sera, primi 6 canali film dal 2000 in poi, film non ripetuti, su canali specializzati programmi specializzati
  var IDs;
  var usati = {};
  // usati[3] = 1;

  console.log(film[randomID(film)]);
  // var random = console.log(random);

  return IDs;
}

function randomID(film) {
  var IDs = Object.keys(film);

  max = 0;
  for (let index = 0; index < IDs.length; index++) {
    if (max < IDs[index].length) max = IDs[index].length;
  }
  console.log(max);
  var ID = IDs[Math.floor(Math.random() * IDs.length)];
  return ID;
}

function getGiorno() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  console.log(today);
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
