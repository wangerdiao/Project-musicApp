<template>
   <div>
     <TopNav/>
    <Swiper/>
    <IconList/>
    <MusicList/>
   </div>
</template>

<script>

import TopNav from '@/components/home/TopNav.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
import Swiper from '@/components/Swiper/Swiper.vue'
export default {
  name: 'HomeView',
  components: {
    TopNav,Swiper,IconList,MusicList
  }
}
</script>
