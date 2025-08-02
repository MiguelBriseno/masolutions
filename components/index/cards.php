<?php
$cards = [
    ["Proyectos", 129, "fa-solid fa-folder-open"],
    ["Años de experiencia", 5, "fa-solid fa-calendar-alt"],
    ["Eficiencia", 93, "fa-solid fa-chart-line"]
];
?>

<div class="cards__container">
    <?php foreach ($cards as $card): ?>
        <div class="card">
            <div class="card__text">
                <h3 class="card__title"><?= htmlspecialchars($card[0]) ?></h3>
                <p class="card__subtitle" data-target="<?= htmlspecialchars($card[1]) ?>">0</p>
            </div>
            <div class="card__icon">
                <i class="<?= htmlspecialchars($card[2]) ?>" aria-hidden="true"></i>
            </div>
        </div>
    <?php endforeach; ?>
</div>
