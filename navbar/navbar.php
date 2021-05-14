<nav class="navbar navbar-expand-md fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.php">
      <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" height="40px"  alt="Logo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="dropdown ms-auto" id="dropdown"></div>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <?php
        session_start();
        
        if(!$_SESSION['email']){
          if($_COOKIE['email']){
              $_SESSION['email'] = $_COOKIE['email'];
              $_SESSION['username'] = $_COOKIE['username'];
              $_SESSION['password'] = $_COOKIE['password'];
          }
        }
        if(isset($_SESSION['username']))
          echo "<li class='nav-item'>
                  <a class='nav-link fs-4' href='../profilo/profilo.php'>".$_SESSION['username']."</a>
                </li>";
        // elseif(isset($_COOKIE['username']))
        //   echo "<li class='nav-item'>
        //           <a class='nav-link fs-4' href='../profilo/profilo.php'>".$_COOKIE['username']."</a>
        //         </li>";

        if(($_SESSION['email'] ?? null) || ($_COOKIE['email'] ?? null)){
          echo "<li class='nav-item'>
                  <a class='nav-link fs-4' href='../login/logout.php'>Logout</a>
                </li>";
        }
        else
          echo "<li class='nav-item'>
                  <a class='nav-link fs-4' href='../login/login.html'id='linkLogin'>Login</a>
                </li>";
        ?>
      </ul>
    </div>
  </div>
</nav>