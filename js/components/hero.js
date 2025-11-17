const phrases = ["web", "móviles", "a la medida"];
let currentIndex = 0;

export function initHero() {
  const dynamicText = document.getElementById("hero-dynamic-text");
  if (!dynamicText) return;

  // Primera asignación
  dynamicText.textContent = phrases[currentIndex];

  setInterval(() => {
    currentIndex = (currentIndex + 1) % phrases.length;

    // Pequeña animación con clase
    dynamicText.classList.add("hero-dynamic--out");

    setTimeout(() => {
      dynamicText.textContent = phrases[currentIndex];
      dynamicText.classList.remove("hero-dynamic--out");
      dynamicText.classList.add("hero-dynamic--in");

      setTimeout(() => {
        dynamicText.classList.remove("hero-dynamic--in");
      }, 200);
    }, 200);
  }, 2200);
}
