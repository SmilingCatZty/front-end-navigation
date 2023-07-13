// 文档列表模型
interface DocsModel {
  type: string
  title: string
  collection: DocInfoModel[]
}

// 工具模型
interface DocInfoModel {
  doc_name: string
  doc_link: string
  doc_idx: number
  doc_key: string
  doc_type: string
}

export { DocsModel, DocInfoModel }
