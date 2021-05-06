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
    <!-- in evidenza -->
    <div id="div_evidenza">
      <h1>In Evidenza</h1>
      <ul id="Evidenza_Lista"></ul>
    </div>
    <hr />
    <!-- prima serata -->
    <div class="container-fluid mt-5 d-flex">    
      <div class="d-flex flex-grow">
        <div class="p-2">
          <div class="btn-group btn-group-lg mb-4" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary">Prima Serata</button>
            <button type="button" class="btn btn-secondary">Seconda Serata</button>
            <button type="button" class="btn btn-secondary">Serata Unificata</button>
          </div>
          <div class="d-flex flex-column" id="serata-lista">
          </div>         
        </div>        
      </div>   
      <div class="container w-50 h-50 rounded sticky" id="container-griglia-canali">    
        <div class="row fs-2 fw-normal rounded d-flex justify-content-center align-items-center mb-3" id="header-canali">Lista Canali</div>
      </div>   
    </div>
  </body>
</html>
