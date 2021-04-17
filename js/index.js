OMDb_API = "9e44c172";
items = [
  "inception",
  "iron_man",
  "john_wick",
  "wandavision",
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "Pulp Fiction",
  "The Dark Knight",
  "The Lord of the Rings: The Return of the King",
  "Fight Club",
];

function startup() {
  generaEvidenza();
  generaSerata();
}

function generaEvidenza() {
  evidenzaLenght = 20;
  for (let i = 0; i < evidenzaLenght; i++) {
    film = getFilm(getRandomTitle());
    console.log(film);
    aggiungiEvidenza(film);
  }
}

function getRandomTitle() {
  return items[Math.floor(Math.random() * items.length)];
}

function getFilm() {
  //Ritorna un dizionario con le informazione del film src
  var value = $.ajax({
    url: generaQuery(arguments[0], arguments[1]),
    async: false,
  }).responseText;
  return JSON.parse(value);
}

function generaQuery() {
  //genere link con titolo e eventuale true or false per trama lunga
  var string =
    "http://www.omdbapi.com/?apikey=" + OMDb_API + "&t=" + arguments[0];
  if (arguments[1] == true) {
    string += "&plot=full";
  }

  return string;
}

function aggiungiEvidenza(film) {
  var ul = document.getElementById("Evidenza_Lista");
  var li = document.createElement("li");
  li.setAttribute("class", "elementoEvidenza");

  var elem = document.createElement("img");
  elem.setAttribute("src", film["Poster"]);
  elem.setAttribute("class", "locandina");

  li.appendChild(elem);
  ul.appendChild(li);
}

function generaSerata() {
  listaCanali = [
    "Rai 1",
    "Rai 2",
    "Rai 3",
    "Rete 4",
    "Canale 5",
    "Italia Uno",
    "La Sette",
    "tv8",
    "nove",
  ];
  for (let i = 0; i < listaCanali.length; i++) {
    aggiungiElementoSerata(listaCanali[i]);
  }
}

function aggiungiElementoSerata(canale) {
  var film = getFilm(getRandomTitle());
  var ul = document.getElementById("Serata_Lista");
  var li = document.createElement("li");

  var div = document.createElement("div");
  div.setAttribute("class", "card");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "card_titolo_immagine");

  var tmp = document.createElement("h2");
  tmp.appendChild(document.createTextNode(canale));
  div2.appendChild(tmp);

  tmp = document.createElement("img");
  tmp.setAttribute("src", film["Poster"]);
  tmp.setAttribute("class", "prima_serata");
  div2.appendChild(tmp);
  div.appendChild(div2);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "card_txt");
  tmp = document.createElement("h4");
  tmp.setAttribute("class", "Titolo");
  tmp.appendChild(document.createTextNode(film["Title"]));
  div1.appendChild(tmp);
  tmp = document.createElement("h4");
  tmp.setAttribute("class", "Durata");
  tmp.appendChild(document.createTextNode(film["Runtime"]));
  div1.appendChild(tmp);

  tmp = document.createElement("p");
  tmp.appendChild(document.createTextNode(film["Plot"]));
  tmp.setAttribute("class", "Trama");
  div1.appendChild(tmp);

  div.appendChild(div1);

  li.appendChild(div);
  ul.appendChild(li);
}
