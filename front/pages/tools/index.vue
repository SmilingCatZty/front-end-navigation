<template>
  <div class="tools" ref="toolRef" @scroll="scrollhandler">
    <div class="tools-nav">
      <div class="nav-bar">
        <dl
          v-for="(tool, i) in toolsList"
          :key="tool.type"
          class="bar-box"
          :class="curIndex === i ? 'active-box' : 'static-box'"
          @click="navHandler(i)"
        >
          <dd>{{ tool.name }}</dd>
        </dl>
      </div>
    </div>
    <div class="tools-contain" ref="toolRef">
      <div
        :id="'box' + index"
        class="tools-box"
        v-for="(tool, index) in toolsList"
        :key="tool.type"
        @scroll="scrollhandler"
      >
        <div class="contain-title">{{ tool.name }}</div>
        <div class="contain-content">
          <div class="content-list" v-for="(item, i) in tool.collection" :key="item.name">
            <img class="list-icon" :src="item.icon" alt="" />
            <div class="list-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps as Prop } from 'vue'
import { toolsInfoModel, ToolsModel } from '../../models/tools'
import { useScroll } from '@vueuse/core'
import { list } from './data'

const props = defineProps({
  scrollTopPosition: String // 定义接收的 prop 类型
})

const curIndex = ref<number>(0)
const toolRef = ref()
const toolItemElements: number[] = []
const toolsList: ToolsModel[] = list // 工具类型列表

// 导航栏索引
const navHandler = (index: number) => {
  curIndex.value = index
  const targetElement: any = document.getElementById('box' + index)
  const targetPosition: any = targetElement.offsetTop
  console.log(targetPosition)

  // 滚动至目标位置
  window.scrollTo({
    top: targetPosition - 70,
    behavior: 'smooth' // 平滑滚动
  })
}

// 滚动事件
const scrollhandler = () => {
  const targetElement: any = document.querySelector('.tools')
  const targetPosition: any = targetElement.offsetTop
  console.log('targetPosition', targetPosition)
}

// 记录第一次进入滚动位置
const recordPosition = () => {
  toolsList.map((item, i) => {
    const targetElement: any = document.getElementById('box' + i)
    const targetPosition: any = targetElement.offsetTop
    toolItemElements[i] = targetPosition
  })
}

onMounted(() => {
  recordPosition()
})
</script>

<style lang="scss" scoped>
.tools {
  box-sizing: border-box;
  display: flex;
  overflow: scroll;
  .tools-nav {
    width: 10%;
    height: 300px;
    .nav-bar {
      position: fixed;
      width: 10%;
      min-height: 0px;
      background-color: #fff;
      .bar-box {
        cursor: pointer;
        height: 30px;
        dd{
          margin-left: 20px;
        }
      }
      .active-box {
        color: orange;
      }
      .static-box {
        color: black;
      }
    }
  }
  .tools-contain {
    width: 80%;
    padding: 0 20px 20px 20px;

    .tools-box {
      background-color: #fff;
      border-radius: 8px;
      padding-left: 20px;
      padding-right: 20px;
      .contain-title {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
      }
      .contain-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .content-list {
          display: flex;
          height: 40px;
          width: 15%;
          align-items: center;
          padding: 5px;
          .list-icon {
            width: 20px;
            height: 20px;
          }
          .list-name {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            margin-left: 5px;
          }
        }
      }
    }

    .tools-box + .tools-box {
      margin-top: 20px;
    }
  }
}
</style>
