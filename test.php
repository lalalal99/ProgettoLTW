<?php

$type = $_POST['type'];
$genre = $_POST['genre'];

$dbconn = mysqli_connect('127.0.0.1', 'root', '', 'GuidaTV_DB');
if(!$dbconn)
    die("Connection failed: " . mysqli_connect_error());

if ($genre === "-") {
    $q = "SELECT Film.id, Film.runtime FROM Film 
    JOIN Film_Generi ON Film.id=Film_Generi.film 
    JOIN Generi ON Generi.id=Film_Generi.genere
    WHERE Film.type = '$type' AND Generi.genere <> 'Adult'";
} elseif ($genre == "2000") {
    $q = "SELECT Film.id, Film.runtime FROM Film WHERE Film.type = '$type' AND Film.year > 2000";
} else {    
    $q = "SELECT Film.id, Film.runtime FROM Film 
    JOIN Film_Generi ON Film.id=Film_Generi.film 
    JOIN Generi ON Generi.id=Film_Generi.genere
    WHERE Film.type = '$type' AND Generi.genere='$genre' AND Generi.genere <> 'Adult'";
}

$res = mysqli_query($dbconn, $q);
header('Content-type: application/json');

$lista = array();

while($row = mysqli_fetch_assoc($res)) {
    array_push($lista,$row);
}

echo json_encode($lista);

        

?>