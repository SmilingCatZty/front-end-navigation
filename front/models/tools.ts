// 工具列表模型
interface ToolsModel {
  type: string
  name: string
  collection: toolsInfoModel[]
}

// 工具模型
interface toolsInfoModel {
  icon: string
  name: string
  link: string
}

export { ToolsModel, toolsInfoModel }
