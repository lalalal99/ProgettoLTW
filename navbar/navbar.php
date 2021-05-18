<nav class="navbar navbar-expand-md fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.php">
      <img src="../imgs/logo.png" height="60px"  alt="Logo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="dropdown ms-auto shadow-sm rounded" id="dropdown"></div>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
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
  <script>
    var col = getColoreCasuale();
    var colScritta;
    if (getBrightness(col) < 128)
      colScritta = 'ffffff';
    else
        colScritta = '000000';
    document.getElementById("imgProfNav").setAttribute("src", "https://via.placeholder.com/200x200/" + col + "/" + colScritta + "?text=" + $("#imgProfNav").attr('alt')[0].toUpperCase());
  </script>
</nav>
<!-- document.getElementById("imgProfilo").setAttribute("src", "https://via.placeholder.com/200x200/" + getColoreCasuale() + "/000000?text=" + data[0].toUpperCase()); -->