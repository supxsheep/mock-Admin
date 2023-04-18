<template>
  <div id="main"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import * as echarts from "echarts";

const props = defineProps(["lineData"]);
const { lineData } = toRefs(props);
onMounted(() => {
  console.log(lineData);

  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);

  var option;

  window.addEventListener("resize", function () {
    myChart.resize();
  });
  option = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        smooth: true,
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  option && myChart.setOption(option);
});
</script>

<style scoped lang="scss">
#main {
  padding: 0;
  margin: 0;
}
</style>