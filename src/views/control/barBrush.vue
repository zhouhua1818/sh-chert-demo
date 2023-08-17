<script setup lang="ts">
import { ref, computed } from "vue";
import BarBrush from "./components/BarBrush.vue";
import { reactive } from "vue";
defineOptions({
  name: ""
});
const data1 = [120, 132, 101, 134, 90, 230, 210];
const data2 = [862, -22, 964, 1026, 34, 1600, 1570];
const data3 = [458, 30, 55, 134, 90, 230, 210];
const data4 = [862, -59, 964, 1026, 1679, -30, 1570];
const loading = ref<boolean>(false);
// const count = ref<number>(2);
const content = reactive({
  count: 2,
  loading: false,
  data: [
    {
      name: "data1",
      type: "bar",
      stack: "Ad",
      emphasis: {
        focus: "series"
      },
      label: {
        show: true
      },
      itemStyle: {
        color: "red" // 第一个柱子的颜色为红色
      },
      data: data1
    },

    {
      name: "data2",
      type: "bar",
      stack: "Ad",
      data: data2,
      itemStyle: { color: "" },
      emphasis: {
        focus: "series"
      },
      label: {
        show: true
      },
      markLine: {
        lineStyle: {
          type: "dashed"
        }
        // data: [[{ type: 'min' }, { type: 'max' }]]
      }
    },
    {
      name: "data3",
      type: "bar",
      stack: "two",
      itemStyle: { color: "" },
      emphasis: {
        focus: "series"
      },
      label: {
        show: true
      },
      data: data3
    },

    {
      name: "data4",
      type: "bar",
      stack: "two",
      data: data4,
      itemStyle: { color: "" },
      emphasis: {
        focus: "series"
      },
      label: {
        show: true
      },
      markLine: {
        lineStyle: {
          type: "dashed"
        }
        // data: [[{ type: 'min' }, { type: 'max' }]]
      }
    }
  ]
});
const defaultColor = reactive<Array<string>>([
  "#39b50c",
  "#37a2da",
  "#fd666d",
  "#234567"
]);

const newData = computed(() => {
  const newArr = [];
  content.data.forEach((item, i) => {
    item.itemStyle.color = defaultColor[i];
    newArr.push(item);
  });
  const a = newArr.slice(0, content.count);
  console.log("newArr: ", a);

  return a;
});

const handleChange = (value, item) => {
  item.loading = true;
  item.count = value;
  setTimeout(() => {
    item.loading = false;
  }, 10);
};

const colorChange = (value, index) => {
  loading.value = true;
  defaultColor[index] = value;
  setTimeout(() => {
    loading.value = false;
  }, 10);
};

// const setColor = () => {
//   console.log('setColor: ', content.data);
//   content.data.forEach((item, i) => {
//     item.itemStyle.color = defaultColor[i]
//   });
// }

// onMounted(() => {
//   setColor();
// });
</script>

<template>
  <el-row :gutter="24">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <span v-for="(item, i) in newData" :key="i" class="ml-12">
        <span class="demonstration">{{ newData[i].name + "色" }}:</span>
        <el-color-picker
          v-model="defaultColor[i]"
          @change="colorChange($event, i)"
        />
      </span>
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="24"
      :lg="24"
      :xl="24"
      class="mb-[18px]"
      v-motion
      :initial="{
        opacity: 0,
        y: 100
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 200
        }
      }"
    >
      <el-card shadow="never">
        <template #header>
          <span>离层所用</span>
        </template>
        <el-skeleton animated :rows="7" :loading="loading">
          <template #default>
            <div class="flex-bt">
              <el-input-number
                v-model="content.count"
                :min="2"
                :step="2"
                :max="4"
                @change="handleChange($event, content)"
              />
            </div>

            <div class="flex-wrap">
              <div
                v-if="!loading && !content.loading"
                :style="{
                  width: '100%'
                }"
              >
                <BarBrush
                  :color="defaultColor"
                  :count="content.count"
                  :data="newData"
                />
              </div>
            </div>
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
