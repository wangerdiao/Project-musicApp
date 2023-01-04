<template>
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
</template>

<script>
export default {
    name:'Music',
    props:['musicList','playMusic']
}
</script>

<style lang="less" scoped>
.itemMusicList{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: .2rem;
      padding: 0 .2rem;
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
</style>