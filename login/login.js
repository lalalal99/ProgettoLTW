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