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
      prop="username"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 60,
        },
      }"
    >
      <el-input
        v-model="ruleForm.username"
        :prefix-icon="User"
        type="text"
        :placeholder="$t('Login.username')"
        clearable
      />
    </el-form-item>
    <el-form-item
      class="wrap2"
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
          delay: 100,
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
      class="wrap3"
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
          delay: 130,
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
      class="wrap4"
      prop="password"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 180,
        },
      }"
    >
      <el-input
        v-model="ruleForm.password"
        :prefix-icon="Lock"
        show-password
        type="password"
        :placeholder="$t('Login.password')"
        clearable
      />
    </el-form-item>
    <el-form-item
      class="wrap5"
      prop="comfirmPass"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 250,
        },
      }"
    >
      <el-input
        v-model="ruleForm.comfirmPass"
        :prefix-icon="Lock"
        show-password
        :placeholder="$t('Login.password2')"
        type="password"
        clearable
      />
    </el-form-item>

    <el-form-item
      class="wrap6"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 250,
        },
      }"
    >
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox
          :label="$t('Login.hasReadRules')"
          name="type"
        />
        <el-link
          type="primary"
          :underline="false"
        > {{$t('Login.Rules')}} </el-link>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item
      class="wrap7"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 280,
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
      class="wrap8"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 280,
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
import { Phone, User, Lock, Bell } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
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
 * 表单校验系统
 */
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  phone: "",
  msgCode: "",
  password: "",
  comfirmPass: "",
  type: [],
});
//验证码用户名
const validateUser = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.comfirmUname")));
  } else {
    if (ruleForm.username !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("username", () => null);
    }
    callback();
  }
};
//验证手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.phone")));
  } else {
    if (ruleForm.phone !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("phone", () => null);
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
      ruleFormRef.value.validateField("msgCode", () => null);
    }
    callback();
  }
};
//验证密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.comfirmPwd")));
  } else {
    if (ruleForm.password !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("comfirmPass", () => null);
    }
    callback();
  }
};
//确认密码
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.comfirmPwd2")));
  } else if (value !== ruleForm.password) {
    callback(new Error(t("Login.pwdNotEq")));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  username: [{ validator: validateUser, trigger: "blur" }],
  phone: [{ validator: validatePhone, trigger: "blur" }],
  msgCode: [{ validator: validateMsgCode, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  comfirmPass: [{ validator: validatePass2, trigger: "blur" }],
});
//提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      router.push("/");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
@import "@/components/login/common";
.demo-ruleForm {
  .wrap3 {
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
    .el-button {
      width: 150px;
    }
  }
  .wrap6 {
    .el-checkbox-group {
      display: flex;
      align-items: center;
    }
  }
  .wrap7,
  .wrap8 {
    .el-button {
      width: 100%;
    }
  }
}
</style>
