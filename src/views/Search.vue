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
</template>

<script>
import {reqGetSearchMusic} from '@/api/index'
import { reactive } from '@vue/reactivity'
import {ref,onMounted} from 'vue'
export default {
    setup() {
        let keyWord = ref('') //搜索的关键字
        let state = reactive({
            keyWordHistory:[],//搜索关键字的历史
            music:[],//搜索到的歌曲
        }) 
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
                
            }
        }
        function delKeyWord() { //删除关键字的回调
            state.keyWordHistory = []
            localStorage.removeItem('keyWordHistory')
        }
        return {
            search,
            keyWord,
            state,
            delKeyWord,
            searchHistory
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
</style>