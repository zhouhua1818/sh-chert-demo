<script setup lang="ts">
import { getLine3DList } from "@/api/chartList";
import { onMounted, reactive, ref } from "vue";
import Bar3D from "./components/Bar3D.vue";

defineOptions({
  name: "Line3DPage"
});

const loading = ref<boolean>(true);
const state = reactive({
  originList: [],
  dataList: [],
  checkList: []
});

// 获取数据
const getData = async () => {
  loading.value = true;
  try {
    const { data } = await getLine3DList();
    state.dataList = data.list;
    state.originList = data.list;
    const checkArr = data.list.slice(1).map(item => {
      const obj = {
        name: item[3],
        value: true
      };
      return obj;
    });
    state.checkList = [...new Set(checkArr.map(t => JSON.stringify(t)))].map(
      s => JSON.parse(s)
    );
    console.log("checkList: ", state.checkList);
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

const checkChange = (value, i) => {
  // loading.value = true;
  console.log("checkChange: ", value, i);
  state.checkList[i].value = value;
  const arr = state.checkList.filter(item => !item.value).map(e => e.name);
  state.dataList = state.originList.filter(e => !arr.includes(e[3]));
  console.log("state.dataList: ", state.dataList);
  // setTimeout(() => {
  //   loading.value = false;
  // }, 100);
};

onMounted(async () => {
  await getData();
});
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <span>3DBar</span>
      </template>
      <el-skeleton animated :rows="7" :loading="loading">
        <template #default>
          <div class="flex-wrap">
            <div
              :style="{
                width: '100%'
              }"
            >
              <span v-for="(item, i) in state.checkList" :key="item.name">
                <el-check-tag
                  :checked="item.value"
                  @change="checkChange($event, i)"
                  effect="light"
                  class="mr-1 mb-1"
                  >{{ item.name }}</el-check-tag
                >
              </span>
              <Bar3D v-if="!loading" :data="state.dataList" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-card>
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
