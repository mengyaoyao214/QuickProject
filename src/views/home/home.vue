<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories/>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <home-content/>
  
    
  </div>
</template>

<script setup>
  import { onActivated, onMounted, onUnmounted, ref,watch } from 'vue';
  import HomeNavBar from './cpns/home-nav-bar.vue';
  import HomeSearchBox from './cpns/home-search-box.vue';
  import hyRequest from "@/services/request/index";
  import useHomeStore from '@/stores/modules/home';
  import homeCategories from './cpns/home-categories.vue';
  import homeContent from './cpns/home-content.vue';
  import useScroll from '@/hooks/useScroll';
  import searchBar from '@/components/search-bar/search-bar.vue';

  //发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotStuggestData()
  homeStore.fetchCategoriesData()
  //let currentPage = 1
  homeStore.fetchHouselistData()
  
 
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})


//搜索框显示的控制
const isShowSearchBar = ref(false)
watch(scrollTop,(newTop) => {
  isShowSearchBar.value = newTop > 350
})
</script>

<style lang="less" scoped>
  .banner{
    img{
      width: 100%;
    }
  }
.btn{
  height: 100px;
  margin-top: 20px;
}

.search-bar{
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>