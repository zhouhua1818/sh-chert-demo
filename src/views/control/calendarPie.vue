<script setup lang="ts">
import * as echarts from "echarts/core";
import { onMounted, reactive, ref } from "vue";
import CalendarPie from "./components/CalendarPie.vue";
defineOptions({
  name: ""
});

const loading = ref<boolean>(true);
const state = reactive({
  scatterData: [],
  dataList: [],
  pieRadius: 30,
  legendData: []
});

onMounted(() => {
  init();
});
const init = () => {
  function getVirtualData() {
    const date = +echarts.time.parse("2017-02-01");
    const end = +echarts.time.parse("2017-03-01");
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
        Math.floor(Math.random() * 10000)
      ]);
    }
    return data;
  }
  state.scatterData = getVirtualData();
  console.log(" state.scatterData: ", state.scatterData);
  state.dataList = state.scatterData.map((item, index) => {
    return {
      type: "pie",
      id: "pie-" + index,
      center: item[0],
      radius: state.pieRadius,
      coordinateSystem: "calendar",
      label: {
        formatter: "{c}",
        position: "inside"
      },
      data: [
        { name: "报警", value: Math.round(Math.random() * 24) },
        { name: "异常", value: Math.round(Math.random() * 24) },
        { name: "正常", value: Math.round(Math.random() * 24) }
      ]
    };
  });
  state.legendData = ["报警", "异常", "正常"];
  loading.value = false;
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <span>传感器统计数据日历饼图</span>
    </template>
    <el-skeleton animated :rows="7" :loading="loading">
      <template #default>
        <div class="flex-wrap">
          <div
            v-if="!loading"
            :style="{
              width: '100%'
            }"
          >
            <CalendarPie
              :scatterData="state.scatterData"
              :pieSeries="state.dataList"
              :pieRadius="state.pieRadius"
              :legendData="state.legendData"
            />
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<style lang="scss" scoped>
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
