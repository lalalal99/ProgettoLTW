<?php
    include('../crypto.php');
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());

    if(!(isset($_POST['btnIscrizione'])))
        header("Location: ../index.php");
    else{
        $email = $_POST['txtEmailReg'];
        $q = "SELECT * From Utenti where email='$email'";
        $res = mysqli_query($dbconn, $q);
        if($res->num_rows <= 0){
            $email = $_POST["txtEmailReg"];
            $password = enc_dec('encrypt', $_POST["txtPasswordReg1"]);
            $q = "insert into Utenti (email, password) values ('$email', '$password')";
            $res = mysqli_query($dbconn, $q);
            if($res)
                header("Location: ../index.php");
        }else{
            echo "<h1>Utente già registrato</h1>
                <a href=../login/login.php>Effettua il login</a>";
        }
    }
    mysqli_close($dbconn);
?>