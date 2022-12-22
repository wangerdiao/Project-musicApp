import requests  from "./request";
//获取轮播图的接口
export const reqGetBanner = () => requests({url:'/banner?type=2',method:'GET'})