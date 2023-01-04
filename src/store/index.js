import { createStore } from 'vuex'
import {reqGetMusicLyric} from '@/api/index'
export default createStore({
  state: {
    playList: [
      {
        al:{
          id: 31590,
          name: "月",
          pic: 125344325582686,
          picUrl:"https://p2.music.126.net/WxvsRijR_yaX0A6jgCDSng==/125344325582686.jpg",
        },
        ar:[
          {
            id: 10223,
            name: "闫月"
          }
        ],
        id: 319354,
        name:"她"
      }
    ],
    playListIndex:0, //获取到音乐数组的序列号
    isPlayed:false, //音乐播放状态
    showDetail:false,//展示歌曲详情页
    showLyric:{},//展示歌词
    currentTime:0,//当前歌曲播放的时长
    duration:0,//歌曲总时长,
    isLogin:false ,//判断是否登录
  },
  getters: {
  },
  mutations: {
    changeIspalyed(state,value) { //改变音乐的播放和暂停
      state.isPlayed = value
    },
    upadtePlayList(state,value) { //修改播放列表
      state.playList = value
    },
    updatePlayListIndex(state,value) { //修改播放列表的播放序号
      state.playListIndex = value
    },
    updateShowDetail(state) { //修改展示歌曲详情页的布尔值
      state.showDetail = !state.showDetail
    },
    upadteShowLyric(state,value) { //修改歌词
      state.showLyric = value
    },
    updateCurrentTime(state,value) { //修改歌曲播放的时长
      state.currentTime = value
    },
    updateDuration(state,value) { //修改歌曲总时长
        state.duration = value
    },
    addPlayMusic(state,value) {  //添加播放的歌曲
      state.playList.push(value)
    }
  },
  actions: {
    toChangeIspalyed(context,value) { //改变音乐的播放和暂停
      context.commit('changeIspalyed',value)
    },
    async getLyric(context,value) { //获取歌词
      let result = await reqGetMusicLyric(value)
      if(result.code == 200) {
        context.commit('upadteShowLyric',result.lrc.lyric)
      }
    }
  },
  modules: {
  }
})
