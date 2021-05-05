<?php

$type = $_POST['type'];
$genre = $_POST['genre'];

$dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
if(!$dbconn)
    die("Connection failed: " . mysqli_connect_error());

if ($genre === "-") {
    $q = "SELECT film.id, film.runtime FROM film 
    JOIN film_generi ON film.id=film_generi.film 
    JOIN generi ON generi.id=film_generi.genere
    WHERE film.type = '$type' AND generi.genere <> 'Adult'";
} elseif ($genre == "2000") {
    $q = "SELECT film.id, film.runtime FROM film WHERE film.type = '$type' AND film.year > 2000";
} else {
    $q = "SELECT film.id, film.runtime FROM film 
    JOIN film_generi ON film.id=film_generi.film 
    JOIN generi ON generi.id=film_generi.genere
    WHERE film.type = '$type' AND generi.genere='$genre' AND generi.genere <> 'Adult'";
}
$res = mysqli_query($dbconn, $q);
header('Content-type: application/json');

$lista = array();

while($row = mysqli_fetch_assoc($res)) {
    array_push($lista,$row);
}
echo json_encode($lista);

        

?>