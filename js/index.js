// var arr
// var arr = ["Trees.png", "landscape.png"];
// length = 10;

// function choose(choices) {
//   var index = Math.floor(Math.random() * choices.length);
//   return choices[index];
// }
OMDb_API = "9e44c172";
function startup() {
  query = "hello";
  richiesta(query);
}

function generaQuery(name) {
  return "http://www.omdbapi.com/?apikey=" + OMDb_API + "&t=" + name;
}

function richiesta(src) {
  var a = getFilm("inception");
  console.log(a);

  // jQuery
  //   .ajax({
  //     // url: generaQuery(src),
  //     url: "http://www.omdbapi.com/?apikey=9e44c172&t=inception",
  //     dataType: "json",
  //     cache: true,
  //   })
  //   .then(Evidenza);
}

function getFilm(src) {
  //Ritorna un dizionario con le informazione del film src
  var value = $.ajax({
    url: generaQuery(src),
    async: false,
  }).responseText;
  return JSON.parse(value);
}

function Evidenza(results) {
  var ul = document.getElementById("Evidenza_Lista");
  for (let i = 0; i < results["d"].length; i++) {
    var li = document.createElement("li");

    var elem = document.createElement("img");
    elem.setAttribute("src", results["d"][i]["i"]);
    elem.setAttribute("class", "locandina");

    li.appendChild(elem);
    ul.appendChild(li);
  }
  console.log(results);
}
