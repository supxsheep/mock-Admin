<template>
  <div class="login-layout">
    <img
      class="login-background"
      src="@/assets/images/login-background.png"
      alt=""
    />
    <div class="change">
      <el-switch
        v-model="value"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
        @change="switchTheme"
      />
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          选择语言
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :disabled="language === 'zh'"
              command="zh"
            >
              中文
            </el-dropdown-item>
            <el-dropdown-item
              :disabled="language === 'en'"
              command="en"
            >
              English
            </el-dropdown-item>
          </el-dropdown-menu>

        </template>
      </el-dropdown>
    </div>
    <div class="login-container">
      <div class="img">
        <img
          src="@/assets/images/login-sunday.svg"
          alt=""
        />
      </div>
      <div class="login-box">
        <div class="login-form">
          <div class="icon avatar">
            <img
              src="@/assets/images/logo-login.png"
              alt=""
            />
          </div>
          <div style="transform: translateZ(0px); opacity: 1">
            <h2 class="outline-none">
              <span>PUREADMIN</span>
            </h2>
          </div>
          <template v-if="loginType == 'Login'">
            <Login @send-login-type="getLoginType" />
          </template>
          <template v-else-if="loginType == 'ForgetPass'">
            <ForgetPass @back-login="backLogin" />
          </template>
          <template v-else-if="loginType == 'PhoneLogin'">
            <PhoneLogin @back-login="backLogin" />
          </template>
          <template v-else-if="loginType == 'QRLogin'">
            <QRLogin @back-login="backLogin" />
          </template>
          <template v-else-if="loginType == 'Register'">
            <Register @back-login="backLogin" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入功能
import { ref, reactive, computed, onMounted } from "vue";
import { Sunny, Moon, ArrowDown } from "@element-plus/icons-vue";

import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import useLanguage from "@/store/lang";

//引入组件
import Login from "@/components/login/index.vue";
import ForgetPass from "@/components/login/ForgetPass.vue";
import PhoneLogin from "@/components/login/PhoneLogin.vue";
import QRLogin from "@/components/login/QRLogin.vue";
import Register from "@/components/login/Register.vue";
import router from "@/router";

/**
 * 主题换肤功能
 */
//主题更换
const value = ref(true);
const switchTheme = (e: boolean) => {
  if (e) {
    console.log(e);
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
};
switchTheme(value.value);

/**
 * 国际化功能
 */

const langName = ref("");
const language = computed(() => {
  return useLanguage().language;
});
const handleCommand = (command: string) => {
  switch (command) {
    case "zh":
      changeLanguage(command);
      break;
    case "en":
      changeLanguage(command);
      break;
  }
};
const setLanguageName = (lang: string) => {
  if (
    lang === undefined ||
    lang === "undefined" ||
    lang === "" ||
    lang === null ||
    lang === "zh"
  ) {
    langName.value = "中文";
  } else {
    langName.value = "English";
  }
};
// 语言切换
const changeLanguage = (lang: string) => {
  useLanguage().setLanguage(lang);
  setLanguageName(lang);
  ElMessage.success("切换语言成功！");
  router.go(0);
};
onMounted(() => {
  setLanguageName(language.value);
});

/**
 * 登录方式
 */
// 接收子组件的登录方式传值
const loginType = ref("Login");
const getLoginType = (value: strig) => {
  loginType.value = value;
};
//子组件返回到登录
const backLogin = (value: string): void => {
  loginType.value = value;
};
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.login-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;

  @include theme("background-color");
  position: relative;
  .login-background {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .change {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 15px;
    right: 50px;
    z-index: 999;
  }
  .login-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    padding: 0 2rem;
    grid-gap: 18rem;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    z-index: 99;
    .img {
      align-items: center;
      display: flex;
      justify-content: flex-end;
      img {
        width: 500px;
        height: 380px;
      }
    }
    .login-box {
      align-items: center;
      display: flex;
      text-align: center;
      .login-form {
        width: 360px;
        .avatar {
          display: flex;
          justify-content: center;
          img {
            width: 80px;
          }
        }
        .outline-none {
          color: #999;
          font: 700 200% Consolas, Monaco, monospace;
          margin: 15px 0;
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
