<template>
  <div class="footerMusic">
    <div class="footerLeft">
        <img :src="playList[playListIndex].al.picUrl" alt="">
    </div>
    <div class="footerRight" >
        <span>{{ playList[playListIndex].name }}</span>
        <div class="iconList">
            <svg class="icon" aria-hidden="true" @click="changePlay" v-if="!isPlayed.value">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  @click="changePlay" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-24gf-playlistHeart4"></use>
            </svg>
        </div>
        <audio  ref="audio" :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>
    </div>
  </div>
</template>

<script>
import { ref,onMounted, toRef, computed } from 'vue';
import { mapMutations, useStore } from 'vuex';
import hookStoreState  from '@/store/useMapState'
export default {
    name:'Footer',
    setup() {
        const audio = ref(null)
        const store = useStore()
        const storeStateArr = hookStoreState(['playList','playListIndex','isPlayed']) ;
        // const playList = computed(() => {store.state.playList})
        // const playListIndex = computed(() => {store.state.playListIndex})
        // const isPlayed = computed(() => {store.state.isPlayed})
        const getTrue = () => {return store.dispatch('toChangeIspalyed',true)}
        const getFalse = () => {return store.dispatch('toChangeIspalyed',false)}
        onMounted(() => {
            console.log(store);

        })
        function changePlay() {
            if(storeStateArr.isPlayed.value==false ) { //判断音乐是否播放
                audio.value.play()
                getTrue()
            }else {
                audio.value.pause()
                getFalse()
            }
            
        }
        return {
            audio,
            changePlay,
            getTrue,
            getFalse,
            ...storeStateArr,
            // playList,
            // playListIndex,
            // isPlayed
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