<script setup lang="ts">
import { ref } from "vue";
import Gauge from "./components/Gauge.vue";
import { reactive } from "vue";
defineOptions({
  name: ""
});
const loading = ref<boolean>(false);
const list = reactive([
  { id: 1, count: 1, data: [60, 20, 80], tabPosition: "lr", loading: false },
  { id: 2, count: 3, data: [10, 20, 80], tabPosition: "lr", loading: false }
]);
const defaultColor = reactive<Array<[number, string]>>([
  [0.3, "#39b50c"],
  [0.7, "#37a2da"],
  [1, "#fd666d"]
]);

const handleChange = (value: string | number | boolean, item, type: string) => {
  item.loading = true;
  item[type] = value;
  const index = list.findIndex(a => a.id == item.id);
  list.splice(index, item);
  setTimeout(() => {
    item.loading = false;
  }, 10);
};

const colorChange = (value: string, index) => {
  loading.value = true;
  defaultColor[index][1] = value;
  setTimeout(() => {
    loading.value = false;
  }, 10);
};
</script>

<template>
  <el-row :gutter="24">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <span v-for="(item, i) in defaultColor" :key="i" class="ml-12">
        <span class="demonstration"
          >{{ i == 0 ? "安全色" : i == 1 ? "正常色" : "危险色" }}:</span
        >
        <el-color-picker v-model="item[1]" @change="colorChange($event, i)" />
      </span>
    </el-col>
    <el-col
      v-for="(item, i) in list"
      :key="i"
      :xs="24"
      :sm="24"
      :md="8"
      :lg="8"
      :xl="8"
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
          <span>Card name{{ i }}</span>
        </template>
        <el-skeleton animated :rows="7" :loading="loading">
          <template #default>
            <div class="flex-bt">
              <el-input-number
                v-model="item.count"
                :min="1"
                :max="4"
                @change="handleChange($event, item, 'count')"
              />
              <el-radio-group
                v-model="item.tabPosition"
                style="margin-bottom: 30px"
                @change="handleChange($event, item, 'tabPosition')"
              >
                <el-radio-button label="ud">上下</el-radio-button>
                <el-radio-button label="lr">左右</el-radio-button>
              </el-radio-group>
            </div>

            <div class="flex-wrap" v-if="!loading && !item.loading">
              <div
                :style="{
                  width:
                    item.tabPosition == 'lr' ? 100 / item.count + '%' : '100%',
                  background: `url('https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100') no-repeat`
                }"
                v-for="(a, j) in item.count"
                :key="j"
              >
                <Gauge
                  :color="defaultColor"
                  :count="item.count"
                  :tabPosition="item.tabPosition"
                  :data="item.data[j] || 0"
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
