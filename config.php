<?php
$_CONFIG['host'] = "localhost";
$_CONFIG['user'] = "root";
$_CONFIG['pass'] = "";
$_CONFIG['dbname'] = "GuidaTV_DB";

$_CONFIG['table_sessioni'] = "Sessioni";
$_CONFIG['table_utenti'] = "Utenti";

$_CONFIG['expire'] = 60;


//--------------
define('AUTH_LOGGED', 99);
define('AUTH_NOT_LOGGED', 100);

define('AUTH_USE_COOKIE', 101);
define('AUTH_USE_LINK', 103);
define('AUTH_INVALID_PARAMS', 104);
define('AUTH_LOGEDD_IN', 105);
define('AUTH_FAILED', 106);

$conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione');
mysql_select_db($_CONFIG['dbname']);
?>
