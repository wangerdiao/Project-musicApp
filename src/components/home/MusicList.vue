<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="mySwiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in musicList.list" :key="item" class="item">
          <router-link :to="{
            name:'ItemMusic',
            query:{
                id:item.id
            }
          }">
            <img :src="item.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { reqGetRecommandSong } from "@/api/index";
import { onMounted, reactive } from "vue";
export default {
  name: "MusicList",
  setup() {
    const musicList = reactive({
      list: [],
    });
    onMounted(async () => {
      let result = await reqGetRecommandSong(); //获取每日推荐歌单的接口
      if (result.code == 200) {
        musicList.list = result.result;
      }
    });
    function changeCount(num) {
      //格式化播放量
      if (num > 100000000) {
        num = (num / 100000000).toFixed(1) + "亿";
        return num;
      } else if (num > 10000) {
        num = (num / 10000).toFixed(1) + "万";
        return num;
      } else {
        return num;
      }
    }
    return { musicList, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .mySwiper {
      height: 100%;
      position: relative;
      .playCount {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        font-size: 0.3rem;
        color: white;
        display: flex;
        align-items: center;
      }
      .item {
        padding: 0 0.1rem;

        img {
          width: 100%;
          height: 3rem;
          border: 0 solid;
          border-radius: 0.4rem;
        }
      }
    }
  }
}
</style>