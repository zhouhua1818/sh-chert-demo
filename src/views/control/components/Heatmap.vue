<script setup lang="ts">
import { useAppStoreHook } from "@/store/modules/app";
import { xData, yData } from "@/utils/mockData";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import { computed, onMounted, reactive, ref, watch, type Ref } from "vue";
const props = defineProps({
  showAxis: {
    type: Boolean
  },
  image: {
    type: String
  },
  data: {
    type: Array
  }
});
const { isDark } = useDark();
const image = ref(props.image) as unknown as string;
const data = ref(props.data);
const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});
const width = ref(0);
const height = ref(0);
const showAxis = ref(props.showAxis);

const heatmapChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(
  heatmapChartRef as Ref<HTMLDivElement>,
  {
    theme
  }
);
const options = reactive({
  tooltip: {},
  xAxis: {
    show: showAxis.value,
    type: "category",
    data: xData
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  yAxis: {
    show: showAxis.value,
    type: "category",
    data: yData
  },
  graphic: {
    elements: [
      {
        type: "image", // 图形元素类型
        id: "logo", // 更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。
        right: "center", // 根据父元素进行定位 （居中）
        bottom: "0%", // 根据父元素进行定位   （0%）, 如果bottom的值是 0，也可以删除该bottom属性值。
        z: 0, // 层叠
        bounding: "all", // 决定此图形元素在定位时，对自身的包围盒计算方式
        style: {
          image,
          width: width.value,
          height: height.value
        }
      }
    ]
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
      data: data.value,
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
});
setOptions(options, {
  name: "click",
  callback: params => {
    console.log("click", params);
  }
});

onMounted(() => {
  width.value = heatmapChartRef.value.clientWidth;
  height.value = heatmapChartRef.value.clientHeight;
  window.onresize = () => {
    return (() => {
      width.value = heatmapChartRef.value.clientWidth;
      height.value = heatmapChartRef.value.clientHeight;
      console.log(width.value, height.value);
    })();
  };
});

watch(
  [() => width.value, () => height.value],
  val => {
    console.log("val: ", val);
    options.graphic.elements[0].style.width = val[0];
    options.graphic.elements[0].style.height = val[1];
    setOptions(options);
  },
  {
    immediate: true
  }
);

watch([() => props.showAxis, () => useAppStoreHook().getSidebarStatus], () => {
  // clear();
  delay(600).then(() => resize());
});
</script>

<template>
  <div ref="heatmapChartRef" style="width: 100%; height: 500px" />
</template>
