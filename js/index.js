function startup() { // viene chiamata al caricamento del body in index.html, inizializza tutti gli elementi nella pagina
  controllaSeguiti();
  grigliaCanali();
  serata("prima");
}

function controllaSeguiti() {
  //Controlla se oggi andrà in onda un programma tra quelli seguiti dall'utente, se si crea un avviso da mostrare nel fondo al centro della pagina
  //che conterrà nome del programma, ora e canale su cui andrà in onda
  d = document.getElementById("divID");
  if ( //Controlla la variabile lastCheck nel localStorage, essenziale per far si che l'alert compaia una sola volta al giorno e non ogni volta che si va sll'index
    //nello specifico esegue il controllo se non è stato ancora memorizzato lastCheck oppure se la data non è quella di oggi
    localStorage.getItem("lastCheck") == null ||
    localStorage.getItem("lastCheck") != Date.today().toString("dd/MM")
  ) {
    comunica("email").then((data) => { //Controlla che l'utente sia loggato
      if (data != null) {
        comunica("seguiti").then((data) => { //Per capire il significato di questa funzione si rimanda a utilities.js e a profiloComunica.php
          if (data != "-1") { //Se l'utente segue almeno un programma
            var idf = JSON.parse(data);
            for (const _id in idf) {
              const id = idf[_id].film;
              getFilm("i", id).then((data) => { //Recupera le info sul programma dato il suo id
                var titolo = data.Title;
                var diz = getOraInPalinsesto(id);
                if (diz["ora"] != "" && diz["giorno"] == "Oggi") { //Se il programma si trova nella programmazione tv di oggi crea l'avviso
                  var p = document.createElement("p");
                  var d2 = document.createElement("div");
                  d2.setAttribute("class", "d-flex align-items-baseline");
                  var img = document.createElement("img");
                  img.setAttribute("src", diz["poster"]);
                  img.setAttribute("height", "30px");
                  img.setAttribute("class", "ms-3");
                  p.appendChild(document.createTextNode("'" + titolo + "' andrà in onda oggi alle " + diz["ora"] + " su "));
                  p.setAttribute("class", "fs-4");
                  d2.appendChild(p);
                  d2.appendChild(img);
                  d.appendChild(d2);
                  document.getElementById("divAvviso").classList.remove("classe-nascosta"); //Rimuove classe-nascosta così da renderlo visibile
                }
              });
            }
          }
        });
      }
    });
  }
}

function grigliaCanali() { //crea la griglia dei canali sulla destra della pagina principale del sito
  let container = document.getElementById("container-griglia-canali");
  let row = document.createElement("div");
  row.setAttribute("class", "row row-cols-3 justify-content-start g-3");

  for (let i = 1; i < canali.length; i += 2) { //per ogni logo di canale viene creata un'immagine e inserita nella griglia
    let col = document.createElement("div");
    col.setAttribute("class", "col p-2 d-flex justify-content-center align-items-center shadow-sm rounded");

    let a = document.createElement("a"); //crea link alla pagina del canale
    a.setAttribute("href", "../dettaglioCanale/canale.html?id=" + canali[i - 1]);

    let img = document.createElement("img");
    img.setAttribute("src", canali[i]);
    img.setAttribute("height", 40);

    a.appendChild(img);
    col.appendChild(a);
    row.appendChild(col);
  }
  container.appendChild(row);
}

function serata(tipoSerata, giorno = "Oggi") { //viene reperito il palinsesto e poi utilizzato
  generaPalinsesto().then(function (palinsesto) {
    document.getElementById("serata-lista").innerHTML = ""; //svuota il contenuto della div contenente la serata
    document.getElementById("div-evidenza").innerHTML =
      '<div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>';  //mostra uno spinner finchè non carica la serata
    generaSerata(tipoSerata, palinsesto, giorno); //crea le card nella div serata
    generaEvidenza(); //crea le locandine nella sezione evidenza
  });
}

async function generaEvidenza() { //crea le locandine nella sezione evidenza
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(1500); // attende 1.5 secondi per far caricare tutte le card della serata

  let div = document.getElementById("div-evidenza");
  div.innerHTML = ""; //svuota l'eventuale vecchia serata

  let _best = [];

  let ratings = document.getElementsByName("rating"); //prende tutte le valutazione delle card presenti nella serata
  let imgs = document.getElementsByName("card-img"); //prende tutte le immagini delle card presenti nella serata

  for (let i = 0; i < ratings.length; i++) {
    let obj = {
      id: imgs[i].alt,
      rating: ratings[i].innerHTML != "N/A" ? ratings[i].innerHTML : "0",
      poster: imgs[i].src,
    }; //crea un oggetto contenente id del programma, eventuale rating e poster
    _best.push(obj); // mette in un array l'oggetto creato 
  }
  let best = _best.sort((a, b) => b.rating - a.rating).slice(0, 5); //l'array viene ordinato per valutazione decrescente e vengono presi solo i migliori 5

  for (let i = 0; i < 5; i++) { //per ogni elemento viene creato un poster con link alla sua scheda nella sezione evidenza
    let a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + best[i].id);
    let img = document.createElement("img");
    img.setAttribute("src", best[i].poster);
    img.setAttribute("style", "width : 250px; height : 350px");
    img.setAttribute("class", "rounded");
    a.appendChild(img);
    div.appendChild(a);
  }
}

