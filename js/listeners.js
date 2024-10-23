const elements = {
  weight_slider: document.querySelector("#pencil_weight_slider"),
  reset_btn: document.querySelector("#canva_reset_btn"),
  download_btn: document.querySelector("#canva_download_btn"),
  colors_btn: document.querySelectorAll(".colors_container input")
}

export default function listeners(paint_canva, draw) {

  /*-------------------------------------------------------*/
  /* LISTENERS FOR DRAWING TOOLS*/

  for (const color of elements.colors_btn) {
    color.addEventListener('click', (e) => {
      const dataColor = e.target.dataset.color;
      draw.strokeColor = dataColor;
    })
  }

  elements.download_btn.addEventListener("click", () => {
    draw.download();
  });

  elements.reset_btn.addEventListener("click", () => {
    draw.canvaReset();
  });

  elements.weight_slider.addEventListener("change", () => {
    draw.strokeWidth = elements.weight_slider.value;
  });

  /*-------------------------------------------------------*/
  /* LISTENERS FOR DRAWING*/

  paint_canva.addEventListener("mousedown", (e) => {
    draw.isPainting = true;
  })

  paint_canva.addEventListener("mouseup", (e) => {
    draw.isPainting = false;
    draw.stopPaint();
    draw.save();
  })

  paint_canva.addEventListener("mouseleave", (e) => {
    draw.isPainting = false;
    draw.stopPaint();
    draw.save();
  })

  paint_canva.addEventListener("mousemove", (e) => {
    if (draw.isPainting) {
      draw.paint(e);
    }
  })
}