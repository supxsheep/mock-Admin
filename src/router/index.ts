import { createRouter, createWebHistory } from "vue-router";
import { start, close } from "@/plugins";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/view/dashboard/index.vue"),
      },
      {
        path: "/user",
        name: "user",
        children: [
          {
            path: "/user",
            name: "user",
            component: () => import("@/view/user/index.vue"),
          },
          {
            path: "permission",
            name: "permission",
            component: () => import("@/view/user/permission.vue"),
          },
        ],
      },
      {
        path: "/shopping",
        name: "shopping",
        component: () => import("@/view/shopping/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (): object => ({
    y: 0,
  }),
});

//路由前置守卫
router.beforeEach((to, from, next) => {
  start(); //开启进度条
  next();
});
//路由后置守卫
router.afterEach((to, from) => {
  close(); //完成进度条
});

// 导出路由
export default router;
