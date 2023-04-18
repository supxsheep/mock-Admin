<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>天气信息</span>
      </div>
    </template>
    <div class="card-body">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="今天"
          name="first"
          class="card-todayWeather"
        >
          <WeatherToday :todayWeather="todayWeather" />
        </el-tab-pane>
        <el-tab-pane
          label="一周"
          name="second"
          class="card-weekWeather"
        >
          <template
            v-for="(item, index) in weekWeather"
            :key="index"
          >
            <WeatherItem
              :weaItem="item"
              :weaIndex="index"
            />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import type { TabsPaneContext } from "element-plus";
//导入天气api
import { getTodayWeatherApi, getWeekWeatherApi } from "@/api/weather";
//导入子组件
import WeatherItem from "@/components/dashboard/WeatherItem";
import WeatherToday from "@/components/dashboard/WeatherToday";

//今日气温
const todayWeather = ref({});
const getTodayWeather = async () => {
  todayWeather.value = await getTodayWeatherApi();
  console.log(todayWeather.value);
};
getTodayWeather();
//一周气温
const weekWeather = ref([]);
const emits = defineEmits("sendWeekWeather");
const getWeekWeather = async () => {
  weekWeather.value = await getWeekWeatherApi();
  // console.log(weekWeather.value);
  emits("send-week-weather", weekWeather.value);
};
getWeekWeather();

const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
};
</script>

<style scoped lang="scss">
@import "./common.scss";
.box-card {
  height: 380px;
  .card-body {
    .demo-tabs {
      .card-todayWeather,
      .card-weekWeather {
        display: flex;
        justify-content: space-between;
      }
    }
    .el-tabs {
      .el-tabs__item {
        @include theme("color", "theme-font-color");
      }
    }
  }
}
</style>
