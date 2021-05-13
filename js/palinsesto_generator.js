// var fs = require("fs");
const canali = [
  "Rai 1",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Rai_1_-_Logo_2016.svg/1200px-Rai_1_-_Logo_2016.svg.png",
  "Rai 2",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rai_2_-_Logo_2016.svg/512px-Rai_2_-_Logo_2016.svg.png",
  "Rai 3",
  "https://upload.wikimedia.org/wikipedia/it/thumb/5/5c/Logo_Rai_3_2010.svg/1200px-Logo_Rai_3_2010.svg.png",
  "Rete 4",
  "https://upload.wikimedia.org/wikipedia/it/thumb/c/c0/Rete_4_-_Logo_2018.svg/1040px-Rete_4_-_Logo_2018.svg.png",
  "Canale 5",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Canale_5_-_2018_logo.svg/1200px-Canale_5_-_2018_logo.svg.png",
  "Italia 1",
  "https://upload.wikimedia.org/wikipedia/it/thumb/3/30/Logo_Italia_1.svg/1024px-Logo_Italia_1.svg.png",
  "La7",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/LA7_-_Logo_2011.svg/1200px-LA7_-_Logo_2011.svg.png",
  "NOVE",
  "https://upload.wikimedia.org/wikipedia/it/0/0f/NOVE_TV_logo_2017.png",
  "Rai 4",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rai_4_-_Logo_2016.svg/1024px-Rai_4_-_Logo_2016.svg.png",
  "IRIS",
  "https://upload.wikimedia.org/wikipedia/it/archive/c/cd/20201003114059%21Logo_Iris_TV.png",
  "Rai 5",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Rai_5_logo.svg/1280px-Rai_5_logo.svg.png",
  "Rai Movie",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Rai_Movie_-_Logo_2017.svg/1280px-Rai_Movie_-_Logo_2017.svg.png", //solo film
  "Rai Premium",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rai_Premium_-_Logo_2017.svg/1200px-Rai_Premium_-_Logo_2017.svg.png",
  "Paramount Network",
  "https://upload.wikimedia.org/wikipedia/it/1/1d/Paramount_Network.png", //solo film
  "La 5",
  "https://upload.wikimedia.org/wikipedia/it/thumb/6/64/La5_Italy.svg/640px-La5_Italy.svg.png",
  "Mediaset Extra",
  "https://upload.wikimedia.org/wikipedia/it/c/c1/Mediaset_Extra_logo.PNG",
  "Giallo",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Giallo_-_Logo_2014.svg/1280px-Giallo_-_Logo_2014.svg.png", //genere crime
  "Top Crime",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Top_Crime_-_Logo_2013.svg/1280px-Top_Crime_-_Logo_2013.svg.png", //genere crime
  "Boing",
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Boing_2020.png", //solo animazione
  "Rai YoYo",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Rai_Yoyo_-_Logo_2017.svg/1280px-Rai_Yoyo_-_Logo_2017.svg.png", //solo animazione
  "DMAX",
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Dmax.png",
  "Rai Sport",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Rai_Sport_-_Logo_2017.svg/1280px-Rai_Sport_-_Logo_2017.svg.png", //genere sport
  "Italia 2",
  "https://upload.wikimedia.org/wikipedia/it/thumb/c/c5/Logo_Italia2.svg/1200px-Logo_Italia2.svg.png",
  "Rai Storia",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Rai_Storia_-_Logo_2017.svg/512px-Rai_Storia_-_Logo_2017.svg.png", //solo documentari
  "Rai Scuola",
  "https://www.lamiascuoladifferente.it/wp-content/uploads/2020/03/logo_rai2.png", //solo documentari
];

async function generaPalinsesto() {
  if (localStorage.getItem("palinsesto") != null) {
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
  // if (typeof localStorage.palinsesto == "undefined")
  //   localStorage.palinsesto = "";
  localStorage.setItem("palinsesto", JSON.stringify(dizionario));
  // localStorage.palinsesto = JSON.stringify(dizionario);
}
