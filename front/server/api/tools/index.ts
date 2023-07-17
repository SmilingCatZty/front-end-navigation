import requester from "~/server/api/request"

interface CreateToolInfoModel {
  tool_type: string
  tool_key: string
  tool_name: string
  tool_icon: string
  tool_link: string
}

//请求地址： 基础地址 + api_name + 动作
const api_name = "/tool"
export const toolApi = {
  /**
   * 获取工具列表
   */
  getToolList: () => {
    return requester({
      url: `${api_name}/toolList`,
      method: "get",
    })
  },

  /**
   * 添加工具
   * @param {CreateToolInfoModel} data 
   */
  addTool: (data: CreateToolInfoModel) => {
    return requester({
      url: `${api_name}/create`,
      method: "post",
      data
    })
  },

  /**
   * 拖拽排序
   * @param {索引数组} indexArr
   * @param {key数组} keyArr 
   * @returns 
   */
  toolDragSort: (type: string, indexArr: number[], keyArr: string[]) => {
    return requester({
      url: `${api_name}/drag-sort`,
      method: "put",
      data: {
        type,
        indexArr,
        keyArr
      }
    })
  }
}
