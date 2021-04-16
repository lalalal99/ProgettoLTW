function validaPsw(){
    if(document.getElementById("txtPassReg").value != document.getElementById("txtConfermaPassReg").value){
        alert("La password non corrisponde");
        return false;
    }
    return true;
}