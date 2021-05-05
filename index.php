<!DOCTYPE php>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
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
    <!-- barra sopra -->
    <nav class="navbar sticky-top">
      <a class="navbar-brand">
        <img src="https://via.placeholder.com/150" alt="" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">  
        Navbar
      </a>
        <ul class="navbar-nav ">
          <?php
            session_start();
            if(isset($_SESSION['username']))
              echo "<li class='nav-item'>
                      <a class='nav-link' href='profilo/profilo.html'>".$_SESSION['username']."</a>
                    </li>";
            elseif(isset($_COOKIE['username']))
              echo "<li class='nav-item'>
                      <a class='nav-link' href='profilo/profilo.html'>".$_COOKIE['username']."</a>
                    </li>";

            if(($_SESSION['email'] ?? null) || ($_COOKIE['email'] ?? null)){
              echo '<li class="nav-item">
                      <a class="nav-link" href="profilo/profilo.html">Profilo</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="login/logout.php">Logout</a>
                    </li>';
              // echo "<a class='nav-link' href='profilo/profilo.html'>Profilo</a>";
              // echo "<a class='nav-link' href='login/logout.php'>Logout</a>";
            }
            else
              echo "<li class='nav-item'>
                      <a class='nav-link' href='login/login.html'id='linkLogin'>Login</a>
                    </li>";
            ?>
        </ul>
    </nav>
    

    <!-- in evidenza -->
    <div id="div_evidenza">
      <h1>In Evidenza</h1>
      <ul id="Evidenza_Lista"></ul>
    </div>
    <hr />
    <!-- prima serata -->
    <div class="container-fluid mt-5">    
      <div class="d-flex w-75">
        <div class="p-2 flex-grow-1">

          <div class="btn-group btn-group-lg mb-4" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary">Prima Serata</button>
            <button type="button" class="btn btn-secondary">Seconda Serata</button>
            <button type="button" class="btn btn-secondary">Serata Unificata</button>
          </div>

          <!-- </div> -->
          <!-- <select class= "form-select w-25 mb-4"> id = "sceltaSerata" onchange="startup()">
            <option value="Prima" selected>Prima serata</option>
            <option value="Seconda">Seconda serata</option>
            <option value="Unificata">Serata unificata</option>
          </select> -->
          <!-- <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
          </div>      -->
            <div class="row row-cols-1 row-cols-md-1" id="serata-lista"></div>         
          </div>
      <div class="p-2 flex-fill">ciao</div>
        </div>
      
    </div>

  </body>
</html>
