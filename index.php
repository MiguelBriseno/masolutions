<?php
$title = "Home";
$subtitulo = "Nuestros clientes satisfechos";
require_once './components/general/header.php';
require_once './components/general/navbar.php';
?>

<main class="main">
    <?php
        require_once './components/index/hero.php';
    ?>
    <h3 class="subtitle"><?= $subtitulo ?></h3>
    <?php
        require_once './components/index/slider.php';
    ?>
    <?php 
        include_once './components/index/cards.php';
    ?>
</main>

<?php
require_once './components/general/footer.php';
?>
