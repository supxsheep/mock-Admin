<template>
  <div class="sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      unique-opened
      text-color="#aaa6a6"
      active-text-color="#ffffff"
      id="menu"
    >
      <div class="affixTop">
        <img
          src="@/assets/images/logo-login.png"
          alt=""
        />
        <span
          v-if="!isCollapse"
          v-motion="{
            initial: {
              opacity: 0,
            },
            enter: {
              opacity: 1,
              transition: {
                delay: 200,
              },
            },
          }"
        >PureAdmin</span>
      </div>
      <router-link to="/">
        <el-menu-item
          class="dasboard"
          index="1"
        >
          <el-icon>
            <icon-menu />
          </el-icon>
          <template #title>
            首页
          </template>
        </el-menu-item>
      </router-link>

      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <Avatar />
          </el-icon>
          <span>系统管理</span>
        </template>
        <router-link to="/user">
          <el-menu-item index="2-1">
            用户管理
          </el-menu-item>
        </router-link>
        <router-link to="/user/permission">
          <el-menu-item index="2-2">
            角色管理
          </el-menu-item>
        </router-link>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <ShoppingCart />
          </el-icon>
          <span>商品管理</span>
        </template>
        <router-link to="/shopping">
          <el-menu-item index="3-1">购物商品</el-menu-item>
        </router-link>
      </el-sub-menu>

      <div
        class="affixBottom"
        id="affixBottom"
        :style="{ position: ifAbsolute }"
      >
        <template v-if="isCollapse">
          <el-icon
            @click="handleOpen"
            size="24"
          >
            <Expand />
          </el-icon>
        </template>
        <template v-else>
          <el-icon
            @click="handleClose"
            size="24"
          >
            <Fold />
          </el-icon>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Expand,
  Fold,
  Avatar,
  ShoppingCart,
} from "@element-plus/icons-vue";
import { on } from "events";
document.documentElement.setAttribute("data-theme", "light");
//开关侧边栏
const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  isCollapse.value = false;
};
const handleClose = (key: string, keyPath: string[]) => {
  isCollapse.value = true;
};
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
::-webkit-scrollbar {
  display: none;
}
.router-link-active,
.router-link-exact-active,
a {
  text-decoration: none;
  .el-menu-item:hover,
  .el-sub-menu:hover {
    color: white;
    background-color: transparent;
  }
}
.sidebar {
  height: 100%;
  position: relative;

  .el-menu-vertical-demo {
    height: calc(100vh);
    overflow: scroll;
    @include theme(background-color, "sidebar-background-color");

    > .el-menu-item:hover,
    > .el-sub-menu:hover {
      color: white;
      background-color: transparent;
    }
    & ::v-deep .el-sub-menu__title:hover {
      color: white;
      background-color: transparent;
    }
    .el-menu-item:not(.dasboard) {
      color: #aaa6a6;
      background-color: #0f0303;
    }

    .el-menu-item:not(.dasboard):hover {
      color: white;
    }
    .el-menu-item:not(.dasboard).is-active {
      color: white;
      background-color: #409eff;
    }
    .is-active:not(.el-sub-menu) {
      background-color: #409eff;
    }
    .el-sub-menu {
      & ::v-deep span {
        display: inline-block;
        width: 100px;
      }
    }
  }
  .affixTop {
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 99;
    @include theme(background-color, "logo-background-color");
    img {
      width: 32px;
      height: 32px;
      margin: 0 5px 0 15px;
    }
    span {
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .affixBottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px -2px 2px #0a2744;
    @include theme(background-color, "collapse-background-color");
    .el-icon {
      @include theme(color, "collapse-color");
    }
  }
}
</style>
