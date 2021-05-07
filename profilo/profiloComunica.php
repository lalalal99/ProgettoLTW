<?php
    include('../crypto.php');
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());
    // if(!(isset($_POST['goToProfilo'])))
    //     header("Location: ../index.php");
        
    session_start();
    $x = $_POST['attr'];
    if(!$_SESSION['email']){
        if($_COOKIE['email']){
            $_SESSION['email'] = $_COOKIE['email'];
            $_SESSION['username'] = $_COOKIE['username'];
            $_SESSION['password'] = $_COOKIE['password'];
        }else echo -1;
    }
    if($_SERVER['REMOTE_ADDR'] == '::1'){
        if ($x == 'email')
            echo $_SESSION['email'];
        elseif ($x == 'password') 
            echo enc_dec('decrypt', $_SESSION['password']);
        elseif ($x == 'username')
            echo $_SESSION['username'];
        elseif($x == 'newName'){
            $y = $_POST['value'];
            $stmt = mysqli_prepare($dbconn, "UPDATE utenti SET username = ? WHERE email = ?");
            mysqli_stmt_bind_param($stmt, 'ss', $y, $_SESSION['email']);
            $exec = mysqli_stmt_execute($stmt);
            if(mysqli_stmt_affected_rows($stmt) <= 0)
                    echo -1;
            else{
                $_SESSION['username'] = $y;
                echo $_SESSION['username'];
            }
        }elseif($x == 'newPass'){
            $corrente = enc_dec('encrypt', $_POST['value']);
            $nuova = enc_dec('encrypt', $_POST['newvalue']);
            $stmt = mysqli_prepare($dbconn, "UPDATE utenti SET password = ? WHERE email = ? AND password = ?");
            mysqli_stmt_bind_param($stmt, 'sss', $nuova, $_SESSION['email'], $corrente);
            $exec = mysqli_stmt_execute($stmt);
            if(mysqli_stmt_affected_rows($stmt) <= 0)
                    echo -1;
            else{
                $_SESSION['password'] = $nuova;
                echo $_SESSION['password'];
            }
        }
    }else header("Location: ../index.php");

?>