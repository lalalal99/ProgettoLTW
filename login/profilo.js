function popolaCampi() {
    comunica("email").then(data=>{document.getElementById("txtEmailProf").value = data});
    comunica("password").then(data=>{document.getElementById("txtPasswordProf").value = data});
    comunica("username").then(data=>{document.getElementById("txtUsernameProf").value = data});
}

function abilitaModificaUsername() {
    document.getElementById("txtUsernameProf").disabled = false;
    document.getElementById("btnSalvaUsername").setAttribute("style", "display : true");
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
    $("#btnSalvaUsername").click(function(){
        //do need full
        $(this).fadeOut();
    })
    // document.getElementById("btnSalvaUsername").style.display = 'none';
    
    // $("#btnSalvaUsername").removeAttr("style");
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
    xmlhttp.send("attr=" + arguments[0] + (arguments[1] != undefined ? "&value=" + arguments[1]: '') );
    });
    return await res;
}