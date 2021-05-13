OMDb_API = "9e44c172";
// OMDb_API = "75cb83e8";

async function getFilm(key, value, fullPlot = false) {
    //Ritorna un dizionario con le informazione del film src
    var url =
      "http://www.omdbapi.com/?apikey=" +
      OMDb_API +
      "&" +
      key +
      "=" +
      value +
      (fullPlot ? "&plot=full" : "");
  
    var value = new Promise(function (success) {
      $.ajax(url).then(function (res) {
        success(res);
      });
    });
  
    return await value;
  }