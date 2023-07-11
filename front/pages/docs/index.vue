<template>
  <div class="docs">
    <div class="docs-box">
      <div class="box-item" v-for="doc in docList" :key="doc.type">
        <div class="item-title">{{ doc.title }}</div>
        <div class="item-contain">
          <div class="contain-doc" v-for="(item, index) in doc.collection" :key="index">
            <span class="doc-title text-limit">&nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;</span>
            <div class="doc-title-hover text-limit">
              <div class="doc-title-hover-icon"></div>
              &nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;<span style="width: 20px"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { list } from './data'

const docList = list
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
  // padding: $padding-box;
  .docs-box {
    width: 80%;
    border-radius: 15px;
    background-color: #fff;
    padding: 0px $padding-box $padding-box $padding-box;
    .box-item {
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
          width: 15%;
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
              width: 8px;
              height: 30px;
              background-color: rgba($color: #ef9797, $alpha: 1);
              transition: all 0.7s linear;
            }
          }
        }
        .contain-doc:hover {
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
</style>
