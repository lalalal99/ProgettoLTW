// var fs = require("fs");

async function generaPalinsesto() {
  if (
    localStorage.getItem("palinsesto") != null &&
    Date.today().toString("dd/MM") == localStorage.getItem("giorno")
  ) {
    return JSON.parse(localStorage.getItem("palinsesto"));
  }
  let res = new Promise(function (success) {
    queries = [];
    let IDs = {};

    async function query(type, genre) {
      let myPromise = new Promise(function (myResolve, err) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            myResolve(JSON.parse(this.responseText));
          }
        };

        xmlhttp.open("POST", "../query.php", true);
        xmlhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xmlhttp.send("type=" + type + "&genre=" + genre);
      }).catch((error) => alert(error.message));

      if (genre == "-") {
        IDs[type] = {};
        IDs[type]["tutti"] = await myPromise;
      } else {
        IDs[type][genre] = await myPromise;
      }
      // console.log("finito", type, genre);
    }

    queries.push(
      query("movie", "-"),
      query("movie", "Documentary"),
      query("movie", "Crime"),
      query("movie", "Animation"),
      query("movie", "Sport"),
      query("movie", "2000"),
      query("tvSeries", "-"),
      query("tvSeries", "Documentary"),
      query("tvSeries", "Crime"),
      query("tvSeries", "Animation"),
      query("tvSeries", "Sport"),
      query("tvSeries", "2000")
    );

    Promise.allSettled(queries).then(function () {
      palinsesto = assemblaPalinsesto(IDs);
      writeOnLocalStorage(palinsesto);
      success(palinsesto);
    });
  });
  return await res;
}

function aggiungiPubblicita(ora, intervallo = 5) {
  if (ora.getMinutes() % intervallo != 0) {
    //torna i minuti se non è multiplo di 5 aggiungi pubblicita fino ad arrivarci
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

function randomID(lista) {
  // console.log(lista[Math.floor(Math.random() * lista.length)]);
  return lista[Math.floor(Math.random() * lista.length)];
}

function assemblaPalinsesto(IDs) {
  //serie di mattina film di sera, primi 6 canali film dal 2000 in poi, film non ripetuti, su canali specializzati programmi specializzati
  var palinsesto = {};
  var giorni = getListaGiorni();

  function getGiornata(canale) {
    // console.log(IDs, canale);
    // console.log(IDs.movie["Animation"]);
    var giornata = []; //giornata["00-01": filmID]
    var mezzogiorno = Date.today().clearTime().at("12:30");
    var primaSerata = Date.today().clearTime().at("21:20");
    var ora = Date.today().at(primaSerata.toString("HH:mm"));
    primaSerata.addDays(1);

    var possibiliFilm = [];
    var possibiliSerie = [];

    switch (canale) {
      case "Rai Movie":
      case "Paramount Network":
        //prendi solo film
        possibiliFilm = IDs["movie"]["tutti"];
        possibiliSerie = IDs["movie"]["tutti"];
        break;
      case "Rai Storia":
      case "Rai Scuola":
        //solo documentari
        possibiliFilm = IDs["movie"]["Documentary"];
        possibiliSerie = IDs["tvSeries"]["Documentary"];
        break;
      case "Rai Sport":
        //solo sport
        possibiliFilm = IDs["movie"]["Sport"];
        possibiliSerie = IDs["tvSeries"]["Sport"];
        break;
      case "Rai YoYo":
      case "Boing":
        //solo animazione
        possibiliFilm = IDs["movie"]["Animation"];
        possibiliSerie = IDs["tvSeries"]["Animation"];
        break;
      case "Top Crime":
      case "Giallo":
        //solo crime
        possibiliFilm = IDs["movie"]["Crime"];
        possibiliSerie = IDs["tvSeries"]["Crime"];
        break;
      case "Rai 1":
      case "Rai 2":
      case "Rai 3":
      case "Rete 4":
      case "Canale 5":
      case "Italia 1":
        //2000
        possibiliFilm = IDs["movie"]["2000"];
        possibiliSerie = IDs["tvSeries"]["2000"];
        break;
      default:
        possibiliFilm = IDs["movie"]["tutti"];
        possibiliSerie = IDs["tvSeries"]["tutti"];
        break;
    }

    // console.log(ora, primaSerata);
    while (ora.isBefore(primaSerata)) {
      var isPomeriggio = ora.isAfter(mezzogiorno);
      if (isPomeriggio) {
        randomid = randomID(possibiliFilm);
        // console.log("Ciao1");
      } else {
        randomid = randomID(possibiliSerie);
        // console.log("Ciao2");
      }
      giornata.push({
        ora: aggiungiPubblicita(ora, 10).toString("HH:mm"),
        id: randomid.id,
      }); //crea elemento dizionario

      ora.addMinutes(parseInt(randomid.runtime));
      ora = Date.today().set({
        day: parseInt(ora.toString("dd")),
        hour: ora.getHours(),
        minute: ora.getMinutes(),
      });
    }
    return giornata;
  }

  //per ogni giorno in giorni crea un palinsesto per ogni canale che ha un film ogni x
  giorni.forEach((giorno) => {
    palinsesto[giorno] = {};
    for (let i = 0; i < canali.length; i += 2) {
      palinsesto[giorno][canali[i]] = getGiornata(canali[i]);
    }
  });

  return palinsesto;
}

function writeOnLocalStorage(dizionario) {
  //scrivi il palinsesto su localstorage
  localStorage.setItem("giorno", Date.today().toString("dd/MM"));
  localStorage.setItem("palinsesto", JSON.stringify(dizionario));
}
