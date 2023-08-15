<template v-if="docList.length > 0">
  <div class="docs">
    <div class="docs-box">
      <div class="box-item" v-for="doc in docList" :key="doc.type">
        <div class="item-title">{{ doc.title }}</div>
        <div class="item-contain">
          <div
            class="contain-doc"
            v-for="(item, index) in doc.collection"
            :key="item.doc_key"
            @click="viewDoc(item.doc_link)"
          >
            <span class="doc-title text-limit">&nbsp;&nbsp;{{ item.doc_name }}&nbsp;&nbsp;</span>
            <div class="doc-title-hover text-limit">
              <div class="doc-title-hover-icon"></div>
              &nbsp;&nbsp;{{ item.doc_name }}&nbsp;&nbsp;<span style="width: 20px"></span>
            </div>
          </div>
          <div v-if="editable" class="contain-doc" @click="addDoc(doc.type)">
            <svg
              t="1689657483742"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8725"
              width="35"
              height="35"
            >
              <path d="M512 512m-384 0a384 384 0 1 0 768 0 384 384 0 1 0-768 0Z" fill="#FFF4D8" p-id="8726"></path>
              <path
                d="M516.288 372.352a32 32 0 0 1 32 32V477.44h73.024a32 32 0 0 1 32 32v6.08a32 32 0 0 1-32 32H548.224v73.088a32 32 0 0 1-32 32h-6.016a32 32 0 0 1-32-32V547.456H405.12a32 32 0 0 1-32-32V509.44a32 32 0 0 1 32-32h73.024l0.064-73.088a32 32 0 0 1 32-32h6.08z"
                fill="#E4B559"
                p-id="8727"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog :showDocDialog="showDocDialog" :docType="curDocType" @update="update" @closeDialog="closeDialog" />
</template>

<script lang="ts" setup>
import { showToast } from 'vant'
import { DocsModel } from '~/models/doc.model'
import { docApi } from '~/server/api/docs/index'
import Dialog from './components/dialog.vue'

const editable = <boolean>useRuntimeConfig().public.editable // 编辑模式
let docList = ref<DocsModel[]>([]) // 文档列表
let showDocDialog = ref<boolean>(false) // 展示弹窗
let curDocType = ref<string>('') // 当前点击的文档类型

// 查看文档
const viewDoc = (link: string) => {
  window.open(link)
}

// 获取文档列表
const getDocList = async () => {
  try {
    const { data, status } = await docApi.getDocList()
    if (status === 200 && data) {
      docList.value = data
    }
  } catch (error) {
    console.error('doc-error', error)
  }
}

// 添加文档
const addDoc = async (type: string) => {
  curDocType.value = type
  showDocDialog.value = true
}

// 关闭弹窗
const closeDialog = () => {
  showDocDialog.value = false
}

// 更新
const update = () => {
  getDocList()
}

useAsyncData('docs', async () => {
  getDocList()
})
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

.docs {
  display: flex;
  justify-content: center;

  .docs-box {
    width: 80%;
    border-radius: 15px;
    background-color: #fff;
    margin: 0px $padding-box $padding-box $padding-box;
    padding-bottom: $padding-box;

    .box-item {
      padding: 0px $padding-box 0 $padding-box;

      .item-title {
        font-size: 20px;
        font-weight: 600;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
      }

      .item-contain {
        display: flex;
        flex-wrap: wrap;

        .contain-doc {
          display: flex;
          position: relative;
          align-items: center;
          width: 13%;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          padding: $padding-item;

          .doc-icon {
            width: 8px;
            height: 21px;
            background-color: pink;
            padding: 5px 0;
          }

          .doc-title {
            box-sizing: border-box;
            height: 30px;
            line-height: 30px;
            padding: 0 8px;
          }

          .doc-title-hover {
            position: absolute;
            height: 30px;
            line-height: 30px;
            padding-right: 8px;
            transition: all 0.3s linear;

            .doc-title-hover-icon {
              left: 0;
              width: 8px;
              height: 30px;
              background-color: rgba($color: #ef9797, $alpha: 1);
              transition: all 0.3s linear;
            }
          }
        }

        .contain-doc:hover {
          cursor: pointer;

          .doc-title {
            display: none;
          }

          .doc-title-hover {
            padding-left: 8px;
            background-color: rgba($color: #edd1d1, $alpha: 0.7);

            .doc-title-hover-icon {
              position: absolute;
              left: calc(100% - 8px);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .docs {
    display: flex;
    justify-content: center;
    .docs-box {
      width: 100%;
      margin: 0;
      .box-item{
        // padding: 0;
        .item-contain{
          .contain-doc{
            width: 46%;
          }
        }
      }
    }
  }
}
</style>
