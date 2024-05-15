<template>
  <div class="tab-bar">
    <!-- 通过v-model绑定了index -->
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
        <!-- #default: 这是默认插槽。当父组件没有指定为哪个具名插槽提供内容时，其提供的内容会填充到默认插槽中 -->
          <template #default><span>
            {{item.text}}</span>
          </template>
          <!-- #icon: 这是一个具名插槽，名为 "icon"。任何父组件想要为这个插槽提供内容，都会使用 <template v-slot:icon> 或简写为 <template #icon> -->
          <!-- 具名插槽和默认插槽的主要区别在于：具名插槽有名字，可以指定内容放的位置；而默认插槽没有名字，内容会自动放在那里 -->
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>

      </van-tabbar-item>

      </template>
     
    </van-tabbar>

    <!-- <template v-for="(item, index) in tabbarData">
      <div class="tab-bar-item" :class="{active: currentIndex === index}" @click="itemClick(index)" >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>

      </div>
    </template>  -->
  </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar';
import { getAssetURL } from '@/utils/load_assets';
import { ref, watch ,watchEffect,computed} from 'vue';
import { useRouter } from 'vue-router';

const route = useRouter()
const currentIndex = ref(0)
console.log()
//监听路由改变时，找到对应的索引，设置currentIndex
watch(route.currentRoute, (newRoute) => {
  
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index !== -1) {  
    currentIndex.value = index;  
  }  
  
})


// watchEffect(() => {  
//   const currentRoute = route.currentRoute.value;  
//   const index = tabbarData.findIndex(item => item.path === currentRoute.path);  
//   if (index !== -1) {  
//     currentIndex.value = index;  
//   }  
// });  

</script>

<style lang="less" scoped>  
.tab-bar {  
  img{
    height: 26px;
  }
  
}  
</style>