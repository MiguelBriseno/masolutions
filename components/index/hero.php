<?php
$hero = ["Crea tu propio ", "software ", "y lleva la ", "productividad ", "a otro nivel"];
$button = "Agenda tu sesión";
?>

<header class="header">
    <div class="header__left">
        <h1 class="left__title">
            <?= $hero[0] ?><span class="green"><?= $hero[1] ?></span><?= $hero[2] ?><span class="green"><?= $hero[3] ?></span><?= $hero[4] ?>
        </h1>
        <button class="left__button" onclick="window.open('https://calendly.com/d/cwty-bpz-z9f/reunion-puntual', '_blank')">
            <i class="fa-solid fa-calendar"></i> <?= $button ?>
        </button>
    </div>
    <div class="header__right">
        <img src="./assets/display.webp" alt="Imagen de celular mostrando software personalizado">
    </div>
</header>