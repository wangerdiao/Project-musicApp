<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images.banner" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {reqGetBanner} from '@/api/index'
import {onMounted,reactive} from 'vue'
export default {
  name: "Swiper",
  setup() {
    const images =reactive({
        banner:
         ["https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
            "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"]
    });
     onMounted(
        //获取轮播图数据的回调
        async () => {
        let result = await reqGetBanner()
        if(result.code == 200) images.banner = result.banners
    })
    return { images };
  },
};
</script>

<style lang="less" scoped>
.swiperTop {
  .van-swipe {
    width: 100%;
    padding: 0.2rem;
    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 3rem;
        }
      }
      /deep/ .van-swipe__indicator--active{
         background-color: rgb(219,130,130);
      }
    }
  }
}
</style>