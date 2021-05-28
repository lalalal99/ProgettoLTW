<?php
    include('../crypto.php'); //File contentente le funzione per cifrare le info (usato per le password)
    $dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB'); //Connessione al DB
    if(!$dbconn)
        die("Connection failed: " . mysqli_connect_error());
        
    session_start(); //Start della sessione PHP
    $x = $_POST['attr']; //primo parametro passato dalla funziona comunica in utilities.js
    if(!$_SESSION['email']){
        if($_COOKIE['email']){ //Se la sessione non è inizializzata ma ci sono i cookies allora inizializza la sessione con i valori dei cookies
            $_SESSION['email'] = $_COOKIE['email'];
            $_SESSION['username'] = $_COOKIE['username'];
            $_SESSION['password'] = $_COOKIE['password'];
        }
    }
    if($_SERVER['REMOTE_ADDR'] == '::1'){
        //Rende la pagina accessibile solo dallo stesso IP del server, impedendo ai malintenzionati esterni di entrare e comunicare così col DB;
        //Vengono usati vari caratteri a seconda dell'informazione di cui necessitiamo quando invochiamo la funzione comunica
        if ($x == 'email')
             if ($_SESSION['email'])
                echo $_SESSION['email'];
             else echo "null";
        elseif ($x == 'password') 
            echo enc_dec('decrypt', $_SESSION['password']); //Restituisce la psw codificata come in crypto.php
        elseif ($x == 'username')
            echo $_SESSION['username'];
        elseif($x == 'newName'){
            $y = $_POST['value'];
            $stmt = mysqli_prepare($dbconn, "UPDATE utenti SET username = ? WHERE email = ?"); //Aggiorna il campo username
            mysqli_stmt_bind_param($stmt, 'ss', $y, $_SESSION['email']);
            $exec = mysqli_stmt_execute($stmt);
            if(mysqli_stmt_affected_rows($stmt) <= 0)
                    echo -1;
            else{
                $_SESSION['username'] = $y; //Aggiorna la variabile di sessione relativa allo username
                if(isset($_COOKIE['username']))
                    setcookie('username', $y, time()+(86400*7), "/"); //Durata cookie = 7 giorni. Aggiorna il cookie dello username
                echo $_SESSION['username'];
            }
        }elseif($x == 'newPass'){
            $corrente = enc_dec('encrypt', $_POST['value']);
            $nuova = enc_dec('encrypt', $_POST['newvalue']);
            $stmt = mysqli_prepare($dbconn, "UPDATE utenti SET password = ? WHERE email = ? AND password = ?"); //Aggiorna la psw dell'utente
            mysqli_stmt_bind_param($stmt, 'sss', $nuova, $_SESSION['email'], $corrente);
            $exec = mysqli_stmt_execute($stmt);
            if(mysqli_stmt_affected_rows($stmt) <= 0)
                    echo -1;
            else{
                $_SESSION['password'] = $nuova; //Aggiorna la variabile di sessione relativa alla password
                if(isset($_COOKIE['password']))
                    setcookie('password', $nuova, time()+(86400*7), "/"); //Durata cookie = 7 giorni. Aggiorna il cookie della password
                echo $_SESSION['password'];
            }
        }elseif ($x == 'seguiti') {
            $stmt = mysqli_prepare($dbconn, "SELECT pu.film FROM preferenze_utenti AS pu JOIN utenti AS u ON pu.utente = u.id WHERE u.email = ?");
            mysqli_stmt_bind_param($stmt, 's', $_SESSION['email']);
            $exec = mysqli_stmt_execute($stmt); //Prende i programmi seguiti da quell'utente
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) <= 0)
                    echo -1;
            else{
                $lista = array(); //Crea un array vuoto da popolare con gli id dei programmi seguiti
                while($row = mysqli_fetch_assoc($result)) {
                    array_push($lista,$row); //Inserisce i film nell'array
                }
                echo json_encode($lista); //Codifica lista in formato json così da leggerla poi in profilo.js
            }
        }elseif($x == 'r'){
            //Rimuove il programma memorizzato in y dalle preferenze dell'utente
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
        }elseif($x == 's'){
            //Funzione utilizzata nella ricerca di nuovi programmi da seguire
            $y = $_POST['value'];
            $stmt = mysqli_prepare($dbconn, "SELECT film.id FROM film JOIN film_generi ON film.id=film_generi.film 
                    JOIN generi ON generi.id=film_generi.genere WHERE generi.genere <> 'Adult' AND film.title LIKE concat('%', ? , '%') GROUP BY film.id");
            //La query cerca tutti i film nel DB che hanno nel titolo la/e parola/e inserita/e dall'utente
            mysqli_stmt_bind_param($stmt, 's', $y);
            $exec = mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) <= 0)
                echo -1;
            else{
                $lista = array();
                while($row = mysqli_fetch_assoc($result))
                    array_push($lista,$row); //Mette nella lista gli id ritornati dalla query (se esistono)
                echo json_encode($lista); //Codifica lista in formato json così da leggerla poi in profilo.js
            }
        }
    }else header("Location: ../index.php"); //Se l'utente non si connette dall'indirizzo del server viene reindirizzato alla pagina principale

?>