OMDb_API = "9e44c172";
// OMDb_API = "75cb83e8";

function startup() {
  grigliaCanali();
  serata("prima");
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

function serata(tipoSerata) {
  generaPalinsesto().then(function (palinsesto) {
    console.log(palinsesto);
    // $("#serata-lista").html = "";
    document.getElementById("serata-lista").innerHTML = "";
    generaSerata(tipoSerata, palinsesto);
    generaEvidenza(palinsesto);
  });
}

async function generaEvidenza(palinsesto) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(500);

  let div = document.getElementById("div-evidenza");
  div.innerHTML = "";

  //metti iconcina caricamento
  let _best = []; //{id: "", poster: "", rating: ""}

  let ratings = document.getElementsByName("rating");
  let imgs = document.getElementsByName("card-img");

  for (let i = 0; i < ratings.length; i++) {
    let obj = {
      id: imgs[i].alt,
      rating: ratings[i].innerHTML != "N/A" ? ratings[i].innerHTML : "0",
      poster: imgs[i].src,
    };
    _best.push(obj);
  }
  let best = _best.sort((a, b) => b.rating - a.rating).slice(0, 5);

  for (let i = 0; i < 5; i++) {
    let a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + best[i].id);
    let img = document.createElement("img");
    img.setAttribute("src", best[i].poster);
    img.setAttribute("style", "width : 250px; height : 350px");
    a.appendChild(img);
    div.appendChild(a);
  }
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
  elem.setAttribute("class", "img-thumbnail");

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
  for (let i = 0; i < 10; i += 2) {
    if (serata == "x") {
      aggiungiElementoSerata(i, palinsesto, 0);
      aggiungiElementoSerata(i + 1, palinsesto, 1);
    } else {
      aggiungiElementoSerata(i, palinsesto, serata);
    }
  }
}

function aggiungiElementoSerata(indiceCanale, palinsesto, serata) {
  //           palinsesto[dataDaIndexPhpSelezioneMultipla][canale][isPrimaSerata ? "21:20" : "quelloDopo"];
  getFilm(
    "i",
    palinsesto["Oggi"][canali[serata == 0 ? indiceCanale : indiceCanale - 1]][
      serata
    ]["id"],
    false
  ).then((film) => {
    // console.log(film);
    let container = document.getElementById("serata-lista");
    let card = document.createElement("div");
    card.setAttribute("class", "card mb-3");
    card.setAttribute("style", "order:" + indiceCanale);

    let card_header = document.createElement("div");
    card_header.setAttribute("class", "card-header d-flex align-items-center");
    let img = document.createElement("img");
    Object.assign(img, {
      src: canali[serata == 0 ? indiceCanale + 1 : indiceCanale],
      style: "max-width: 4rem;",
    });
    card_header.appendChild(img);

    let ora = document.createElement("h3");
    ora.setAttribute("class", "card-text ms-auto");
    ora.appendChild(
      document.createTextNode(
        palinsesto["Oggi"][
          canali[serata == 0 ? indiceCanale : indiceCanale - 1]
        ][serata]["ora"]
      )
    );
    card_header.appendChild(ora);

    card.appendChild(card_header);

    let row = document.createElement("div");
    row.setAttribute("class", "row g-0");

    let col = document.createElement("div");
    col.setAttribute(
      "class",
      "col-lg-4 d-flex justify-content-start align-items-center p-3"
    );
    img = document.createElement("img");
    Object.assign(img, {
      src:
        film["Poster"] != "N/A"
          ? film["Poster"]
          : "https://via.placeholder.com/300x500/FFFFFF/000000?text=" +
            film.Title.replace(/ /g, "+"),
      // : "https://ih1.redbubble.net/image.512138487.5983/fposter,small,wall_texture,product,750x1000.u3.jpg",
      class: "card-img",
      alt: film.imdbID,
      style: "overflow:cover;", //width : 250px; height : 350px",
      name: "card-img",
    });
    col.appendChild(img);
    row.appendChild(col);

    col = document.createElement("div");
    col.setAttribute("class", "col-lg-8");

    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body text-success");

    let h4 = document.createElement("h2");
    h4.setAttribute("class", "card-title");
    h4.appendChild(document.createTextNode(film["Title"]));
    card_body.appendChild(h4);

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
