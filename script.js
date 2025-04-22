const steps = document.querySelectorAll(".step, .arrow");
let current = 0;

function showStep(index) {
  steps.forEach((el, i) => {
    el.style.display = i <= index ? "block" : "none";
  });

  const btn = document.getElementById("next-btn");
  if (index >= steps.length - 1) {
    btn.innerText = "Reiniciar";
  } else {
    btn.innerText = "Siguiente";
  }
}

function nextStep() {
  if (current >= steps.length - 1) {
    current = 0;
  } else {
    current++;
  }
  showStep(current);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.id = "next-btn";
  btn.innerText = "Siguiente";
  btn.onclick = nextStep;
  btn.classList.add("next-button");
  document.querySelector(".container").appendChild(btn);

  showStep(current);
});
