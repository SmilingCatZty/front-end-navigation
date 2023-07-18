<template>
  <div>
    <van-button type="success" @click="success">成功按钮</van-button>
  </div>
</template>

<script lang="ts" setup>
const success = () => {
  useRuntimeConfig().public.editable = true // 编辑模式
}
</script>

<style lang="scss" scoped></style>
