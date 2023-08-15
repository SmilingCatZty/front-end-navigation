import { collisions } from './canvas-game/data/collisions'

if (process.client && document) {

  const collisionMap: any[] = []

  for (let i: number = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, 70 + i));
  }

  // 在客户端中执行的代码，可以使用 document 和其他浏览器对象
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  // 1024*576
  canvas.width = 1024
  canvas.height = 800

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const image = new Image()
  image.src = '../assets/images/basics/Pellet Town.png'

  const foregroundImage = new Image()
  foregroundImage.src = '../assets/images/basics/foregroundObjects.png'

  const playerImageUp = new Image()
  playerImageUp.src = '../assets/images/basics/playerUp.png'

  const playerImageDown = new Image()
  playerImageDown.src = '../assets/images/basics/playerDown.png'

  const playerImageLeft = new Image()
  playerImageLeft.src = '../assets/images/basics/playerLeft.png'

  const playerImageRight = new Image()
  playerImageRight.src = '../assets/images/basics/playerRight.png'


  let bgcImgX: number = -740
  let bgcImgY: number = -550
  let palyerImgX: number = -740
  let palyerImgY: number = -550

  const boundaries: any = []
  const offset = {
    x: -740,
    y: -550
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

  // 精灵图类
  class Sprite {
    position: { x: number, y: number }
    image: HTMLImageElement
    frames: { max: number, val: number, elapsed: number }
    width!: number
    height!: number;
    moving: boolean;
    sprites: any;
    constructor(
      {
        position, velocity, image, frames = { max: 1 }, width, height, sprites
      }:
        {
          position?: any, velocity?: any, image?: any, frames?: any, width?: number, height?: number, sprites?: any
        }
    ) {
      this.position = position
      this.image = image
      this.frames = { ...frames, val: 0, elapsed: 0 }

      this.image.onload = () => {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
      }
      this.moving = false
      this.sprites = sprites
    }
    draw() {
      ctx.drawImage(this.image,
        this.frames.val * this.width,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height,
      )
      if (!this.moving) return
      // if (this.moving) {
      if (this.frames.max > 1) {
        this.frames.elapsed++
      }
      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++
        } else {
          this.frames.val = 0
        }
      }
      // }
    }
  }

  // 玩家实例
  const player: Sprite = new Sprite({
    position: {
      x: canvas.width / 2 - playerImageDown.width / 4 / 2,
      y: canvas.height / 2 - playerImageDown.height / 2,
    },
    image: playerImageDown,
    frames: { max: 4 },
    sprites: {
      up:playerImageUp,
        down:playerImageDown,
      left:playerImageLeft,
      right:playerImageRight
    }
  })

  // 背景实例
  const background = new Sprite({
    position: {
      x: offset.x,
      y: offset.y
    },
    velocity: {},
    image: image
  })

  // 前景实例
  const foreground = new Sprite({
    position: {
      x: offset.x,
      y: offset.y
    },
    velocity: {},
    image: foregroundImage
  })

  collisionMap.forEach((row: number[], i: number) => {
    row.forEach((symbol: number, j: number) => {
      if (symbol === 1025) {
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            }
          }))
      }
    })
  })

  // 键盘按压
  const keys = {
    w: {
      pressed: false
    },
    a: {
      pressed: false
    },
    s: {
      pressed: false
    },
    d: {
      pressed: false
    }
  }

  // 移动
  const movables: Object[] = [background, ...boundaries, foreground]

  // 矩形碰撞检查
  function checkRectangularCollision(
    { rectangle1, rectangle2 }: { rectangle1: any, rectangle2: any }
  ): Boolean {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
  }
  // 动作函数
  function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary: any) => {
      boundary.draw()
    })
    player.draw()
    foreground.draw()

    let moving: boolean = true
    player.moving = false

    if (keys.w.pressed && lastKey === 'w') {
      player.moving = true
      player.image = playerImageUp
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          checkRectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 3
              }
            }
          })
        ) {
          console.log('w');
          moving = false
          break
        }
      }
      if (moving) {
        movables.forEach((movable: any) => {
          movable.position.y += 3
        })
      }
    }
    if (keys.a.pressed && lastKey === 'a') {
      player.moving = true
      player.image = playerImageLeft
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          checkRectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
                y: boundary.position.y
              }
            }
          })
        ) {
          console.log('a');
          moving = false
          break
        }
      }
      if (moving) {
        movables.forEach((movable: any) => {
          movable.position.x += 3
        })
      }
    }
    if (keys.s.pressed && lastKey === 's') {
      player.moving = true
      player.image = playerImageDown
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          checkRectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3
              }
            }
          })
        ) {
          console.log('s');
          moving = false
          break
        }
      }
      if (moving) {
        movables.forEach((movable: any) => {
          movable.position.y -= 3
        })
      }
    }
    if (keys.d.pressed && lastKey === 'd') {
      player.moving = true
      player.image = playerImageRight
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          checkRectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
                y: boundary.position.y
              }
            }
          })
        ) {
          console.log('d');
          moving = false
          break
        }
      }
      if (moving) {
        movables.forEach((movable: any) => {
          movable.position.x -= 3
        })
      }
    }
  }

  animate()

  let lastKey: string = ''

  // 监听键盘触控事件
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break
      case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break
      case 's':
        keys.s.pressed = true
        lastKey = 's'
        break
      case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
    }
  })

  // 监听键盘弹起事件
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
      case 's':
        keys.s.pressed = false
        break
      case 'd':
        keys.d.pressed = false
        break
    }
  })
} else {
  // 在服务端执行的代码，不应该使用 document 和其他浏览器对象
}