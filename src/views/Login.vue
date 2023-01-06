<template>
  <div class="login">
       <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
        </svg>
      <div class="top">
        <img src="@/assets/music.jpg" alt="">
      </div>
      <div class="content">
       <input type="text" placeholder="手机号：" v-model="phone">
        <input type="password" placeholder="密码：" v-model="pwd">
      </div>
      <div class="foot">
        <button @click="login"><span>登录</span></button>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import {  useStore } from 'vuex';
import {useRouter} from'vue-router'
export default {
    name:'Login',
    setup() {
      const store = useStore()
      const router = useRouter()
      let phone = ref('')
      let pwd = ref('')
      const getLogin = (value) => {return store.dispatch('getLogin',value)}
      const updateIsLogin = (value) => {return store.commit('updateIsLogin',value)}
      const updateToken = (value) => {return store.commit('updateToken',value)}
      const userInfo = (value) => {return store.commit('userInfo',value)}
      async function login() {
        let result = await getLogin({phone:phone.value,pwd:pwd.value})
        console.log(result);
        if(result.code==200) {
          router.push({path:'/userInfo'})
          updateIsLogin(true)
          updateToken(result.token)
          userInfo(result.profile)
        }else {
          alert('手机号或者密码错误')
        }
      }
      return {
        phone,
        pwd,
        login,
        getLogin,
        updateIsLogin,
        updateToken,
        userInfo,
      }
    }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(41, 37, 65);
  position: relative;
  .icon {
    position: absolute;
    left: 10px;
    width: .8rem;
    height: .7rem;
  }
  .top {
    margin-top: 25%;
    text-align: center;
    img {
      width: 50%;
      border-radius: 50% ;
    }
  }
  .content {
    width: 100%;
    margin-top: .6rem;
    text-align: center;
    input{
      margin-top: .2rem;
      width: 90%;
      height: .6rem;
      border: none;
      border-bottom: 1px solid gray;
      background-color: rgb(41, 37, 65);
    }
  }
  .foot {
    margin-top: 10%;
    width: 100%;
    text-align: center;
    button {
      width: 90%;
      height: .6rem;
      background-color: black;
      border: none;
      border-radius: 10px;
    }
    span{
      color:#fff;
      font-size:17px;
    }
  }
}
</style>