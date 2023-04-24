<template>
  <div class="container">
    <div class="aside">
      <SideBar />
    </div>
    <div class="main">
      <NavView />
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import SideBar from "@/components/sidebar/index.vue";
import NavView from "@/components/main/NavView";
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-x: hidden;
  
  .aside {
    height: 100vh;
  }
  .main {
    width: 100%;
    height: 100%;

    .view {
      width: 100%;
      padding: 0 20px;
      height: calc(100vh - 66px - 20px);
      transition: 0.4s;
      @include theme(background-color, "embedded-background-color");
      overflow: scroll;
      overflow-x: auto;
    }
  }
}
</style>
