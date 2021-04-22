function validaPsw(){
    if(document.getElementById("txtPasswordReg1").value != document.getElementById("txtPasswordReg2").value){
        document.getElementById('errore').innerHTML="Le password non corrispondono";
        return false;
    }else{
        document.getElementById("errore").innerHTML="";
        return true;
    }
    return true;
}

function validaForm(){
    if(document.getElementById("txtEmailReg").value=='' || document.getElementById("txtPasswordReg1").value=='' || document.getElementById("txtPasswordReg2").value==''){
        alert("Si prega di compilare tutti i campi");
        return false;
    }
    return true;
}
// function invalida(attr){
//     alert(attr);
//     document.getElementById(attr).style.border=none;
//     document.getElementById(attr).style.boxShadow=none;
//     document.getElementById(attr).style.borderBottom="2px solid #ff0000";
//     document.getElementById(attr).style.borderTop="0px";
//     document.getElementById(attr).style.marginBottom="10px";
// }