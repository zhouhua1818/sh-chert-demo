<script setup lang="ts">
import { ref, computed, watch, type Ref } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
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
console.log("data: ", props.data);
const { isDark } = useDark();
console.log("pieces", props.pieces);

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
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
      data: props.timeData
    },
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
    series: props.data
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  }
);

watch(
  [
    () => props.showMarkLine,
    () => props.tabPosition,
    () => props.pieces,

    () => useAppStoreHook().getSidebarStatus
  ],
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="barChartRef" style="width: 100%; height: 800px" />
</template>
