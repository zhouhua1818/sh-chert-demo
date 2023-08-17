<script setup lang="ts">
import { ref, computed, watch, type Ref, toRef } from "vue";
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
  tabPosition: {
    type: String
  },
  data: {
    type: Number
  }
});

const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const color = toRef(props.color);

const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
    series: [
      {
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 10,
            color: color.value
          }
        },
        pointer: {
          itemStyle: {
            color: "auto"
          }
        },
        axisTick: {
          distance: -10,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2
          }
        },
        splitLine: {
          distance: -10,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2
          }
        },
        axisLabel: {
          color: "inherit",
          distance: props.count > 2 ? 16 : 20,
          fontSize: props.count > 2 ? 10 : 14
        },
        detail: {
          valueAnimation: true,
          formatter: "{value} km/h",
          fontSize: props.count > 2 ? 14 : 20,
          color: "inherit"
        },
        data: [
          {
            value: props.data
          }
        ]
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
