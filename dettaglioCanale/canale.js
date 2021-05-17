const canale = getParameterByName("id");
function startup() {
  logoCanale();
  programmi();
}

function logoCanale() {
  let index = canali.indexOf(canale) + 1;
  let imglogo = document.getElementById("logo-canale");
  imglogo.setAttribute("src", canali[index]);
  imglogo.setAttribute("height", this.clientWidth < 200 ? 150 : 100);
}

function programmi(giorno = "Oggi") {
  let giornata = JSON.parse(localStorage.getItem("palinsesto"))[giorno][canale];
  giornata.sort(function (a, b) {
    var keyA = a.ora,
      keyB = b.ora;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  let container = document.getElementById("div-programmi");
  container.innerHTML = "";

  for (const index in giornata) {
    const programma = giornata[index];
    createCard(programma, index);
  }
}

function createCard(programma, order) {
  const id = programma.id,
    ora = programma.ora;

  let container = document.getElementById("div-programmi");
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

    h3 = document.createElement("h3");
    h3.setAttribute("class", "card-text");
    h3.appendChild(document.createTextNode(ora));
    divTitoloOra.appendChild(h3);

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
