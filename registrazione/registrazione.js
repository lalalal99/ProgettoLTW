function validaPsw(){
    //Controlla che le due password inserite siano uguali
    if(document.getElementById("txtPasswordReg1").value != document.getElementById("txtPasswordReg2").value)
        document.getElementById('errore').innerHTML="Le password non corrispondono"; //Se non lo sono fa comparire un alert in basso nel form che informa l'utente
    else
        document.getElementById("errore").innerHTML="";
    return true;
}

function validaForm(){
    //Controlla se i campi sono tutti compilati
    if(document.getElementById("txtEmailReg").value==''  || document.getElementById("txtUserReg").value=='' || document.getElementById("txtPasswordReg1").value=='' || document.getElementById("txtPasswordReg2").value==''){
        alert("Si prega di compilare tutti i campi");
        return false;
    }
    return true;
}