<?php
    include('../crypto.php');
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());
    
    if(!(isset($_POST['btnLogin'])))
        header("Location: ../index.php");
    else{
        $email = $_POST['txtEmail'];
        $stmt = mysqli_prepare($dbconn, "SELECT * From Utenti where email=?");
        mysqli_stmt_bind_param($stmt, 's', $email);
        $exec = mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_store_result($stmt);
        //$q = "SELECT * From Utenti where email='$email'";
        //$res = mysqli_query($dbconn, $q);
        if(mysqli_stmt_num_rows($stmt) <= 0)
            echo "<h3>Utente non registrato</h3>";
        else{
            mysqli_stmt_free_result($stmt);
            $password = enc_dec('encrypt', $_POST["txtPassword"]);
            $stmt = mysqli_prepare($dbconn, "SELECT * From Utenti where email=? AND password=?");
            mysqli_stmt_bind_param($stmt, 'ss', $email, $password);
            $exec = mysqli_stmt_execute($stmt);
            $res = mysqli_stmt_store_result($stmt);
            //$q = "SELECT * From Utenti where email='$email' AND password='$password'";
            //$res = mysqli_query($dbconn, $q);
            if(mysqli_stmt_num_rows($stmt) <= 0)
                echo "<h3>Password errata</h3>";
            else{
                if(isset($_POST['chkRicordami']))
                    setcookie('email', $email, strtotime("+1 week"));
                session_start();
                $_SESSION['email'] = $email;
                header("Location: ../index.php");
            }
            mysqli_free_result($res);
        }
    }
    mysqli_close($dbconn);
?>
