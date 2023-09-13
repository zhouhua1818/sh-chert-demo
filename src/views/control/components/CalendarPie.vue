<script setup lang="ts">
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import * as echarts from "echarts/core";
import { computed, reactive, ref, watch, type Ref } from "vue";
const props = defineProps({
  scatterData: {
    type: Array
  },
  legendData: { type: Array },
  pieSeries: {
    type: Array
  }
});
const state = reactive({
  cellSize: [80, 80]
});

const pieSeries = ref(props.pieSeries);
console.log("pieSeries: ", pieSeries.value);
const scatterData = ref(props.scatterData);
const legendData = ref(props.legendData);
const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const heatmapChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(
  heatmapChartRef as Ref<HTMLDivElement>,
  {
    theme
  }
);

setOptions(
  {
    color: [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc"
    ],
    tooltip: {},
    legend: {
      data: legendData.value,
      bottom: 20
    },
    calendar: {
      top: "middle",
      left: "center",
      orient: "vertical",
      cellSize: state.cellSize,
      yearLabel: {
        show: false,
        fontSize: 30
      },
      dayLabel: {
        margin: 20,
        firstDay: 1,
        nameMap: [
          "周日",
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六",
          "周日"
        ]
      },
      monthLabel: {
        show: false
      },
      range: ["2017-02"]
    },
    series: [
      {
        id: "label",
        type: "scatter",
        coordinateSystem: "calendar",
        symbolSize: 0,
        label: {
          show: true,
          formatter: params => {
            return echarts.time.format(params.value[0], "{dd}", false);
          },
          offset: [-state.cellSize[0] / 2 + 10, -state.cellSize[1] / 2 + 10],
          fontSize: 14
        },
        data: scatterData.value
      },
      ...pieSeries.value
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
  [() => useAppStoreHook().getSidebarStatus, () => props.legendData],
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="heatmapChartRef" style="width: 100%; height: 500px" />
</template>
