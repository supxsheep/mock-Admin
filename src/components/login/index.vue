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
          delay: 50,
        },
      }"
    >
      <el-input
        v-model="ruleForm.username"
        :prefix-icon="User"
        :placeholder="$t('Login.username')"
        type="text"
        clearable
      />
    </el-form-item>
    <el-form-item
      class="wrap2"
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
          delay: 100,
        },
      }"
    >
      <el-input
        v-model="ruleForm.password"
        :prefix-icon="Lock"
        :placeholder="$t('Login.password')"
        show-password
        type="password"
        clearable
      />
    </el-form-item>
    <el-form-item
      class="wrap3"
      prop="CAPTCHA"
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 150,
        },
      }"
    >
      <el-input
        v-model="ruleForm.CAPTCHA"
        :prefix-icon="Bell"
        :placeholder="$t('Login.verifyCode')"
        type="text"
        clearable
      />
      <div class="CAPTCHA"></div>
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
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox
          :label=" $t('Login.rememberPwd') "
          name="type"
        />

      </el-checkbox-group>
      <el-link
        class="forgetPass"
        type="primary"
        :underline="false"
        @click="goChangePass"
      >
        {{ $t("Login.forgetPwd") }}
      </el-link>
    </el-form-item>
    <el-form-item
      class="wrap5"
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
        {{ $t("Login.login") }}
      </el-button>
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
          delay: 300,
        },
      }"
    >
      <el-button @click="goPhone">{{ $t("Login.phoneLogin") }}</el-button>
      <el-button @click="goQR">{{ $t("Login.qrLogin") }}</el-button>
      <el-button @click="goRegister">{{ $t("Login.register") }}</el-button>
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
          delay: 300,
        },
      }"
    >
      <el-divider>
        <el-text size="small">{{ $t("Login.thirdLogin") }}</el-text>
      </el-divider>
      <div class="third-login">
        <div class="icon"><i class="ri-wechat-fill"></i></div>
        <div class="icon"><i class="ri-qq-fill"></i></div>
        <div class="icon"><i class="ri-twitter-fill"></i></div>
        <div class="icon"><i class="ri-weibo-fill"></i></div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { UserFilled, User, Lock, Bell } from "@element-plus/icons-vue";
import { ref, reactive, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import router from "@/router";

//引入国际化
import t from "@/hook/useI18n";

const emits = defineEmits(["sendLoginType"]);
//去修改密码
const goChangePass = () => {
  emits("sendLoginType", "ForgetPass");
};
//去手机登录
const goPhone = () => {
  emits("sendLoginType", "PhoneLogin");
};
//去扫码登录
const goQR = () => {
  emits("sendLoginType", "QRLogin");
};
//去注册
const goRegister = () => {
  emits("sendLoginType", "Register");
};

const ruleFormRef = ref<FormInstance>();
//验证码用户名
const validateUser = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.comfirmUname")));
  } else {
    // if (ruleForm.username !== "") {
    //   if (!ruleFormRef.value) return;
    //   ruleFormRef.value.validateField("username", () => null);
    // }
    callback();
  }
};
//验证密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.comfirmPwd")));
  } else {
    // if (ruleForm.password !== "") {
    //   if (!ruleFormRef.value) return;
    //   ruleFormRef.value.validateField("checkPass", () => null);
    // }
    callback();
  }
};
//验证验证码
const validateCAPTCHA = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(t("Login.comfirmCode")));
  } else {
    // if (ruleForm.CAPTCHA !== "") {
    //   if (!ruleFormRef.value) return;
    //   ruleFormRef.value.validateField("CAPTCHA", () => null);
    // }
    callback();
  }
};

const ruleForm = reactive({
  username: "admin",
  password: "123456",
  CAPTCHA: "",
  type: [],
});

const rules = reactive<FormRules>({
  username: [{ validator: validateUser, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  CAPTCHA: [{ validator: validateCAPTCHA, trigger: "blur" }],
});

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
      width: 240px;
    }
    .CAPTCHA {
      width: 120px;
      height: 40px;
      background-color: bisque;
    }
  }
  .wrap4 {
    position: relative;
    .forgetPass {
      position: absolute;
      right: 0;
    }
  }
  .wrap5 {
    .login {
      width: 100%;
    }
  }
  .wrap6 {
    display: flex;
    .el-button {
      width: 112px;
      height: 32px;
    }
  }
  .wrap7 {
    width: 100%;
    .third-login {
      display: flex;
      justify-content: space-between;
      .icon {
        width: 50px;
        display: inline-block;
        cursor: pointer;
        margin: 0 20px;
        i {
          color: #6b7280;
          font-size: 22px;
        }
      }
    }
  }
}
</style>
