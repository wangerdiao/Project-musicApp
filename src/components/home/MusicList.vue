<template>
  <div class="musicList">
    <div class="musicTop">
        <div class="title">发现好歌单</div>
        <div class="more">查看更多</div>
    </div>
  </div>
</template>

<script>
import {reqGetRecommandSong} from '@/api/index'
import {onMounted,reactive} from 'vue'
export default {
    name:'MusicList',
    setup() {
        const musicList = reactive({
            list:[]
        })
        onMounted(async() => {
            let result = await reqGetRecommandSong() //获取每日推荐歌单的接口
            if(result.code == 200) {
                console.log(result);
                musicList.list = result.result
            }
        })
        return {musicList}
    }
}
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height:5rem;
    padding: 0.2rem;
    .musicTop{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;
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

}

</style>