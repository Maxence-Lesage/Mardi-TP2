import Draw from "./js/draw.js";

const paint_canva = document.querySelector("#paint_canva");
new Draw(paint_canva, "black", pencil_weight_slider.value);