<?php
    include('../crypto.php');
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());
    // if(!(isset($_POST['goToProfilo'])))
    //     header("Location: ../index.php");
        
    session_start();
    $x = $_POST['attr'];
    if($_SERVER['REMOTE_ADDR'] == '::1'){
        if ($x == 'l'){
            if (!$_SESSION['email'] ?? null)
                echo -1;
            else{
                $y = $_POST['value'];
                $stmt = mysqli_prepare($dbconn, "SELECT id FROM utenti WHERE email = ?");
                mysqli_stmt_bind_param($stmt, 's', $_SESSION['email']);
                $exec = mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                if(mysqli_num_rows($result) <= 0)
                        echo -1;
                else{
                    $resid = mysqli_fetch_array($result);
                    mysqli_stmt_free_result($stmt);
                    $stmt = mysqli_prepare($dbconn, "INSERT INTO preferenze_utenti VALUES (?, ?)");
                    mysqli_stmt_bind_param($stmt, 'is', $resid[0], $y);
                    if(!mysqli_stmt_execute($stmt))
                        echo -1;
                }
            }
        }elseif($x == 's'){
            $stmt = mysqli_prepare($dbconn, "SELECT id FROM utenti WHERE email = ?");
            mysqli_stmt_bind_param($stmt, 's', $_SESSION['email']);
            $exec = mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) <= 0)
                echo -1;
            else{
                $y = $_POST['value'];
                $resid = mysqli_fetch_array($result);
                mysqli_stmt_free_result($stmt);
                $stmt = mysqli_prepare($dbconn, "SELECT * FROM preferenze_utenti WHERE utente = ? AND film = ?");
                mysqli_stmt_bind_param($stmt, 'is', $resid[0], $y);
                $exec = mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                if(mysqli_num_rows($result) <= 0)
                    echo "non seguito";
                else
                    echo "seguito";
            }
        }elseif($x == 'r'){
            $stmt = mysqli_prepare($dbconn, "SELECT id FROM utenti WHERE email = ?");
            mysqli_stmt_bind_param($stmt, 's', $_SESSION['email']);
            $exec = mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) <= 0)
                echo -1;
            else{
                $y = $_POST['value'];
                $resid = mysqli_fetch_array($result);
                mysqli_stmt_free_result($stmt);
                $stmt = mysqli_prepare($dbconn, "DELETE FROM preferenze_utenti WHERE utente = ? AND film = ?");
                mysqli_stmt_bind_param($stmt, 'is', $resid[0], $y);
                $exec = mysqli_stmt_execute($stmt);
                if(mysqli_stmt_affected_rows($stmt) <= 0)
                    echo -1;
            }
        }
    }else header("Location: ../index.php");

?>