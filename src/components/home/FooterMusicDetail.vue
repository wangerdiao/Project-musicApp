<template>
    <img :src="music.al.picUrl" alt="" class="bigImg">
    <div class="musicTop">
        <div class="musicTopLeft">
            <svg class="icon" aria-hidden="true"   @click="change">
                <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
            </svg>
            <div class="author">
                <Marquee>{{ music.name }}</Marquee>
                <p></p>
                <div class="bottom">
                    <span v-for="item in music.ar" :key="item">{{ item.name }}</span>
                    <svg class="icon" aria-hidden="true"   v-if="music.ar?true:false">
                        <use xlink:href="#icon-xiangyoujiantou"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="musicTopRight">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-guizeyinqing"></use>
            </svg>
        </div>
    </div>
    <div class="musicMiddle" v-if="!showLrc">
        <img src="@/assets/needle-ab.png" alt="" class="needle" :class="isPlayed == true?'needle_active':'needle'">
        <img src="@/assets/cd.png" alt="" class="cd">
        <img :src="music.al.picUrl" alt="" class="picUrl" :class="isPlayed == true?'picUrl_active':'picUrl_paused'"  @click="showLrc = true">
    </div>
    <div class="Lrc" v-else ref="musicLyric">
        <p v-for="item in manageLyric()" :key="item" :class="currentTime*1000>item.time && currentTime*1000<item.next?'active':'p'">{{ item.lrc }} </p>
    </div>
    <div class="musicFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-xihuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-yinle"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-xinxi"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-24gl-repeatInfinite2"></use>
            </svg>
        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-danxunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  v-if="!isPlayed" @click="play()">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  v-else @click="play()">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-24gf-playlistHeart4"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import {  useStore } from 'vuex';
import { computed, onMounted, watch ,ref} from 'vue';
export default {
    name:'FooterMusicDetail',
    props:['music','play','isPlayed'],
    setup(props) {
        const store = useStore()
        let  showLrc = ref(false)
        const updateShowDetail = () => {return store.commit('updateShowDetail')} 
        const lyric = computed(() => store.state.showLyric)
        const currentTime = computed(() => store.state.currentTime)
        const musicLyric = ref(0)
        onMounted(() => {
            manageLyric()
            // console.log(currentTime,222);
            
        })
        function manageLyric() {  //整理歌词的回调
            let arr;
            if(lyric!={}) {
                arr=lyric.value.split(/[(\r\n)\r\n]+/).map(item => {
                    let min=item.slice(item.indexOf('[')+1,item.indexOf(':')) //分钟
                    let sec=item.slice(item.indexOf(':')+1,item.indexOf('.')) //秒
                    let mill=item.slice(item.indexOf('.')+1,item.indexOf(']')) //毫秒
                    let lrc=item.slice(item.indexOf(']')+1,item.length)
                    let time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill) //每段歌词在time秒数播放
                    return {min,sec,mill,lrc,time}
                })
                arr.forEach((item,i) => {
                    if(i===arr.length-1) {
                        item.next = 0
                    }else {
                        item.next = arr[i+1].time
                    }
                });
                // console.log(arr);
                return arr
            }
        }
       function change() { //返回歌单展示页且修改展示磁盘
        updateShowDetail()
        showLrc.value = false
       }
        watch(currentTime,(newValue,oldValue)=> {
            let p = document.querySelector('p.active')
            if(p && p.offsetTop>270) {
                musicLyric.value.scrollTop = p.offsetTop-250
            }
            
            
        })
         return {
            updateShowDetail,
            showLrc,lyric,
            manageLyric,
            currentTime,
            musicLyric,
            change
        }
    }
}
</script>

<style lang="less" scoped>
.bigImg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -99;
    filter: blur(80px);
}
.musicTop {
    display: flex;
    justify-content: space-between;
    margin-top: .2rem;
    margin-left: .3rem;
    margin-right: .3rem;
    align-items: center;
    .musicTopLeft {
        width: 100%;
        display: flex;
        align-items: center;
        .author {
            margin-left: .3rem;
            font-size: 15px;
            color: #fff;
            .bottom {
                display: flex;
                align-items: center;
                font-size: 13px;
                color:rgb(163, 151, 151);
                .icon {
                    margin-left: .1rem;
                }
            }
        }
        .icon {
            fill: #fff;
        }
    }
    .musicTopRight {
        .icon {
            fill: #fff;
        }
    }
}
.musicMiddle {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin:0 0;
        transform: rotate(-13deg);
        transition:all 2s;
    }
    .needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin:0 0;
        transform: rotate(0deg);
        transition:all 2s;
    }
    .cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom:2.3rem;
        z-index: -1;
    }
    .picUrl {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_picUrl 10s linear infinite;
    }
    .picUrl_active {
        animation-play-state: running;
    }
    .picUrl_paused {
        animation-play-state: paused;
    }
    //磁盘转动
    @keyframes rotate_picUrl {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
}
.Lrc {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    margin-top: .1rem;
    scroll-behavior: smooth;
    p {
        color: rgb(119, 114, 114);
        margin-bottom:.2rem ;
    }
    .active {
        color: #fff;
        font-size: .4rem;
    }
}
.musicFooter {
    width: 100%;
    position: absolute;
    top: 10rem;
    .footerTop {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .icon {
            width: .6rem;
            height: .6rem;
            fill: #fff;
        }
    }
    .footer {
        display: flex;
        justify-content: space-between;
        margin-top: 1.2rem;
        margin-right: 10px;
        margin-left: 10px;
        .icon {
            width: .7rem;
            height: .7rem;
            fill: #fff;
        }
    }
}
</style>