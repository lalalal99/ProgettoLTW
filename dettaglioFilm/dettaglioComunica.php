<?php
    include('../crypto.php'); //File contentente le funzione per cifrare le info (usato per le password)
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB'); //Connessione al DB
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());
        
    session_start(); //Start della sessione PHP
    $x = $_POST['attr']; //primo parametro passato dalla funziona comunicaDettaglio in utilities.js
    if($_SERVER['REMOTE_ADDR'] == '::1'){
        //Rende la pagina accessibile solo dallo stesso IP del server, impedendo ai malintenzionati esterni di entrare e comunicare così col DB;
        //Vengono usati vari caratteri a seconda dell'informazione di cui necessitiamo quando invochiamo la funzione comunicaDettaglio
        if ($x == 'l'){
            if (!$_SESSION['email'] ?? null) //Email non settata nelle varibili di sessione => utente non loggato
                echo -1;
            else{
                $y = $_POST['value'];
                $stmt = mysqli_prepare($dbconn, "SELECT id FROM utenti WHERE email = ?");
                mysqli_stmt_bind_param($stmt, 's', $_SESSION['email']);
                $exec = mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                //Se esiste un utente con quell'email ne prende l'id e crea nel DB un associazione con il programma passato come secondo parametro
                if(mysqli_num_rows($result) <= 0)
                    echo -1;
                else{
                    $resid = mysqli_fetch_array($result);
                    mysqli_stmt_free_result($stmt);
                    $stmt = mysqli_prepare($dbconn, "INSERT INTO preferenze_utenti VALUES (?, ?)"); //Crea l'associazione inserendo una entry in preferenze_utenti
                    mysqli_stmt_bind_param($stmt, 'is', $resid[0], $y);
                    if(!mysqli_stmt_execute($stmt))
                        echo -1;
                }
            }
        }elseif($x == 's'){
            //Controlla dato un programma e un utente se quel programma è nei preferiti dell'utente
            $stmt = mysqli_prepare($dbconn, "SELECT id FROM utenti WHERE email = ?"); //Prende l'id data l'email
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
                if(mysqli_num_rows($result) <= 0) //Se la query non restituisce righe della tabella allora quel programma non è tra quelli seguiti dall'utente
                    echo "non seguito";
                else
                    echo "seguito";
            }
        }elseif($x == 'r'){
            //Duale dell'aggiunta ('s'), rimuove la entry nella tabella delle preferenze
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
    }else header("Location: ../index.php"); //Se si tenta una connessione che non sia quella dallo stesso IP del server si viene reindirizzati alla home

?>