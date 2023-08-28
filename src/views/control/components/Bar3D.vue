<script setup lang="ts">
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import "echarts-gl";
import { computed, onUnmounted, reactive, ref, watch, type Ref } from "vue";
const props = defineProps({
  data: {
    type: Array
  }
});

const state = reactive({ data: props.data });

const options = reactive({
  grid3D: {},
  tooltip: {},
  xAxis3D: {
    type: "category"
  },
  yAxis3D: {
    type: "category"
  },
  zAxis3D: {},
  visualMap: {
    max: 1e8,
    dimension: "Population"
  },
  dataset: {
    dimensions: [
      "Income",
      "Life Expectancy",
      "Population",
      "Country",
      { name: "Year", type: "ordinal" }
    ],
    source: state.data
  },
  series: [
    {
      type: "bar3D",
      // symbolSize: symbolSize,
      shading: "lambert",
      encode: {
        x: "Year",
        y: "Country",
        z: "Life Expectancy",
        tooltip: [0, 1, 2, 3, 4]
      }
    }
  ]
});
const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const bar3DChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, clear, showLoading, hideLoading, resize } = useECharts(
  bar3DChartRef as Ref<HTMLDivElement>,
  {
    theme
  }
);

setOptions(options, {
  name: "click",
  callback: params => {
    console.log("click", params);
  }
});

watch(
  () => props.data,
  async val => {
    await clear();
    state.data = val;
    options.dataset.source = val;
    showLoading();
    setTimeout(() => {
      setOptions(options);
      hideLoading();
    }, 1000);

    // console.log(getInstance());
  }
);
onUnmounted(() => {
  console.log("onUnmounted");
  clear();
});

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="bar3DChartRef" style="width: 100%; height: calc(100vh - 235px)" />
</template>
