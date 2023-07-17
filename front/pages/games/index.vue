<template>
  <div class="games">
    <div class="games-box">
      <div class="box-item" v-for="(game, idx) in gameList" :key="game.game_id" @click="viewGame(game.game_link)">
        <div class="item-img">
          <img :src="game.game_icon" alt="" />
        </div>
        <div class="item-word">
          <span class="text-limit">{{ game.game_title }}</span>
          <span class="text-limit">{{ game.game_describe }}</span>
        </div>
      </div>
      <div v-if="gameList.length % 4 !== 0" class="box-content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gameApi } from '~/server/api/games'
import { GameInfoModel } from '~/models/game.model'

const gameList = ref<GameInfoModel[]>([])

const getGameList = async () => {
  try {
    const { status, data } = await gameApi.getGameList()
    if (status === 200 && data) {
      gameList.value = data
    }
  } catch (error) {
    console.error('game-error', error)
  }
}

const viewGame = (link: string) => {
  window.open(link)
}

onMounted(() => {
  getGameList()
})
</script>

<style lang="scss" scoped>
.text-limit {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  // margin-left: 5px;
}
.games {
  display: flex;
  justify-content: center;
  .games-box {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    min-height: 10px;
    // border-radius: 15px;
    background-color: #fff;
    margin: 0px $padding-box $padding-box $padding-box;
    padding: $padding-box;
    .box-item {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: 20%;
      height: 100px;
      border: none; /* 移除边框 */
      border-radius: 15px;
      margin: 10px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #ccc; /* 使用outline代替border */
      .item-img {
        width: 40px;
        img {
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
      }
      .item-word {
        width: 180px;
        display: flex;
        flex-wrap: wrap;
        margin-left: 10px;
        span {
          width: 100%;
        }
      }
    }
    .box-content {
      flex-basis: 0;
      flex-grow: 1;
    }
  }
  .box-item:hover {
    cursor: pointer;
    background-color: rgba($color: #d76e11, $alpha: 0.1);
  }
}
</style>
