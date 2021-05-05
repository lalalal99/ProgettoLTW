<?php
    include('../crypto.php');
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());

    if(!(isset($_POST['btnIscrizione'])))
        header("Location: ../index.php");
    else{
        $email = $_POST['txtEmailReg'];
        $stmt = mysqli_prepare($dbconn, "SELECT * From utenti where email=?");
        mysqli_stmt_bind_param($stmt, 's', $email);
        $exec = mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_store_result($stmt);
        //$q = "SELECT * From Utenti where email='$email'";
        //$res = mysqli_query($dbconn, $q);
        if(mysqli_stmt_num_rows($stmt) <= 0){
            $email = $_POST["txtEmailReg"];
            $username = $_POST["txtUserReg"];
            $password = enc_dec('encrypt', $_POST["txtPasswordReg1"]);
            $stmt = mysqli_prepare($dbconn, "INSERT into utenti (email, username, password) values (?, ?, ?)");
            mysqli_stmt_bind_param($stmt, 'sss', $email, $username, $password);
            $exec = mysqli_stmt_execute($stmt);
            //$q = "insert into Utenti (email, password) values ('$email', '$password')";
            //$res = mysqli_query($dbconn, $q);
            if($exec)
                header("Location: ../index.php");
        }else{
            echo "<h1>Utente già registrato</h1>
                <a href=../login/login.php>Effettua il login</a>";
        }
    }
    mysqli_close($dbconn);
?>