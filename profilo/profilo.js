function popolaCampi() {
  comunica("email").then((data) => {
    document.getElementById("txtEmailProf").value = data;
  });
  comunica("password").then((data) => {
    document.getElementById("txtPasswordProf").value = data;
  });
  comunica("username").then((data) => {
    document.getElementById("txtUsernameProf").value = data;
  });
  popolaSeguiti();
}
function setColoreImmagine() {
  document
    .getElementById("imgProfilo")
    .setAttribute("src", $("#imgProfNav").attr("src"));
}
function abilitaModifica(elem) {
  if (elem == "username") {
    document.getElementById("txtUsernameProf").disabled = false;
    var e = document.getElementsByName("btnUsr");
    for (i = 0; i < e.length; i++) e[i].classList.remove("classe-nascosta");
  } else if (elem == "password") {
    var e = document.getElementsByName("txtPsw");
    for (i = 0; i < e.length; i++) e[i].classList.remove("classe-nascosta");
    e = document.getElementsByName("collab");
    for (i = 0; i < e.length; i++)
      e[i].classList.replace("text-center", "text-end");
  }
}

function annullaModifica(elem) {
  if (elem == "username") {
    document.getElementById("txtUsernameProf").disabled = true;
    var e = document.getElementsByName("btnUsr");
    for (i = 0; i < e.length; i++) e[i].classList.add("classe-nascosta");
  } else {
    var e = document.getElementsByName("txtPsw");
    for (i = 0; i < e.length; i++) e[i].classList.add("classe-nascosta");
    e = document.getElementsByName("collab");
    for (i = 0; i < e.length; i++)
      e[i].classList.replace("text-end", "text-center");
  }
}
function modificaUsername() {
  var x = document.getElementById("txtUsernameProf").value;
  document
    .getElementById("btnSalvaUsername")
    .setAttribute("style", "display : none;");
  document
    .getElementById("btnAnnullaUsername")
    .setAttribute("style", "display : none;");
  comunica("newName", x).then((data) => {
    if (data == -1) alert("Modifica non effettuata");
    else {
      document.getElementById("txtUsernameProf").value = data;
      document
        .getElementById("imgProfilo")
        .setAttribute(
          "src",
          "https://via.placeholder.com/200x200/" +
            getColoreCasuale() +
            "/000000?text=" +
            data[0].toUpperCase()
        );
    }
  });
  document.getElementById("txtUsernameProf").disabled = true;
}

function modificaPassword() {
  var pc = document.getElementById("txtPasswordCorrente").value;
  var np = document.getElementById("txtNuovaPassword").value;
  var cnp = document.getElementById("txtConfermaPassword").value;
  if (np == cnp) {
    comunica("newPass", pc, np).then((data) => {
      if (data == -1) alert("Modifica non effettuata");
      else document.getElementById("txtPasswordCorrente").value = data;
    });
  } else alert("Le password  non coincidono");
  var e = document.getElementsByName("txtPsw");
  for (i = 0; i < e.length; i++) e[i].classList.add("classe-nascosta");
  document.getElementById("btnSalvaPassword").classList.add("classe-nascosta");
}

function popolaSeguiti() {
  var div = document.getElementById("divSeguiti");
  div.innerHTML = "";
  var row = document.createElement("div"); //A
  row.setAttribute("class", "row row-cols-4 justify-content-around g-3"); //A
  comunica("seguiti").then((data) => {
    if (data == "-1") {
      var p = document.createElement("p");
      p.appendChild(
        document.createTextNode("La tua lista dei seguiti è vuota")
      );
      div.appendChild(p);
    } else {
      var idf = JSON.parse(data);
      for (const _id in idf) {
        // var col = document.createElement("div");
        // col.setAttribute("class", "col p-2 d-flex justify-content-center align-items-center shadow-sm rounded");
        const id = idf[_id].film;
        getFilm("i", id).then((film) => {
          var col = document.createElement("div");
          col.setAttribute("class", "col col-auto p-2 colonna rounded");
          var a = document.createElement("a");
          a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + id);
          var img = document.createElement("img");
          img.setAttribute(
            "src",
            film["Poster"] != "N/A"
              ? film.Poster
              : "https://via.placeholder.com/250x350/FFFFFF/000000?text=" +
                  film.Title.replace(/ /g, "+")
          );
          img.setAttribute("class", "ms-2 image rounded"); //A: image
          img.setAttribute("width", 250);
          img.setAttribute("height", 350);
          a.appendChild(img);
          col.appendChild(a);
          var dMiddle = document.createElement("div");
          dMiddle.setAttribute("class", "middle rounded");

          var dText = document.createElement("div");
          dText.setAttribute("class", "text rounded-bottom");
          dText.setAttribute("onclick", "smetti('" + id + "');");
          dText.innerHTML = "Smetti di seguire";
          dMiddle.appendChild(dText);
          col.appendChild(dMiddle);
          row.appendChild(col);
        });
      }
      div.appendChild(row);
    }
  });
}

function smetti(film) {
  comunica("r", film).then((data) => {
    if (data == -1) alert("Qualcosa è andato storto...");
    else popolaSeguiti();
  });
}

// function cercaDaSeguire() {
//   // document.getElementById("srcInput").value.toLowerCase();
//   comunica("s", document.getElementById("srcInput").value).then((data) => {
//     if (data == -1) alert("Nessun risultato trovato...");
//     else{
//       var idf = JSON.parse(data);
//       console.log(idf);
//       for (const _film in idf) {
//         const id = idf[_film].id;
//         console.log(id);
//         // console.log(idf[_id].film);
//       }
//     }
//   });
// }

function cercaDaSeguire() {
  let div = document.getElementById("search-screen");
  div.removeChild(div.lastChild);
  let res = document.createElement("div");
  res.setAttribute("id", "div-results");
  res.setAttribute(
    "class",
    "container w-50 ms-auto me-auto mt-5 p-2"
  );
  comunica("s", document.getElementById("srcInput").value).then((data) => {
    if (data == -1)
      res.appendChild(document.createTextNode("Nessun risultato trovato..."));
    else {
      var idf = JSON.parse(data).slice(0, 10);
      console.log(idf);
      for (const _film in idf) {
        const id = idf[_film].id;
        getFilm("i", id).then((film) => {
          createCard({ ora: "21:20", id: film.imdbID }, 1, "div-results");
        });
        // console.log(idf[_id].film);
      }
    }
  });
  div.appendChild(res);
}
async function comunica() {
  let res = new Promise((success) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        success(this.responseText);
        // document.getElementById("txtEmailProf").value = this.responseText;
      }
    };
    xmlhttp.open("POST", "profiloComunica.php", true);
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
