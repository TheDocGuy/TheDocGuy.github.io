(() => {
  const slides = [...document.querySelectorAll("[data-slide]")];
  if (slides.length === 0) return;

  const progress = document.querySelector("[data-progress]");
  let index = 0;

  const params = new URLSearchParams(location.search);
  const fromHash = Number.parseInt(location.hash.replace("#", ""), 10);
  if (Number.isFinite(fromHash) && fromHash >= 1 && fromHash <= slides.length) {
    index = fromHash - 1;
  } else if (params.get("slide")) {
    const n = Number.parseInt(params.get("slide") || "1", 10);
    if (Number.isFinite(n)) index = Math.min(Math.max(n - 1, 0), slides.length - 1);
  }

  function scale() {
    const sx = window.innerWidth / 1920;
    const sy = window.innerHeight / 1080;
    document.documentElement.style.setProperty("--slide-scale", String(Math.min(sx, sy)));
  }

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
      const counter = slide.querySelector("[data-counter]");
      if (counter) {
        counter.textContent = String(i + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
      }
    });
    if (progress) {
      progress.textContent = String(index + 1) + " / " + slides.length;
    }
    history.replaceState(null, "", "#" + (index + 1));
  }

  function go(delta) {
    index = Math.min(Math.max(index + delta, 0), slides.length - 1);
    render();
  }

  window.addEventListener("resize", scale);
  window.addEventListener("keydown", (event) => {
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      go(1);
    }
    if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(event.key)) {
      event.preventDefault();
      go(-1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      index = 0;
      render();
    }
    if (event.key === "End") {
      event.preventDefault();
      index = slides.length - 1;
      render();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    go(event.clientX > window.innerWidth / 2 ? 1 : -1);
  });

  scale();
  render();
})();
