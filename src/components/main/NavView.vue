<template>
  <div class="nav-view">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">1</a></el-breadcrumb-item>
      <el-breadcrumb-item>2</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operation">
      <div class="search operation-section">
        <el-icon size="20"><Search /></el-icon>
      </div>
      <div class="tips operation-section">
        <el-badge :value="12" class="item">
          <el-icon size="20"><Bell /></el-icon>
        </el-badge>
      </div>
      <div class="user operation-section">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar
              :size="30"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <el-text>admin</el-text>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut"> 退出登录 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="settings operation-section" @click="visible = true">
        <el-icon size="20"><Setting /></el-icon>
      </div>
    </div>
  </div>
  <div class="nav-tags">
    <el-tag checked style="margin-right: 8px" closable>首页</el-tag>
  </div>
  <div class="drawer">
    <el-drawer v-model="visible" size="300px">
      <template #header="{ titleId, titleClass }">
        <h4
          :id="titleId"
          :class="titleClass"
          style="
            border-bottom: 1px solid #dcdfe6;
            padding-bottom: 10px;
            color: black;
          "
        >
          项目配置
        </h4>
      </template>
      <el-divider>
        <h3>主题</h3>
      </el-divider>
      <div class="changeLight">
        <el-switch
          v-model="value"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
          @change="switchTheme"
          size="large"
        />
      </div>
      <el-divider>
        <h3>导航栏模式</h3>
      </el-divider>
      <div class="nav-type"></div>
      <el-divider>
        <h3>主题色</h3>
      </el-divider>
      <div class="theme-color">
        <span
          :class="{ color: true, 'color-active': index == selectIndex }"
          v-for="(color, index) in colors"
          :key="index"
          :style="{ 'background-color': color }"
          @click="changeColor(index)"
        ></span>
      </div>
      <el-divider>
        <h3>界面显示</h3>
      </el-divider>
      <div class="UI">
        <div class="item" v-for="(item, index) in UIArray" :key="index">
          <span>{{ item.title }}</span>
          <el-switch
            v-model="item.modelValue"
            inline-prompt
            active-text="开"
            inactive-text="关"
            @change="item.changeName"
            size="large"
          />
        </div>
      </div>
      <el-divider></el-divider>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import {
  Search,
  Bell,
  Setting,
  CircleCloseFilled,
  Sunny,
  Moon,
} from "@element-plus/icons-vue";
import { ElButton, ElDrawer } from "element-plus";
import router from "@/router";

//退出登录
const loginOut = () => {
  router.push("/login");
};
//打开项目配置
const visible = ref(false);

//主题更换
const value = ref(false);
const switchTheme = (e: boolean) => {
  if (e) {
    console.log(e);
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
};
switchTheme(value.value);

//主题色
const colors = [
  "#1b2a47",
  "#ffffff",
  "#f5222d",
  "#fa541c",
  "#fadb14",
  "#13c2c2",
  "#52c41a",
  "#eb2f96",
  "#722ed1",
];
const selectIndex = ref(0);
const changeColor = (index: number) => {
  selectIndex.value = index;
};

//界面显示
//灰色模式
const grayValue = ref(false);
const switchGray = () => {
  grayValue.value = !grayValue.value;
};
//色弱模式
const colorWeaknessValue = ref(false);
const switchColorWeakness = () => {
  colorWeaknessValue.value = !colorWeaknessValue.value;
};
//影藏标签页
const hideTagValue = ref(false);
const switchTag = () => {
  hideTagValue.value = !hideTagValue.value;
};
//侧边栏LOGO
const showLogoValue = ref(true);
const switchLogo = () => {
  showLogoValue.value = !showLogoValue.value;
};
//标签页持久化
const tagForeverValue = ref(false);
const switchTagForever = () => {
  tagForeverValue.value = !tagForeverValue.value;
};

const UIArray = reactive([
  {
    title: "灰色模式",
    modelValue: grayValue,
    changeName: switchGray,
  },
  {
    title: "色弱模式",
    modelValue: colorWeaknessValue,
    changeName: switchColorWeakness,
  },
  {
    title: "影藏标签页",
    modelValue: colorWeaknessValue,
    changeName: switchColorWeakness,
  },
  {
    title: "侧边栏LOGO",
    modelValue: showLogoValue,
    changeName: switchLogo,
  },
  {
    title: "标签页持久化",
    modelValue: tagForeverValue,
    changeName: switchTagForever,
  },
]);
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.nav-view {
  width: 100%;
  height: 48px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  transition: 0.2s;

  @include theme(background-color, "basic-background-color");
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  @include theme(border-color, "basic-border-color");
  .el-breadcrumb {
    .el-breadcrumb__item {
      & ::v-deep .el-breadcrumb__inner {
        @include theme(color, "theme-font-color");
        a {
          @include theme(color, "theme-font-color");
        }
      }
    }
  }
  .operation {
    display: flex;
    height: 48px;
    @include theme(color, "theme-font-color");
    .operation-section {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      &:hover {
        @include theme(background-color, "operation-hover-color");
      }
    }
    .search,
    .tips,
    .settings {
      width: 48px;
      height: 48px;
    }
    .user {
      width: 100px;
      height: 48px;
      margin: 0 15px;
      & .el-dropdown-link {
        display: flex;
        align-items: center;
        justify-content: center;
        .el-avatar {
          margin-right: 10px;
        }
      }
    }
  }
}
.nav-tags {
  height: 38px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;
  @include theme(background-color, "basic-background-color");
  border-bottom: 1px solid #dfe1e4;
  @include theme(border-color, "basic-border-color");
  .el-tag {
    transition: 0.2s;
    @include theme(background-color, "basic-background-color");
    border-bottom: 2px solid #dfe1e4;
    @include theme(border-color, "basic-border-color");
  }
}
.drawer {
  @include theme(color, "theme-font-color");

  & ::v-deep .el-drawer {
    @include theme(background-color, "drawer-background-color");

    .el-drawer__header {
      & ::v-deep .el-drawer__title {
        @include theme(border-color, "basic-border-color");
      }
    }
  }

  & ::v-deep .el-divider {
    transition: 0.2s;
    @include theme(border-color, "basic-border-color");
    .el-divider__text {
      transition: 0.2s;
      @include theme(background-color, "drawer-background-color");
      h3 {
        transition: 0.2s;
        @include theme(color, "theme-font-color");
      }
    }
  }
}
.el-drawer {
  .changeLight {
    display: flex;
    justify-content: center;
  }
  .theme-color {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .color {
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: inline-block;
      border: 1px solid #dddddd;
      position: relative;
    }
    .color.color-active::after {
      content: "√";
      color: rgb(201, 201, 201);
      position: absolute;
      left: 0;
      right: 0;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .UI {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
