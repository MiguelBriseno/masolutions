<?php
$hero = ["Crea tu propio ", "software ", "y lleva la ", "productividad ", "a otro nivel"];
$attended = "Atención las 24 hrs";
$button = "Agenda tu sesión";
?>

<header class="header">
    <div class="header__left">
        <h1 class="left__title">
            <?= $hero[0] ?> <span class="green"><?= $hero[1] ?></span> <?= $hero[2] ?> <span class="green"><?= $hero[3] ?></span> <?= $hero[4] ?><br>
            <button class="left__button">
                <i class="fa-solid fa-calendar"></i> <?= $button ?>
            </button>
        </h1>
    </div>
    <div class="header__right">
        <img src="./assets/display.webp" alt="Imagen de celular">
    </div>
</header>
