// 精灵图类
class Sprite {
  position: { x: number, y: number }
  image: HTMLImageElement
  frames: { max: number }
  width!: number
  height!: number;
  constructor(
    { position, velocity, image, frames = { max: 1 }, width, height }: { position?: any, velocity?: any, image?: any, frames?: any, width?: number, height?: number }
  ) {
    this.position = position
    this.image = image
    this.frames = frames

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
  }
  draw() {
    ctx.drawImage(this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height,
    )
  }
}

// 边界类
class Boundary {
  width: number
  height: number
  position: { x: number; y: number }
  static width: number = 48
  static height: number = 48
  constructor({ position }: { position: { x: number, y: number } }) {
    this.position = position
    this.width = 48
    this.height = 48
  }
  draw() {
    ctx.fillStyle = 'rgba(255,255,255,.2)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}