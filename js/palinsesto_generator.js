// var fs = require("fs");
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
  let palinsesto = {};
  $.ajax({
    url: "../data.txt",
    async: false,
    dataType: "json",
    success: function (film) {
      IDs = IDsSpecifici(film);
      palinsesto = assemblaPalinsesto(IDs, film);
    },
  });
  return palinsesto;
}
//["tt0035423"];

function IDsSpecifici(film) {
  //serve avere un dizionario solo film, uno solo serie, uno solo documentari, uno solo sport, uno solo crime
  var organized = [];
  Object.keys(film).forEach((key) => {
    if (film[key].runtime != "\\N") {
      organized.push({ id: key, data: film[key] });
    }
  });
  // let organized = _organized.filter((word) => word.data.runtime != "\\N");
  async function test() {
    function tmp() {
      x = 0;
      for (let i = 0; i < 10000000; i++) {
        x = x + 1;
      }
      return x;
    }

    console.log("prima");
    console.log(tmp());
    console.log("mid");
    console.log(tmp());
    console.log("dopo");
  }

  test();

  let IDs = {};
  IDs["film"] = {};
  IDs["film"]["tutti"] = organized.filter((word) => word.data.type == "movie");
  IDs["film"]["documentari"] = IDs["film"]["tutti"].filter((word) =>
    word.data.genre.includes("Documentary")
  );
  IDs["film"]["crime"] = IDs["film"]["tutti"].filter((word) =>
    word.data.genre.includes("Crime")
  );
  IDs["film"]["animazione"] = IDs["film"]["tutti"].filter((word) =>
    word.data.genre.includes("Animation")
  );
  IDs["film"]["sport"] = IDs["film"]["tutti"].filter((word) =>
    word.data.genre.includes("Sport")
  );
  IDs["film"]["2000"] = IDs["film"]["tutti"].filter(
    (word) => parseInt(word.data.year) >= 2000
  );

  IDs["serie"] = {};
  IDs["serie"]["tutti"] = organized.filter(
    (word) => word.data.type == "tvSeries"
  );
  IDs["serie"]["documentari"] = IDs["serie"]["tutti"].filter((word) =>
    word.data.genre.includes("Documentary")
  );
  IDs["serie"]["crime"] = IDs["serie"]["tutti"].filter((word) =>
    word.data.genre.includes("Crime")
  );
  IDs["serie"]["animazione"] = IDs["serie"]["tutti"].filter((word) =>
    word.data.genre.includes("Animation")
  );
  IDs["serie"]["sport"] = IDs["serie"]["tutti"].filter((word) =>
    word.data.genre.includes("Sport")
  );
  IDs["serie"]["2000"] = IDs["serie"]["tutti"].filter(
    (word) => parseInt(word.data.year) >= 2000
  );

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

function assemblaPalinsesto(IDs, film) {
  //serie di mattina film di sera, primi 6 canali film dal 2000 in poi, film non ripetuti, su canali specializzati programmi specializzati
  var palinsesto = {};
  var giorni = getListaGiorni();
  // usati[3] = 1;
  function getGiornata(canale) {
    var giornata = {}; //giornata["00-01": filmID]
    var mezzogiorno = Date.today().clearTime().at("12:30");
    var primaSerata = Date.today().clearTime().at("21:20");
    var ora = Date.today().at(primaSerata.toString("HH:mm"));

    var possibiliFilm;
    var possibiliSerie;

    switch (canale) {
      case "Rai Movie":
      case "Paramount Network":
        //prendi solo film
        possibiliFilm = IDs["film"]["tutti"];
        possibiliSerie = IDs["film"]["tutti"];
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
      case "Rai 1":
      case "Rai 2":
      case "Rai 3":
      case "Rete 4":
      case "Canale 5":
      case "Italia 1":
        possibiliFilm = IDs["film"]["2000"];
        possibiliSerie = IDs["serie"]["2000"];
        break;
      default:
        possibiliSerie = IDs["serie"]["tutti"];
        possibiliFilm = IDs["film"]["tutti"];

        break;
    }
    for (let i = 0; i < 10; i++) {
      var isPomeriggio = ora.isAfter(mezzogiorno);
      if (isPomeriggio) {
        randomid = randomID(possibiliFilm);
      } else {
        randomid = randomID(possibiliSerie);
      }
      giornata[
        aggiungiPubblicita(ora, 10).toString("HH:mm") +
          " - " +
          ora.add(parseInt(randomid.data.runtime)).minutes().toString("HH:mm")
      ] = randomid.id; //crea elemento dizionario

      ora = aggiungiPubblicita(
        Date.today().at(
          ora.add(parseInt(randomid.data.runtime)).minutes().toString("HH:mm")
        ),
        10
      ); //aggiorna l'ora
      //funziona settando l'ora ma non va con add
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

// function setCookie(cname, cvalue, exdays) {
//   var d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   var expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function checkCookie() {
//   var username = getCookie("username");
//   if (username != "") {
//     alert("Welcome again " + username);
//   } else {
//     username = prompt("Please enter your name:", "");
//     if (username != "" && username != null) {
//       setCookie("username", username, 365);
//     }
//   }
// }
