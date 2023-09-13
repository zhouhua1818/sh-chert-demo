<script setup lang="ts">
import dayjs from "dayjs";
import { onMounted, reactive, ref } from "vue";
import Calendar from "./components/Calendar.vue";
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
  getDaysArrayByMonth();
});
// 获取当前月份
const getDaysArrayByMonth = () => {
  //获取当前月份包含的天数
  let daysInMonth = dayjs().daysInMonth();
  const arrDays = [];

  //循环获取月份里的日期
  while (daysInMonth) {
    const current = dayjs().date(daysInMonth);
    arrDays.push(current);
    daysInMonth--;
  }

  arrDays.forEach(item => item.format("YYYY-MM-DD"));
  for (let index = 0; index < arrDays.length; index++) {
    arrDays[index] = arrDays[index].format("YYYY-MM-DD");
  }
  return arrDays;
};

const init = () => {
  const arr = getDaysArrayByMonth();
  console.log("arrDays: ", arr);
  const data = [];
  for (let i = 0; i < arr.length; i++) {
    data.push([arr[i], Math.floor(Math.random() * 10000)]);
  }

  state.scatterData = data;
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
            <Calendar
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
