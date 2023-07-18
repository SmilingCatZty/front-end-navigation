<template>
  <van-dialog
    v-model:show="showDialog"
    title="新增文档"
    show-cancel-button
    :before-close="() => {}"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <van-form ref="formRef" validate>
      <van-cell-group inset>
        <van-field
          v-model="docForm.doc_key"
          name="tool_key"
          label="文档key"
          placeholder="请输入key值"
          :rules="[{ required: true, message: '请填写合法key值' }]"
        />
        <van-field
          v-model="docForm.doc_name"
          name="tool_name"
          label="文档名称"
          placeholder="请输入文档名称"
          :rules="[{ required: true, message: '填写文档名称' }]"
        />
        <van-field
          v-model="docForm.doc_type"
          is-link
          readonly
          name="tool_type"
          label="文档类型"
          placeholder="请选择文档类型"
          :rules="[{ required: true, message: '请选择文档类型' }]"
        />
        <van-field
          v-model="docForm.doc_link"
          name="tool_link"
          label="文档链接"
          placeholder="请填写文档链接"
          :rules="[{ required: true, message: '请填写文档链接' }]"
        />
      </van-cell-group>
    </van-form>
  </van-dialog>
</template>

<script lang="ts" setup>
import { showToast } from 'vant'
import { ref, watch } from 'vue'
import { docApi } from '../../../server/api/docs/index'

const dialogProps = defineProps({
  showDocDialog: {
    type: Boolean,
    default: false
  },
  // 文档类型列表
  docType: {
    type: String,
    default: ''
  }
})
const dialogEmit = defineEmits(['closeDialog', 'update'])

watch(
  () => dialogProps.showDocDialog,
  (val: any) => {
    showDialog.value = val
  }
)

watch(
  () => dialogProps.docType,
  (val: any) => {
    docForm.value.doc_type = val
  }
)

const formRef = ref(null) // 表单ref绑定
const showDialog = ref<boolean>(false) // 展示弹窗
// 文档表单
const docForm = ref({
  doc_key: '', // 文档id
  doc_type: '', // 文档类型
  doc_name: '', // 文档名称
  doc_link: '' // 文档链接
})

// 确定
const onConfirm = async () => {
  try {
    const form: any = formRef.value
    form.validate().then(
      async (resolved: any) => {
        // Promise状态为fulfilled（已解决）
        const { status, data } = await docApi.addDoc(docForm.value)
        if (status === 201 && data) {
          showToast('文档添加成功')
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
  docForm.value = {
    doc_key: '', // 文档id
    doc_type: dialogProps.docType, // 文档类型
    doc_name: '', // 文档名称
    doc_link: '' // 文档链接
  }
  dialogEmit('closeDialog')
}
</script>
