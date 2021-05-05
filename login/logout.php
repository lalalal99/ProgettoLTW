<?php
    session_start();
    session_unset();
    session_destroy();
    setcookie('email', '', time()-50000, '/');
    setcookie('username', '', time()-50000, '/');
    header("Location: ../index.php");
    include '../index.php';
    exit();
?>
