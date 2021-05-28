async function generaPalinsesto() { // viene generato il palinsesto o reperito dal local storage se disponibile 
  if (localStorage.getItem("palinsesto") != null && Date.today().toString("dd/MM") == localStorage.getItem("giorno")) { 
    // se è presente un palinsesto nel local storage e il giorno in cui è stato creato è uguale a oggi
    return JSON.parse(localStorage.getItem("palinsesto")); //torna il palinsesto del local storage
  }
  let res = new Promise(function (success) { //creazione palinsesto
    queries = [];
    let IDs = {};

    async function query(type, genre) {  //funzione locale per reperire programmi dal database e inserirli in un dizionario 
      let myPromise = new Promise(function (myResolve) { 
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
        xmlhttp.send("type=" + type + "&genre=" + genre); // invia tramite post gli argomenti necessari alla query
      }).catch((error) => alert(error.message));

      if (genre == "-") { //inserisce nel dizionario i programmi ricevuti
        IDs[type] = {};
        IDs[type]["tutti"] = await myPromise;
      } else {
        IDs[type][genre] = await myPromise;
      }
      // console.log("finito", type, genre);
    }

    queries.push( // chiama la funzione query per ogni tipo e genere necessario
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

    Promise.allSettled(queries).then(function () { // attende che abbiano finito tutte le query e esegue le prossime funzioni 
      palinsesto = assemblaPalinsesto(IDs); // con i risultati delle query crea le varie giornate
      writeOnLocalStorage(palinsesto); // scrive su local storage  il palinsesto
      success(palinsesto); // viene restituito alla promise il palinsesto
    });
  });
  return await res;
}

function aggiungiPubblicita(ora, intervallo = 5) { // riceve in input un orario e lo ritorna arrotondato al multiplo piu vicino di "intervallo"
  if (ora.getMinutes() % intervallo != 0) {
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

function randomID(lista) { // data una lista torna un elemento casuale di quest'ultima
  return lista[Math.floor(Math.random() * lista.length)];
}

function assemblaPalinsesto(IDs) { //crea il palinsesto con i programmi presenti in "IDs"
  var palinsesto = {};
  var giorni = getListaGiorni();

  function getGiornata(canale) { // funzione locale per creare la singola giornata ([{id: ..., ora: ...}, {...}, ...])
    // inizializzazione ore necessarie
    var giornata = [];
    var mezzogiorno = Date.today().clearTime().at("12:30");
    var primaSerata = Date.today().clearTime().at("21:20");
    var ora = Date.today().at(primaSerata.toString("HH:mm"));
    primaSerata.addDays(1);

    var possibiliFilm = [];
    var possibiliSerie = [];

    switch (canale) { // a seconda del canale vengono scelti determinati tipi di film
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

    while (ora.isBefore(primaSerata)) { // finchè non viene completata la giornata aggiunge un nuovo programma
      var isPomeriggio = ora.isAfter(mezzogiorno);
      if (isPomeriggio) { // se è pomeriggio viene scelto un film a caso, altrimenti una serie tv
        randomid = randomID(possibiliFilm);
      } else {
        randomid = randomID(possibiliSerie);
      }
      giornata.push({
        ora: aggiungiPubblicita(ora, 10).toString("HH:mm"),
        id: randomid.id,
      }); // viene inserito il programma nell'array giornata con l'orario arrotondato

      // aggiorna l'ora a "ora precedente + durata del film"
      vecchio = ora.toString("dd");
      ora.addMinutes(parseInt(randomid.runtime));
      ora = Date.today().set({
        day: parseInt(ora.toString("dd")),
        hour: ora.getHours(),
        minute: ora.getMinutes(),
      });

      if (vecchio != ora.toString("dd")) {
        mezzogiorno = mezzogiorno.addDays(1);
      }
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
  //scrivi il palinsesto e il giorno in cui è creato su localstorage
  localStorage.setItem("giorno", Date.today().toString("dd/MM"));
  localStorage.setItem("palinsesto", JSON.stringify(dizionario));
}
