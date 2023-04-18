<template>
  <div class="today">
    <div class="top">
      <div>{{ todayWeather.date + " " + todayWeather.week }}</div>
      <div>{{ todayWeather.tip }}</div>
    </div>
    <div class="cont">
      <div
        class="cont-left"
        v-motion
        :initial="{
          scale: 0,
          y: 100,
        }"
        :enter="{
          scale: 1,
          y: 0,
          transition: {
            delay: 600,
          },
        }"
      >
        <div class="component">
          <template
            v-for="(item, index) in weatherIcon.filter(
              (item) => todayWeather.type == item.type
            )"
            :key="index"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.type"
              placement="top-start"
            >
              <span
                class="icon-type"
                v-html="item.icon"
              ></span>
            </el-tooltip>
          </template>
          <div class="type">{{ todayWeather.type }}</div>
        </div>
        <div class="deg">{{ todayWeather.low + "~" + todayWeather.high }}</div>
        <div class="day-night">
          <div class="day">
            <el-divider>白天</el-divider>
            <div>{{ todayWeather.fengli + " " + todayWeather.fengxiang }}</div>
          </div>
          <div class="night">
            <el-divider>夜晚</el-divider>
            <template v-if="todayWeather.night">
              <div>
                {{
                  todayWeather.night.fengli + " " + todayWeather.night.fengxiang
                }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div
        class="cont-right"
        id="air"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from "vue";
import * as echarts from "echarts";

//天气
const props = defineProps(["todayWeather"]);
const todayWeather = ref({});

//空气指数
var chartDom, myChart;
const pieData = ref([]);
const arr = ref([]);
var option = {
  title: {
    text: "空气指数",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    top: "bottom",
    data: arr,
  },
  series: [
    {
      name: "Area Mode",
      type: "pie",
      radius: [10, 50],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 10,
      },
      data: pieData,
    },
  ],
};

watch(
  () => props.todayWeather,
  (newV, oldV) => {
    console.log("newV,oldV: ", newV, oldV);
    todayWeather.value = newV;

    for (const key in newV.air) {
      arr.value.push(key);
      pieData.value.push({
        name: key,
        value: newV.air[key],
      });
    }

    chartDom = document.getElementById("air");
    myChart = echarts.init(chartDom);
    option.data = arr.value;
    option.series[0].data = pieData.value;
    option && myChart.setOption(option);
  }
);

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
.today {
  width: 100%;
  & ::v-deep .top {
    width: 100%;
    height: 30px;
    display: flex;
    padding: 0 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    align-items: center;
    @include theme("background-color", "nowdays-background-color");

    justify-content: space-between;
  }
  .cont {
    display: flex;
    justify-content: space-between;
    .cont-left {
      width: 40%;
      display: flex;
      flex-direction: column;
      .component {
        display: flex;
        align-items: center;
        .icon-type {
          display: inline-block;
          font-size: 64px;
          margin: 0 30px;
        }
        .type {
          font-size: 32px;
        }
      }
      .deg {
        margin: 5px 0;
        margin-left: 30px;
      }
      .day-night {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .day,
        .night {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
    & ::v-deep .el-divider {
      transition: 0.2s;
      @include theme(border-color, "basic-border-color");
      .el-divider__text {
        transition: 0.2s;
        @include theme(background-color, "drawer-background-color");
        h3 {
          transition: 0.2s;
          @include theme(color, "theme-font-color");
        }
      }
    }
    .cont-right {
      width: 300px;
      height: 200px;
    }
  }
}
</style>
