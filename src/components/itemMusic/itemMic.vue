<template>
  <div class="itemMusic">
    <div class="itemMusciTop">
      <div class="itemMusciTopLeft">
        <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
      </svg>
      <span class="play">播放全部(共1首)</span>
      </div>
      <div class="itemMusciTopRight">+收藏{3561}</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'itemMic',
    props:['musicList','subscribedCount'],
    setup(props) {
        console.log(props);
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
    height: 10rem;
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
  }
</style>