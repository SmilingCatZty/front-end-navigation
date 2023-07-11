<template>
  <div @scroll="scrolHandler">
    <header class="header">
      <NuxtLink class="navigation-link" to="/tools">工具</NuxtLink>
      <NuxtLink class="navigation-link" to="/docs">文档</NuxtLink>
      <NuxtLink class="navigation-link" to="/games">游戏</NuxtLink>
      <NuxtLink class="navigation-link" to="/relax">摸鱼</NuxtLink>
      <NuxtLink class="navigation-link" to="/demos">样例</NuxtLink>
      <!-- <NuxtLink class="navigation-link" to="/link2">友链</NuxtLink> -->
    </header>

    <main class="content" @scroll="scrolHandler" ref="mainRef">
      <slot></slot>
    </main>

    <NuxtLink class="btn-home" to="/"> </NuxtLink>

    <footer></footer>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const active = ref(0)
const mainRef = ref()
const scrollTopPosition = ref(123)

const scrolHandler = () => {
  // console.log(window.scrollY);
}

const updateContainerHeight = () => {
  mainRef.value.style.height = `${window.innerHeight}px`
}

onMounted(() => {
  // window.addEventListener('resize', updateContainerHeight)
  // updateContainerHeight()
})
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;

  .navigation-link {
    position: relative;
    display: flex;
    padding: 12px 18px;
    flex-direction: row;
    align-items: center;
    flex: 0 0 auto;
    transition: color 200ms ease;
    color: #546681;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: #333333;
    }

    &:hover::before {
      content: '';
      position: absolute;
      top: auto;
      right: 0;
      bottom: 0;
      left: 1rem;
      height: 2px;
      background-color: #1e80ff;
      width: calc(100% - 2rem);
    }
  }

  .router-link-active {
    color: blue;
    font-weight: bold;
  }
}
.content {
  box-sizing: border-box;
  width: 100%;
  // min-height: ;
  padding: 70px 20px 40px 20px;
  background: rgba(99, 99, 99, .1);
  overflow: scroll;
}
</style>
