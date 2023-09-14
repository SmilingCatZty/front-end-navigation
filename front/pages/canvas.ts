import { collisions } from './canvas-game/data/collisions'
import { battleZonesData } from './canvas-game/data/battleZones'
import { gsap } from 'gsap'

console.log('enter canvas game');

export function createCanvas(): void {
  if (process.client && document) {
    //碰撞区域
    const collisionMap: any[] = []
    for (let i: number = 0; i < collisions.length; i += 70) {
      collisionMap.push(collisions.slice(i, 70 + i));
    }
    // 战斗区域
    const battleZonesMap: any = []
    for (let i: number = 0; i < battleZonesData.length; i += 70) {
      battleZonesMap.push(battleZonesData.slice(i, 70 + i));
    }

    const attacks: any = {
      Tackle: {
        name: 'Tackle',
        damage: 10,
        type: 'Nomal'
      },
      FireBall: {
        name: 'FireBall',
        damage: 50,
        type: 'Fire'
      }
    }

    // 在客户端中执行的代码，可以使用 document 和其他浏览器对象
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // 1024*576
    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight + 140

    canvas.width = 1024
    canvas.height = 576

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let bgcImgX: number = -740
    let bgcImgY: number = -550
    let palyerImgX: number = -740
    let palyerImgY: number = -550

    const boundaries: any = []
    const battleZones: any[] = []
    const offset = {
      x: -740,
      y: -550
    }

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

    const battleGroundImage = new Image()
    battleGroundImage.src = '../assets/images/basics/battleBackground.png'

    const draggleImage = new Image()
    draggleImage.src = '../assets/images/basics/draggleSprite.png'

    const embyImage = new Image()
    embyImage.src = '../assets/images/basics/embySprite.png'

    // embyImage.onload = function () {
    //   console.log(123);
    //   // 设置目标尺寸
    //   const targetWidth = window.innerWidth;
    //   const targetHeight = window.innerHeight;
    //   // 在 Canvas 上绘制图片并拉伸
    //   ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    // }

    // 怪物对象
    const monsters: {
      Emby: { position: { x: number, y: number }, image: HTMLImageElement, frames: { max: number, hold: number }, isEnemy: boolean, animate: boolean, name: string, attacks: any },
      Draggle: { position: { x: number, y: number }, image: HTMLImageElement, frames: { max: number, hold: number }, isEnemy: boolean, animate: boolean, name: string, attacks: any },
    } = {
      Emby: {
        position: { x: 280, y: 350 },
        image: { src: '../assets/images/basics/embySprite.png' },
        frames: { max: 4, hold: 30 },
        animate: true,
        isEnemy: false,
        name: '帅气的你',
        attacks: [attacks.Tackle, attacks.Fireball]
      },
      Draggle: {
        position: { x: 800, y: 100 },
        image: { src: '../assets/images/basics/draggleSprite.png' },
        frames: { max: 4, hold: 30 },
        animate: true,
        isEnemy: true,
        name: '小青虫',
        attacks: [attacks.Tackle]
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

    // 精灵图类
    class Sprite {
      position: { x: number, y: number }
      image: HTMLImageElement
      frames: { max: number, val: number, elapsed: number, hold: number }
      width!: number;
      height!: number;
      animate: boolean;
      sprites: any;
      opacity: number;
      health!: number;
      isEnemy: boolean | undefined;
      rotation: number;
      name!: string;

      constructor(
        {
          position,
          velocity,
          image,
          frames = { max: 1, hold: 10 },
          width,
          height,
          sprites,
          animate = false,
          rotation = 0,
          isEnemy = false,
          name = '',
          health
        }:
          {
            position: { x: number, y: number },
            velocity?: any,
            image?: any,
            frames?: any,
            width?: number,
            height?: number,
            animate?: boolean,
            sprites?: any,
            rotation?: number,
            isEnemy?: boolean,
            name?: string,
            health?: number
          }
      ) {
        this.position = position
        this.image = new Image()
        this.frames = { ...frames, val: 0, elapsed: 0 }

        this.image.src = image.src

        this.image.onload = () => {
          this.width = this.image.width / this.frames.max
          this.height = this.image.height

          // this.width = canvas.width
          // this.height = canvas.height
        }

        this.animate = animate
        this.sprites = sprites
        this.opacity = 1

        this.rotation = rotation
      }
      // 画
      draw() {
        ctx.save()
        // ctx.translate(
        //   this.position.x + this.width / 2,
        //   this.position.y + this.height / 2
        // )
        ctx.globalAlpha = this.opacity
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
        ctx.restore()
        if (!this.animate) return

        if (this.frames.max > 1) {
          this.frames.elapsed++
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
          if (this.frames.val < this.frames.max - 1) this.frames.val++
          else this.frames.val = 0
        }
        // }
      }
    }

    class Monster extends Sprite {
      constructor({
        position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, rotation = 0, isEnemy = false, name, attacks
      }: {
        position: { x: number, y: number }, velocity?: any, image?: any, frames?: any, isEnemy: boolean, name: string, animate?: boolean, sprites?: any, rotation?: number, attacks?: any
      }) {
        super({
          position, velocity, image, frames, sprites, animate, rotation,
        });
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        // this.attacks = attacks
      }
      faint() {
        console.log(this.name + '挂了');
        // (document.querySelector('#dialogueBox') as Element as any).style.display = 'block';
        (document.querySelector('#dialogueBox') as Element).innerHTML = this.name + ' 失败了 ';
        gsap.to(this.position, {
          y: this.position.y + 20
        })
        gsap.to(this, {
          opacity: 0
        })
      }
      // 攻击
      attack(
        { attack, recipient, renderSprites }
          :
          {
            attack: { name: string, damage: number, type: string },
            recipient: { position: { x: number, y: number }, opacity: number, health: number },
            renderSprites: Sprite[]
          }
      ) {
        (document.querySelector('#dialogueBox') as Element as any).style.display = 'block';
        (document.querySelector('#dialogueBox') as Element).innerHTML = this.name + ' 使用了 ' + attack.name;

        let healthBar = '#enemyHealthyBar'
        if (this.isEnemy) healthBar = '#playerHealthyBar'

        recipient.health -= attack.damage

        switch (attack.name) {
          case 'Tackle':
            const tl = gsap.timeline()

            let movementDistance = 20
            if (this.isEnemy) movementDistance = -20

            tl.to(this.position, {
              x: this.position.x - movementDistance,
            }).to(this.position, {
              x: this.position.x + movementDistance * 2,
              duration: 0.1,
              onComplete: () => {
                console.log('剩余生命', recipient.health);
                // 敌人受击动作
                gsap.to(healthBar, {
                  // width: this.health - attack.damage + '%'
                  width: recipient.health + '%'
                })
                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08
                })
                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })
              }
            }).to(this.position, {
              x: this.position.x
            })
            break
          case 'FireBall':
            const fireBallImage = new Image()
            fireBallImage.src = '../assets/images/basics/fireball.png'
            const fireBall = new Sprite({
              position: {
                x: 280,
                y: 350,
              },
              image: fireBallImage,
              frames: {
                max: 4,
                hold: 10,
              },
              animate: true
            })
            renderSprites.splice(1, 0, fireBall)

            gsap.to(fireBall.position, {
              x: recipient.position.x,
              y: recipient.position.y,
              onComplete: () => {
                console.log('剩余生命', recipient.health);
                // 敌人受击动作
                gsap.to(healthBar, {
                  width: recipient.health + '%'
                })
                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08
                })
                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })
                renderSprites.splice(1, 1)
                // renderSprites.pop()
              }
            })
            break
        }
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
        up: playerImageUp,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight
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

    // 战斗背景实例
    const battleBackground = new Sprite({
      position: {
        x: 0,
        y: 0
      },
      image: battleGroundImage
    })

    // const fire = new Sprite({
    //   position: {
    //     x: 280,
    //     y: 350
    //   },
    //   image: fireBallImage
    // })

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

    battleZonesMap.forEach((row: number[], i: number) => {
      row.forEach((symbol: number, j: number) => {
        if (symbol === 1025) {
          battleZones.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
              }
            }))
        }
      })
    })



    // 键盘
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
    const movables: Object[] = [background, ...boundaries, foreground, ...battleZones]
    // 战斗
    const battle = {
      initiated: false
    }

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
      const animationId = window.requestAnimationFrame(animate)
      background.draw()
      boundaries.forEach((boundary: any) => {
        boundary.draw()
      })
      battleZones.forEach((battleZone: any) => {
        battleZone.draw()
      })
      player.draw()
      foreground.draw()

      let moving: boolean = true
      player.animate = false

      if (battle.initiated) return

      if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
          const battleZone = battleZones[i]
          const overlappingArea =
            (
              Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width)
              -
              Math.max(player.position.x, battleZone.position.x)
            )
            *
            (
              Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
              -
              Math.max(player.position.y, battleZone.position.y)
            )
          if (
            checkRectangularCollision({ rectangle1: player, rectangle2: battleZone })
            && overlappingArea > (player.width * player.height) / 2
            && Math.random() < 0.01
          ) {
            console.log('fight');
            // 销毁当前的动画循环
            window.cancelAnimationFrame(animationId)
            battle.initiated = true
            gsap.to('#battle-collision', {
              opacity: 1,
              repeat: 3,
              yoyo: true,
              onComplete() {
                gsap.to('#battle-collision', {
                  opacity: 1,
                  duration: 0.4,
                  // 开启新的动画循环
                  onComplete() {
                    initBattle()
                    animateBattle()
                    gsap.to('#battle-collision', {
                      opacity: 0,
                      duration: 0.4,
                    })
                  }
                })
              }
            })
            break
          }
        }
      }

      if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
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
        player.animate = true
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
        player.animate = true
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
        player.animate = true
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

    const button = document.createElement('button')
    button.innerHTML = 'FireBall'
    // // 攻击说明 - 怪物
    // document.querySelector('#attacksBox')?.append('button')

    let battleAnimationId: number
    let draggle: any
    let emby: any
    let renderSprites: Sprite[]
    let queue: any[]

    function initBattle() {
      (document.querySelector('#userInterface') as HTMLElement).style.display = 'block';
      (document.querySelector('#dialogueBox') as HTMLElement).style.display = 'none';
      (document.querySelector('#enemyHealthyBar') as HTMLElement).style.width = '100%';
      (document.querySelector('#playerHealthyBar') as HTMLElement).style.width = '100%';
      (document.querySelector('#attacksBox') as HTMLElement).replaceChildren();


      draggle = new Monster(monsters.Draggle)
      emby = new Monster(monsters.Emby)
      renderSprites = [draggle, emby]
      queue = []

      // emby.attacks.forEach((attack: any) => {
      //   const button = document.createElement('button')
      //   button.innerHTML = attack.name
      //   document.querySelector('#attacksBox')?.append(button)
      // });

      // 战斗点击操作
      document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e: any) => {
          const selectedAttack = attacks[e.currentTarget.innerHTML]
          emby.attack({
            attack: selectedAttack,
            recipient: draggle,
            renderSprites
          })

          if (draggle.health <= 0) {
            queue.push(() => {
              draggle.faint()
            })
            queue.push(() => {
              gsap.to('#battle-collision', {
                opacity: 1,
                onComplete: (() => {
                  cancelAnimationFrame(battleAnimationId)
                  animate();
                  (document.querySelector('#userInterface') as HTMLElement).style.display = 'none';
                  gsap.to('#battle-collision', {
                    opacity: 0
                  })
                  battle.initiated = false
                })
              })
            })
            return
          }

          queue.push(() => {
            draggle.attack({
              attack: attacks.Tackle,
              recipient: emby,
              renderSprites
            })
          })
          if (emby.health <= 0) {
            queue.push(() => {
              emby.faint()
            })
            return
          }
        })
        // 战斗攻击方式
        button.addEventListener('mouseenter', (e: any) => {
          const selectedAttack = attacks[e.currentTarget.innerHTML];
          (document.querySelector('#attackType') as HTMLElement).innerHTML = selectedAttack.type;
          (document.querySelector('#attackType') as HTMLElement).style.color = 'red';
          console.log('go');

        })
      })
    }

    function animateBattle() {
      battleAnimationId = window.requestAnimationFrame(animateBattle)
      battleBackground.draw()
      if (renderSprites.length !== 0) {
        renderSprites.forEach((sprite: Sprite) => {
          sprite.draw()
        })
      }
    }

    // 攻击说明 - 玩家
    document.querySelector('#dialogueBox')?.addEventListener('click', (e: Event) => {      
      if (queue.length > 0) {
        queue[0]()
        queue.shift()
      }
      if (draggle.health > 0) {
        (e.currentTarget as Element as any).style.display = 'none'
      }
    })


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

    // animate()
    initBattle()
    animateBattle()
  } else {
    // 在服务端执行的代码，不应该使用 document 和其他浏览器对象
  }
  

}

