<template>
  <itemMusicTop :playList="state.playList"/>
  <itemMic :musicList="state.musciList" :subscribedCount="state.playList.subscribedCount"/>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import {reqGetPlayList,reqGetMusicList}from '@/api/index.js'
import itemMusicTop from '@/components/itemMusic/itemMusicTop.vue'
import itemMic from '@/components/itemMusic/itemMic.vue'
export default {
    name:'ItemMusic',
    components:[itemMusicTop,itemMic],
    setup() {
        const state = reactive({
            playList:{},
            musciList:[]
        })
        onMounted(async () => {
            let id = useRoute().query.id  //获取路由跳转传递过来的参数
            let result1 = await reqGetPlayList(id) //获取歌单详情页信息的接口
            if(result1.code == 200) {
                state.playList = result1.playlist
                sessionStorage.setItem('itemDetail',JSON.stringify(state))
            }
            let result2 = await reqGetMusicList(id) //获取歌单详情页歌曲的接口
            if(result2.code==200) {
                state.musciList = result2.songs
                sessionStorage.setItem('itemDetail',JSON.stringify(state))
            }
        })
        return {state}
    }
}
</script>

<style>

</style>