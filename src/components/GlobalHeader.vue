<template>
  <!-- 这是全局导航组件 -->
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">前端专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >登陆</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <drop-down :title="`你好 ${user.nickName}`">
          <drop-down-item
            ><router-link class="dropdown-item" to="/create"
              >新建文章</router-link
            ></drop-down-item
          >
          <drop-down-item disabled
            ><a class="dropdown-item" href="#">编辑资料</a></drop-down-item
          >
          <drop-down-item
            ><a class="dropdown-item" href="#">退出登录</a></drop-down-item
          >
        </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onUpdated, PropType } from "vue";
import DropDown from "./DropDown.vue";
import DropDownItem from "./DropDownItem.vue";
import { UserProps } from "../store";

export default defineComponent({
  name: "GlobalHeader",
  components: {
    DropDown,
    DropDownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(props) {
    onUpdated(() => {
      console.log("user", props.user);
    });
  },
});
</script>
