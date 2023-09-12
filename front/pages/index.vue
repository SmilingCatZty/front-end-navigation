<template>
  <div class="home">
    <div class="home-canvas">
      <div id="battle-collision" class="battle-collision" />
      <canvas></canvas>
      <!-- 游戏面板 -->
      <div id="userInterface">
        <!-- 敌人状态 -->
        <div class="battle-draggle">
          <h1 class="draggle-name">Draggle</h1>
          <div class="draggle-status">
            <div class="draggle-skill"></div>
            <div id="enemyHealthyBar" class="draggle-blood"></div>
          </div>
        </div>
        <!-- 玩家状态 -->
        <div class="battle-emby">
          <h1 class="emby-name">Emby</h1>
          <div class="emby-status">
            <div class="emby-skill"></div>
            <div id="playerHealthyBar" class="emby-blood"></div>
          </div>
        </div>
      </div>
      <!-- 技能栏 -->
      <div id="battle-skill" class="battle-skill">
        <div id="dialogueBox" class="skill-name">sjs</div>
        <div id="attacksBox" class="skill-name">sjs</div>
        <div class="skill-list">
          <button>Tackle</button>
          <button>FireBall</button>
          <!-- <button>Attack3</button>
          <button>Attack4</button> -->
        </div>
        <div class="skill-fight">
          <h1>Attack Type</h1>
        </div>
      </div>
    </div>
    <van-button type="success" @click="success">开启编辑模式</van-button>
    <NuxtLink class="navigation-link" to="/tools">前往工具页</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { createCanvas } from './canvas'

const router = useRouter()

definePageMeta({
  layout: false
})

const success = () => {
  useRuntimeConfig().public.editable = true // 编辑模式
}

onMounted(async () => {
  createCanvas()
})
</script>

<style lang="scss" scoped>
* {
  font-family: 'press Start 2P', cursive;
}

.home {
  box-sizing: border-box;
  // padding: 20px;ss s
  width: 100%;
  min-height: 100vh;
  background-color: black;

  .home-canvas {
    display: inline-block;
    position: relative;

    h1 {
      margin: 0;
      font-size: 16px;
    }

    .battle-collision {
      position: absolute;
      background-color: black;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;
      z-index: 10;
    }

    .battle-draggle {
      position: absolute;
      width: 250px;
      height: 40px;
      background-color: #fff;
      top: 50px;
      left: 50px;
      border: 4px solid black;
      font-size: 16px;

      .draggle-status {
        position: relative;

        .draggle-skill {
          height: 5px;
          margin-top: 10px;
          background-color: #ccc;
        }

        .draggle-blood {
          position: absolute;
          height: 5px;
          background-color: green;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
        }

      }

    }

    .battle-emby {
      // display: none;
      position: absolute;
      width: 250px;
      height: 40px;
      background-color: #fff;
      top: 250px;
      right: 50px;
      border: 4px solid black;
      font-size: 16px;

      .emby-status {
        position: relative;

        .emby-skill {
          height: 5px;
          margin-top: 10px;
          background-color: #ccc;
        }

        .emby-blood {
          position: absolute;
          height: 5px;
          background-color: green;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
        }

      }

    }

    .battle-skill {
      background-color: white;
      height: 140px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 4px black solid;
      display: flex;

      .skill-name {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
        padding: 12px;
        font-size: 24px;
        display: none;
        cursor: pointer;
      }

      .skill-list {
        width: 66.66%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        button {
          border: 0;
        }

        button:hover {
          background-color: #ddd;
          cursor: pointer;
        }
      }

      .skill-fight {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 33.33%;
        border-left: 4px black solid;

        h1 {
          margin: 0;
        }
      }

      // padding: 12px;
    }

  }
}
</style>
