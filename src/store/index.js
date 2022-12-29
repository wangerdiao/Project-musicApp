import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [
      {
        al:{
          id: 35046112,
          name: "La La Land (Original Motion Picture Soundtrack)",
          pic: 109951166611520340,
          picUrl: "https://p2.music.126.net/sE6ZQr5oxJa6GORHU6naZQ==/109951166611520337.jpg",
          pic_str: "109951166611520337"
        },
        id: 34880251,
        name: "City Of Stars (From \"La La Land\" Soundtrack)"
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
