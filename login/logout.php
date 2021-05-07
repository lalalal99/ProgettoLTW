<?php
    session_start();
    session_unset();
    session_destroy();
    setcookie('email', '', time()-50000, '/');
    setcookie('username', '', time()-50000, '/');
    setcookie('username', '', time()+(86400*7), "/");
    header("Location: ../index.php");
    include '../index.php';
    exit();
?>
