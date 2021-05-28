<?php
    include('../crypto.php'); //File contentente le funzione per cifrare le info (usato per le password)
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB'); //Connessione al DB
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());
    
    if(!(isset($_POST['btnLogin']))) //Se non si arriva a questa pagina tramite login si viene reinderizzati alla home
        header("Location: ../index.php");
    else{
        $email = $_POST['txtEmail'];
        $stmt = mysqli_prepare($dbconn, "SELECT * From utenti where email=?");
        mysqli_stmt_bind_param($stmt, 's', $email);
        $exec = mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_store_result($stmt);
        if(mysqli_stmt_num_rows($stmt) <= 0) //query sopra non restituisce risultati => utente non registrato
            echo "<h3>Utente non registrato</h3>";
        else{
            mysqli_stmt_free_result($stmt);
            $password = enc_dec('encrypt', $_POST["txtPassword"]); //Funzione in crypto.php che restituisce la psw codificata
            $stmt = mysqli_prepare($dbconn, "SELECT * From utenti where email=? AND password=?");
            mysqli_stmt_bind_param($stmt, 'ss', $email, $password);
            $exec = mysqli_stmt_execute($stmt);
            $res = mysqli_stmt_store_result($stmt);
            if(mysqli_stmt_num_rows($stmt) <= 0) //Se non vengono tornati risultati, sapendo che l'utente è registrato c'è solo la possibilità che la psw sia sbagliata
                echo "<h3>Password errata</h3>";
            else{
                session_start();
                mysqli_stmt_bind_result($stmt, $i, $e, $u, $p); //Se i dati inseriti sono corretti prendo i risultati della query e li memorizzo nella sessione
                mysqli_stmt_fetch($stmt);
                if(isset($_POST['chkRicordami'])){ //Se l'utente vuole essere ricordato allora salvo le info ad esso relative anche con i cookies
                    setcookie('email', $email, time()+(86400*7), "/"); //Durata cookie = 7 giorni
                    setcookie('username', $u, time()+(86400*7), "/");
                    setcookie('password', $password, time()+(86400*7), "/");
                }
                $_SESSION['email'] = $email;
                $_SESSION['password'] = $password;
                $_SESSION['username'] = $u;
                header("Location: ../index.php"); //Dopo il login si viene portati nella home page
            }
            mysqli_stmt_free_result($stmt);
        }
    }
    mysqli_close($dbconn); //Chiude connessione al DB
?>
