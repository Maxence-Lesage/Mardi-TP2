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
    paint(e);
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
let oldPosX, oldPosY = 0;

function paint(e) {
  ctx.fillStyle = paint_color;
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, paint_weight, 0, 2 * Math.PI);
  ctx.fill();
  const midleX = e.offsetX - oldPosX;
  const midleY = e.offsetY - oldPosY;
  if (midleX <= 5 && midleX >= -5 && midleY <= 5 && midleY >= -5) {
    ctx.beginPath();
    ctx.arc(e.offsetX + midleX, e.offsetY + midleY, paint_weight / 1.7, 0, 2 * Math.PI);
    ctx.fill();
  }
  oldPosX = e.offsetX;
  oldPosY = e.offsetY;
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