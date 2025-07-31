<?php
$title = "Home";
require_once './components/general/header.php';
require_once './components/general/navbar.php';
?>

<main class="main">
    <?php
        require_once './components/index/hero.php';
    ?>
    <?php
        require_once './components/index/slider.php';
    ?>
</main>

<?php
require_once './components/general/footer.php';
?>
