function popolaInfoFilm() {
    imgLocandina = document.getElementById("imgLocandina");
    pTitolo = document.getElementById("pTitolo");
    pValutazione = document.getElementById("pValutazione");
    pStagioni = document.getElementById("pStagioni");
    pTrama = document.getElementById("pTrama");
    pSegui = document.getElementById("pSegui");
    getFilm("i", getParameterByName("id"), true).then((result) => {
        console.log(result);
        imgLocandina.setAttribute(
            "src",
            result.Poster != "N/A" ? result.Poster : "https://via.placeholder.com/400x550/FFFFFF/000000?text=" + result.Title.replace(/ /g, "+"));
        pTitolo.appendChild(document.createTextNode(result.Title));
        if (result.Ratings.length > 0) 
            pValutazione.appendChild(document.createTextNode(result.Ratings[0].Value));
        else
            pValutazione.appendChild(document.createTextNode("NaN"));
        if (result.Type == "tvSeries"){
            pStagioni.classList.remove("classe-nascosta");
            pValutazione.appendChild(document.createTextNode(result.totalSeasons));
        }
        pTrama.appendChild(document.createTextNode(result.Plot));
        //Controlla se esiste già associazione, se si seg già + funz else segui + altra funz
        comunicaDettaglio("s", result.imdbID).then(data=>{
            if (data == 'seguito'){
                pSegui.innerHTML = '';
                pSegui.appendChild(document.createTextNode("Smetti di seguire"));
                document.getElementById('divSegui').setAttribute("onclick", "return smetti()");
            }else if (data == "non seguito"){
                pSegui.innerHTML = '';
                pSegui.appendChild(document.createTextNode("Segui"));
                document.getElementById('divSegui').setAttribute("onclick", "return segui()");   
            }
        });
        popolaCast(result);
    }).catch((err) => {
        console.log(err);
    });
}

function popolaCast(film) {
    var div = document.getElementById("divAttori");
    var arrAct = film.Actors.split(", ");
    var row = document.createElement("div");
    row.setAttribute("class", "row row-cols-4 justify-content-around g-3");
    for (var i = 0; i < arrAct.length; i++){
        const nome = arrAct[i].toLowerCase().replace(/ /g, "_");
        const nomeOriginale = arrAct[i];
        const nomeWiki = arrAct[i].replace(/ /g, "_")
        jQuery.ajax({
            url: "https://sg.media-imdb.com/suggests/" + nome[0] + "/" + nome + ".json",
            dataType: 'jsonp',
            cache: true,
            jsonp: false,
            jsonpCallback: "imdb$" + nome,
        }).then(function (results) {
            var col = document.createElement("div");
            col.setAttribute("class", "col p-2 justify-content-center align-items-center rounded");
            var a = document.createElement("a");
            a.setAttribute("href", "https://it.wikipedia.org/wiki/" + nomeWiki);
            a.setAttribute("target", "_blank");
            if (Object.hasOwnProperty.call(results['d'][0], 'i')) {
                var img = document.createElement("img");
                img.setAttribute("src", results['d'][0]['i'][0]);
                img.setAttribute("class", "d-block rounded ms-auto me-auto");
                img.setAttribute("style", "object-fit : cover;");
                img.setAttribute("width", 250);
                img.setAttribute("height", 350);
                a.appendChild(img);
                col.appendChild(a);
                var p = document.createElement("p");
                p.setAttribute("class", "text-center");
                p.appendChild(document.createTextNode(nomeOriginale));
                col.appendChild(p);
                row.appendChild(col);
            }else{
                var img = document.createElement("img");
                img.setAttribute("src", "https://m.media-amazon.com/images/S/sash/9FayPGLPcrscMjU.png");
                img.setAttribute("class", "d-block rounded ms-auto me-auto");
                img.setAttribute("style", "object-fit : cover;");
                img.setAttribute("width", 250);
                img.setAttribute("height", 350);
                a.appendChild(img);
                col.appendChild(a);
                var p = document.createElement("p");
                p.setAttribute("class", "text-center");
                p.appendChild(document.createTextNode(nomeOriginale));
                col.appendChild(p);
                row.appendChild(col);
            }
            
        });
        
    }
    div.appendChild(row);
}

function segui() {
    var film = getParameterByName("id");
    pSegui = document.getElementById("pSegui");
    comunicaDettaglio("l", film).then(data=>{
        if (data == -1)
            alert("Non sei loggato...");
        else{
            pSegui.innerHTML = '';
            pSegui.appendChild(document.createTextNode("Smetti di seguire"));
            document.getElementById('divSegui').setAttribute("onclick", "return smetti()");
        }
    });
}

function smetti() {
    var film = getParameterByName("id");
    pSegui = document.getElementById("pSegui");
    comunicaDettaglio("r", film).then(data=>{
        if(data == -1)
            alert("Qualcosa è andato storto...");
        else{
            pSegui.innerHTML = '';
            pSegui.appendChild(document.createTextNode("Segui"));
            document.getElementById('divSegui').setAttribute("onclick", "return segui()");
        }
    });
}

