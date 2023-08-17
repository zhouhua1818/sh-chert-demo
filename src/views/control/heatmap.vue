<script setup lang="ts">
import { ref } from "vue";
import Heatmap from "./components/Heatmap.vue";
import { reactive } from "vue";
defineOptions({
  name: ""
});
import { data } from "@/utils/mockData";
console.log("data: ", data);

const loading = ref<boolean>(false);
const showAxis = ref<boolean>(true);
const dataList = reactive(data);

const handleChange = value => {
  console.log("value: ", value);
  loading.value = true;
  showAxis.value = value;
  setTimeout(() => {
    loading.value = false;
  }, 10);
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <span>钻孔所用热力图</span>
    </template>
    <el-skeleton animated :rows="7" :loading="loading">
      <template #default>
        <div class="flex items-center">
          显示坐标轴：<el-switch v-model="showAxis" @change="handleChange" />
        </div>

        <div class="flex-wrap">
          <div
            v-if="!loading"
            :style="{
              width: '100%',
              background: `url('https://newoss.zhulong.com/forum/201911/02/44/212144ryntsk1dhmogq6kl.jpg') no-repeat`,
              backgroundPosition: '1px -40px'
            }"
          >
            <Heatmap :showAxis="showAxis" :data="dataList" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<style lang="scss" scoped>
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
