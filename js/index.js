function startup() {
  grigliaCanali();
  serata("prima");
}

function serata(tipoSerata) {
  generaPalinsesto().then(function (palinsesto) {
    console.log(palinsesto);
    // $("#serata-lista").html = "";
    document.getElementById("serata-lista").innerHTML = "";
    generaSerata(tipoSerata, palinsesto);
    generaEvidenza();
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
    if (serata == "x") {
      aggiungiElementoSerata(i, palinsesto, 0);
      aggiungiElementoSerata(i, palinsesto, 1);
    } else {
      aggiungiElementoSerata(i, palinsesto, serata);
    }
  }
}

function aggiungiElementoSerata(indiceCanale, palinsesto, serata) {
  //           palinsesto[dataDaIndexPhpSelezioneMultipla][canale][isPrimaSerata ? "21:20" : "quelloDopo"];
  getFilm(
    "i",
    palinsesto["Oggi"][canali[indiceCanale]][serata]["id"],
    false
  ).then((film) => {
    // console.log(film);
    let container = document.getElementById("serata-lista");
    let card = document.createElement("div");
    card.setAttribute("class", "card mb-3 order-" + indiceCanale / 2);

    let card_header = document.createElement("div");
    card_header.setAttribute("class", "card-header d-flex align-items-center");
    let img = document.createElement("img");
    Object.assign(img, {
      src: canali[indiceCanale + 1],
      style: "max-width: 4rem;",
    });
    card_header.appendChild(img);

    let ora = document.createElement("h3");
    ora.setAttribute("class", "card-text ms-auto");
    ora.appendChild(
      document.createTextNode(
        palinsesto["Oggi"][canali[indiceCanale]][serata]["ora"]
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
    let a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id="+film.imdbID);
    img = document.createElement("img");
    Object.assign(img, {
      src:
        film["Poster"] != "N/A"
          ? film["Poster"]
          : "https://ih1.redbubble.net/image.512138487.5983/fposter,small,wall_texture,product,750x1000.u3.jpg",
      class: "card-img",
      alt: "...",
      style: "width : 250px; height : 350px",
    });
    a.appendChild(img)
    col.appendChild(a);
    row.appendChild(col);

    col = document.createElement("div");
    col.setAttribute("class", "col-lg-8");

    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body text-success");

    a = document.createElement("a");
    a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id="+film.imdbID);
    a.setAttribute("style", "text-decoration : none;")
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
      src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/640px-IMDB_Logo_2016.svg.png",
      style: "height: 20px;",
    });
    div.appendChild(img);

    p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.setAttribute("name", "rating");
    if (film.Ratings.length > 0) {
      p.appendChild(document.createTextNode(film.Ratings[0].Value));
    } else {
      p.appendChild(document.createTextNode("NaN"));
    }
    // console.log(film.Ratings[0].Value.slice(film.Ratings[0].Value.length - 3));
    div.appendChild(p);

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
