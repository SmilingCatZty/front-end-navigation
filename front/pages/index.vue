<template>
  <div class="home">
    <div class="home-canvas">
      <div id="battle-collision" class="battle-collision" />
      <canvas />
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
.home {
  box-sizing: border-box;
  // padding: 20px;ss s
  width: 100%;
  min-height: 100vh;

  .home-canvas {
    display: inline-block;
    position: relative;

    .battle-collision {
      background-color: black;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;
      z-index: 10;
    }

  }
}
</style>
