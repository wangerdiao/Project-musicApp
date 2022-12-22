<template>
    <TopNav/>
    <Swiper/>
</template>

<script>

import TopNav from '@/components/home/TopNav.vue'
import Swiper from '@/components/Swiper/Swiper.vue'
export default {
  name: 'HomeView',
  components: {
    TopNav,Swiper
  }
}
</script>
