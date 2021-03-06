const canali = [ // lista dei canali (id canale e logo )
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

function getListaGiorni() {  // ritorna una lista di giorni da Oggi - 7 a Oggi + 7
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

const OMDb_API = "9e44c172"; // API key del sito OMDb
// const OMDb_API = "75cb83e8";

async function getFilm(key, value, fullPlot = false) {
  //Ritorna un dizionario con le informazioni del film richiesto
  var url = "http://www.omdbapi.com/?apikey=" + OMDb_API + "&" + key + "=" + value + (fullPlot ? "&plot=full" : "");

  var value = new Promise(function (success) {
    $.ajax(url).then(function (res) {
      success(res);
    });
  });

  return await value;
}

function getParameterByName(name = "id", _url) {
  if (!_url) urlString = window.location.href;
  let url = new URL(urlString);
  return url.searchParams.get(name);
}

function getColoreCasuale() { // ritorna un colore casuale 
  var letters = "0123456789ABCDEF";
  var color = "";
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

function getBrightness(colore) { // ritorna la luminosit?? del colore ricevuto in input
  if (colore[0] == "#") colore = colore.substring(1);
  var rgb = parseInt(colore, 16);
  var r = (rgb >> 16) & 0xff;
  var g = (rgb >> 8) & 0xff;
  var b = (rgb >> 0) & 0xff;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function changeDropdownDay(giorno, canale = false) { 
  // cambia il valore del bottone della navbar e modifica gli argomenti dei bottoni per cambiare tipo di serata
  let btn = document.getElementById("dropdownMenuButton");
  btn.innerHTML = "";
  btn.appendChild(document.createTextNode(giorno));

  if (!canale) {
    btn = document.getElementById("btn-prima-serata");
    btn.setAttribute("onclick", "serata('prima','" + giorno + "')");
    btn = document.getElementById("btn-seconda-serata");
    btn.setAttribute("onclick", "serata('seconda','" + giorno + "')");
    btn = document.getElementById("btn-unica-serata");
    btn.setAttribute("onclick", "serata('unica','" + giorno + "')");
  }
}

function navbarDropdown(giorno = "Oggi", canale = false) { // crea il menu dropdown con la lista dei giorni nella navbar
  let div = document.getElementById("dropdown");
  div.setAttribute("style", "border: 2px solid var(--hover);");

  let btn = document.createElement("button");
  btn.setAttribute("class", "btn dropdown-toggle fs-4");
  btn.setAttribute("type", "button");
  btn.setAttribute("id", "dropdownMenuButton");
  btn.setAttribute("data-bs-toggle", "dropdown");
  btn.setAttribute("aria-expanded", "false");
  btn.appendChild(document.createTextNode(giorno));

  div.appendChild(btn);

  let ul = document.createElement("ul");
  ul.setAttribute("class", "dropdown-menu dropdown-menu-dark");
  ul.setAttribute("aria-labelledby", "dropdownMenuButton");
  ul.setAttribute("id", "dropdown-list");

  let giorni = getListaGiorni();
  for (const giorno of giorni) {
    let li = document.createElement("li");
    li.setAttribute("class", "dropdown-item");
    li.setAttribute(
      "onclick",
      canale ? // a seconda di chi chiama questa funzione viene eseguita una funzione differente sull'onclick
        `programmi('${giorno}');changeDropdownDay('${giorno}', true);` :
        `serata('prima', '${giorno}');changeDropdownDay('${giorno}');`
    );
    li.appendChild(document.createTextNode(giorno));
    ul.appendChild(li);
  }
  div.appendChild(ul);
}

function createCard(programma, order, divContainer, searchbar = false) {
  // crea una card con le informazioni passate nel container specificato
  const id = programma.id,
    ora = programma.ora,
    poster = programma.poster,
    giorno = programma.giorno;

  let container = document.getElementById(divContainer);
  getFilm("i", id).then((film) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card mb-3");
    card.setAttribute("style", "order:" + order);

    let row = document.createElement("div");
    row.setAttribute("class", "row g-0");

    let col = document.createElement("div");
    col.setAttribute(
      "class",
      "col-lg-4 d-flex justify-content-start align-items-center p-3"
    );
    let a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + film.imdbID);
    img = document.createElement("img");
    Object.assign(img, {
      src:
        film["Poster"] != "N/A"
          ? film["Poster"]
          : "https://via.placeholder.com/300x500/FFFFFF/000000?text=" +
            film.Title.replace(/ /g, "+"),
      class: "card-img",
      alt: film.imdbID,
      style: "object-fit : cover;", //width : 250px; height : 350px",
      width: 250,
      height: 300,
      name: "card-img",
    });
    a.appendChild(img);
    col.appendChild(a);
    row.appendChild(col);

    col = document.createElement("div");
    col.setAttribute(
      "class",
      "col-lg-8 d-flex justify-content-center align-items-center"
    );

    let card_body = document.createElement("div");
    card_body.setAttribute(
      "class",
      "card-body d-flex flex-column text-success"
    );

    let divTitoloOra = document.createElement("div");
    divTitoloOra.setAttribute("class", "d-flex justify-content-between");
    a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + film.imdbID);
    a.setAttribute("style", "text-decoration : none;");
    let h2 = document.createElement("h2");
    h2.setAttribute("class", "card-title");
    h2.appendChild(document.createTextNode(film["Title"]));
    a.appendChild(h2);
    divTitoloOra.appendChild(a);

    if (searchbar && poster != "") {
      div = document.createElement("div");
      div.setAttribute(
        "class",
        "d-flex align-items-center justify-content-between"
      );
      img = document.createElement("img");
      img.setAttribute("src", poster);
      img.setAttribute("height", "40px");
      img.setAttribute("class", "me-5");
      div.appendChild(img);
      p = document.createElement("p");
      p.setAttribute("class", "card-text");
      p.innerHTML = giorno + " " + ora;
      div.appendChild(p);
      divTitoloOra.appendChild(div);
    } else {
      h3 = document.createElement("h3");
      h3.setAttribute("class", "card-text");
      h3.appendChild(document.createTextNode(ora));
      divTitoloOra.appendChild(h3);
    }

    card_body.appendChild(divTitoloOra);

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

function cercaDaSeguire() {
  let div = document.getElementById("search-screen");
  if (div.lastChild.id == "div-results") div.removeChild(div.lastChild); //Rimuove eventuali risultati residui dell'ultima ricerca
  let res = document.createElement("div");
  res.setAttribute("id", "div-results");
  res.setAttribute("class", "w-50 ms-auto me-auto mt-5 p-2 mb-4"); //
  res.setAttribute("style", "overflow-y: scroll;"); //Permette lo scroll dei risultati
  if (document.getElementById("srcInput").value != null) { //Se nell'input text ?? stato scritto qualcosa (impedisce query vuote)
    comunica("s", document.getElementById("srcInput").value).then((data) => { //Cerca programmi da seguire (si veda profiloCOmunica.php)
      document.getElementById("srcInput").value = "";
      if (data == -1) {
        res.setAttribute("style", "background-color: var(--card);");
        res.appendChild(document.createTextNode("Nessun risultato trovato..."));
      } else {
        var idf = JSON.parse(data).slice(0, 10); // Prende i primi 10 risultati
        for (const _film in idf) { // per ogni risultato crea una card nella div specificata
          const id = idf[_film].id;
          createCard(getOraInPalinsesto(id), 1, "div-results", true);
        }
      }
    });
    div.appendChild(res);
  }
}

function getOraInPalinsesto(id) { 
  // cerca il programma con id specificato, ritorna un oggetto con ora, id, poster e giorno in cui ?? stato trovato
  _ora = "";
  _poster = "";
  _giorno = "";
  palinsesto = JSON.parse(localStorage.getItem("palinsesto"));
  for (const giorno of getListaGiorni()) {
    for (let i = 0; i < canali.length; i += 2) {
      const canale = canali[i];
      const urlLogo = canali[i + 1];
      const giornata = palinsesto[giorno][canale];
      const res = giornata.find((o) => o.id == id);
      if (res != undefined && _poster == "" && _giorno == "") {
        _ora += res.ora;
        _poster += urlLogo;
        _giorno += giorno;
      }
    }
  }
  return { ora: _ora, id: id, poster: _poster, giorno: _giorno };
}

/*Le due funzioni seguenti differiscono solo per il file PHP a cui fanno richieste ma il loro comportamento ?? molto simile:
  comunicano tramite il metodo POST dei caratteri (o stringhe) affinch?? il server capisca cosa la funzione vuole e esaudisca la richiesta
*/
async function comunica() {
  let res = new Promise((success) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        success(this.responseText);
      }
    };
    xmlhttp.open("POST", "../profilo/profiloComunica.php", true);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send(
      "attr=" +
        arguments[0] +
        (arguments[1] != undefined ? "&value=" + arguments[1] : "") +
        (arguments[2] != undefined ? "&newvalue=" + arguments[2] : "")
    );
  });
  return await res;
}

async function comunicaDettaglio() {
  let res = new Promise((success) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        success(this.responseText);
      }
    };
    xmlhttp.open("POST", "dettaglioComunica.php", true);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send(
      "attr=" +
        arguments[0] +
        (arguments[1] != undefined ? "&value=" + arguments[1] : "")
    );
  });
  return await res;
}
