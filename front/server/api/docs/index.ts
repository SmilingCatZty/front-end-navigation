import requester from "~/server/api/request"

interface CreateDocInfoModel {
  doc_type: string
  doc_key: string
  doc_name: string
  doc_link: string
}

//请求地址： 基础地址 + api_name + 动作
const api_name = "/doc"
export const docApi = {
  /**
   * 获取文档列表
   */
  getDocList: () => {
    return requester({
      url: `${api_name}/docList`,
      method: "get",
    })
  },

  /**
   * 添加文档
   * @param {CreateDocInfoModel} data
   */
  addDoc: (data: CreateDocInfoModel) => {
    return requester({
      url: `${api_name}/create`,
      method: "post",
      data
    })
  }
}
