// var fs = require("fs");
canali = [
  "Rai 1",
  "Rai 2",
  // "Rai 3",
  // "Rai 4",
  // "Rai 5",
  // "Rai Movie", //solo film
  // "Rai Premium",
  // "Rai Storia", //solo documentari
  // "Rai Scuola", //solo documentari
  // "Rai Sport", //genere sport
  // "Rai YoYo", //solo animazione
  // "Rete 4",
  // "Canale 5",
  // "Italia 1",
  // "Italia 2",
  // "IRIS",
  // "La 5",
  // "Top Crime", //genere crime
  // "Mediaset Extra",
  // "Boing", //solo animazione
  // "La7",
  // "Paramount Network", //solo film
  // "NOVE",
  // "Giallo", //genere crime
  // "DMAX",
];

async function generaPalinsesto() {
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

        xmlhttp.open("POST", "/../test.php", true);
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
      // console.log(encodeURIComponent(JSON.stringify(palinsesto)));
      setCookie(
        "palinsesto",
        encodeURIComponent(JSON.stringify(palinsesto)),
        1
      );
      // document.cookie = "palinsesto=" + JSON.stringify(palinsesto);
      success(palinsesto);
    });
  });
  return await res;
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
    var giornata = {}; //giornata["00-01": filmID]
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
      } else {
        randomid = randomID(possibiliSerie);
      }
      giornata[
        aggiungiPubblicita(ora, 10).toString("HH:mm") // +
        // " - " +
        // ora.add(parseInt(randomid.runtime)).minutes().toString("HH:mm")
      ] = randomid.id; //crea elemento dizionario

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
    canali.forEach((canale) => {
      palinsesto[giorno][canale] = getGiornata(canale);
    });
  });

  return palinsesto;
}

// function writeOnLocalStorage(dizionario) {
//   //scrivi il palinsesto su localstorage
//   if (typeof localStorage.palinsesto == "undefined")
//     localStorage.palinsesto = "";
//   localStorage.palinsesto = JSON.stringify(dizionario);

//   // createCookie("palinsesto", "JSON.stringify(dizionario)", 1);
//   // console.log(`${JSON.stringify(dizionario)}`);
//   // Cookies.set("palinsesto1", `${JSON.stringify(dizionario)}`);
// }

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
