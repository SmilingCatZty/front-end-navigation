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
          <dd class="text-limit">{{ tool.title }}</dd>
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
        <div class="contain-title">{{ tool.title }}</div>
        <div class="contain-content">
          <div
            class="content-list"
            :class="editable ? 'contain-edit' : 'contain-static'"
            v-for="(item, i) in tool.collection"
            :key="item.tool_key"
            :draggable="editable"
            v-on:dragstart="dragStart(item)"
            v-on:dragover="dragOver"
            v-on:drop="drop(item, tool.type)"
            v-on:dragend="dragEnd"
            @click="viewTool(item.tool_link)"
          >
            <img class="list-icon" :src="item.tool_icon" alt="" />
            <div class="list-name">{{ item.tool_name }}</div>
          </div>
          <!-- 新增工具 -->
          <div v-if="editable" class="content-list content-create contain-edit" @click="addNewTool()">
            <div class="create-item">
              <van-icon color="orange" name="plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog :showToolDialog="showToolDialog" :toolTypeList="typeList" @closeDialog="closeDialog" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps as Prop } from 'vue'
import { ToolsModel, toolsInfoModel } from '~/models/tool.model'
import { toolApi } from '~/server/api/tools'
import Dialog from './components/dialog.vue'

const toolRef = ref()
const editable = ref<boolean>(true) // 是否可编辑
const curIndex = ref<number>(0) // 当前索引值
const toolItemElements: number[] = [] // 记录当前页面下元素滚动位置
const toolsList = ref<ToolsModel[]>([]) // 工具列表
const typeList = ref<any>([])
const dragObject = ref<toolsInfoModel | null>(null) // 拖拽元素索引
let showToolDialog = ref<boolean>(false)

const getToolList = async () => {
  try {
    const { status, data } = await toolApi.getToolList()
    if (status === 200 && data) {
      toolsList.value = data
      toolsList.value.map((tool: ToolsModel) => {
        typeList.value.push({ text: tool.type, value: tool.type })
      })
    }
  } catch (error) {
    console.error('tool-error', error)
  }
}

// 查看工具
const viewTool = (link: string) => {
  window.open(link)
}

// 添加工具
const addNewTool = async () => {
  showToolDialog.value = true
}

// 关闭弹窗
const closeDialog = () => {
  showToolDialog.value = false
}

// 导航栏索引
const navHandler = (index: number) => {
  curIndex.value = index
  const targetElement: any = document.getElementById('box' + index)
  const targetPosition: any = targetElement.offsetTop
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
}

// 记录第一次进入滚动位置
const recordPosition = () => {
  toolsList.value.map((item, i) => {
    const targetElement: any = document.getElementById('box' + i)
    const targetPosition: any = targetElement.offsetTop
    toolItemElements[i] = targetPosition
  })
}

// 开始拖拽
const dragStart = (tool: toolsInfoModel) => {
  dragObject.value = tool
}

// 拖拽
const dragOver = (event: any) => {
  event.preventDefault()
}

// 取消拖拽
const drop = async (tool: toolsInfoModel, type: string) => {
  try {
    if (type) {
      const dragItem = dragObject.value // 拖拽元素
      const recordItem = tool // 记录元素
      const indexArr = <number[]>[dragItem?.tool_idx, recordItem.tool_idx]
      const keyArr = <string[]>[dragItem?.tool_key, recordItem.tool_key]
      console.log('type', type)
      console.log(indexArr, keyArr)
      const { status, data } = await toolApi.toolDragSort(type, indexArr, keyArr)
      if (status === 200 && data) {
        getToolList()
      }
    }
  } catch (error) {
    console.error('doc-error', error)
  }
}

// 拖拽结束
const dragEnd = () => {
  dragObject.value = null
}

onMounted(() => {
  getToolList()
  recordPosition()
})

// useAsyncData(() => {
//   getToolList()
//   recordPosition()
// })
</script>

<style lang="scss" scoped>
.text-limit {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  // margin-left: 5px;
}
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
      border-radius: 15px;
      .bar-box {
        cursor: pointer;
        height: 30px;
        dd {
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
      padding: $padding-box;
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
          position: relative;
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
          .list-name:hover {
            cursor: pointer;
          }
        }
        .contain-edit::before {
          content: '';
          position: absolute;
          top: -1px; /* 上边框偏移量 */
          left: -1px; /* 左边框偏移量 */
          right: -1px; /* 右边框偏移量 */
          bottom: -1px; /* 下边框偏移量 */
          border: 2px dotted orange;
        }
        .content-create {
          justify-content: center;
          .create-item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }

        .contain-edit {
          overflow: hidden;
        }
        .contain-static {
          border: 0;
        }
      }
    }

    .tools-box + .tools-box {
      margin-top: 20px;
    }
  }
}
</style>
