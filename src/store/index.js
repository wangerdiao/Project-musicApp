import { createStore } from 'vuex'

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
    updateShowDetail(state) {
      state.showDetail = !state.showDetail
    }
  },
  actions: {
    toChangeIspalyed(context,value) {
      context.commit('changeIspalyed',value)
    }
  },
  modules: {
  }
})
