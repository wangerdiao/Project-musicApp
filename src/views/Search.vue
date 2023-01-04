<template>
    <div class="search">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
        </svg>
        <input type="text" placeholder="周杰伦" v-model='keyWord' @keydown.enter="search">
    </div>
    <div class="searchHistory">
        <span class="history">历史</span>
        <span class="historyItem" v-for="item in state.keyWordHistory" :key="item" @click="searchHistory(item)"> {{ item }}</span>
        <svg class="icon" aria-hidden="true" @click="delKeyWord">
            <use xlink:href="#icon-changyonggoupiaorenshanchu"></use>
        </svg>
    </div>
    <Music :musicList="state.music" :playMusic="playMusic"/>
</template>

<script>
import {reqGetSearchMusic} from '@/api/index'
import { reactive } from '@vue/reactivity'
import {ref,onMounted, computed} from 'vue'
import Music from '@/components/Music.vue'
import {  useStore } from 'vuex';


export default {
    setup() {
        const store = useStore()
        let keyWord = ref('') //搜索的关键字
        let state = reactive({
            keyWordHistory:[],//搜索关键字的历史
            music:[],//搜索到的歌曲
        }) 
        const addPlayMusic = (value) => {return store.commit('addPlayMusic',value)}
        const updatePlayListIndex = (value) => {return store.commit('updatePlayListIndex',value)}
        const playList = computed(() => store.state.playList)
        onMounted(() => {
           state.keyWordHistory = JSON.parse(localStorage.getItem('keyWordHistory'))||[]
        })
        async function search() { //点击搜索的回调
            if(state.keyWordHistory.indexOf(keyWord.value)==-1 && keyWord.value.trim()!='') { //数组去重
                state.keyWordHistory.unshift(keyWord.value)
                localStorage.setItem('keyWordHistory',JSON.stringify(state.keyWordHistory))
                if(state.keyWordHistory.length>10) {
                    state.keyWordHistory.splice(state.keyWordHistory.length-1,1)
                localStorage.setItem('keyWordHistory',JSON.stringify(state.keyWordHistory))
                }
            }
            let res = await reqGetSearchMusic(keyWord.value)
            if(res.code==200) {
                state.music =res.result.songs
            }
            keyWord.value = '' //清空关键字
        }
        async function searchHistory(item) { //搜索历史关键字的回调
            let res = await reqGetSearchMusic(item)
            console.log(res);
            if(res.code==200) {
                state.music =res.result.songs
                if(state.music){
                    state.music.forEach(item => {
                    item.mv = item.mvid  //为每首歌曲添加mv属性，方便歌曲MV图标的显示
                    item.ar = item.artists //为每首歌添加ar属性
                    item.al = item.album
                    item.al.picUrl = item.album.artist.img1v1Url
                })
                }
            }
        }
        function delKeyWord() { //删除关键字的回调
            state.keyWordHistory = []
            localStorage.removeItem('keyWordHistory')
        }
        function playMusic(index) {
            addPlayMusic(state.music[index])
            // console.log(playList.value.length-1);
            
            updatePlayListIndex(playList.value.length-1)
        }
        return {
            search,
            keyWord,
            state,
            delKeyWord,
            searchHistory,
            playMusic,
            addPlayMusic,
            updatePlayListIndex,
            playList
        }
    }
}
</script>

<style lang="less" scoped>
.search {
 width: 100%;
 height: 1rem;
 padding: .1rem .2rem;
 display: flex;
 align-items: center;   
 input {
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid gray;
    width: 90%;
 }
}
.searchHistory {
    width: 100%;
    padding: .1rem .2rem;
    position: relative;
    .history {
        font-size: 20px;
        font-weight: 700;
    }
    .historyItem {
        background-color: rgb(138, 131, 131);
        border-radius: 40px;
        padding: .2rem .2rem;
        margin-left: .1rem;
        margin-top: .1rem;
        display: inline-block;
    }
    .icon {
        width: .3rem;
        height: .3rem;
        position: absolute;
        right: .1rem;
    }
}
// .itemMusicList{
//       width: 100%;
//       display: flex;
//       align-items: center;
//       margin-top: .2rem;
//       padding: 0 .2rem;
//       .index {
//         margin-right: .3rem;
//       }
//       .music{
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         .musicAuthor{
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           .musicName{
//             font-size: 16px;
//             color: black;
//             font-weight: 800;
//           }
//           .author{
//             font-size: 13px;
//             color: rgb(163, 151, 151);
//           }
//         }
//       }
     
//     }
//     .musicList-final {
//         padding-bottom: 3rem;
//       }
</style>