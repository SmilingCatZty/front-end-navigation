import requester from "~/server/api/request"

//请求地址： 基础地址 + api_name + 动作
const api_name = "/doc"
export const docApi =  {
  //用户登录
  getDocList: () => {
    return requester({
      url: `${api_name}/docList`,
      method: "get",
    })
  }
}
