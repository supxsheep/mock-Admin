<template>
  <div class="dashboard">
    <el-row
      class="wrap1"
      :gutter="10"
    >
      <el-col
        :md="24"
        :lg="12"
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100,
          },
        }"
      >
        <UserInfo />
      </el-col>
      <el-col
        :md="24"
        :lg="12"
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100,
          },
        }"
      >
        <Weather @sendWeekWeather="getWeekWeather" />
      </el-col>
    </el-row>
    <el-row
      class="wrap2"
      :gutter="10"
      v-motion
      :initial="{
          y: 100,
        }"
      :enter="{
          y: 0,
          transition: {
            delay: 100,
          },
        }"
    >
      <el-col :span="24">
        <LineEchart
          style="width: 100%;height:300px;"
          :data="lineData"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import UserInfo from "@/components/dashboard/UserInfo.vue";
import Weather from "@/components/dashboard/Weather.vue";
import LineEchart from '@/components/dashboard/LineEchart'
import { onMounted, ref } from "@vue/runtime-core";

const weekWeather = ref([])
const lineData = ref([])
const getWeekWeather = (value) => {
  weekWeather.value = value
  lineData.value = weekWeather.value
}
onMounted(() => {
  getWeekWeather()
})
</script>

<style scoped lang="scss">
.dashboard {
  height: 100%;
  .el-row {
    display: flex;
    .el-col {
      margin: 10px 0;
    }
  }
  .wrap2 {
    margin-top: 20px;
    background-color: #ffffff;
  }
}
</style>
