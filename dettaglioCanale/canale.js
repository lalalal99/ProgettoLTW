const canale = getParameterByName("id");
function startup() {
  logoCanale();
  programmi();
  createListaCanali();
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

function createListaCanali() {
  let div = document.getElementById("dropdown-canali");

  logo_canale = document.getElementById("logo-canale").getAttribute("src");
  let indexLogoImg = canali.indexOf(logo_canale);

  let btn = document.createElement("button");
  btn.setAttribute("class", "btn border-logo-dropdown");
  btn.setAttribute(
    "onclick",
    "location.href='../dettaglioCanale/canale.html?id=" +
      canali[indexLogoImg + 1] +
      "'"
  );
  btn.setAttribute("style", "background-color: var(--sfondo);");
  let logo = document.createElement("img");
  logo.setAttribute("src", canali[indexLogoImg + 2]);
  logo.setAttribute("height", 60);
  btn.appendChild(logo);
  div.appendChild(btn);

  btn = document.createElement("button");
  Object.assign(btn, {
    type: "button",
    class: "btn dropdown-toggle dropdown-toggle-split border",
    style: "border: 2px solid transparent; background-color: var(--sfondo);",
  });
  btn.setAttribute("data-bs-toggle", "dropdown");
  btn.setAttribute("aria-haspopup", "true");
  btn.setAttribute("aria-expanded", "false");
  btn.appendChild(document.createTextNode("\u25BC"));

  div.appendChild(btn);

  let ul = document.createElement("ul");
  ul.setAttribute("class", "dropdown-menu scrollable-menu");
  ul.setAttribute("aria-labelledby", "dropdownMenuButton");
  ul.setAttribute("id", "dropdown-list");

  for (let i = 1; i < canali.length; i += 2) {
    const imgURL = canali[i];
    let a = document.createElement("a");
    a.setAttribute(
      "href",
      "../dettaglioCanale/canale.html?id=" + canali[i - 1]
    );
    let li = document.createElement("li");
    li.setAttribute("class", "dropdown-item");
    // li.setAttribute(
    //   "onclick",
    //   `programmi('${giorno}');changeDropdownDay('${giorno}', true);`
    // );
    let img = document.createElement("img");
    Object.assign(img, {
      src: imgURL,
      height: 40,
    });
    li.appendChild(img);
    a.appendChild(li);
    ul.appendChild(a);
  }
  div.appendChild(ul);
}
