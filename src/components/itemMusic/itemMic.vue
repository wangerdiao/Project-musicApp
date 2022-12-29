<template>
  <div class="itemMusic">
    <div class="itemMusciTop">
      <div class="itemMusciTopLeft">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-bofang"></use>
        </svg>
      <span class="play">播放全部(共{{musicList.length}}首)</span>
      </div>
      <div class="itemMusciTopRight">+收藏{{ changeCount(subscribedCount) }}</div>
    </div>
<div>
  <div class="itemMusicList" v-for="(item,index) in musicList" :key="index" :class="index===musicList.length-1?'musicList-final':''">
      <span class="index">{{index+1}}</span>
      <div class="music" @click="playMusic(index)">
        <div class="musicAuthor">
          <span class="musicName">{{item.name}}</span>
          <span class="author" v-for="(ar,index) in item.ar" :key="index">{{ ar.name }}</span>
        </div>
        <svg class="icon" aria-hidden="true" v-if="item.mv!=0">
          <use xlink:href="#icon-24gl-playSquare"></use>
        </svg>
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-hanbaocaidan"></use>
        </svg>
      </div>
    </div>
</div>
  </div>
</template>

<script>
import {  useStore } from 'vuex';

export default {
    name:'itemMic',
    props:['musicList','subscribedCount'],
    setup(props) {
        const store = useStore()
        const newPlayList =() => {return store.commit('upadtePlayList',props.musicList)}
        const newPlayIndex =(index) => {return store.commit('updatePlayListIndex',index)}
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
       function playMusic(index) {
        newPlayList() //更新播放列表
        newPlayIndex(index) //更新播放的音乐
       }
      return {changeCount,playMusic,newPlayList,newPlayIndex}
    }
    
}
</script>

<style lang="less" scoped>
  .itemMusic {
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    height:100%;
    .itemMusciTop{
      width: 100%;
      height: .8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemMusciTopLeft{
        width: 100%;
        display: flex;
        align-items: center;
        .play {
          width: 100%;
          margin-left: .2rem;
          font-size: 16px;
          color: #000000;
          font-weight: 700;
        }
      }
      .itemMusciTopRight{
        width: 45%;
        height: .8rem;
        border-radius: .6rem;
        background-color: red;
        color: #fff;
        line-height: .8rem;
        text-align: center;
        margin-top: .09rem;
      }
    }
    .itemMusicList{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: .2rem;
      .index {
        margin-right: .3rem;
      }
      .music{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .musicAuthor{
          width: 100%;
          display: flex;
          flex-direction: column;
          .musicName{
            font-size: 16px;
            color: black;
            font-weight: 800;
          }
          .author{
            font-size: 13px;
            color: rgb(163, 151, 151);
          }
        }
      }
     
    }
    .musicList-final {
        padding-bottom: 3rem;
      }
  }
</style>