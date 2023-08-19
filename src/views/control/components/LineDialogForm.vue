<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { message } from "@/utils/message";
import type { FormInstance } from "element-plus";
import { PiecesItemProps } from "./utils/types";

const props = defineProps({
  data: {
    type: Object
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  "update:visible",
  "add-pieces",
  "del-pieces",
  "submit-form"
]);
const formRef = ref<FormInstance>();
const formVisible = ref(false);
const dynamicValidateForm = reactive(props.data);
console.log("dynamicValidateForm: ", dynamicValidateForm);

const handleDel = (item: PiecesItemProps) => {
  emit("del-pieces", item);
};

const handleAdd = () => {
  emit("add-pieces");
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log("dynamicValidateForm", dynamicValidateForm);
      emit("submit-form", dynamicValidateForm);
      message("提交成功", { type: "success" });
      formVisible.value = false;
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(formRef);
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

watch(
  () => props.data,
  val => {
    dynamicValidateForm.value = val;
  }
);
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="区间及颜色设置"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <el-form
      ref="formRef"
      :inline="true"
      :model="dynamicValidateForm"
      size="small"
      class="demo-dynamic"
    >
      <template
        v-for="(item, index) in dynamicValidateForm.pieces"
        :key="item.key"
      >
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
            message: '结束值必须填',
            trigger: 'blur'
          }"
        >
          <el-input-number :min="1" v-model="item.lte" />
        </el-form-item>
        <el-form-item label="颜色" prop="item.color">
          <el-color-picker v-model="item.color" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleDel(item)">删除</el-button>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(formRef)"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
