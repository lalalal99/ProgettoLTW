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
    IDs = IDsSpecifici(film);
    palinsesto = assemblaPalinsesto(IDs, film);
    // writeOnLocalStorage(film["tt0035423"]);
    writeOnLocalStorage(palinsesto);
  });
}
//["tt0035423"];

function IDsSpecifici(film) {
  var IDs = {};
  //serve avere un dizionario solo film, uno solo serie, uno solo documentari, uno solo sport, uno solo crime
  function getFilmSpecifici(chiave, predicato, lista = film) {
    // "tt5716848": {"title": "Dove Sono I Soldi", "year": "2017", "type": "movie", "genre": "Comedy", "runtime": "86"}
    //primo argomento title, year, type, genre, runtime
    //secondo argomento movie, 2000
    validi = {};
    for (const [key, value] of Object.entries(lista)) {
      if (value["runtime"] != "\\N") {
        switch (typeof predicato) {
          case "number":
            if (parseInt(value[chiave]) >= predicato) {
              validi[key] = value;
            }
            break;
          case "string":
            if (value[chiave].includes(predicato)) {
              validi[key] = value;
            }
            break;
          default:
            console.error("Predicato errato.");
            break;
        }
      }
    }
    return validi;
  }

  IDs["film"] = {};
  IDs["film"]["tutti"] = getFilmSpecifici("type", "movie");
  IDs["film"]["documentari"] = getFilmSpecifici(
    "genre",
    "Documentary",
    IDs["film"]["tutti"]
  );
  IDs["film"]["crime"] = getFilmSpecifici(
    "genre",
    "Crime",
    IDs["film"]["tutti"]
  );
  IDs["film"]["animazione"] = getFilmSpecifici(
    "genre",
    "Animation",
    IDs["film"]["tutti"]
  );
  IDs["film"]["sport"] = getFilmSpecifici(
    "genre",
    "Sport",
    IDs["film"]["tutti"]
  );
  IDs["film"]["2000"] = getFilmSpecifici("year", "2000", IDs["film"]["tutti"]);

  IDs["serie"] = {};
  IDs["serie"]["tutti"] = getFilmSpecifici("type", "tvSeries");
  IDs["serie"]["documentari"] = getFilmSpecifici(
    "genre",
    "Documentary",
    IDs["serie"]["tutti"]
  );
  IDs["serie"]["crime"] = getFilmSpecifici(
    "genre",
    "Crime",
    IDs["serie"]["tutti"]
  );
  IDs["serie"]["animazione"] = getFilmSpecifici(
    "genre",
    "Animation",
    IDs["serie"]["tutti"]
  );
  IDs["serie"]["sport"] = getFilmSpecifici(
    "genre",
    "Sport",
    IDs["serie"]["tutti"]
  );
  IDs["serie"]["2000"] = getFilmSpecifici(
    "year",
    "2000",
    IDs["serie"]["tutti"]
  );

  // IDs["documentari"] = getFilmSpecifici("genre", "Documentary");
  // IDs["sport"] = getFilmSpecifici("genre", "Sport");
  // IDs["crime"] = getFilmSpecifici("genre", "Crime");
  // IDs["animazione"] = getFilmSpecifici("genre", "Animation");
  // IDs["film_2000"] = getFilmSpecifici("type", "movie").getFilmSpecifici(
  //   "year",
  //   "2000"
  // );
  // IDs["serie_2000"] = getFilmSpecifici("type", "tvSeries").getFilmSpecifici(
  //   "year",
  //   "2000"
  // );
  // console.log(IDs);
  // getFilmSpecifici("genre", "Sport");
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

function aggiungiPubblicita(ora, intervallo = 5) {
  // tmp = Date.today();
  // ora.add(146).minute();
  // console.log(ora);
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

function randomID(dizionario) {
  var IDs = Object.keys(dizionario);
  // console.log("IDs", IDs);
  var ID = IDs[Math.floor(Math.random() * IDs.length)];
  // console.log("ID", ID);
  return ID;
}

function assemblaPalinsesto(IDs, film) {
  //serie di mattina film di sera, primi 6 canali film dal 2000 in poi, film non ripetuti, su canali specializzati programmi specializzati
  var palinsesto = {};
  var giorni = getListaGiorni();
  // usati[3] = 1;
  //-------------------------------- mostro sacro -------------------------------------------//
  // var ora = Date.today();
  // console.log(ora);
  // var filmid = randomID();
  // // console.log(filmid, film[filmid]);
  // var runtime = parseInt(film[filmid]["runtime"]); //può uscire NaN
  // console.log(parseInt(runtime));

  // ora.add(runtime).minute();
  // ora = aggiungiPubblicita(ora);
  // console.log(ora);
  // });
  //-------------------------------- mostro sacro -------------------------------------------//
  function getGiornata(canale) {
    var giornata = {}; //giornata["00-01": filmID]
    var usati = {};
    var mezzogiorno = Date.today().clearTime().at("12:30");
    var primaSerata = Date.today().clearTime().at("21:20");
    var ora = Date.today().at(primaSerata.toString("HH:mm"));
    // console.log(ora.toString("HH:mm"));
    // ora.clearTime();
    // console.log(ora.toString("HH:mm"), mezzogiorno.toString("HH:mm"));
    // console.log(ora.isAfter(mezzogiorno));
    // console.log(ora.isBefore(mezzogiorno));
    var possibiliFilm;
    var possibiliSerie;

    switch (canale) {
      case "Rai Movie":
      case "Paramount Network":
        //prendi solo film
        possibiliFilm = IDs["film"]["tutti"];
        break;
      case "Rai Storia":
      case "Rai Scuola":
        //solo documentari
        possibiliFilm = IDs["film"]["documentari"];
        possibiliSerie = IDs["serie"]["documentari"];
        break;
      case "Rai Sport":
        //solo sport
        possibiliFilm = IDs["film"]["sport"];
        possibiliSerie = IDs["serie"]["sport"];
        break;
      case "Rai YoYo":
      case "Boing":
        //solo animazione
        possibiliFilm = IDs["film"]["animazione"];
        possibiliSerie = IDs["serie"]["animazione"];
        break;
      case "Top Crime":
      case "Giallo":
        //solo crime
        possibiliFilm = IDs["film"]["crime"];
        possibiliSerie = IDs["serie"]["crime"];
        break;
      default:
        if (ora.isBefore(mezzogiorno)) {
          possibiliSerie = IDs["serie"]["tutti"];
        } else if (ora.isAfter(mezzogiorno)) {
          possibiliFilm = IDs["film"]["tutti"];
        }
        break;
    }
    // console.log("possibiliFilm", possibiliFilm);
    // console.log("chiavi", Object.keys(possibiliFilm));
    // console.log("random id", randomID(possibiliFilm));
    // console.log(film[]);
    for (let i = 0; i < 10; i++) {
      id = randomID(possibiliFilm);
      // console.log(possibiliFilm[id]);
      giornata[
        aggiungiPubblicita(ora, 10).toString("HH:mm") +
          " - " +
          ora
            .add(parseInt(possibiliFilm[id]["runtime"]))
            .minutes()
            .toString("HH:mm")
      ] = id;
      // console.log(canale, i, giornata);
      //ora.isAfter(primaSerata.add(24).hours())) {
      ora = aggiungiPubblicita(
        Date.today().at(
          ora
            .add(parseInt(possibiliFilm[id]["runtime"]))
            .minutes()
            .toString("HH:mm")
        ),
        10
      ); //funziona settando l'ora ma non va con add
      // console.log(ora.toString("HH:mm"), ora.isAfter(mezzogiorno));
    }

    // console.log(canale, giornata);
    return giornata;
  }

  // getGiornata("Rai 1");

  //per ogni giorno in giorni crea un palinsesto per ogni canale che ha un film ogni x
  giorni.forEach((giorno) => {
    palinsesto[giorno] = {};
    canali.forEach((canale) => {
      palinsesto[giorno][canale] = getGiornata(canale);
      // console.log(palinsesto);
    });
  });

  return palinsesto;
}

function writeOnLocalStorage(dizionario) {
  //scrivi il palinsesto su localstorage
  if (typeof localStorage.palinsesto == "undefined")
    localStorage.palinsesto = "";
  localStorage.palinsesto = JSON.stringify(dizionario);
}
