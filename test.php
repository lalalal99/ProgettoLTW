<?php

$type = $_POST['type'];
$genre = $_POST['genre'];

// $array = json_decode($array, true);

$dbconn = mysqli_connect('localhost', 'root', '', 'GuidaTV_DB');
if(!$dbconn)
    die("Connection failed: " . mysqli_connect_error());

// if ($array == "Documentary") {
// $q = "SELECT Film.titolo FROM Film as f,Film_Generi as fg,Generi as g WHERE Film.id=fg.film and g.id=fg.genere and g.genere='".$array."'";
if ($genre === "-") {
    $q = "SELECT Film.id, Film.runtime FROM Film 
    WHERE Film.type ='$type'";
} else {    
    $q = "SELECT Film.id, Film.runtime FROM Film 
    JOIN Film_Generi ON Film.id=Film_Generi.film 
    JOIN Generi ON Generi.id=Film_Generi.genere
    WHERE Film.type ='$type' AND Generi.genere='$genre'";
}
// $q = "SELECT Film.id FROM Film 
// JOIN Film_Generi ON Film.id=Film_Generi.film 
// JOIN Generi ON Generi.id=Film_Generi.genere
// WHERE Generi.genere='$array' AND Film.type ='movie'";
// $q = "SELECT * FROM Film JOIN Film_Generi ON Film.id=Film_Generi.film WHERE Film.title='Kate & Leopold'";
$res = mysqli_query($dbconn, $q);
header('Content-type: application/json');

$lista = array();

// echo json_encode(mysqli_fetch_assoc($res));

while($row = mysqli_fetch_assoc($res)) {
    // echo $row['id']."</br>"; // Print a single column data
    // print_r($row);       // Print the entire row data
    array_push($lista,$row);
    // echo $row;
}

echo json_encode($lista);

        

?>