import Draw from "./js/draw.js";

const paint_canva = document.querySelector("#paint_canva");
new Draw(paint_canva, "black", pencil_weight_slider.value);


paint_canva.width = window.innerWidth;
paint_canva.height = window.innerHeight * 0.8;
window.addEventListener('resize', () => {
  paint_canva.width = window.innerWidth;
  paint_canva.height = window.innerHeight * 0.8;
});
