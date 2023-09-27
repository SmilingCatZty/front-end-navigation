/**
 * 1、记录全局变量,获得管理员权限 ✔️
 * 2、游戏场景布局 ✔️
 * 3、游戏战斗功能: 战斗结束后获得成为管理员的钥匙 ✔️
 * 4、获取钥匙后进入大门则获得管理员权限,并跳转至工具页
 * 5、界面优化: 标题下方有宝可梦图标,点击后打开canvas地图
 */
<template>
  <div class="home">
    <div id="homeCanvas" class="home-canvas">
      <div id="battle-collision" class="battle-collision" />
      <canvas></canvas>
      <!-- 战斗内容 -->
      <div id="userInterface" class="userInterface">
        <!-- 游戏面板 -->
        <div id="userInterface">
          <!-- 敌人状态 -->
          <div class="battle-draggle">
            <h1 class="draggle-name">骆鑫玥</h1>
            <div class="draggle-status">
              <div class="draggle-skill"></div>
              <div id="enemyHealthyBar" class="draggle-blood"></div>
            </div>
          </div>
          <!-- 玩家状态 -->
          <div class="battle-emby">
            <h1 class="emby-name">周天阳</h1>
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
          </div>
          <div id="attackType" class="skill-fight">
            <h1>Attack Type</h1>
          </div>
        </div>
      </div>
      <!-- 旁白描述 -->
      <div id="voiceover" class="voiceover">
        欢迎来到宝可梦的世界
        <div class="voiceover-next">
          <svg t="1695274402153" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1550" width="50px" height="50px">
            <path
              d="M422.4 341.333333c0-25.6 17.066667-42.666667 42.666667-42.666666s42.666667 17.066667 42.666666 42.666666v192l51.2 4.266667 209.066667 93.866667c21.333333 8.533333 38.4 34.133333 38.4 59.733333v187.733333c0 34.133333-29.866667 64-64 64h-277.333333c-17.066667 0-29.866667-8.533333-42.666667-17.066666L213.333333 742.4l29.866667-34.133333c8.533333-8.533333 21.333333-12.8 29.866667-12.8h8.533333L422.4 768V341.333333m42.666667-170.666666c93.866667 0 170.666667 76.8 170.666666 170.666666 0 59.733333-34.133333 119.466667-85.333333 149.333334v-51.2c51.2-46.933333 55.466667-128 8.533333-179.2s-128-55.466667-179.2-8.533334-55.466667 128-8.533333 179.2l8.533333 8.533334v51.2c-51.2-29.866667-85.333333-85.333333-85.333333-149.333334 0-93.866667 76.8-170.666667 170.666667-170.666666z"
              p-id="1551" fill="#ffffff"></path>
          </svg>
        </div>
      </div>
      <!-- 钥匙获取弹窗 -->
      <div id="popup-key" class="popup-key">
        <div class="key-box">
          <svg t="1695620142938" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="13146" data-spm-anchor-id="a313x.search_index.0.i19.29f13a81MdjJKy" width="80" height="80">
            <path
              d="M637.775203 636.588644a188.366165 188.366165 0 1 1 188.366164-188.366164A188.366165 188.366165 0 0 1 637.775203 636.588644z m35.893395-185.696408a41.381228 41.381228 0 1 0-41.381228-41.381228 41.381228 41.381228 0 0 0 41.381228 41.381228z"
              fill="#f4ea2a" p-id="13147" data-spm-anchor-id="a313x.search_index.0.i17.29f13a81MdjJKy" class="selected">
            </path>
            <path
              d="M560.797219 635.847045L409.955968 806.118192 296.639629 822.878331l1.334879-121.325608 56.658169-14.090382 2.373117-64.51912 60.662804-2.521437 4.004635-63.184241 38.118192-5.191193 81.130939-11.568946z"
              fill="#f4ea2a" p-id="13148" data-spm-anchor-id="a313x.search_index.0.i18.29f13a81MdjJKy" class="selected">
            </path>
            <path
              d="M295.60139 836.672074a11.568946 11.568946 0 0 1-3.114716 0 14.831981 14.831981 0 0 1-10.234067-13.793743l-1.928157-128a14.831981 14.831981 0 0 1 13.052143-14.831981l46.869062-6.229432 5.636153-50.873697a14.831981 14.831981 0 0 1 12.013905-12.903824l49.390498-9.047508 3.114716-47.462341a14.831981 14.831981 0 0 1 12.903824-13.793743l24.769409-3.263036-6.674392-16.463499a204.533024 204.533024 0 0 1 281.807648-251.105446l7.119351 3.856315 1.779838-2.373117c37.079954-31.147161 70.896871-41.826188 96.852839-33.816918a56.509849 56.509849 0 0 1 36.486674 62.887602 140.162225 140.162225 0 0 1-32.778679 73.121668l-6.822711 6.674392 3.263036 8.30591a204.533024 204.533024 0 0 1-186.289688 270.831981 208.537659 208.537659 0 0 1-48.945538-4.004635l-19.133256-5.191193-156.180765 170.122827a14.831981 14.831981 0 0 1-9.195829 4.746234l-110.646581 12.607184a10.975666 10.975666 0 0 1-3.114717 0z m39.304751-33.965237l65.557358-7.415991L545.075319 637.775203l-19.429896-10.827347a203.791425 203.791425 0 0 1-55.76825-52.060255l-6.526072-9.937427-24.17613 3.114716-3.114716 46.720742a14.831981 14.831981 0 0 1-12.162225 13.645422l-49.835458 9.344149-5.784472 50.577057a14.831981 14.831981 0 0 1-12.755504 13.200463l-44.495945 5.932793 0.44496 77.126303 153.807647-167.89803a14.831981 14.831981 0 0 1 21.061414-0.889919 14.831981 14.831981 0 0 1 0.889919 20.913094z m306.873697-170.122828a176.648899 176.648899 0 0 0 98.632676-34.261877 179.022016 179.022016 0 0 0 68.523755-185.399768l-4.449595-14.831982-6.081112 4.004635a88.991889 88.991889 0 0 1-45.830823 12.458865 81.575898 81.575898 0 0 1-19.578215-2.521437l-4.449595-1.483198v2.966396a51.911935 51.911935 0 0 1-20.913094 34.113557 52.950174 52.950174 0 0 1-29.663962 10.085748 52.505214 52.505214 0 0 1-32.778679-94.628042 52.505214 52.505214 0 0 1 73.121668 11.420626 47.61066 47.61066 0 0 1 2.818077 4.597914l3.856315 2.076478a59.327926 59.327926 0 0 0 54.136732 0.741599l14.090382-8.60255-4.894553-9.492468c-3.114716-5.191194-6.526072-10.382387-10.085748-14.831981a178.725377 178.725377 0 1 0-287.59212 210.614136l13.645423 15.573581 20.764774 19.578216 14.831981 10.234067a179.022016 179.022016 0 0 0 101.895713 27.587485z m-144.16686-180.356894a12.903824 12.903824 0 0 1-12.755504-12.903824c0.741599-71.045191 74.159907-142.831981 141.497103-137.640788a12.903824 12.903824 0 0 1-1.928158 25.807648c-50.725377-4.004635-113.168019 54.878331-113.761297 111.98146a13.052144 13.052144 0 0 1-13.052144 12.755504z m180.060255-20.913094a27.290846 27.290846 0 0 0 14.831981-5.042874 26.845886 26.845886 0 0 0 10.085748-27.587485v-2.076478l-1.631518-1.186558a13.052144 13.052144 0 0 1-5.339514-8.45423V385.631518a26.549247 26.549247 0 1 0-16.760139 46.127462z m135.86095-76.681344l12.162225-17.501738a102.933951 102.933951 0 0 0 13.497103-39.749711 30.850521 30.850521 0 0 0-18.539977-35.893395c-11.717265-3.559676-31.88876-1.038239-59.327926 19.133256l-8.00927 6.229432 4.152955 2.818077a201.269988 201.269988 0 0 1 43.309386 43.606025 188.069525 188.069525 0 0 1 11.420626 17.650058z"
              fill="#333333" p-id="13149"></path>
          </svg>
        </div>
      </div>

    </div>
    <div v-if="!showBackground" class="home-bg"
      :style="{ backgroundImage: `url(${'https://img0.baidu.com/it/u=2279176150,2387283183&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800'})` }">
      <div class="bg-content">
        <div class="content-title">微笑猫的前端导航</div>
        <div class="content-pokemon" @click="openCanvas()">
          <div class="pokemon-box">
            <svg t="1694677339570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6276" width="40" height="40">
              <path d="M12.158 511.992a499.842 499.842 0 1 0 999.684 0 499.842 499.842 0 1 0-999.684 0z" fill="#FF1A1A"
                p-id="6277"></path>
              <path d="M12.158 511.992a499.842 382.839 0 1 0 999.684 0 499.842 382.839 0 1 0-999.684 0z" fill="#D60909"
                p-id="6278"></path>
              <path d="M12.158 511.992c0 276.081 223.785 499.85 499.842 499.85s499.842-223.769 499.842-499.85H12.158z"
                fill="#FFFFFF" p-id="6279"></path>
              <path
                d="M512 894.83c276.057 0 499.842-171.414 499.842-382.838H12.158C12.158 723.416 235.943 894.83 512 894.83z"
                fill="#D8E5EA" p-id="6280"></path>
              <path
                d="M512 0C229.677 0 0 229.677 0 511.992 0 794.314 229.677 1024 512 1024s512-229.685 512-512.008C1024 229.677 794.323 0 512 0z m0 24.316c264.83 0 480.883 212.227 487.375 475.518H24.625C31.117 236.543 247.169 24.316 512 24.316z m0 975.368c-264.83 0-480.883-212.235-487.375-475.534h974.75C992.883 787.45 776.831 999.684 512 999.684z"
                fill="#33363A" p-id="6281"></path>
              <path d="M376.12 558.21a135.88 135.88 0 1 0 271.76 0 135.88 135.88 0 1 0-271.76 0z" fill="#A7BBC1"
                p-id="6282"></path>
              <path d="M376.12 512a135.88 135.88 0 1 0 271.76 0 135.88 135.88 0 1 0-271.76 0z" fill="#FFFFFF" p-id="6283">
              </path>
              <path d="M415.917 608.083c-53.066-53.067-53.058-139.09 0-192.174 53.067-53.058 139.099-53.058 192.157 0"
                fill="#D8E5EA" p-id="6284"></path>
              <path
                d="M512 660.047c-39.539 0-76.719-15.4-104.683-43.364-57.71-57.712-57.71-151.63 0-209.366 57.728-57.71 151.638-57.71 209.357 0a147.115 147.115 0 0 1 43.373 104.691c0 39.539-15.4 76.719-43.373 104.683A147.058 147.058 0 0 1 512 660.047z m0-271.713a123.317 123.317 0 0 0-87.483 36.175c-48.227 48.252-48.227 126.746 0 174.982A122.912 122.912 0 0 0 512 635.73a122.88 122.88 0 0 0 87.475-36.24 122.92 122.92 0 0 0 36.247-87.483c0-33.046-12.871-64.114-36.247-87.49A123.285 123.285 0 0 0 512 388.333z"
                fill="#33363A" p-id="6285"></path>
              <path d="M558.234 558.226c-25.524 25.5-66.927 25.5-92.435 0a65.363 65.363 0 1 1 92.435 0z" fill="#FFFFFF"
                p-id="6286"></path>
              <path d="M465.799 465.799a65.355 65.355 0 0 1 92.435 92.427" fill="#D8E5EA" p-id="6287"></path>
              <path
                d="M512.008 589.472a77.278 77.278 0 0 1-54.81-22.646c-30.225-30.234-30.225-79.41 0-109.627A76.954 76.954 0 0 1 512 434.487c20.71 0 40.179 8.073 54.817 22.712 30.218 30.209 30.218 79.385 0.009 109.618l-0.009 0.009a77.286 77.286 0 0 1-54.809 22.646zM512 458.804a52.815 52.815 0 0 0-37.61 15.586 53.253 53.253 0 0 0 0 75.236c20.734 20.725 54.494 20.725 75.244 0a53.277 53.277 0 0 0-0.008-75.236A52.913 52.913 0 0 0 512 458.804z"
                fill="#33363A" p-id="6288"></path>
            </svg>
          </div>
        </div>
        <div class="content-enter">
          <NuxtLink class="navigation-link" to="/tools">前往工具页</NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="showShade" class="home-shade">
      <div class="shade-pokemon">
        <div class="pokemon-top"></div>
        <div class="pokemon-center">
          <div class="center-point">
            <div class="point-point"></div>
          </div>
        </div>
        <div class="pokemon-bottom"></div>
      </div>
    </div>
    <!-- <van-button type="success" @click="success">开启编辑模式</van-button>
    <NuxtLink class="navigation-link" to="/tools">前往工具页</NuxtLink> -->
  </div>
