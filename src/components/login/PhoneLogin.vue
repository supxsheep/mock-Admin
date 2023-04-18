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
          delay: 50,
        },
      }"
    >
      <el-input
        v-model="ruleForm.phone"
        :prefix-icon="Phone"
        type="text"
        :placeholder="$t('Login.phone')"
        clearable
      />
    </el-form-item>
    <el-form-item
      class="wrap2"
      prop="msgCode"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 100,
        },
      }"
    >
      <el-input
        v-model="ruleForm.msgCode"
        :prefix-icon="Bell"
        type="text"
        :placeholder="$t('Login.smsVertifyCode')"
        clearable
      />
      <el-button plain>{{$t('Login.getVertifyCode')}}</el-button>
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
        type="primary"
        class="login"
        @click="submitForm(ruleFormRef)"
      >
        {{$t('Login.login')}}
      </el-button>
    </el-form-item>
    <el-form-item
      class="wrap4"
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
      >
        {{$t('Login.back')}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Phone, Bell } from "@element-plus/icons-vue";
import { ref, reactive, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import router from "@/router";
//引入国际化
import t from "@/hook/useI18n";

/**
 * 返回登录
 */
const emits = defineEmits(["backLogin"]);
const back = () => {
  emits("backLogin", "Login");
};

/**
 * 校验系统
 */
const ruleFormRef = ref<FormInstance>();
//验证手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.comfirmPhone")));
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
    callback(new Error(t("Login.comfirmCode")));
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
  .wrap2 {
    display: flex;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
    .el-button {
      width: 150px;
    }
  }
  .wrap3,
  .wrap4 {
    .el-button {
      width: 100%;
    }
  }
}
</style>
