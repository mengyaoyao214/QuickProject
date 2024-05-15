<template>
  <div class="city top-page">
    <!-- 1.搜索框 -->
    <div class="top">
      <van-search
      v-model="searchValue" 
      placeholder="城市区域位置"
      shape="round"
      show-action
      @cancel="cancelClick"
      /> 
      <!-- 2.tab的切换 -->
      <!-- 记录点击的是哪个标签 -->
    <van-tabs v-model:active="tabActive" color="#ff9854"> 
      <template v-for="(value, key, index) in allCities" :key="key">
        <van-tab :title="value.title" :name="key"></van-tab>
      </template> 
    </van-tabs>

    </div class="city">
    <div class="content">
      <template v-for="(value, key, index) in allCities">
       <city-group v-show="tabActive === key" :group-data="value"/> 
      </template>
      
    </div>
     
  </div>
</template>

<script setup>
import { ref ,computed} from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

import CityGroup from './cpns/city-group.vue';

const router = useRouter()

//搜索框功能
const searchValue = ref("")
const cancelClick = () =>{
  router.back()
}

//tab的切换
const tabActive = ref()

/**
 * 这个位置发送网络请求有两个缺点：
 * 1.如果网络请求太多， 那么页面组件中就包含大量对于网络请求和数据的处理逻辑
 * 2.如果页面封装了很多的子组件，子组件需要这些数据，必须一步步将数据传递过去
 */
//网络请求：
// const allCity = ref()
// getCityAll().then(res =>{
//   allCity.value = res.data
// })

//从Store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()//发送网络请求
const { allCities } = storeToRefs(cityStore)

//目的：获取选中标签后的数据
//1.获取正确的key,将tab中绑定的tabAction正确绑定
//2.根据key从allCitied获取数据，默认直接获取的数据不是响应式的，所以碧血包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value])




</script>
  
<style lang="less" scoped>
.city{

  //top固定定位
  // .top{
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  // .content{
  //   margin-top: 98px;
  // }

  .top{
    position: relative;
    z-index: 9;
  }
  //布局滚动
  .content{
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}

</style>