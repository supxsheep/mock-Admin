<template>
  <div class="weather-item" :class="{ nowDay: weaIndex == 0 }">
    <div class="week">{{ weaItem.week }}</div>
    <div class="type">
      <template
        v-for="(item, index) in weatherIcon.filter((item) =>
          weaItem.type.includes(item.type)
        )"
        :key="index"
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="item.type"
          placement="top-start"
        >
          <span v-html="item.icon"></span>
        </el-tooltip>
      </template>
    </div>
    <div class="high">{{ weaItem.high }}</div>
    <div class="low">{{ weaItem.low }}</div>
    <div class="low">{{ weaItem.fengxiang }}</div>
    <div class="low">{{ weaItem.fengli }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
const { weaItem, weaIndex } = defineProps(["weaItem", "weaIndex"]);

const weatherIcon = ref([
  {
    type: "晴",
    icon: '<i class="ri-sun-line"></i>',
  },
  {
    type: "阴",
    icon: '<i class="ri-cloudy-line"></i>',
  },
  {
    type: "闪电",
    icon: '<i class="ri-flashlight-line"></i>',
  },
  {
    type: "多云",
    icon: '<i class="ri-cloudy-2-line"></i>',
  },
  {
    type: "雾",
    icon: '<i class="ri-foggy-line"></i>',
  },
  {
    type: "雨",
    icon: '<i class="ri-rainy-line"></i>',
  },
  {
    type: "雪",
    icon: '<i class="ri-snowy-line"></i>',
  },
  {
    type: "风",
    icon: '<i class="ri-windy-line"></i>',
  },
]);
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.weather-item {
  height: 188px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(243, 240, 234);
  @include theme("background-color", "week-item-background-color");
  padding: 10px;
  cursor: pointer;
  border-radius: 15px;
}
.nowDay {
  @include theme("background-color", "week-item-first-background-color");
}
</style>
