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
  let palinsesto = JSON.parse(localStorage.getItem("palinsesto"));

  for (const index in palinsesto[giorno][canale]) {
    const programma = palinsesto[giorno][canale][index];
    createCard(programma);
  }
}

function createCard(programma) {
  console.log(programma);
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  
}
