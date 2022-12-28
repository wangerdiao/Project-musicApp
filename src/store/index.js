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
  },
  getters: {
  },
  mutations: {
    changeIspalyed(state,value) { //改变音乐的播放和暂停
      console.log('我成功改变了');
      state.isPlayed = value
      console.log(value);
      
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
