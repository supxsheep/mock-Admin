<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
    size="large"
  >
    <el-form-item
      class="wrap1"
      prop="phone"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 80,
        },
      }"
    >
      <img
        style="width: 200px; height: 200px"
        src="@/assets/images/qr.png"
        alt=""
      />
    </el-form-item>

    <el-form-item
      class="wrap2"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 200,
        },
      }"
    >
      <el-divider>
        <el-text size="small">{{$t('Login.QRMsg')}}</el-text>
      </el-divider>
    </el-form-item>
    <el-form-item
      class="wrap3"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 200,
        },
      }"
    >
      <el-button
        class="back"
        @click="back"
      > {{$t('Login.back')}} </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Phone, Bell } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import router from "@/router";

/**
 * 返回登录
 */
const emits = defineEmits(["backLogin"]);
const back = () => {
  emits("backLogin", "Login");
};

/**
 * 表单校验系统
 */
const ruleFormRef = ref<FormInstance>();
//验证手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else {
    if (ruleForm.phone !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPhone", () => null);
    }
    callback();
  }
};
//验证短信验证码
const validateMsgCode = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  } else {
    if (ruleForm.msgCode !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkMsgCode", () => null);
    }
    callback();
  }
};
const ruleForm = reactive({
  phone: "",
  msgCode: "",
});
const rules = reactive<FormRules>({
  phone: [{ validator: validatePhone, trigger: "blur" }],
  msgCode: [{ validator: validateMsgCode, trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // router.push("/");
    } else {
      console.log("提交错误！");
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
@import "@/components/login/common";
.demo-ruleForm {
  .wrap1 {
    position: relative;
    img {
      margin: 0 80px;
    }
  }
  .wrap2 {
    .el-divider {
      line-height: 15px;
    }
  }
  .wrap3 {
    .back {
      width: 100%;
    }
  }
}
</style>
