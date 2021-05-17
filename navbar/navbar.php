<nav class="navbar navbar-expand-md fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.php">
      <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" height="40px"  alt="Logo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <style>
      .search-screen {
        height: 0;
        background-color: rgba(20, 33, 61, 0.5);
        opacity: 1;
        transform: translateY(-50%);
        transition: 0.3s linear 0.3s;
      }

      .close-icon {
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

      .btn-icon:hover {
        cursor: pointer;
      }
    </style>
    <script>
      $(document).ready(function(){
        // Add Active Class
        $("#imgSearchNav").click(function(){
            $(".search-screen").addClass("active");
        });

        // Remove Active Class
        $(".close-icon").click(function(){
            $(".search-screen").removeClass("active");
        });
      });
    </script>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="dropdown ms-auto shadow-sm rounded" id="dropdown"></div>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item d-flex align-items-center me-2">
          <img id='imgSearchNav' src='../imgs/search.png' class='btn-icon' height='35px'/>
        </li>
        <?php
        session_start();
        
        if(!($_SESSION['email'] ?? null)){
          if($_COOKIE['email'] ?? null){
              $_SESSION['email'] = $_COOKIE['email'];
              $_SESSION['username'] = $_COOKIE['username'];
              $_SESSION['password'] = $_COOKIE['password'];
          }
        }
        if(isset($_SESSION['username'])){
          // echo "<li>
          //         <img id='imgSearchNav' src='../imgs/search.png' width='40px'/>
          //       </li>";
          echo "<li class='nav-item'>
                  <a class='nav-link' href='../profilo/profilo.php'>
                    <img id='imgProfNav' src='' class='rounded-circle shadow' style='border: 2px solid #e5e5e5;' width='50px' alt='".$_SESSION["username"]."'/>
                  </a>
                </li>";
          // echo "<li class='nav-item'>
          //         <a id='aId' class='nav-link fs-4' href='../profilo/profilo.php'>".$_SESSION['username']."</a>
          //       </li>";
        }
        // elseif(isset($_COOKIE['username']))
        //   echo "<li class='nav-item'>
        //           <a class='nav-link fs-4' href='../profilo/profilo.php'>".$_COOKIE['username']."</a>
        //         </li>";

        if(($_SESSION['email'] ?? null) || ($_COOKIE['email'] ?? null)){
          echo "<li class='nav-item d-flex align-items-center'>
                  <a class='nav-link fs-4' href='../login/logout.php'>Logout</a>
                </li>";
        }
        else
          echo "<li class='nav-item d-flex align-items-center'>
                  <a class='nav-link fs-4' href='../login/login.html'id='linkLogin'>Login</a>
                </li>";
        ?>
      </ul>
    </div>
  </div>
  <div class="search-screen w-100 d-flex align-items-center justify-content-center position-fixed overflow-hidden top-50">
    <i class="close-icon fas fa-times btn-icon"></i>
    <input type="search" id="srcInput" class="form-control rounded fs-1 border-0 w-50" length="50" maxlength="50" placeholder="Inserisci il nome di un programma da cercare">
    <img src="../imgs/search_white.png" id="imgSearch" width="55" height="45" class="ms-2 btn-icon" onclick="cercaDaSeguire()"/>
  </div>
  <script>
    var col = getColoreCasuale();
    var colScritta;
    if (getBrightness(col) < 128)
      colScritta = 'ffffff';
    else
        colScritta = '000000';

    if(document.getElementById("imgProfNav") != null)
      document.getElementById("imgProfNav").setAttribute("src", "https://via.placeholder.com/200x200/" + col + "/" + colScritta + "?text=" + $("#imgProfNav").attr('alt')[0].toUpperCase());
        
    document.getElementById("srcInput").addEventListener("keyup", function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("imgSearch").click();
      }
    });
  </script>
</nav>
<!-- document.getElementById("imgProfilo").setAttribute("src", "https://via.placeholder.com/200x200/" + getColoreCasuale() + "/000000?text=" + data[0].toUpperCase()); -->