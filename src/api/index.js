import requests  from "./request";
//获取轮播图的接口
export const reqGetBanner = () => requests({url:'/banner?type=2',method:'GET'})
//获取每日推荐歌单的接口
export const reqGetRecommandSong = () => requests({url:'/personalized?limit=10',method:'GET'})
//获取歌单详情信息的接口
export const reqGetPlayList = (id) => requests({url:`/playlist/detail?id=${id}`,method:'GET'})
//获取歌单详情歌曲的接口
export const reqGetMusicList = (id) =>   requests({url:`/playlist/track/all?id=${id}&limit=20&offset=1`,method:'GET'})
//获取歌曲歌词的接口
export const reqGetMusicLyric = (id) =>   requests({url:`/lyric?id=${id}`,method:'GET'})
//搜索关键字的接口
export const reqGetSearchMusic = (key) =>   requests({url:`/search?keywords=${key}`,method:'GET'})
//用户手机登录的接口  
export const reqGetLogin = (data) => requests({url:`/login/cellphone?phone=${data.phone}&password=${data.pwd}`,method:'GET'})

