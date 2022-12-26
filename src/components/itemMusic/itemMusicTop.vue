<template>
  <div class="itemMusicTop">
    <img :src="playList.coverImgUrl" alt="">
    <div class="musicLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
      </svg>
      <span class="name">歌单</span>
    </div>
    <div class="musicRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-hanbaocaidan"></use>
      </svg>
    </div>
  </div>
  <div class="musicMiddle">
        <img :src="playList.coverImgUrl" alt="" class="middleImg">
        <div class="middleRight">
          <span class="title">{{ playList.name }}</span>
          <div class="rightMiddle">
            <!-- 由于请求的数据没有返回的原因，当页面刷新时后台会报错，用v-if条件渲染可以解决这个问题 -->
            <img :src="playList.creator.avatarUrl" alt="">
            <!-- <img v-if="playList.creator" :src="playList.creator.avatarUrl" alt=""> -->
            <span class="name" >{{ playList.creator.nickname }}</span>
            <!-- <span class="name" v-if="playList.creator">{{ playList.creator.nickname }}</span> -->
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangyoujiantou"></use>
            </svg>
          </div>
          <span class="description">持续更新各种DJ舞蹈过度各种风情都有的持续更新</span>
        </div>
  </div>
  <div class="musicBottom">
   <div class="bottomItem">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xinxi"></use>
    </svg>
    <span>40</span>
   </div>
   <div class="bottomItem">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-guizeyinqing"></use>
    </svg>
    <span>25</span>
   </div>
   <div class="bottomItem">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
    </svg>
    <span>下载</span>
   </div>
   <div class="bottomItem">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
    </svg>
    <span>多选</span>
   </div>
  </div>
</template>

<script>
export default {
  name: "itemMusicTop",
  props: ["playList"],
  setup(props) {
    //防止组件渲染时请求到的数据还没返回，也防止页面刷新数据丢失
   if(!props.playList.creator) {
    props.playList.creator = JSON.parse(sessionStorage.getItem('itemDetail')).playList.creator
   }
  },
};
</script>

<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .musicLeft,.musicRight {
        width: 25%;
        display: flex;
        justify-content:space-around;
        .icon {
            fill: #fff; 
        }
        padding: .1rem ;
        box-sizing: border-box;

        .name {
            font-size: .4rem;
            color: #fff;
        }
    }
    img {
        width: 100%;
        height:10rem;
        position: fixed;
        z-index: -1;
        filter: blur(70px);
    }
}
.musicMiddle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: .5rem;
  .middleImg {
    width: 3rem;
    height: 3rem;
    border-radius: .5rem;
    margin-left: .2rem;

  }
  .middleRight {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: .2rem;
    
    .title {
      color: #fff;
      font-size: large;
      font-weight: 900;
      margin-top: .1rem;
      margin-left: .1rem;
    }
    .rightMiddle {
      width: 100%;
      display: flex;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: .5rem;
      }
      .icon {
        fill: rgb(163, 151, 151);
      }
      .name {
        font-size: .3rem;
        padding-left: .2rem;
        color: rgb(163, 151, 151);
      }
    }
    .description {
      width: 100%;
      color: rgb(163, 151, 151);
      font-size: .2rem;
    }
  }
}
.musicBottom {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: .6rem;
  .bottomItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    fill: #fff;
    span {
      padding-top: .1rem;
      color:#fff
    }
  }
}
</style>