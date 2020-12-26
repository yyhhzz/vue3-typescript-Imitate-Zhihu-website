import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import ColumnDetail from "./views/ColumnDetail.vue";
import CreatePost from "./views/CreatePost.vue";
import SignUp from "./views/SignUp.vue"
import store from "./store"
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta:{ redirectAlreadyLogin: true } // 是否已经登录
    },
    {
      path: "/column/:id",
      name: "column",
      component: ColumnDetail,
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta:{ redirectAlreadyLogin: true }
    }
  ],
});

// 配置全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 路由元信息设置权限
  // 如果当前页面需要登录，且当前用户没有登录，则自动前往登录界面
  // 如果当前页面需要登录，且当前用户已经登录，则自动前往首页
  
  if (to.meta.requiredLogin  && !store.state.user.isLogin) {
   next('/login')
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
export default router;
