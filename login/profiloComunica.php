<?php
    include('../crypto.php');
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());

    session_start();
    $x = $_POST['attr'];
    if ($x == 'email')
        echo $_SESSION['email'];
    elseif ($x == 'password') 
        echo enc_dec('decrypt', $_SESSION['password']);
    elseif ($x == 'username')
        echo $_SESSION['username'];
    elseif($x == 'newName'){
        $y = $_POST['value'];
        $stmt = mysqli_prepare($dbconn, "UPDATE Utenti SET username = ? WHERE email = ?");
        mysqli_stmt_bind_param($stmt, 'ss', $y, $_SESSION['email']);
        $exec = mysqli_stmt_execute($stmt);
        if(mysqli_stmt_affected_rows($stmt) <= 0)
                echo -1;
        else{
            $_SESSION['username'] = $y;
            echo $_SESSION['username'];
        }
    }

?>