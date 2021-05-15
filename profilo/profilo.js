function popolaCampi() {
    comunica("email").then(data=>{document.getElementById("txtEmailProf").value = data});
    comunica("password").then(data=>{document.getElementById("txtPasswordProf").value = data});
    comunica("username").then(data=>{
        document.getElementById("txtUsernameProf").value = data
        document.getElementById("imgProfilo").setAttribute("src", "https://via.placeholder.com/200x200/" + getColoreCasuale() + "/000000?text=" + data[0].toUpperCase());
    });
    popolaSeguiti();
}

function getColoreCasuale() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

function abilitaModifica(elem) {
    if(elem == 'username'){
        document.getElementById("txtUsernameProf").disabled = false;
        var e = document.getElementsByName("btnUsr");
        for (i = 0; i < e.length; i++)
            e[i].classList.remove("classe-nascosta");
    }else if(elem == 'password'){
        var e = document.getElementsByName("txtPsw");
        for (i = 0; i < e.length; i++)
            e[i].classList.remove("classe-nascosta");
        e = document.getElementsByName("collab");
        for (i = 0; i < e.length; i++)
            e[i].classList.replace("text-center", "text-end");
    }
}

function annullaModifica(elem) {
    if (elem == 'username') {
        document.getElementById("txtUsernameProf").disabled = true;
        var e = document.getElementsByName("btnUsr");
        for (i = 0; i < e.length; i++)
            e[i].classList.add("classe-nascosta");
    }else{
        var e = document.getElementsByName("txtPsw");
        for (i = 0; i < e.length; i++)
            e[i].classList.add("classe-nascosta");
        e = document.getElementsByName("collab");
        for (i = 0; i < e.length; i++)
            e[i].classList.replace("text-end", "text-center");
    }
}
function modificaUsername(){
    var x = document.getElementById("txtUsernameProf").value;
    document.getElementById("btnSalvaUsername").setAttribute("style", "display : none;");
    document.getElementById("btnAnnullaUsername").setAttribute("style", "display : none;");
    comunica("newName", x).then(data=>{
        if(data == -1)
            alert("Modifica non effettuata");
        else{
            document.getElementById("txtUsernameProf").value = data;
            document.getElementById("imgProfilo").setAttribute("src", "https://via.placeholder.com/200x200/" + getColoreCasuale() + "/000000?text=" + data[0].toUpperCase());
        }
    });
    document.getElementById("txtUsernameProf").disabled = true;
}

function modificaPassword() {
    var pc = document.getElementById("txtPasswordCorrente").value;
    var np = document.getElementById("txtNuovaPassword").value;
    var cnp = document.getElementById("txtConfermaPassword").value;
    if (np == cnp) {
        comunica("newPass", pc, np).then(data=>{
            if(data == -1)
                alert("Modifica non effettuata");
            else
                document.getElementById("txtPasswordCorrente").value = data;
        });
    }else alert("Le password  non coincidono");
    var e = document.getElementsByName("txtPsw");
    for (i = 0; i < e.length; i++)
        e[i].classList.add("classe-nascosta");
    document.getElementById("btnSalvaPassword").classList.add("classe-nascosta");
}

function popolaSeguiti() {
    var div = document.getElementById("divSeguiti");
    comunica("seguiti").then(data=>{
        if (data == '-1') {
            var p = document.createElement("p");
            p.appendChild(document.createTextNode("La tua lista dei seguiti è vuota"));
            div.appendChild(p);
        }else{
            var idf = JSON.parse(data);
            for (const _id in idf) {
                const id = idf[_id].film;
                getFilm('i', id).then((film) => {
                    var img = document.createElement("img");
                    img.setAttribute("src", film["Poster"] != "N/A" ? film.Poster
                            : "https://via.placeholder.com/300x500/FFFFFF/000000?text=" + film.Title.replace(/ /g, "+"));
                    img.setAttribute("class", "d-flex ms-2 rounded");
                    div.appendChild(img);
                });
            }
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
    xmlhttp.open("POST", "profiloComunica.php", true);
    xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );
    xmlhttp.send("attr=" + arguments[0] + (arguments[1] != undefined ? "&value=" + arguments[1]: '') + (arguments[2] != undefined ? "&newvalue=" + arguments[2]: '') );
    });
    return await res;
}
