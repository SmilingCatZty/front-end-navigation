<template>
  <van-dialog
    v-model:show="showDialog"
    title="新增游戏"
    show-cancel-button
    :before-close="() => {}"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <van-form ref="formRef" validate>
      <van-cell-group inset>
        <van-field
          v-model="gameForm.game_id"
          name="game_id"
          label="游戏Key"
          placeholder="请输入Key"
          :rules="[{ required: true, message: '请填写合法Key值' }]"
        />
        <van-field
          v-model="gameForm.game_title"
          name="game_title"
          label="游戏名称"
          placeholder="请输入游戏名称"
          :rules="[{ required: true, message: '填写游戏名称' }]"
        />
        <van-field
          v-model="gameForm.game_describe"
          name="game_describe"
          label="游戏描述"
          placeholder="请输入游戏描述"
          :rules="[{ required: true, message: '填写游戏描述' }]"
        />
        <van-field
          v-model="gameForm.game_icon"
          name="game_icon"
          label="游戏图标"
          placeholder="请输入游戏图标"
          :rules="[{ required: true, message: '填写游戏图标' }]"
        />
        <van-field
          v-model="gameForm.game_link"
          name="game_link"
          label="游戏链接"
          placeholder="请填写游戏链接"
          :rules="[{ required: true, message: '请填写游戏链接' }]"
        />
      </van-cell-group>
    </van-form>
  </van-dialog>
</template>

<script lang="ts" setup>
import { showToast } from 'vant'
import { ref, watch } from 'vue'
import { gameApi } from '../../../server/api/games/index'

const dialogProps = defineProps({
  showGameDialog: {
    type: Boolean,
    default: false
  },
})
const dialogEmit = defineEmits(['closeDialog', 'update'])

watch(
  () => dialogProps.showGameDialog,
  (val: any) => {
    showDialog.value = val
  }
)

const formRef = ref(null) // 表单ref绑定
const showDialog = ref<boolean>(false) // 展示弹窗
// 游戏表单
const gameForm = ref({
  game_id: '', // 游戏id
  game_title: '', // 游戏标题
  game_describe: '', // 游戏名称
  game_icon: '', // 游戏图标
  game_link: '' // 游戏链接
})

// 确定
const onConfirm = async () => {
  try {
    const form: any = formRef.value
    form.validate().then(
      async (resolved: any) => {
        // Promise状态为fulfilled（已解决）
        const { status, data } = await gameApi.addGame(gameForm.value)
        if (status === 201 && data) {
          showToast('游戏添加成功')
          dialogEmit('update')
          dialogEmit('closeDialog')
        }
      },
      (rejected: any) => {
        // Promise状态为rejected（已拒绝）
        console.error('表单验证失败', rejected)
      }
    )
  } catch (error) {
    console.error('doc-error', error)
  }
}

// 取消
const onCancel = () => {
  gameForm.value = {
    game_id: '', // 游戏id
    game_title: '', // 游戏标题
    game_describe: '', // 游戏名称
    game_icon: '', // 游戏图标
    game_link: '' // 游戏链接
  }
  dialogEmit('closeDialog')
}
</script>
