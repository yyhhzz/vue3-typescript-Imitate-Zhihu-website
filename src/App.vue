<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading" text="加载中···"></loader>
    <!-- message 组件已通过函数式调用，这里不需要调用 -->
    <!-- <message
      type="error"
      :message="error.message"
      v-if="error.status"
    ></message> -->
    <!-- <column-list :list="list"></column-list> -->
    <router-view></router-view>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "vuex";
import GlobalHeader from "./components/GlobalHeader.vue";
import FooterBottom from "./components/FooterBottom.vue";
import Loader from "./components/Loader.vue";
import creatwMessage from "./components/createMessage";
import { defineComponent, computed, onUpdated, watch } from "vue";
import { GlobalDataProps } from "./store";
export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    FooterBottom,
    Loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    onUpdated(() => {
      //  console.log('currentUser',currentUser)
      // console.log(error.value);
    });
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          creatwMessage(message, "error");
        }
      }
    );

    return {
      currentUser,
      isLoading,
      error,
    };
  },
});
</script>

