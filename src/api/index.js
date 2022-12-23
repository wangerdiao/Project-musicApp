import requests  from "./request";
//获取轮播图的接口
export const reqGetBanner = () => requests({url:'/banner?type=2',method:'GET'})
//获取每日推荐歌单的接口
export const reqGetRecommandSong = () => requests({url:'/personalized?limit=10',method:'GET'})