<template>
<div class="top">
  <svg class="icon" aria-hidden="true" @click="$router.push('/')">
            <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
  </svg>
</div>
<div class="content">
  <img :src="user.info.avatarUrl" alt="">
  <h1>{{ user.info.nickname }}</h1>
</div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, ref } from '@vue/reactivity'
import { onMounted } from 'vue';
export default {
    name:'userInfo',
    setup() {
      const store = useStore()
      const app = ref('')
      let user = reactive({
        info:{}
      })
      onMounted(() => {
        user.info = JSON.parse(localStorage.getItem('userInfo'))
        console.log(user.info);
        
      })
      return {
        app,
        user,
      }
    }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 3rem;
    border-radius: 50%;
  }
}
</style>