OMDb_API = "9e44c172";

function startup() {
  var t0 = performance.now();

  generaPalinsesto().then(function (palinsesto) {
    console.log("then palinsesto", palinsesto);
    var t1 = performance.now();
    console.log(
      "Call to create palinsesto took " + (t1 - t0) / 1000 + " seconds."
    );
    generaEvidenza();
    generaSerata(palinsesto);
  });
}

function generaEvidenza() {
  evidenzaLenght = 10;
  // for (let i = 0; i < evidenzaLenght; i++) {
  //   film = getFilm("t", getRandomTitle());
  //   aggiungiEvidenza(film);
  // }
}

// function getRandomTitle() {
//   return items[Math.floor(Math.random() * items.length)];
// }

async function getFilm(key, value, fullPlot = false) {
  //Ritorna un dizionario con le informazione del film src
  var url =
    "http://www.omdbapi.com/?apikey=" +
    OMDb_API +
    "&" +
    key +
    "=" +
    value +
    (fullPlot ? "&plot=full" : "");

  var value = new Promise(function (success) {
    $.ajax(url).then(function (res) {
      success(res);
    });
  });

  return await value;
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

function generaSerata(palinsesto) {
  // console.log(canali);
  // aggiungiElementoSerata(canali[0], palinsesto);
  // for (let i = 0; i < canali.length; i++) {
  //   aggiungiElementoSerata(canali[i], palinsesto);
  // }
}

function aggiungiElementoSerata(canale, palinsesto) {
  // console.log(palinsesto["Oggi"][canale]["21:20"]);
  getFilm("i", palinsesto["01/05"][canale]["21:20"], false).then(function (
    film
  ) {
    console.log(film);
    var ul = document.getElementById("Serata_Lista");
    var li = document.createElement("li");
    li.setAttribute("class", "elem_lista");

    var div = document.createElement("div");
    div.setAttribute("class", "card");

    var div2 = document.createElement("div");
    div2.setAttribute("class", "card_titolo_immagine");

    var tmp = document.createElement("img");
    tmp.setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Rai_1_-_Logo_2016.svg/1200px-Rai_1_-_Logo_2016.svg.png"
    );
    tmp.setAttribute("class", "txt_canale");
    // tmp.appendChild(document.createTextNode(canale));
    div2.appendChild(tmp);

    var link = document.createElement("a");
    link.setAttribute(
      "href",
      "https://www.imdb.com/title/" + film["imdbID"] + "/"
    );

    tmp = document.createElement("img");
    tmp.setAttribute(
      "src",
      film["Poster"] != "N/A"
        ? film["Poster"]
        : "https://ih1.redbubble.net/image.512138487.5983/fposter,small,wall_texture,product,750x1000.u3.jpg"
    );
    tmp.setAttribute("class", "prima_serata");

    link.appendChild(tmp);
    div2.appendChild(link);
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
  });
}
