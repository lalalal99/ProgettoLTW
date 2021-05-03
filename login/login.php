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
                session_start();
                mysqli_stmt_bind_result($stmt, $i, $e, $u, $p);
                mysqli_stmt_fetch($stmt);
                if(isset($_POST['chkRicordami'])){
                    setcookie('email', $email, time()+(86400*7), "/"); //7 gg
                    setcookie('username', $u, time()+(86400*7), "/");
                }
                $_SESSION['email'] = $email;
                $_SESSION['password'] = $password;
                $_SESSION['username'] = $u;
                header("Location: ../index.php");
            }
            mysqli_stmt_free_result($stmt);
        }
    }
    mysqli_close($dbconn);
?>
