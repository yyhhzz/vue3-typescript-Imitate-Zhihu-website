<template>
  <!-- 这是下拉菜单组件 -->
  <div class="dropdown" ref="dropdownRef">
    <li class="list-inline-item">
      <a
        href="#"
        class="btn btn-outline-light my-2 dropdown-toggle"
        @click="changeOpen"
      >
        {{ title }}
      </a>
    </li>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import useClickOutside from "../hooks/useClickOutside";
export default defineComponent({
  name: "DropDown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    // 控制导航按钮打开
    const isOpen = ref(false);
    const changeOpen = () => {
      isOpen.value = !isOpen.value;
    };

    // 控制导航按钮关闭
    const dropdownRef = ref<null | HTMLElement>(null);
    const isClickOutside = useClickOutside(dropdownRef);
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      changeOpen,
      dropdownRef,
    };
  },
});
</script>

<style>
</style>