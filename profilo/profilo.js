function popolaCampi() {
  //Attraverso la funzione comuniva prende i vari campi dalla sessione PHP e li setta nelle input text
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
  //Fa sì che lo sfondo dell'immagine del profilo sia uguale a quello dell'immagine nella navbar
  document.getElementById("imgProfilo").setAttribute("src", $("#imgProfNav").attr("src"));
}
function abilitaModifica(elem) {
  //Abilita le input text e mostra i bottoni
  if (elem == "username") {
    document.getElementById("txtUsernameProf").disabled = false;
    var e = document.getElementsByName("btnUsr"); //Per comodità ad alcuni elementi è stato dato lo stesso nome così da scrivere meno codice per renderli visibili
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
  //Funzione duale all'abilitaModifica
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
  // Permette la modifica dello username
  var x = document.getElementById("txtUsernameProf").value;
  document.getElementById("btnSalvaUsername").setAttribute("style", "display : none;");
  document.getElementById("btnAnnullaUsername").setAttribute("style", "display : none;");
  comunica("newName", x).then((data) => { //Attraverso la funzione comunica viene cambiato il valore username di quell'utente nel DB
    if (data == -1) alert("Modifica non effettuata");
    else {
      document.getElementById("txtUsernameProf").value = data;
      document.getElementById("imgProfilo").setAttribute("src", "https://via.placeholder.com/200x200/" + getColoreCasuale() + "/000000?text=" + data[0].toUpperCase());
      //Vengono cambiati i valori nell'input text e aggiornata l'immagine di profilo con la nuova lettera
    }
  });
  document.getElementById("txtUsernameProf").disabled = true; //Viene ri-disabilitata la input text
}

function modificaPassword() {
  // Permette la modifica della apssword
  var pc = document.getElementById("txtPasswordCorrente").value;
  var np = document.getElementById("txtNuovaPassword").value;
  var cnp = document.getElementById("txtConfermaPassword").value;
  if (np == cnp) { //Controlla che la nuova psw corrisponda a quella chiesta come conferma
    comunica("newPass", pc, np).then((data) => {
      if (data == -1) alert("Modifica non effettuata");
      else document.getElementById("txtPasswordCorrente").value = data; //Setta il valore della inpu text con la nuova psw
    });
  } else alert("Le password  non coincidono"); //Altrimenti dice che le due password non coincidono attraverso un alert
  var e = document.getElementsByName("txtPsw");
  for (i = 0; i < e.length; i++) e[i].classList.add("classe-nascosta"); //Ri-nasconde i campi necessari alla modifica sicura della password
  document.getElementById("btnSalvaPassword").classList.add("classe-nascosta");
}

function popolaSeguiti() {
  //Popola il div dei programmi seguiti
  var div = document.getElementById("divSeguiti");
  div.innerHTML = "";
  var row = document.createElement("div");
  row.setAttribute("class", "row row-cols-4 justify-content-around g-3");
  comunica("seguiti").then((data) => {
    if (data == "-1") { //Se la query sul DB non da risultati comunica che la lista dei seguiti è vuota
      var p = document.createElement("p");
      p.appendChild(
        document.createTextNode("La tua lista dei seguiti è vuota")
      );
      div.appendChild(p);
    } else { //Altrimenti
      var idf = JSON.parse(data); //Prende la lista dei seguiti
      for (const _id in idf) {
        const id = idf[_id].film;
        getFilm("i", id).then((film) => { //Dall'id del film ricava tutte le info necessarie
          var col = document.createElement("div");
          col.setAttribute("class", "col col-auto p-2 colonna rounded");
          var a = document.createElement("a");
          a.setAttribute("href", "../dettaglioFilm/dettaglio.html?id=" + id); //Crea un link per andare nella pagina del film per maggiori info
          var img = document.createElement("img");
          img.setAttribute(
            "src",
            film["Poster"] != "N/A"
              ? film.Poster
              : "https://via.placeholder.com/250x350/FFFFFF/000000?text=" +
                  film.Title.replace(/ /g, "+") //Se la locandina non c'è la crea attraverso viaplaceholder
          );
          img.setAttribute("class", "ms-2 image rounded");
          img.setAttribute("width", 250);
          img.setAttribute("height", 350);
          a.appendChild(img);
          col.appendChild(a);
          var dMiddle = document.createElement("div");
          dMiddle.setAttribute("class", "middle rounded");

          var dText = document.createElement("div"); //Crea il rettangolo inferiore che compare quando si passa il cursore sull'immagine
          dText.setAttribute("class", "text rounded-bottom");
          dText.setAttribute("onclick", "smetti('" + id + "');"); //Se si clicca su questo rettangolo viene chiamata la funzione smetti
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
  //Permette all'utente di non seguire più un programma
  comunica("r", film).then((data) => {
    if (data == -1) alert("Qualcosa è andato storto...");
    else popolaSeguiti(); //Ri-lancia popolaSeguiti così da aggiornare la parte relativa ai seguiti che non conterrà più il programma appena tolto
  });
}
