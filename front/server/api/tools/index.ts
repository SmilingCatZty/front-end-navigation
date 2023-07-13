import requester from "~/server/api/request"

//请求地址： 基础地址 + api_name + 动作
const api_name = "/tool"
export const toolApi =  {
  //用户登录
  getToolList: () => {
    return requester({
      url: `${api_name}/toolList`,
      method: "get",
    })
  }
}
