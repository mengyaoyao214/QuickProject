<template>
  <div class="app">
    <router-view/>
    <tab-bar v-if="!route.meta.hideTabBar"/>
    <loading/>
    <!-- <tab-bar/> -->
  </div>

</template>

<script setup>

import TabBar from  "@/components/tab-bar/tab-bar.vue"
import loading from "./components/loading/loading.vue"
import { useRoute } from "vue-router";

const route = useRoute()
</script>


<style scoped>

</style>
