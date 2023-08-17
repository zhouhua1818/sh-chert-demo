<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";

const INITIAL_DATA = {
  pieces: [{ key: 1, gt: 0, lte: 1, color: "#409EFF" }]
};

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const piecesFormRef = ref<FormInstance>();
const formVisible = ref(false);
const formData = reactive({ ...INITIAL_DATA });

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      console.log("valid: ", valid);
      emit("submit-form", formData);
      console.log(formData);
      message("提交成功", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(piecesFormRef.value);
};

const emit = defineEmits(["update:visible", "submit-form"]);

const handleAdd = () => {
  // emit("add-pieces");
  const addFormItem = {
    key: Date.now(),
    gt: 0,
    lte: 1,
    color: "#409EFF"
  };
  formData.pieces?.push(addFormItem);
};

const handleDel = item => {
  console.log("handledelPieces: ", item);
  const index = formData.pieces.indexOf(item);
  if (index !== -1) {
    formData.pieces.splice(index, 1);
  }
};

watch(
  () => formVisible.value,
  val => {
    emit("update:visible", val);
  }
);

watch(
  () => props.visible,
  val => {
    formVisible.value = val;
  }
);

// watch(
//   () => props.data,
//   val => {
//     formData.value = val;
//   }
// );
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="区间及颜色设置"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <el-form :inline="true" ref="piecesFormRef" :model="formData" size="small">
      <template v-for="(item, index) in formData.pieces" :key="index">
        <el-form-item
          label="起始值"
          :prop="'pieces.' + index + '.gt'"
          :rules="{
            required: true,
            message: '起始值必须填',
            trigger: 'blur'
          }"
        >
          <el-input-number :min="1" v-model="item.gt" />
        </el-form-item>
        <el-form-item
          label="结束值"
          :prop="'pieces.' + index + '.lte'"
          :rules="{
            required: true,
            message: '起始值必须填',
            trigger: 'blur'
          }"
        >
          <el-input-number :min="1" v-model="item.lte" />
        </el-form-item>
        <el-form-item label="颜色" prop="item.color">
          <el-color-picker v-model="item.color" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="mt-2" @click="handleDel(item)"
            >删除</el-button
          >
        </el-form-item>
      </template>
    </el-form>

    <el-row>
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </el-row>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(piecesFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
