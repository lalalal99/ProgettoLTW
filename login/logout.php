<?php
    session_start();
    session_unset();
    session_destroy(); //Distrugge la lessione dopo aver "azzerato" le varibili in essa memorizzate
    //Distrugge i cookies
    setcookie('email', '', time()-50000, '/');
    setcookie('username', '', time()-50000, '/');
    setcookie('password', '', time()+(86400*7), "/");
    header("Location: ../index.php"); //Riporta alla home
    include '../index.php';
    exit();
?>
