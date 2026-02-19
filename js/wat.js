const track = document.getElementById("track");
const runtime = document.getElementById("runtime");
const overlay = document.getElementById("overlay");
const audio = document.getElementById("omfgaudio");

const catArt = ["=^.^=", "(=^o^=)", "(=^..^=)", "(=^x^=)", "(=^_^=)"];
const speeds = ["fast", "medium", "slow"];

let startedAt = null;
let timer = null;

function spawnCat() {
  const cat = document.createElement("div");
  cat.className = `cat ${speeds[Math.floor(Math.random() * speeds.length)]}`;
  cat.style.top = `${Math.floor(Math.random() * 80)}vh`;
  cat.textContent = catArt[Math.floor(Math.random() * catArt.length)];
  track.appendChild(cat);

  setTimeout(() => {
    cat.remove();
  }, 8000);
}

function updateRuntime() {
  if (!startedAt) {
    return;
  }
  const seconds = Math.floor((Date.now() - startedAt) / 1000);
  runtime.textContent = `Cats have been running for ${seconds} second${seconds === 1 ? "" : "s"}.`;
}

window.startCats = function startCats() {
  if (startedAt) {
    return;
  }

  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400);

  startedAt = Date.now();
  timer = setInterval(updateRuntime, 1000);

  setInterval(spawnCat, 250);
  for (let i = 0; i < 12; i += 1) {
    setTimeout(spawnCat, i * 110);
  }

  audio.play().catch(() => {
    // Optional audio file. If missing, run silently.
  });
};
