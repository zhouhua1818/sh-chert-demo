<script setup lang="ts">
import { ref, computed, watch, type Ref, toRef } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import { xData, yData } from "@/utils/mockData";
const props = defineProps({
  showAxis: {
    type: Boolean
  },

  data: {
    type: Array
  }
});
console.log(props.data);
const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const showAxis = toRef(props.showAxis);

const heatmapChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(
  heatmapChartRef as Ref<HTMLDivElement>,
  {
    theme
  }
);

setOptions(
  {
    tooltip: {},
    xAxis: {
      show: showAxis.value,
      type: "category",
      data: xData
    },
    yAxis: {
      show: showAxis,
      type: "category",
      data: yData
    },
    visualMap: {
      min: 0,
      max: 1,
      calculable: true,
      realtime: false,
      inRange: {
        color: [
          "rgba(49, 54, 149, 0.8)",
          "rgba(69, 117, 180, 0.8)",
          "rgba(116, 173, 119, 0.8)",
          "rgba(171, 217, 223, 0.8)",
          "rgba(224, 243, 248, 0.8)",
          "rgba(255, 255, 191, 0.8)",
          "rgba(254, 224, 144, 0.8)",
          "rgba(253, 174, 97, 0.8)",
          "rgba(244, 109, 67, 0.8)",
          "rgba(215, 48, 39, 0.8)",
          "rgba(165, 0, 38, 0.8)"
        ]
      }
    },
    series: [
      {
        name: "Gaussian",
        type: "heatmap",
        data: props.data,
        emphasis: {
          itemStyle: {
            borderColor: "#333",
            borderWidth: 1
          }
        },
        progressive: 1000,
        animation: false
      }
    ]
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
    () => props.showAxis,
    () => props.tabPosition,
    () => useAppStoreHook().getSidebarStatus
  ],
  () => {
    // clear();
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="heatmapChartRef" style="width: 100%; height: 500px" />
</template>
