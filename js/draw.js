import listeners from "./listeners.js";

export default class Draw {
  constructor(canva, strokeColor, strokeWidth) {
    this.canva = canva;
    this.isPainting = false;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.ctx = canva.getContext("2d");
    this.lastPosX = null;
    this.lastPosY = null;
    listeners(this);
    this.loadSave();
  }

  paint(e) {
    this.ctx.beginPath();
    if (this.lastPosX && this.lastPosY) {
      this.ctx.moveTo(this.lastPosX, this.lastPosY);
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineCap = "round";
      this.ctx.stroke();
    }
    this.lastPosX = e.offsetX;
    this.lastPosY = e.offsetY;
  }

  stopPaint() {
    this.lastPosX, this.lastPosY = null;
  }

  canvaReset() {
    this.ctx.clearRect(0, 0, paint_canva.width, paint_canva.height);
  }

  save() {
    const dataUrl = paint_canva.toDataURL();
    localStorage.setItem('canva', dataUrl);
  }

  loadSave() {
    const savedCanva = localStorage.getItem('canva');
    if (savedCanva) {
      const img = new Image();
      img.src = savedCanva;
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0);
      }
    }
  }

  download() {
    const link = document.createElement('a');
    link.download = 'dessin.png';
    link.href = paint_canva.toDataURL("image/png");
    link.click();
  }
}