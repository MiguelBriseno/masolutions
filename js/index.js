let button = document.querySelector("#logo");
button.addEventListener('click', () => {
    window.location = "./index.php";
});

const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');

let index = 0;
const visible = 3;
const total = images.length;

function updateSlider() {
  const slideWidth = images[0].offsetWidth + 20;
  const maxIndex = total - visible;
  if (index > maxIndex) index = 0;

  slides.style.transform = `translateX(-${index * slideWidth}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

setInterval(() => {
  index++;
  updateSlider();
}, 3000);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateSlider();
  });
});

updateSlider();
