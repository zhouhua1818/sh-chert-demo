<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import Line from "./components/Line.vue";
import { getLineList } from "@/api/chertList";
import dialogForm from "./components/LineDialogForm.vue";
import { PiecesItemProps } from "./utils/types";
let now = new Date(2015, 2, 24);
const oneDay = 24 * 3600 * 1000;
defineOptions({
  name: "LinePage"
});

const INITIAL_DATA = {
  pieces: [
    { key: 1, gt: 0, lte: 50, color: "#93CE07" },
    { key: 2, gt: 50, lte: 100, color: "#FBDB0F" },
    { key: 3, gt: 100, lte: 150, color: "#FC7D02" },
    { key: 4, gt: 150, lte: 200, color: "#FD0100" }
  ]
};

const loading = ref<boolean>(true);
const showMarkLine = ref<boolean>(true);
const dataList = reactive([]);
let timeData = reactive<string>([]);
let formData = reactive<{
  pieces: PiecesItemProps[];
}>({ ...INITIAL_DATA });
const markLine = reactive({
  lineStyle: {
    color: "#409EFF",
    width: 1,
    type: "solid"
  },
  data: [
    {
      yAxis: 250 // 分割线的位置
    }
  ]
});
const num = ref<number>(markLine.data[0].yAxis); //辅助线数值
// 弹窗
const formDialogVisible = ref(false);
// 显示隐藏辅助线
watch([showMarkLine, markLine], newVal => {
  loading.value = true;
  dataList[0].markLine = newVal ? markLine : {};

  setTimeout(() => {
    loading.value = false;
  }, 10);
});

// watch(num, val => {
//   markLine.data[0].yAxis = val;
// });
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

const changeMarkLine = (value, type: string) => {
  console.log(value);
  if (type == "yAxis") {
    num.value = value.target.value;
    markLine.data[0].yAxis = num;
  } else {
    markLine.lineStyle[type] = value;
  }
};

// 新增区间
const addPieces = () => {
  const addFormItem = {
    key: Date.now(),
    gt: 0,
    lte: 1,
    color: "#409EFF"
  };
  formData.pieces?.push(addFormItem);
};

// 删除区间
const delPieces = item => {
  console.log("handledelPieces: ", item);
  const index = formData.pieces.indexOf(item);
  if (index !== -1) {
    formData.pieces.splice(index, 1);
  }
};

const submitForm = data => {
  console.log("submitForm: ", data);
  loading.value = true;
  formData = data;
  setTimeout(() => {
    loading.value = false;
  }, 10);
};

const randomData = () => {
  now = new Date(+now + oneDay);
  return [
    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-"),
    100
  ];
};

onMounted(() => {
  getLineListData();

  setInterval(function () {
    for (let i = 0; i < 1; i++) {
      dataList[0].data.shift();
      dataList[0].data.push(randomData());
      dataList[1].data.shift();
      dataList[1].data.push(randomData());
    }
    console.log("123", dataList);
    timeData = dataList[0].data.map(item => item[0]);
  }, 10000);
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
          <div class="flex items-center justify-between btn-group">
            <span>
              显示辅助线：<el-switch
                v-model="showMarkLine"
                @change="handleChange"
              />
            </span>
            <div v-if="showMarkLine" class="flex items-center justify-between">
              <span class="mr-1">
                数值：<el-input-number
                  :min="1"
                  controls-position="right"
                  v-model="num"
                  @blur="changeMarkLine($event, 'yAxis')"
                  size="small"
              /></span>
              <span class="mr-1">
                颜色：<el-color-picker
                  v-model="markLine.lineStyle.color"
                  @change="changeMarkLine($event, 'color')"
                  size="small"
              /></span>
              <span class="mr-1">
                粗细：<el-input-number
                  :min="1"
                  controls-position="right"
                  v-model="markLine.lineStyle.width"
                  @change="changeMarkLine($event, 'width')"
                  size="small"
              /></span>
              <span class="mr-1">
                <el-radio-group
                  v-model="markLine.lineStyle.type"
                  label="线性："
                  size="small"
                  @change="changeMarkLine($event, 'type')"
                >
                  <el-radio-button label="solid">实线</el-radio-button>
                  <el-radio-button label="dashed">虚线</el-radio-button>
                </el-radio-group>
              </span>
            </div>

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
                :pieces="formData.pieces"
              />
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-card>

    <dialogForm
      v-model:visible="formDialogVisible"
      :data="formData"
      @submit-form="submitForm"
      @add-pieces="addPieces"
      @del-pieces="delPieces"
    />
  </div>
</template>

<style lang="scss" scoped>
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.btn-group {
  width: 900px;
}
</style>
