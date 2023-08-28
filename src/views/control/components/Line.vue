<script setup lang="ts">
import { useAppStoreHook } from "@/store/modules/app";
import { computed, reactive, ref, watch, type Ref } from "vue";

import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";

const props = defineProps({
  showMarkLine: {
    type: Boolean
  },
  pieces: {
    type: Array
  },
  data: {
    type: Array
  },
  timeData: {
    type: Array
  }
});
const { isDark } = useDark();
const data = reactive(props.data);
const timeData = reactive(props.timeData);
const options = reactive({
  title: {
    text: "Beijing AQI",
    left: "1%"
  },
  tooltip: {
    trigger: "axis"
  },
  grid: {
    left: "5%",
    right: "15%",
    bottom: "10%"
  },
  xAxis: {
    data: timeData
  },
  legend: {},
  yAxis: {},
  toolbox: {
    right: 10,
    feature: {
      dataZoom: {
        yAxisIndex: "none"
      },
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      startValue: "2014-01-12"
    },
    {
      type: "inside"
    }
  ],
  visualMap: {
    top: 50,
    right: 10,
    pieces: props.pieces,
    outOfRange: {
      color: "#409EFF"
    }
  },
  series: data
});

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(options, {
  name: "click",
  callback: params => {
    console.log("click", params);
  }
});

watch(props.data, val => {
  console.log("data: ", val);
  options.series = val;
});

watch(
  [
    () => props.showMarkLine,
    // () => props.tabPosition,
    () => props.pieces,
    () => useAppStoreHook().getSidebarStatus
  ],
  () => {
    console.log("timeDataChange");
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="barChartRef" style="width: 100%; height: 800px" />
</template>
