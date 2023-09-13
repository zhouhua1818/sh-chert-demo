<script setup lang="ts">
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import { computed, ref, watch, type Ref } from "vue";

const props = defineProps({
  color: {
    type: Array
    // default: "canvas"
  },
  image: {
    type: String
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
type GaugeColorStop = [number, string];

const color = ref(props.color) as unknown as GaugeColorStop[];
const image = ref(props.image) as unknown as string;
const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
    toolbox: {
      feature: {
        saveAsImage: {}
      }
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
            width: 100,
            height: 400
          }
        }
      ]
    },
    series: [
      {
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 10,
            color
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
// setOptions(

// }
// {
//   name: "click",
//   callback: params => {
//     console.log("click", params);
//   }
// );

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
  <div ref="barChartRef" style="width: 100%; height: 250px" />
</template>
