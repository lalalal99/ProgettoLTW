<?php
    include('../crypto.php');
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());
    
    if(!(isset($_POST['btnLogin'])))
        header("Location: ../index.html");
    else{
        $email = $_POST['txtEmail'];
        $q = "SELECT * From Utenti where email='$email'";
        $res = mysqli_query($dbconn, $q);
        if($res->num_rows <= 0)
            echo "<h3>Utente non registrsato</h3>";
        else{
            $password = enc_dec('encrypt', $_POST["txtPassword"]);
            $q = "SELECT * From Utenti where email='$email' AND password='$password'";
            $res = mysqli_query($dbconn, $q);
            if($res->num_rows <= 0)
                echo "<h3>Password errata</h3>";
            else
            echo "<h3>Accesso effettuato</h3>";
        }
    }
    mysqli_close($dbconn);
?>