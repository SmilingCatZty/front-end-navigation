<template>
  <div @scroll="scrolHandler">
    <header class="header">
      <NuxtLink class="navigation-link" to="/tools">工具</NuxtLink>
      <NuxtLink class="navigation-link" to="/docs">文档</NuxtLink>
      <NuxtLink class="navigation-link" to="/games">游戏</NuxtLink>
    </header>

    <main class="content" @scroll="scrolHandler" ref="mainRef">
      <slot></slot>
    </main>
    <button @click="backHome">name</button>

    <!-- <NuxtLink class="btn-home" to="/" @click="backHome"> -->
      <div class="btn-home" to="/" @click="backHome">
        <svg
          t="1689745237929"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="18215"
          width="30"
          height="30"
        >
          <path
            d="M957.218 467.478v-66.782h-66.784V0H690.086v133.566h-66.782V66.782h-66.782V0h-89.044v66.782h-66.782v66.784h-66.782v66.782h-66.784v66.782h-66.782v66.784H133.566v66.782H66.782v66.782H0v66.782h66.782V1024h311.652V623.304h267.132V1024h311.652V534.26H1024v-66.782z"
            fill="#E0E3FA"
            p-id="18216"
          ></path>
          <path d="M690.086 0v267.13h66.784v66.784h66.782v66.782h66.782V0z" fill="#FFAE37" p-id="18217"></path>
          <path
            d="M957.218 467.478v-66.782h-66.784v-66.782h-66.782v-66.784h-66.782v-66.782h-66.784V133.566h-66.782V66.782h-66.782V0h-89.044v66.782h-66.782v66.784h-66.782v66.782h-66.784v66.782h-66.782v66.784H133.566v66.782H66.782v66.782H0v66.782h200.348v-66.782h66.782v-66.782h66.784v-66.782h66.782v-66.784h66.782v-66.782h89.044v66.782h66.782v66.784h66.782v66.782h66.784v66.782h66.782v66.782H1024v-66.782z"
            fill="#B757D1"
            p-id="18218"
          ></path>
          <path
            d="M467.478 0h89.044v66.782h-89.044zM333.914 133.566h66.782v66.782h-66.782zM267.13 200.348h66.782v66.782h-66.782zM200.348 267.13h66.782v66.782h-66.782zM133.566 333.914h66.782v66.782H133.566zM66.782 400.696h66.782v66.782H66.782zM0 467.478h66.782v66.782H0zM690.086 200.348v66.782h66.784V66.782h66.782v333.914h66.782V0H690.086v133.566h-66.782v66.782zM556.522 66.782h66.782v66.782h-66.782zM400.696 66.782h66.782v66.782h-66.782zM890.434 957.218h-178.086V556.522H311.652v400.696H133.566V534.26H66.782V1024h311.652V623.304h267.132V1024h311.652V534.26h-66.784zM890.434 400.696h66.782v66.782h-66.782zM957.218 467.478H1024v66.782h-66.782z"
            p-id="18219"
          ></path>
        </svg>
      
      </div>
    <!-- </NuxtLink> -->

    <footer class="page-footer">
      <div class="site-links">
        <a href="https://github.com/SmilingCatZty/front-end-navigation" target="_blank" rel="nofollow external">源码链接</a>、
        <a href="https://github.com/SmilingCatZty" target="_blank" rel="nofollow external">GitHub主页</a>、
        <NuxtLink class="navigation-link" to="/">友情链接</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const router = useRouter()
const mainRef = ref()
const backHome = () => {
  router.push('/')
}

onMounted(() => {})
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
      color: #ffcd3b;
    }

    &:hover::before {
      content: '';
      position: absolute;
      top: auto;
      right: 0;
      bottom: 0;
      left: 1rem;
      height: 2px;
      background-color: #ffcd3b;
      width: calc(100% - 2rem);
    }
  }

  .router-link-active {
    color: rgb(236, 116, 11);
    font-weight: bold;
  }
}
.content {
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 40px);
  padding: 70px 20px 40px 20px;
  background: rgba(99, 99, 99, 0.1);
  overflow: scroll;
}

.btn-home {
  position: fixed;
  right: 5%;
  bottom: 20px;
}
.page-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

@media(max-width: 480px){
  .header{
    bottom: 0;
    left: auto;
    top: auto;
    padding: 0;
    height: 80px;
    background-color: rgb(243, 246, 246);
    border-radius: 15px 15px 0px 0px ;
    .router-link-active {
      font-size: 20px;
    }
    .navigation-link{
      font-size: 20px;
    }
    a{
      width: 60px;
      justify-content: center;
    }
  }
  .content{
    padding: 0;
    margin-bottom: 70px;
  }
  .btn-home{
    bottom: 120px;
  }
  .page-footer{
    display: none;
  }
}
</style>
