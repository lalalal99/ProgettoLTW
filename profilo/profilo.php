<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="//code.jquery.com/jquery-3.5.0.min.js"></script>
    <script type="text/javascript" lang="javascript" src="profilo.js"></script>
    <script type="text/javascript" src="../utilities/utilities.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="profilo_style.css" />
    <link rel="stylesheet" type="text/css" href="../css/index.css" />
    <title>GuidaTV | Profilo</title>
    <?php
      session_start();
      if (!$_SESSION['email'] && !$_COOKIE['email']){
        header("Location: ../index.php");
      }
    ?>
  </head>
  <body onload="popolaCampi()">
    <!--Navigation bar-->
    <div id="nav-placeholder"></div>
    <script>
      $(function () {
        $("#nav-placeholder").load("../navbar/navbar.php", ()=>setColoreImmagine());
      });
      $(document).ready(function(){
          $('[data-toggle="popover"]').popover({
            trigger: 'hover'
          });   
      });
      $(document).ready(function(){
        // Add Active Class
        $("#btnCercaDaSeguire").click(function(){
            $(".search-screen").addClass("active");
        });

        // Remove Active Class
        $(".close-icon").click(function(){
            $(".search-screen").removeClass("active");
        });
      });
    </script>
    <!--end of Navigation bar-->

    <div id="search-screen" class="search-screen w-100 d-flex flex-column align-items-center justify-content-center position-fixed overflow-hidden top-50">
      <div class=" w-100 d-flex align-items-center justify-content-center">
        <i class="close-icon fas fa-times btn-icon"></i>
        <input type="search" id="srcInput" class="form-control rounded fs-1 border-0 w-50" length="50" maxlength="50" placeholder="Inserisci il nome di un programma da cercare">
        <img src="../imgs/search_white.png" id="imgSearch" width="55" height="45" class="ms-2 btn-icon" onclick="cercaDaSeguire()"/>
      </div>
    </div>
    
    <div class="container rounded-3 container-primo">
      <div class="row no-gutters">
        <div class="col-md-5 mb-3 text-center mt-4">
          <div class="d-flex align-items-baseline justify-content-center">
            <img id="imgProfilo"
              src=""
              class="rounded-circle shadow"
              width="200px"
              alt="immagine profilo"
            />
          </div>
          <div class="d-flex justify-content-center align-items-center mt-4">
            <label for="txtUsernameProf" class="form-label">Username: </label>
            <input type="text" id="txtUsernameProf" class="form-control w-50" maxlength="40" disabled/>
            <img src="../imgs/pencil.png" id="imgUsername" width="16" height="16" class="ms-2 btn-icon" onclick="abilitaModifica('username')"/>
            <input type="button" name="btnUsr" id="btnSalvaUsername" class="classe-nascosta btn btn-secondary m-2" value="Salva" onclick="modificaUsername()"/>
            <input type="button" name="btnUsr" id="btnAnnullaUsername" class="classe-nascosta btn btn-secondary m-2" value="Annulla" onclick="annullaModifica('username')"/>
          </div>
        </div>
        <div class="col-md-7 align-self-center">
          <div class="bg-container rounded-3 m-4 p-3 shadow">
            <div class="row">
              <div name="collab" class="col col-4 text-center">
                <label for="txtEmailProf" class="mt-2">Email:</label>
              </div>
              <div class="col">
                <input
                  type="email"
                  id="txtEmailProf"
                  class="form-control"
                  size="40"
                  maxlength="40"
                  pattern="[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  disabled
                />
              </div>
              <div class="col col-1"></div>
            </div>
            <div class="row">
              <div name="collab" class="col col-4 text-center">
                <label for="txtPasswordProf" class="mt-2">Password:</label>
              </div>
              <div class="col">
                <input
                  type="password"
                  id="txtPasswordProf"
                  class="form-control"
                  maxlength="40"
                  disabled
                />
              </div>
              <div class="col col-1">
                <img
                  src="../imgs/pencil.png"
                  width="16"
                  height="16"
                  class="mt-3 btn-icon"
                  onclick="abilitaModifica('password')"
                />
              </div>
            </div>
            <div class="row">
              <div name="collab" class="col col-4 text-center">
                <label
                  for="txtPasswordCorrente"
                  class="classe-nascosta mt-2"
                  name="txtPsw"
                  >Password corrente:
                </label>
              </div>
              <div class="col">
                <input
                  type="password"
                  class="classe-nascosta form-control"
                  name="txtPsw"
                  id="txtPasswordCorrente"
                  maxlength="40"
                />
              </div>
              <div class="col col-1"></div>
            </div>
            <div class="row">
              <div name="collab" class="col col-4 text-center">
                <label
                  for="txtNuovaPassword"
                  class="classe-nascosta mt-2"
                  name="txtPsw"
                  >Nuova password:
                </label>
              </div>
              <div class="col">
                <input
                  type="password"
                  class="classe-nascosta form-control"
                  name="txtPsw"
                  id="txtNuovaPassword"
                  maxlength="40"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Deve contenere almeno 8 caratteri di cui almeno: un numero, una lettera maiuscola e una minuscola"
                />
              </div>
              <div class="col col-1"></div>
            </div>
            <div class="row">
              <div name="collab" class="col col-4 text-center">
                <label
                  for="txtConfermaPassword"
                  class="classe-nascosta mt-2"
                  name="txtPsw"
                  >Conferma nuova password:
                </label>
              </div>
              <div class="col">
                <input
                  type="password"
                  class="classe-nascosta form-control"
                  name="txtPsw"
                  id="txtConfermaPassword"
                  maxlength="40"
                />
              </div>
              <div class="col col-1"></div>
            </div>
            <div class="row">
              <div class="col col-4"></div>
              <div name="collab" class="col text-center">
                <input
                  type="button"
                  name="txtPsw"
                  id="btnSalvaPassword"
                  value="Salva"
                  class="classe-nascosta btn btn-secondary"
                  onclick="modificaPassword()"
                />
                <input
                  type="button"
                  name="txtPsw"
                  value="Annulla"
                  id="btnAnnullaPsw"
                  class="classe-nascosta btn btn-secondary mx-3"
                  onclick="annullaModifica('password')"
                />
              </div>
              <div class="col col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container rounded-3 mt-5 p-3">
      <div id="topSecondo" class="d-flex p-1">
        <p class="fs-4 mt-2">Programmi seguiti</p>
        <img src="../imgs/hint.png" class="ms-1 mt-2" id="imgHint" height="16" data-toggle="popover" data-placement="right" data-bs-content="Qui puoi trovare tutti i programmi da te inseriti nella lista dei seguiti">
        <button id="btnCercaDaSeguire" class="btn btn-secondary fs-2 d-flex align-items-center justify-content-center ms-auto mt-2 search-icon"><b>+</b></button>
      </div>
      <div id="divSeguiti" class="container rounded mt-3"></div>
    </div>
    <script> //Se lo metto su insieme a tutto il resto non funziona
      //Invio dati su invio press in searchbox
      document.getElementById("srcInput").addEventListener("keyup", function(event) {
        if (event.keyCode == 13) { // 13 è il numero di "Invio" nella tastiera
          event.preventDefault(); //Cancella, per sicurezza, le azioni di default associate a "Invio"
          // Triggera con un click la lente di ricerca
          document.getElementById("imgSearch").click();
        }
      });
    </script>
  </body>
</html>
<!-- this.style.display='none' -->
