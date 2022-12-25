<template>
  <itemMusicTop :playList="state.playList"/>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import {reqGetPlayList}from '@/api/index.js'
import itemMusicTop from '@/components/itemMusic/itemMusicTop.vue'
export default {
    name:'ItemMusic',
    components:[itemMusicTop],
    setup() {
        const state = reactive({
            playList:{}
        })
        onMounted(async () => {
            let id = useRoute().query.id  //获取路由跳转传递过来的参数
            let result = await reqGetPlayList(id)
            if(result.code == 200) {
                state.playList = result.playlist
            }
        })
        return {state}
    }
}
</script>

<style>

</style>