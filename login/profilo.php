<!DOCTYPE php>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guida TV</title>
  </head>
  <body>
    <?php
      session_start();
      echo $_SESSION['email'] ?? null;
    ?>
    <!-- barra sopra -->
    <div>
    </div>
    <?php
    if(($_SESSION['email'] ?? null) || ($_COOKIE['email'] ?? null)){
        // echo "<label for="txtEmailProf">Email:</label>"; Usare AJAX
        echo "<a href='login/profilo.php' style='color: aliceblue'>Profilo</a>";
      }
      else
        echo "<a href='login/login.html' style='color: aliceblue' id='linkLogin'>Login</a>";
      ?>
      <!-- Serve passwor din sessione e usare sessioni-->
  </body>
</html>