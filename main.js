const paint_canva = document.querySelector("#paint_canva");

/*---------------------------------------------------------------*/
/* LISTENERS */

let isPainting = false;

paint_canva.addEventListener("mousedown", (e) => {
  isPainting = true;
})

paint_canva.addEventListener("mouseup", (e) => {
  isPainting = false;
  saveCanva();
})

paint_canva.addEventListener("mouseleave", (e) => {
  isPainting = false;
  saveCanva();
})

paint_canva.addEventListener("mousemove", (e) => {
  if (isPainting) {
    const rect = paint_canva.getBoundingClientRect();
    paint(e.clientX - rect.left, event.clientY - rect.top);
  }
})

/*---------------------------------------------------------------*/
/* COLOR PICKER */
const colors_container = document.querySelector(".colors_container");
const colors = [{ color: "black" }, { color: "green" }, { color: "red" }]
let paint_color = colors[0].color;

for (let i = 0; i < colors.length; i++) {
  colors_container.innerHTML += `
    <input type="button" class="colors_picker" onclick="changeColor(${i})" style="background-color: ${colors[i].color};"/>
  `
}

function changeColor(id) {
  paint_color = colors[id].color;
}

/*---------------------------------------------------------------*/
/* WEIGHT SLIDER */
const pencil_weight_slider = document.querySelector("#pencil_weight_slider");
let paint_weight = pencil_weight_slider.value;

pencil_weight_slider.addEventListener("change", () => {
  paint_weight = pencil_weight_slider.value;
});

/*---------------------------------------------------------------*/
/* CANVA PAINTING */

const ctx = paint_canva.getContext("2d");

function paint(x, y) {
  ctx.fillStyle = paint_color;
  ctx.fillRect(x, y, paint_weight, paint_weight);
}

/*---------------------------------------------------------------*/
/* CANVA RESET */
const canva_reset_btn = document.querySelector("#canva_reset_btn");

function canvaReset() {
  ctx.clearRect(0, 0, paint_canva.width, paint_canva.height);
}

canva_reset_btn.addEventListener("click", () => {
  canvaReset();
});

/*---------------------------------------------------------------*/
/* CANVA DOWNLOAD */
const canva_download_btn = document.querySelector("#canva_download_btn");

function canvaDownload() {
  const link = document.createElement('a');
  link.download = 'dessin.png';
  link.href = paint_canva.toDataURL("image/png");
  link.click();
}

canva_download_btn.addEventListener("click", () => {
  canvaDownload();
});

/*---------------------------------------------------------------*/
/* CANVA AUTOSAVE */

function saveCanva() {
  const dataUrl = paint_canva.toDataURL();
  localStorage.setItem('canva', dataUrl);
  console.log("CANVA SAVED");
}

function loadCanva() {
  const savedCanva = localStorage.getItem('canva');
  if (savedCanva) {
    const img = new Image();
    img.src = savedCanva;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }
  }
}

loadCanva();