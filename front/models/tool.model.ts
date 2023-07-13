// 工具列表模型
interface ToolsModel {
  type: string
  title: string
  collection: toolsInfoModel[]
}

// 工具模型
interface toolsInfoModel {
  tool_icon: string
  tool_idx: number
  tool_key: string
  tool_link: string
  tool_name: string
  tool_type: string
}

export { ToolsModel, toolsInfoModel }
