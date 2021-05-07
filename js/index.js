OMDb_API = "9e44c172";
// OMDb_API = "75cb83e8";

function startup() {
  grigliaCanali();
  serata("prima");
}

function serata(tipoSerata) {
  generaPalinsesto().then(function (palinsesto) {
    // $("#serata-lista").html = "";
    document.getElementById("serata-lista").innerHTML = "";
    generaEvidenza();
    generaSerata(tipoSerata, palinsesto);
  });
}

function grigliaCanali() {
  let container = document.getElementById("container-griglia-canali");
  let row = document.createElement("div");
  row.setAttribute("class", "row row-cols-3 justify-content-start g-3");

  for (let i = 1; i < canali.length; i += 2) {
    let col = document.createElement("div");
    col.setAttribute(
      "class",
      "col p-2 d-flex justify-content-center align-items-center shadow-sm rounded"
    );

    let a = document.createElement("a");
    a.setAttribute("href", "#");

    let img = document.createElement("img");
    img.setAttribute("src", canali[i]);
    // img.setAttribute("width", 50);
    img.setAttribute("height", 40);

    a.appendChild(img);
    col.appendChild(a);
    row.appendChild(col);
  }

  container.appendChild(row);
}

function generaEvidenza() {
  evidenzaLenght = 10;
  // for (let i = 0; i < evidenzaLenght; i++) {
  //   film = getFilm("t", getRandomTitle());
  //   aggiungiEvidenza(film);
  // }
}

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

function generaSerata(tipoSerata, palinsesto) {
  let serata =
    tipoSerata == "prima"
      ? 0
      : tipoSerata == "seconda"
      ? 1
      : tipoSerata == "unica"
      ? "x"
      : "";

  //prima serata 0 seconda serata 1 unificata 0 e 1

  // for (let i = 0; i < canali.length; i += 2) {
  for (let i = 0; i < 6; i += 2) {
    aggiungiElementoSerata(i, palinsesto, serata);
  }
}

function aggiungiElementoSerata(indiceCanale, palinsesto, serata) {
  //           palinsesto[dataDaIndexPhpSelezioneMultipla][canale][isPrimaSerata ? "21:20" : "quelloDopo"];
  getFilm(
    "i",
    palinsesto["Oggi"][canali[indiceCanale]][serata]["id"],
    false
  ).then((film) => {
    let container = document.getElementById("serata-lista");
    let card = document.createElement("div");
    card.setAttribute("class", "card mb-3 order-" + indiceCanale / 2);

    let card_header = document.createElement("div");
    card_header.setAttribute("class", "card-header");
    let img = document.createElement("img");
    Object.assign(img, {
      src: canali[indiceCanale + 1],
      style: "max-width: 4rem;",
    });
    card_header.appendChild(img);
    card.appendChild(card_header);

    let row = document.createElement("div");
    row.setAttribute("class", "row no-gutters");

    let col = document.createElement("div");
    col.setAttribute("class", "col-md-4 mb-3");
    img = document.createElement("img");
    Object.assign(img, {
      src:
        film["Poster"] != "N/A"
          ? film["Poster"]
          : "https://ih1.redbubble.net/image.512138487.5983/fposter,small,wall_texture,product,750x1000.u3.jpg",
      class: "card-img embed-responsive-item",
      alt: "...",
      style: "width : 300px; height : 400px",
    });
    col.appendChild(img);
    row.appendChild(col);

    col = document.createElement("div");
    col.setAttribute("class", "col-md-8");

    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body text-success");

    let h4 = document.createElement("h2");
    h4.setAttribute("class", "card-title");
    h4.appendChild(document.createTextNode(film["Title"]));
    card_body.appendChild(h4);

    let p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.appendChild(document.createTextNode(film["Runtime"]));
    card_body.appendChild(p);

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
