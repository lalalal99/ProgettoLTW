function validaForm(){
    if(document.getElementById("txtEmail").value==""){
        alert("Si prega di inserire l'indirizzo email");
        return false;
    }
    if(document.getElementById("txtPassword").value==""){
        alert("Si prega di inserire la password");
        return false;
    }
    return true;
}

function inizializzaStorageUtenti(){
    if (typeof(localStorage.utenti) == "undefined")
        localStorage.utenti="[]";
}

function uguali(n,o){
    if ((n.u==o.u))
        return true;
    return false;
}

function inserisciUtente(){
    var x = JSON.parse(localStorage.utenti);
    var nextpos = x.length;
    var o = { u:document.loginForm.txtEmail.value, l:"true"};
    for (i=0;i<nextpos;i++){
        if(uguali(x[i],o)) {
            alert("Utente gia’ inserito");
            return false;
        }
    }
    alert("Dati inseriti correttamente");
    x[nextpos] = o;
    localStorage.utenti = JSON.stringify(u);
}

function checkForm(){
    if(!validaForm())
        return false;
    if(document.getElementById("chkRicordami").checked)
        inserisciUtente();
    else
        alert("NC");
        
    
}