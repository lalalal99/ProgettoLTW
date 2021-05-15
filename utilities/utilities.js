const canali = [
  "Rai 1",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Rai_1_-_Logo_2016.svg/1200px-Rai_1_-_Logo_2016.svg.png",
  "Rai 2",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rai_2_-_Logo_2016.svg/512px-Rai_2_-_Logo_2016.svg.png",
  "Rai 3",
  "https://upload.wikimedia.org/wikipedia/it/thumb/5/5c/Logo_Rai_3_2010.svg/1200px-Logo_Rai_3_2010.svg.png",
  "Rete 4",
  "https://upload.wikimedia.org/wikipedia/it/thumb/c/c0/Rete_4_-_Logo_2018.svg/1040px-Rete_4_-_Logo_2018.svg.png",
  "Canale 5",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Canale_5_-_2018_logo.svg/1200px-Canale_5_-_2018_logo.svg.png",
  "Italia 1",
  "https://upload.wikimedia.org/wikipedia/it/thumb/3/30/Logo_Italia_1.svg/1024px-Logo_Italia_1.svg.png",
  "La7",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/LA7_-_Logo_2011.svg/1200px-LA7_-_Logo_2011.svg.png",
  "NOVE",
  "https://upload.wikimedia.org/wikipedia/it/0/0f/NOVE_TV_logo_2017.png",
  "Rai 4",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rai_4_-_Logo_2016.svg/1024px-Rai_4_-_Logo_2016.svg.png",
  "IRIS",
  "https://upload.wikimedia.org/wikipedia/it/archive/c/cd/20201003114059%21Logo_Iris_TV.png",
  "Rai 5",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Rai_5_logo.svg/1280px-Rai_5_logo.svg.png",
  "Rai Movie",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Rai_Movie_-_Logo_2017.svg/1280px-Rai_Movie_-_Logo_2017.svg.png", //solo film
  "Rai Premium",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rai_Premium_-_Logo_2017.svg/1200px-Rai_Premium_-_Logo_2017.svg.png",
  "Paramount Network",
  "https://upload.wikimedia.org/wikipedia/it/1/1d/Paramount_Network.png", //solo film
  "La 5",
  "https://upload.wikimedia.org/wikipedia/it/thumb/6/64/La5_Italy.svg/640px-La5_Italy.svg.png",
  "Mediaset Extra",
  "https://upload.wikimedia.org/wikipedia/it/c/c1/Mediaset_Extra_logo.PNG",
  "Giallo",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Giallo_-_Logo_2014.svg/1280px-Giallo_-_Logo_2014.svg.png", //genere crime
  "Top Crime",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Top_Crime_-_Logo_2013.svg/1280px-Top_Crime_-_Logo_2013.svg.png", //genere crime
  "Boing",
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Boing_2020.png", //solo animazione
  "Rai YoYo",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Rai_Yoyo_-_Logo_2017.svg/1280px-Rai_Yoyo_-_Logo_2017.svg.png", //solo animazione
  "DMAX",
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Dmax.png",
  "Rai Sport",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Rai_Sport_-_Logo_2017.svg/1280px-Rai_Sport_-_Logo_2017.svg.png", //genere sport
  "Italia 2",
  "https://upload.wikimedia.org/wikipedia/it/thumb/c/c5/Logo_Italia2.svg/1200px-Logo_Italia2.svg.png",
  "Rai Storia",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Rai_Storia_-_Logo_2017.svg/512px-Rai_Storia_-_Logo_2017.svg.png", //solo documentari
  "Rai Scuola",
  "https://www.lamiascuoladifferente.it/wp-content/uploads/2020/03/logo_rai2.png", //solo documentari
];

function getListaGiorni() {
  var listaGiorni = [];
  function stringaData(data) {
    var dd = String(data.getDate()).padStart(2, "0");
    var mm = String(data.getMonth() + 1).padStart(2, "0");
    // var yyyy = today.getFullYear();
    return dd + "/" + mm;
  }

  for (let offset = -7; offset < 7; offset++) {
    var today = new Date();
    today.setDate(today.getDate() + offset);

    if (offset == 0) today = "Oggi";
    else if (offset == 1) today = "Domani";
    else today = stringaData(today);

    listaGiorni.push(today);
  }
  return listaGiorni;
}

const OMDb_API = "9e44c172";
// const OMDb_API = "75cb83e8";

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

function getParameterByName(name, _url) {
  if (!_url) urlString = window.location.href;
  let url = new URL(urlString);
  return url.searchParams.get("id");
}
