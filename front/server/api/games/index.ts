import requester from "~/server/api/request"

interface CreateGameInfoModel {
  game_id: string, // 游戏id
  game_title: string, // 游戏标题
  game_describe: string, // 游戏名称
  game_icon: string, // 游戏图标
  game_link: string // 游戏链接
}

//请求地址： 基础地址 + api_name + 动作
const api_name = "/game"
export const gameApi = {
  /**
   * 获取游戏列表
   */
  getGameList: () => {
    return requester({
      url: `${api_name}/list`,
      method: "get",
    })
  },

  /**
   * 添加游戏
   * @param {CreateGameInfoModel} data
   */
  addGame: (data: CreateGameInfoModel) => {
    return requester({
      url: `${api_name}/create`,
      method: "post",
      data
    })
  }
}
