<template>
  <van-dialog
    v-model:show="showDialog"
    title="新增工具"
    show-cancel-button
    :before-close="() => {}"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <van-form ref="formRef" validate>
      <van-cell-group inset>
        <van-field
          v-model="toolForm.tool_key"
          name="tool_key"
          label="工具key"
          placeholder="请输入key值"
          :rules="[{ required: true, message: '请填写合法key值' }]"
        />
        <van-field
          v-model="toolForm.tool_name"
          name="tool_name"
          label="工具名称"
          placeholder="请输入工具名称"
          :rules="[{ required: true, message: '填写工具名称' }]"
        />
        <van-field
          v-model="toolForm.tool_type"
          is-link
          readonly
          name="tool_type"
          label="工具类型"
          placeholder="请选择工具类型"
          :rules="[{ required: true, message: '请选择工具类型' }]"
          @click="showPicker = true"
        />
        <van-field
          v-model="toolForm.tool_icon"
          name="tool_icon"
          label="工具图标"
          placeholder="请填写工具图标"
          :rules="[{ required: true, message: '请填写工具图标' }]"
        />
        <van-field
          v-model="toolForm.tool_link"
          name="tool_link"
          label="工具链接"
          placeholder="请填写工具链接"
          :rules="[{ required: true, message: '请填写工具链接' }]"
        />
      </van-cell-group>
    </van-form>
  </van-dialog>

  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker :columns="dialogProps.toolTypeList" @cancel="showPicker = false" @confirm="selectTooltype" />
  </van-popup>
</template>

<script lang="ts" setup>
import { showToast } from 'vant'
import { ref, watch } from 'vue'
import { toolApi } from '../../../server/api/tools/index'

const dialogProps = defineProps({
  showToolDialog: {
    type: Boolean,
    default: false
  },
  // 工具类型列表
  toolTypeList: {
    default: []
  }
})
const dialogEmit = defineEmits(['closeDialog', 'update'])

watch(
  () => dialogProps.showToolDialog,
  (val: any) => {
    showDialog.value = val
  }
)

const formRef = ref(null) // 表单ref绑定
const showDialog = ref<boolean>(false) // 展示弹窗
const showPicker = ref<boolean>(false) // 展示picker底部弹窗
// 工具表单
const toolForm = ref({
  tool_key: '', // 工具id
  tool_type: '', // 工具类型
  tool_name: '', // 工具名称
  tool_link: '', // 工具链接
  tool_icon: '' // 工具标签
})

// 确定
const onConfirm = async () => {
  try {
    const form: any = formRef.value
    form.validate().then(
      async (resolved: any) => {
        // Promise状态为fulfilled（已解决）
        const { status, data } = await toolApi.addTool(toolForm.value)
        if (status === 201 && data) {
          showToast('添加成功')
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
    console.error('tool-error', error)
  }
}

// 取消
const onCancel = () => {
  toolForm.value = {
    tool_key: '', // 工具id
    tool_type: '', // 工具类型
    tool_name: '', // 工具名称
    tool_link: '', // 工具链接
    tool_icon: '' // 工具标签
  }
  dialogEmit('closeDialog')
}

// 选择工具类型
const selectTooltype = ({ selectedOptions }: { selectedOptions: Array<any> }) => {
  showPicker.value = false
  toolForm.value.tool_type = selectedOptions[0].text
}
</script>
