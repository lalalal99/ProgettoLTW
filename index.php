<!DOCTYPE php>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
    <link rel="stylesheet" type="text/css" href="css/index.css" />

    <script src="profilo/profilo.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <script type="text/javascript" src="utilities/utilities.js"></script>
    <script type="text/javascript" src="js/date-it-IT.js"></script>
    <script src="js/palinsesto_generator.js"></script>
    <script src="js/index.js"></script>
    <title>Guida TV</title>
  </head>
  <body onload="startup()">
    <!--Navigation bar-->
    <div id="nav-placeholder"></div>
    <script>
      $(function(){
        $("#nav-placeholder").load("navbar/navbar.php", () => navbarDropdown());
      });
    </script>
    <!--end of Navigation bar-->
    <!-- evidenza -->
    <div class="d-flex justify-content-evenly align-items-center bg rounded p-2" id="div-evidenza">
      <!-- spinner start -->
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <!-- spinner end -->
    </div>
    
    <div id="divAvviso" class="container m-auto fixed-bottom rounded p-2 shadow classe-nascosta">
      <div id="divID" class="d-flex flex-column align-items-center"></div>
      <button type="button" id="btnChiudiAvviso" class="btn btn-secondary shadow" style="color: white;">OK</button>
    </div>
    <!-- prima serata -->
    <div class="container-fluid mt-5 d-flex" id="container-serata">    
      <div class="d-flex flex-grow flex-column p-2"> 
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group btn-group-lg mb-4" role="group" aria-label="Basic example">
            <button type="button" onclick="serata('prima')" id="btn-prima-serata" class="btn btn-secondary">Prima Serata</button>
            <button type="button" onclick="serata('seconda')" id="btn-seconda-serata" class="btn btn-secondary">Seconda Serata</button>
            <button type="button" onclick="serata('unica')" id="btn-unica-serata" class="btn btn-secondary">Serata Unificata</button>
          </div>
        </div>
        <div class="d-flex flex-column" id="serata-lista">
          <!-- spinner start -->
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <!-- spinner end -->
        </div>          
      </div>   
      <div class="container w-50 h-50 rounded sticky" id="container-griglia-canali">    
        <div class="row fs-2 fw-normal rounded d-flex justify-content-center align-items-center mb-3" id="header-canali">Lista Canali</div>
      </div>   
    </div>
    <script> // Su non funziona
      $("#btnChiudiAvviso").click(function(){
        $("#divAvviso").remove();
        localStorage.setItem("lastCheck", Date.today().toString("dd/MM"));
      });
    </script>
  </body>
</html>
