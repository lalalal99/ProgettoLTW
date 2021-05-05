<!DOCTYPE php>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    <!--Navigation bar-->
    <div id="nav-placeholder"></div>
    <script>
      $(function(){
        $("#nav-placeholder").load("navbar/navbar.php");
      });
    </script>
    <!--end of Navigation bar-->
    <!-- <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">Navbar</a>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav> -->

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
            <div class="row row-cols-1 row-cols-md-1" id="serata-lista"></div>         
          </div>
      <div class="p-2 flex-fill">ciao</div>
        </div>
      
    </div>

  </body>
</html>