function generaSerata(tipoSerata, palinsesto, giorno) { // crea la sezione serata
  //prima serata 0 seconda serata 1 unificata 0 e 1
  for (let i = 0; i < canali.length; i += 2) { //per ogni canale viene inserita una card a seconda della serata richiesta
    // for (let i = 0; i < 10; i += 2) {
    if (tipoSerata == "unica") {
      aggiungiElementoSerata(i, palinsesto, 0, giorno);
      aggiungiElementoSerata(i + 1, palinsesto, 1, giorno);
    } else if (tipoSerata == "prima") {
      aggiungiElementoSerata(i, palinsesto, 0, giorno);
    } else if (tipoSerata == "seconda") {
      aggiungiElementoSerata(i + 1, palinsesto, 1, giorno);
    }
  }
}

function aggiungiElementoSerata(indiceCanale, palinsesto, serata, giorno) { //crea tutti gli elementi necessari e appende una card alla serata
  getFilm("i", palinsesto[giorno][canali[serata == 0 ? indiceCanale : indiceCanale - 1]][serata]["id"], false).then((film) => { //richiede le informazioni del film
    let container = document.getElementById("serata-lista");
    let card = document.createElement("div");
    card.setAttribute("class", "card mb-3");
    card.setAttribute("style", "order:" + indiceCanale);

    let card_header = document.createElement("div");
    card_header.setAttribute("class", "card-header d-flex align-items-center");
    let a = document.createElement("a");
    a.setAttribute(
      "href",
      "dettaglioCanale/canale.html?id=" + canali[serata == 0 ? indiceCanale : indiceCanale - 1]
    );
    let img = document.createElement("img");
    Object.assign(img, {
      src: canali[serata == 0 ? indiceCanale + 1 : indiceCanale],
      style: "max-height: 50px;",
    });
    a.appendChild(img);
    card_header.appendChild(a);

    let ora = document.createElement("h3");
    ora.setAttribute("class", "card-text ms-auto");
    ora.appendChild(document.createTextNode(palinsesto[giorno][canali[serata == 0 ? indiceCanale : indiceCanale - 1]][serata]["ora"]));
    card_header.appendChild(ora);

    card.appendChild(card_header);

    let row = document.createElement("div");
    row.setAttribute("class", "row g-0");

    let col = document.createElement("div");
    col.setAttribute(
      "class",
      "col-lg-4 d-flex justify-content-start align-items-center p-3"
    );
    a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + film.imdbID);
    img = document.createElement("img");
    Object.assign(img, {
      src: 
        film["Poster"] != "N/A" ? 
          film["Poster"] : 
          "https://via.placeholder.com/300x500/FFFFFF/000000?text=" + film.Title.replace(/ /g, "+"), //immagine personalizzata da placeholder.com se un poster non è disponibile
      class: "card-img",
      alt: film.imdbID,
      style: "overflow:cover;",
      name: "card-img",
    });
    a.appendChild(img);
    col.appendChild(a);
    row.appendChild(col);

    col = document.createElement("div");
    col.setAttribute("class", "col-lg-8");

    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body text-success");

    a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + film.imdbID);
    a.setAttribute("style", "text-decoration : none;");
    let h2 = document.createElement("h2");
    h2.setAttribute("class", "card-title");
    h2.appendChild(document.createTextNode(film["Title"]));
    a.appendChild(h2);
    card_body.appendChild(a);

    info = document.createElement("div");
    info.setAttribute("class", "d-flex");

    let p = document.createElement("p");
    p.setAttribute("class", "card-text me-5");
    p.appendChild(document.createTextNode(film["Runtime"]));
    info.appendChild(p);

    div = document.createElement("div");
    div.setAttribute("class", "d-flex gap-2");

    img = document.createElement("img"); //logo imdb
    Object.assign(img, {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/640px-IMDB_Logo_2016.svg.png",
      style: "height: 20px;",
    });
    div.appendChild(img);

    p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.setAttribute("name", "rating");
    p.appendChild(document.createTextNode(film.imdbRating));
    div.appendChild(p);

    if (film.imdbRating != "N/A") {
      p = document.createElement("p");
      p.setAttribute("class", "card-text");
      p.appendChild(document.createTextNode("/10"));
      div.appendChild(p);
    }

    info.appendChild(div);

    card_body.appendChild(info);

    p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.appendChild(document.createTextNode(film["Plot"]));
    card_body.appendChild(p);

    col.appendChild(card_body);
    row.appendChild(col);
    card.appendChild(row);

    container.appendChild(card);
  });
}
