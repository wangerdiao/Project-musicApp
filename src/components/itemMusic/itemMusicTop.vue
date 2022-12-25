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
</template>

<script>
export default {
  name: "itemMusicTop",
  props: ["playList"],
  setup(props) {
    console.log(props);
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
        .name {
            font-size: .4rem;
            color: #fff;
        }
    }
    img {
        width: 100%;
        height:11rem;
        position: fixed;
        z-index: -1;
        filter: blur(70px);
    }
}
</style>