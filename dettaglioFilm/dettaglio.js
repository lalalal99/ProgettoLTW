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
        comunica("s", result.imdbID).then(data=>{
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
    }).catch((err) => {
        console.log(err);
    });
}

function segui() {
    var film = getParameterByName("id");
    pSegui = document.getElementById("pSegui");
    comunica("l", film).then(data=>{
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
    comunica("r", film).then(data=>{
        if(data == -1)
            alert("Qualcosa è andato storto...");
        else{
            pSegui.innerHTML = '';
            pSegui.appendChild(document.createTextNode("Segui"));
            document.getElementById('divSegui').setAttribute("onclick", "return segui()");
        }
    });
}

async function comunica() {
    let res = new Promise((success) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            success (this.responseText);
            // document.getElementById("txtEmailProf").value = this.responseText;
        }
    };
    xmlhttp.open("POST", "dettaglioComunica.php", true);
    xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );
    xmlhttp.send("attr=" + arguments[0] + (arguments[1] != undefined ? "&value=" + arguments[1]: '')); // + (arguments[2] != undefined ? "&newvalue=" + arguments[2]: '') );
    });
    return await res;
}

function getParameterByName(name, _url) {
    if (!_url) urlString = window.location.href;
    let url = new URL(urlString);
    return url.searchParams.get("id");
}