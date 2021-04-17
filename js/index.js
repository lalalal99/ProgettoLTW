// var arr
// var arr = ["Trees.png", "landscape.png"];
// length = 10;

// function choose(choices) {
//   var index = Math.floor(Math.random() * choices.length);
//   return choices[index];
// }

searchphrase = "hello";

function startup() {
  addScript(
    "https://sg.media-imdb.com/suggests/" +
      searchphrase[0] +
      "/" +
      searchphrase +
      ".json"
  );
}

function addScript(src) {
  var s = document.createElement("script");
  s.src = src;
  document.head.appendChild(s);
}

window["imdb$" + searchphrase] = Evidenza;

function Evidenza(results) {
  var ul = document.getElementById("Evidenza_Lista");
  for (let i = 0; i < results["d"].length; i++) {
    var li = document.createElement("li");

    var elem = document.createElement("img");
    elem.setAttribute("src", results["d"][i]["i"][0]);
    // elem.setAttribute("src", "imgs/" + choose(arr));
    elem.setAttribute("class", "locandina");

    li.appendChild(elem);
    ul.appendChild(li);
  }
}
