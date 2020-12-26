<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p><router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link></p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <uploader action="/api/upload"></uploader>
    <column-list :list="list"></column-list>
    <!-- <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click="loadMorePage"
      v-if="!isLastPage"
    >
      加载更多
    </button> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import Uploader from "../components/Uploader.vue";
export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
    Uploader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => store.state.columns);

    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    return {
      list,
    };
  },
});
</script>

<style>
</style>