<nav class="navbar navbar-expand-lg sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.php">
      <img src="https://via.placeholder.com/30"  alt="Logo">
      Navbar
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <?php
        session_start();
        
        if(isset($_SESSION['username']))
          echo "<li class='nav-item'>
                  <a class='nav-link' href='../profilo/profilo.html'>".$_SESSION['username']."</a>
                </li>";
        elseif(isset($_COOKIE['username']))
          echo "<li class='nav-item'>
                  <a class='nav-link' href='../profilo/profilo.html'>".$_COOKIE['username']."</a>
                </li>";

        if(($_SESSION['email'] ?? null) || ($_COOKIE['email'] ?? null)){
          echo '<li class="nav-item">
                  <a class="nav-link" href="../login/logout.php">Logout</a>
                </li>';
        }
        else
          echo "<li class='nav-item'>
                  <a class='nav-link' href='../login/login.html'id='linkLogin'>Login</a>
                </li>";
        ?>
      </ul>
    </div>
  </div>
</nav>