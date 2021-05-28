<?php
    include('../crypto.php');  //File contentente le funzione per cifrare le info (usato per le password)
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB'); //Connessione al DB
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());

    if(!(isset($_POST['btnIscrizione'])))  //Se non si arriva a questa pagina tramite registrazione si viene reinderizzati alla home
        header("Location: ../index.php");
    else{
        $email = $_POST['txtEmailReg'];
        $stmt = mysqli_prepare($dbconn, "SELECT * From utenti where email=?"); //Controlla se ci sono altri utenti con quella email
        mysqli_stmt_bind_param($stmt, 's', $email);
        $exec = mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_store_result($stmt);
        if(mysqli_stmt_num_rows($stmt) <= 0){ //Se l'email non è nel DB prende i valori del form
            $email = $_POST["txtEmailReg"];
            $username = $_POST["txtUserReg"];
            $password = enc_dec('encrypt', $_POST["txtPasswordReg1"]); //codifca la password
            $stmt = mysqli_prepare($dbconn, "INSERT into utenti (email, username, password) values (?, ?, ?)"); //Inserisce un nuovo utente nel DB
            mysqli_stmt_bind_param($stmt, 'sss', $email, $username, $password);
            $exec = mysqli_stmt_execute($stmt);
            if($exec) //Se la query va a buon fine torna nella pagina del login
                header("Location: ../login/login.html");
        }else{ //Se l'email già è nel DB allora invita l'utente a fare login
            echo "<h1>Utente già registrato</h1>
                <a href=../login/login.php>Effettua il login</a>";
        }
    }
    mysqli_close($dbconn);
?>