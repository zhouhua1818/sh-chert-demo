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
  color: {
    type: Array
    // default: "canvas"
  },
  count: {
    type: Number
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

const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      formatter: function (params) {
        console.log(params);
        let result = "";
        result +=
          params[0].axisValue +
          "</br>" +
          "一组差值：" +
          Math.abs(params[0].data - params[1].data);
        params.length > 2 &&
          (result +=
            "</br>" + "二组差值：" + Math.abs(params[2].data - params[3].data));
        return result;
      }
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
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
    () => props.color,
    () => props.count,
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
  <div ref="barChartRef" style="width: 100%; height: 300px" />
</template>
