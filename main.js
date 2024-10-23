import Draw from "./js/draw.js";
import listeners from "./js/listeners.js";

const paint_canva = document.querySelector("#paint_canva");
const draw = new Draw(paint_canva, "black", pencil_weight_slider.value);

listeners(paint_canva, draw);

draw.loadSave();