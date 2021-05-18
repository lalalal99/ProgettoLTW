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
    createCard(programma, index, "div-programmi");
  }
}
