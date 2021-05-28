<nav class="navbar navbar-expand-md fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.php">
      <img src="../imgs/logo.png" height="60px"  alt="Logo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <style>
      /* Stile relativo alla schermata di ricerca */
      .search-screen {
        height: 0;
        background-color: rgba(20, 33, 61, 0.5);
        opacity: 1;
        transform: translateY(-50%);
        transition: 0.3s linear 0.3s;
        position: fixed;
        overflow-y: scroll;
      }

      body.has-overlay{overflow: hidden;} /* Impedisce lo scroll del body quando la schermata è aperta*/

      .close-icon { /* Pone l'icona per chiudere la schermata in alto a destra */
        position: absolute;
        top: 80px;
        right: 40px;
        color: #fff;
        font-size: 50px;
      }

      .search-screen.active {
        transition-delay: 0s;
        height: 100vh;
      }

      .btn-icon:hover { /* Trasforma il cursore in una "manina" quando passa sulle icone di chiusura e di ricerca */
        cursor: pointer;
      }

      #div-results::-webkit-scrollbar { /* Il div con i risultati è scrollabile ma non viene mostrata la scrollbar */
        display: none;
      }

      #div-results { /* Prende come sfondo quello della search screen */
        background-color: transparent;
      }

      .nav-link { /* I link nella navbar non sono blu ma neri */
        color: black;
      }
      .nav-link:hover {
        color: black;
      }
    </style>
    <script>
      $(document).ready(function(){
        // Aggiunge la classe active e al body aggiunge la classe has-overlay necessaria per la corretta visualizzazione della search screen
        $("#imgSearchNav").click(function(){
            $(".search-screen").addClass("active");
            $(document.body).addClass("has-overlay");
        });

        // Remove le classi active e has-overlay
        $(".close-icon").click(function(){
            $(".search-screen").removeClass("active");
            $(document.body).removeClass("has-overlay");
            $("#div-results").remove(); //Distrugge il div con i risultati così non ricompariranno alla  successiva apertura della search screen
        });
      });
    </script>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="dropdown ms-auto shadow-sm rounded" id="dropdown"></div>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item d-flex align-items-center me-2">
          <img id='imgSearchNav' src='../imgs/search.png' class='btn-icon' height='35px'/> <!-- Permette di aprire la search-screen -->
        </li>
        <?php
        session_start();
        
        if(!($_SESSION['email'] ?? null)){ //Controlla se la sessione è già salvata
          if($_COOKIE['email'] ?? null){ //Se non lo è ma lo sono i cookies
            //Allora inizializza le variabili di sessione con le informazioni salvate nei cookies
            $_SESSION['email'] = $_COOKIE['email'];
            $_SESSION['username'] = $_COOKIE['username'];
            $_SESSION['password'] = $_COOKIE['password'];
          }
        }
        if(isset($_SESSION['username'])){ //Se l'utente è loggato e ha uno username mette l'immagine di profilo con l'iniziale dello username
          echo "<li class='nav-item'>
                  <a class='nav-link' href='../profilo/profilo.php'>
                    <img id='imgProfNav' src='' class='rounded-circle shadow' style='border: 2px solid #e5e5e5;' width='50px' alt='".$_SESSION["username"]."'/>
                  </a>
                </li>";
        }
        if(($_SESSION['email'] ?? null) || ($_COOKIE['email'] ?? null)){ //Se l'utente è loggato scrive 'logout' per dare la possibilità di disconnettersi
          echo "<li class='nav-item d-flex align-items-center'>
                  <a class='nav-link fs-4' href='../login/logout.php'>Logout</a>
                </li>";
        }
        else //Altrimenti scrive login affinché l'utente possa entrare
          echo "<li class='nav-item d-flex align-items-center'>
                  <a class='nav-link fs-4' href='../login/login.html'id='linkLogin'>Login</a>
                </li>";
        ?>
      </ul>
    </div>
  </div>
  <!-- Qui inizia la parte inizialmente nascosta della search screen contentente: la barra di ricerca e l'icona per cercare oltre all'icona X per chiudere la schermata  -->
  <div id="search-screen" class="search-screen w-100 d-flex flex-column align-items-center justify-content-center position-fixed overflow-hidden top-50">
      <div class=" w-100 d-flex justify-content-center align-items-center">
        <i class="close-icon fas fa-times btn-icon"></i>
        <input type="search" id="srcInput" class="form-control rounded fs-1 border-0 w-50 mt-2" length="50" maxlength="50" placeholder="Inserisci il nome di un programma da cercare">
        <img src="../imgs/search_white.png" id="imgSearch" width="55" height="45" class="ms-2 btn-icon" onclick="cercaDaSeguire()"/>
      </div>
    </div>
  <script>
    // Questo script serve a generare l'immagine di profilo con un colore di sfondo casuale e a seconda della luminosità del colore di sfondo sceglie il colore del testo
    var col = getColoreCasuale();
    var colScritta;
    if (getBrightness(col) < 128) //A seconda della luminosità dello sfondo
      colScritta = 'ffffff'; //Scritta in bianco
    else
      colScritta = '000000'; //Scritta in nero

    if(document.getElementById("imgProfNav") != null) //Crea immagine con viaplaceholder passando la prima lettera dello username in maiuscolo come testo
      document.getElementById("imgProfNav").setAttribute("src", "https://via.placeholder.com/200x200/" + col + "/" + colScritta + "?text=" + $("#imgProfNav").attr('alt')[0].toUpperCase());
        
    document.getElementById("srcInput").addEventListener("keyup", function(event) {
      //Questa funzione serve a permettere all'utente di cercare un programma anche senza cliccare sull'icona della ricerca ma semplicemente premendo invio
      if (event.keyCode == 13) {
        event.preventDefault(); //Rimuove gli eventi associati di default all'azione
        document.getElementById("imgSearch").click(); //"Triggera" l'evento click sull'icona della ricerca (lente d'ingrandimenro accanto alla input text)
      }
    });
  </script>
</nav>