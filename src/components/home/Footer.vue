<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateShowDetail()">
        <img :src="playList[playListIndex].al.picUrl" alt="">
    </div>
    <div class="footerRight" >
        <span  @click="updateShowDetail()">{{ playList[playListIndex].name }}</span>
        <div class="iconList">
            <svg class="icon" aria-hidden="true" @click="changePlay" v-if="!isPlayed">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  @click="changePlay" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-24gf-playlistHeart4"></use>
            </svg>
        </div>
        <audio  ref="audio" :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `" @timeupdate="getCurrentPlayTime" @canplay="canplay"></audio>
        <van-popup v-model:show="showDetail" position="bottom" :style="{ height: '100%',width:'100%' }">
            <FooterMusicDetail :music="playList[playListIndex]" :play="changePlay" :isPlayed="isPlayed" :addDuration="addDuration"/>
        </van-popup>
    </div>
  </div>
</template>

<script>
import { ref,onMounted, watch ,onUpdated} from 'vue';
import {  useStore } from 'vuex';
import hookStoreState  from '@/store/useMapState'
import FooterMusicDetail from './FooterMusicDetail.vue'
export default {
    name:'Footer',
    components:{FooterMusicDetail},
    setup() {
        const audio = ref(null)
        const store = useStore()
        const storeStateArr = hookStoreState(['playList','playListIndex','isPlayed','showDetail','currentTime']) ;
        const getTrue = () => {return store.dispatch('toChangeIspalyed',true)}
        const getFalse = () => {return store.dispatch('toChangeIspalyed',false)}
        const getLyric = (id) => {return store.dispatch('getLyric',id)}
        const updateShowDetail = () => {return store.commit('updateShowDetail')}
        const updateTime = (time) => {return store.commit('updateCurrentTime',time)}
        const updateDuration = (time) => {return store.commit('updateDuration',time)}
        onMounted(() => {
            getLyric(storeStateArr.playList.value[storeStateArr.playListIndex.value].id) //???????????????????????????
        })
        onUpdated(() => {
            canplay()
        })
       function canplay() { //?????????????????????????????????????????????
        addDuration()
       }
        function changePlay() { //??????????????????????????????
            if(storeStateArr.isPlayed.value==false ) { //????????????????????????
                audio.value.play()
                getTrue()
            }else {
                audio.value.pause()
                getFalse()
            }
        }
        function getCurrentPlayTime() {  //??????vuex????????????????????????????????????
            updateTime(audio.value.currentTime)
        }
        function addDuration() { //?????????????????????
            if(!isNaN(audio.value.duration)) {
                updateDuration(audio.value.duration)
            }
        }
        watch(() =>storeStateArr.playList.value[storeStateArr.playListIndex.value].id,(newValue,oldValue) => { //????????????id???????????????????????????????????????????????????????????????????????????????????????
            audio.value.autoplay = true                    
            getTrue()
            getLyric(storeStateArr.playList.value[storeStateArr.playListIndex.value].id)
            canplay() 
        })
        return {
            audio,
            changePlay,
            getTrue,
            getFalse,
            updateShowDetail,
            updateTime,
            getCurrentPlayTime,
            updateDuration,
            addDuration,
            canplay,
            ...storeStateArr,
        }
    },
}
</script>

<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1.5rem;
    position: fixed;
    bottom: 0;
    border-top: 1px solid gray;
    display: flex;
    align-items: center;
    background-color: #fff;
    .footerLeft {
        width: 23%;
        img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }
    .footerRight {
        width:100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconList {
            width: 40%;
            display: flex;
            justify-content: space-around;
            margin-right: .1rem;
            .icon {
                width: .5rem;
                height: .5rem;
            }
        }
    }
}
</style>