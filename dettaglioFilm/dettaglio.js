function popolaInfoFilm() {
  // Inserisce dinamicamente gli elementi nella pagina, ovviamente questo non è possibile farlo da HTML perché le informazioni cambiano per ogni programma
  imgLocandina = document.getElementById("imgLocandina");
  pTitolo = document.getElementById("pTitolo");
  pValutazione = document.getElementById("pValutazione");
  pStagioni = document.getElementById("pStagioni");
  pTrama = document.getElementById("pTrama");
  pSegui = document.getElementById("pSegui");
  getFilm("i", getParameterByName("id"), true) //Dato un id restituisce tutte le informazioni relative al programma
    .then((result) => {
      console.log(result);
      imgLocandina.setAttribute(
        //Se la locandina non è disponibile ne creiamo una dinamicamente con sfondo bianco, e titolo del film in nero grazie a viaplaceholder
        "src",
        result.Poster != "N/A"
          ? result.Poster
          : "https://via.placeholder.com/400x550/FFFFFF/000000?text=" +
              result.Title.replace(/ /g, "+")
      );
      pTitolo.appendChild(document.createTextNode(result.Title));
      if (result.Ratings.length > 0) //Se c'è una valutazione IMDB la inseriamo, altrimenti mettiamo NA
        pValutazione.appendChild(
          document.createTextNode(result.Ratings[0].Value)
        );
      else pValutazione.appendChild(document.createTextNode("NA"));
      if (result.Type == "series") { //Se il programma in questione è una serie stampiamo anche il numero totale di stagioni
        pStagioni.classList.remove("classe-nascosta");
        pStagioni.appendChild(
          document.createTextNode("Stagioni: " + result.totalSeasons)
        );
      }
      pTrama.appendChild(document.createTextNode(result.Plot));
      //Qui viene controllato se l'utente segue già quel programma, se si viene scritto "Smetti di seguire", altrimenti "Segui" nel divSegui (testo+pulsante RSS)
      //Ad esso poi viene associata anche una funzione diversa a seconda del caso che permette, sul click di seguire o smettere di seguire il programma
      comunicaDettaglio("s", result.imdbID).then((data) => {
        if (data == "seguito") {
          pSegui.innerHTML = "";
          pSegui.appendChild(document.createTextNode("Smetti di seguire"));
          document
            .getElementById("divSegui")
            .setAttribute("onclick", "return smetti()");
        } else if (data == "non seguito") {
          pSegui.innerHTML = "";
          pSegui.appendChild(document.createTextNode("Segui"));
          document
            .getElementById("divSegui")
            .setAttribute("onclick", "return segui()");
        }
      });
      popolaCast(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

function popolaCast(film) {
  var div = document.getElementById("divAttori");
  var arrAct = film.Actors.split(", "); //Gli attori vengono tornati in una stringa separati da virgola, questa istruzione splitta e mette i risultati in un array
  var row = document.createElement("div");
  row.setAttribute("class", "row row-cols-4 justify-content-around g-3");
  for (var i = 0; i < arrAct.length; i++) {
    const nome = arrAct[i].toLowerCase().replace(/ /g, "_"); //formatta il nome in minuscolo e rimpiazza gli spazi con '_'
    const nomeOriginale = arrAct[i]; //Salva il nome in formato originale
    const nomeWiki = arrAct[i].replace(/ /g, "_"); //Formatta il nome per creare il link alla pagina wikipedia dell'attore
    jQuery.ajax({
      //Fa una chiamata a IMDB tramite la sua API e torna degli oggetti che contengono, fra le altre cose, i nomi degli attori
      url: "https://sg.media-imdb.com/suggests/" + nome[0] + "/" + nome + ".json",
      dataType: "jsonp",
      cache: true,
      jsonp: false,
      jsonpCallback: "imdb$" + nome,
    })
      .then(function (results) {
        var col = document.createElement("div");
        col.setAttribute("class", "col p-2 justify-content-center align-items-center rounded");
        var a = document.createElement("a");
        a.setAttribute("href", "https://it.wikipedia.org/wiki/" + nomeWiki); //Crea il link alla pagina wikipedia dell'attore
        a.setAttribute("target", "_blank");
        if (Object.hasOwnProperty.call(results["d"][0], "i")) { //Se il risultato ha un attributo "i" (immagine)
          var img = document.createElement("img");
          img.setAttribute("src", results["d"][0]["i"][0]); //Allora mettiamo quell'immagine come locandina
          img.setAttribute("class", "d-block rounded ms-auto me-auto");
          img.setAttribute("style", "object-fit : cover;");
          img.setAttribute("width", 250);
          img.setAttribute("height", 350);
          a.appendChild(img); //"Incapsula" il link nell'immagine
          col.appendChild(a);
          var p = document.createElement("p");
          p.setAttribute("class", "text-center");
          p.appendChild(document.createTextNode(nomeOriginale)); //Inserisce il nome sotto all'immagine
          col.appendChild(p);
          row.appendChild(col);
        } else {
          var img = document.createElement("img");
          img.setAttribute( //Se non c'è l'immagine ne iseriamo una grigia di default presa da IMDB
            "src",
            "https://m.media-amazon.com/images/S/sash/9FayPGLPcrscMjU.png"
          );
          img.setAttribute("class", "d-block rounded ms-auto me-auto");
          img.setAttribute("style", "object-fit : cover;");
          img.setAttribute("width", 250);
          img.setAttribute("height", 350);
          a.appendChild(img);
          col.appendChild(a);
          var p = document.createElement("p");
          p.setAttribute("class", "text-center");
          p.appendChild(document.createTextNode(nomeOriginale));
          col.appendChild(p);
          row.appendChild(col);
        }
      });
  }
  div.appendChild(row);
}

function segui() {
  //Chiama una funzione PHP che va ad inserire nel DB un'associazione tra l'utente (se è loggato) e quel programma
  var film = getParameterByName("id");
  pSegui = document.getElementById("pSegui");
  comunicaDettaglio("l", film).then((data) => {
    if (data == -1) alert("Non sei loggato...");
    else {
      pSegui.innerHTML = "";
      pSegui.appendChild(document.createTextNode("Smetti di seguire"));
      document
        .getElementById("divSegui")
        .setAttribute("onclick", "return smetti()"); //Il prossimo click servirà per smettere di seguire il programma
    }
  });
}

function smetti() {
  //Funzione duale a segui()
  var film = getParameterByName("id");
  pSegui = document.getElementById("pSegui");
  comunicaDettaglio("r", film).then((data) => { //Funzione presente nel file importato utilities.js che permette di comunicare col server passando le info dal php
    if (data == -1) alert("Qualcosa è andato storto...");
    else {
      pSegui.innerHTML = "";
      pSegui.appendChild(document.createTextNode("Segui"));
      document
        .getElementById("divSegui")
        .setAttribute("onclick", "return segui()");
    }
  });
}
