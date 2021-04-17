function validaPsw(){
    if(document.getElementById("txtPassReg").value != document.getElementById("txtConfermaPassReg").value){
        document.getElementById('errore').innerHTML="La password non corrisponde";
        return false;
    }else{
        document.getElementById("errore").innerHTML="";
        return true;
    }
    return true;
}