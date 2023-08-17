<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import Line from "./components/Line.vue";
import { getLineList } from "@/api/chertList";
import dialogForm from "./components/LineDialogForm.vue";
defineOptions({
  name: "LinePage"
});

const loading = ref<boolean>(true);
const showMarkLine = ref<boolean>(true);
const dataList = reactive([]);
let timeData = reactive<string>([]);
const pieces = reactive([]);
const markLine = reactive({
  data: [
    {
      yAxis: 250 // 分割线的位置
    }
  ]
});
// 弹窗
const formDialogVisible = ref(false);
// 显示隐藏辅助线
watch(showMarkLine, (newVal, oldVal) => {
  loading.value = true;
  console.log("值改变了", newVal, oldVal);
  dataList[0].markLine = newVal ? markLine : {};
  console.log("dataList watch", dataList);
  setTimeout(() => {
    loading.value = false;
  }, 10);
});
// 获取数据
const getLineListData = async () => {
  try {
    const { data } = await getLineList();
    console.log("data: ", data);
    data.list.forEach(item => {
      const obj = {
        name: item.name,
        type: "line",
        data: item.data
      };
      dataList.push(obj);
    });
    dataList[0].markLine = markLine;
    timeData = data.list[0].data.map(item => item[0]);
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

const handleChange = value => {
  showMarkLine.value = value;
};

const submitForm = pieces => {
  console.log("submitForm: ", pieces);
};

onMounted(() => {
  getLineListData();
});
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <span>曲线控件</span>
      </template>
      <el-skeleton animated :rows="7" :loading="loading">
        <template #default>
          <div class="flex items-center">
            <span>
              显示辅助线：<el-switch
                v-model="showMarkLine"
                @change="handleChange"
              />
            </span>

            <el-button
              type="primary"
              size="small"
              @click="formDialogVisible = true"
            >
              区间及颜色设置
            </el-button>
          </div>

          <div class="flex-wrap">
            <div
              v-if="!loading"
              :style="{
                width: '100%'
              }"
            >
              <Line
                :showMarkLine="showMarkLine"
                :timeData="timeData"
                :data="dataList"
                :pieces="pieces"
              />
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-card>

    <dialogForm v-model:visible="formDialogVisible" @submit-form="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