</template>

<script lang="ts" setup>
import { createCanvas } from './canvas'

const router = useRouter()

let showBackground = ref<boolean>(true)
let showShade = ref<boolean>(false)

definePageMeta({
  layout: false
})

const openCanvas = () => {
  showShade.value = true;
  setTimeout(() => {
    (document.querySelector('#homeCanvas') as HTMLElement).style.display = 'block';
    showBackground.value = false
    showShade.value = false
  }, 2000);
}

onMounted(async () => {
  createCanvas()
})
</script>

<style lang="scss" scoped>
* {
  font-family: 'press Start 2P', cursive;
}

#homeCanvas {
  // display: none;
}

.home {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;

  .home-canvas {
    // display: none;
    box-sizing: border-box;
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

    .userInterface {
      display: none;

      .battle-draggle {
        position: absolute;
        width: 250px;
        height: 40px;
        background-color: #fff;
        top: 8%;
        right: 5%;
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
        position: absolute;
        width: 250px;
        height: 40px;
        background-color: #fff;
        top: 45%;
        left: 20%;
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

    .voiceover {
      z-index: 2;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 140px;
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 140px;
      background-color: rgb(0, 0, 0, .7);
      cursor: pointer;

      .voiceover-next {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 80px;
        width: 80px;

        svg {
          path {
            animation: canvas-voiceover 1.2s infinite linear;
          }
        }
      }
    }

    .popup-key {
      z-index: 1;
      display: none;
      position: relative;
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba($color: #000000, $alpha: .2);

      .key-box {
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%);
      }
    }
  }

  .home-bg {
    width: 100%;
    height: 100%;

    .bg-content {
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%);

      .content-title {
        font-size: 50px;
        color: #e5d7d7;
      }

      .content-enter {
        font-size: 24px;
        color: #e5d7d7;
        text-align: center;
      }

      .content-pokemon {
        display: flex;
        justify-content: center;

        .pokemon-box:hover {
          cursor: pointer;
          /* 添加动画 */
          animation: pokemon-shake .4s infinite linear;
        }
      }
    }
  }

  .home-shade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: background-shade 2s infinite linear;
    transition: background-color;

    .shade-pokemon {
      position: relative;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .pokemon-top {
        position: relative;
        width: 200px;
        height: 100px;
        border: 2px solid #000;
        border-bottom: 1px solid #000;
        border-radius: 100px 100px 0 0;
        background-color: red;
        animation: pokemon-top 2s infinite linear;
      }

      .pokemon-center {
        z-index: 2;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .center-point {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #000;
          background-color: #fff;
          animation: pokemon-center 2s infinite linear;

          .point-point {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 2px solid #000;
            background-color: #fff;
            animation: pokemon-center-center 2s infinite linear;
          }
        }
      }

      .pokemon-bottom {
        position: relative;
        width: 200px;
        height: 100px;
        border: 2px solid #000;
        border-bottom: 1px solid #000;
        border-radius: 0 0 100px 100px;
        background-color: #fff;
        animation: pokemon-bottom 2s infinite linear;
      }
    }
  }

}

