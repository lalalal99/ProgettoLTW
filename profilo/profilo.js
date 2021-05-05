function popolaCampi() {
    comunica("email").then(data=>{document.getElementById("txtEmailProf").value = data});
    comunica("password").then(data=>{document.getElementById("txtPasswordProf").value = data});
    comunica("username").then(data=>{document.getElementById("txtUsernameProf").value = data});
}

function abilitaModifica(elem) {
    if(elem == 'username'){
        document.getElementById("txtUsernameProf").disabled = false;
        document.getElementById("btnSalvaUsername").setAttribute("style", "display : true");
    }else{
        var e = document.getElementsByName("txtPsw");
        for (i = 0; i < e.length; i++)
            e[i].classList.remove("classe-nascosta");
        document.getElementById("btnSalvaPassword").classList.remove("classe-nascosta");
    }
}

function modificaUsername(){
    var x = document.getElementById("txtUsernameProf").value;
    document.getElementById("btnSalvaUsername").setAttribute("style", "display : none;");
    comunica("newName", x).then(data=>{
        if(data == -1)
            alert("Modifica non effettuata");
        else
            document.getElementById("txtUsernameProf").value = data;
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