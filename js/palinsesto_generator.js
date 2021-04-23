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
    IDs = IDsRandom(film);
    palinsesto = assemblaPalinsesto(IDs, film);
    // writeOnLocalStorage(film["tt0035423"]);
    writeOnLocalStorage(palinsesto);
  });
}
//["tt0035423"];

function IDsRandom(film) {
  //serie di mattina film di sera, primi 6 canali film dal 2000 in poi, film non ripetuti, su canali specializzati programmi specializzati
  var IDs;
  var usati = {};

  function randomID() {
    var IDs = Object.keys(film);
    var ID = IDs[Math.floor(Math.random() * IDs.length)];
    return ID;
  }
  // usati[3] = 1;

  //-------------------------------- mostro sacro -------------------------------------------//
  var ora = Date.today();
  console.log(ora);
  var filmid = randomID();

  console.log(filmid, film[filmid]);

  $.getScript("js/index.js", function () {
    var film = getFilm("i", filmid);
    console.log(parseInt(film["Runtime"].slice(0, 3)));
    var runtime = parseInt(film["Runtime"].slice(0, 3)); //può uscire NaN

    ora.add(runtime).minute();
    ora = aggiungiPubblicita(ora);
    console.log(ora);
  });
  //-------------------------------- mostro sacro -------------------------------------------//

  // console.log(film[randomID(film)]);
  // var random = console.log(random);

  return IDs;
}

function getListaGiorni() {
  var listaGiorni = [];
  function stringaData(data) {
    var dd = String(data.getDate()).padStart(2, "0");
    var mm = String(data.getMonth() + 1).padStart(2, "0");
    // var yyyy = today.getFullYear();
    return dd + "/" + mm;
  }

  for (let offset = -7; offset < 7; offset++) {
    var today = new Date();
    today.setDate(today.getDate() + offset);

    if (offset == 0) today = "Oggi";
    else if (offset == 1) today = "Domani";
    else today = stringaData(today);

    listaGiorni.push(today);
  }
  return listaGiorni;
}

function aggiungiPubblicita(ora, intervallo = 10) {
  // tmp = Date.today();
  // ora.add(146).minute();
  console.log(ora);
  if (ora.getMinutes() % intervallo != 0) {
    //torna i minuti
    //se non è multiplo di 5
    //aggiungi pubblicita fino ad arrivarci
    pubblicità = 0;
    for (let minuto = 1; minuto < intervallo; minuto++) {
      if ((ora.getMinutes() + minuto) % intervallo == 0) {
        pubblicità = minuto;
        break;
      }
    }
    ora.add(pubblicità).minute();
  }
  return ora;
}

function assemblaPalinsesto(IDs, film) {
  var palinsesto = {};
  getListaGiorni();
  return palinsesto;
}

function writeOnLocalStorage(dizionario) {
  //scrivi il palinsesto su localstorage
  if (typeof localStorage.palinsesto == "undefined")
    localStorage.palinsesto = "";
  localStorage.palinsesto = JSON.stringify(dizionario);
}
