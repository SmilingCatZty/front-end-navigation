import requester from "~/server/api/request"

//请求地址： 基础地址 + api_name + 动作
const api_name = "/game"
export const gameApi =  {
  //用户登录
  getGameList: () => {
    return requester({
      url: `${api_name}/list`,
      method: "get",
    })
  }
}
