<!DOCTYPE php>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="css/index.css" />
    <script src="//code.jquery.com/jquery-3.5.0.min.js"></script>
    <script type="text/javascript" src="js/js.cookie.js"></script>
    <script type="text/javascript" src="js/date-it-IT.js"></script>
    <script src="js/palinsesto_generator.js"></script>
    <script src="js/index.js"></script>
    <script>
      window.onload = startup;
    </script>
    <title>Guida TV</title>
  </head>
  <body>
    <?php
      session_start();
      echo $_SESSION['email'] ?? null;
    ?>
    <!-- barra sopra -->
    <div>
      <?php
      if(($_SESSION['email'] ?? null) || ($_COOKIE['email'] ?? null))
        echo "<a href='login/logout.php' style='color: aliceblue'>Logout</a>";
      else
        echo "<a href='login/login.html' style='color: aliceblue' id='linkLogin'>Login</a>";
      ?>
    </div>
    <hr />

    <!-- in evidenza -->
    <div id="div_evidenza">
      <h1>In Evidenza</h1>
      <br />
      <ul id="Evidenza_Lista"></ul>
    </div>
    <br />
    <hr />
    <!-- prima serata -->
    <div>
      <select>
        <option value="Prima">Prima serata</option>
        <option value="Seconda">Seconda serata</option>
        <option value="Unificata">Serata unificata</option>
      </select>
      <br />
      <ul id="Serata_Lista"></ul>
    </div>
  </body>
</html>
