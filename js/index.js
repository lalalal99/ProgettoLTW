var arr = ["Trees.png", "landscape.png"];
length = 10;

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function inEvidenza() {
  var ul = document.getElementById("Evidenza_Lista");
  for (let i = 0; i < length; i++) {
    var li = document.createElement("li");

    var elem = document.createElement("img");
    elem.setAttribute("src", "imgs/" + choose(arr));
    elem.setAttribute("class", "locandina");

    li.appendChild(elem);
    ul.appendChild(li);
  }
}
