<?php

$type = $_POST['type']; //se movie o tvSeries
$genre = $_POST['genre']; //genere richiesto

$dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB'); //Connessione
if (!$dbconn)
    die("Connection failed: " . mysqli_connect_error());

if ($genre === "-") { //se nessun genere è specificato vengono restituiti tutti i programmi del tipo richiesto
    $q = "SELECT film.id, film.runtime FROM film 
    JOIN film_generi ON film.id=film_generi.film 
    JOIN generi ON generi.id=film_generi.genere
    WHERE film.type = '$type' AND generi.genere <> 'Adult'";
} elseif ($genre == "2000") { // vengono restituiti solo i programmi dal 2000 in poi
    $q = "SELECT film.id, film.runtime FROM film WHERE film.type = '$type' AND film.year > 2000";
} else { // vengono restituiti i programmi con tipo e genere richiesti
    $q = "SELECT film.id, film.runtime FROM film 
    JOIN film_generi ON film.id=film_generi.film 
    JOIN generi ON generi.id=film_generi.genere
    WHERE film.type = '$type' AND generi.genere='$genre' AND generi.genere <> 'Adult'";
}
$res = mysqli_query($dbconn, $q);
header('Content-type: application/json');

$lista = array();

while ($row = mysqli_fetch_assoc($res)) { //vengono estratti i risultati della query in un array
    array_push($lista, $row);
}
echo json_encode($lista); // risultato encoded