@keyframes canvas-voiceover {
  to {
    opacity: 0;
  }
}

@keyframes pokemon-shake {
  25% {
    transform: rotateZ(-60deg);
  }

  50% {
    transform: rotateZ(0deg);
  }

  75% {
    transform: rotateZ(60deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes background-shade {
  from {}

  to {
    background-color: rgb(0, 0, 0, .7);
  }
}

@keyframes pokemon-top {
  from {
    transform: translateY(0);
    width: 200px;
    height: 100px;
    border-radius: 100px 100px 0 0;
  }

  to {
    transform: translateY(-10px);
    width: 800px;
    height: 400px;
    border-radius: 400px 400px 0 0;
  }
}

@keyframes pokemon-center {
  from {
    width: 40px;
    height: 40px;
    border: 2px solid #000;
  }

  to {
    width: 160px;
    height: 160px;
    border: 8px solid #000;
  }
}

@keyframes pokemon-center-center {
  from {
    width: 15px;
    height: 15px;
    border: 2px solid #000;
  }

  to {
    width: 60px;
    height: 60px;
    border: 8px solid #000;
  }
}

@keyframes pokemon-bottom {
  from {
    transform: translateY(0);
    width: 200px;
    height: 100px;
    border-radius: 0 0 100px 100px;
  }

  to {
    transform: translateY(10px);
    width: 800px;
    height: 400px;
    border-radius: 0 0 400px 400px;
  }
}
</style>
