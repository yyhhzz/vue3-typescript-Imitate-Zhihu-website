
<template>
  <!-- 这是登录表单组件 -->
  <from class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary" >提交</button>
      </slot>
    </div>
  </from>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
// 第三方监听器
import mitt from "mitt";
export const emitter = mitt();
type ValidateFunc = () => boolean;

export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    // 组件通信，向App组件传递事件
    let funcArr: ValidateFunc[] = [];
    // 循环执行数组，得到最后的验证结果
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit("form-submit", result);    
    };

    // 将监听得到的验证函数存到一个数组中
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func);
      }
    };
    // 第三方库mitt，组件通信，父组件向组件传值
    // 添加监听
    emitter.on("form-item-created", callback);

    // 组件卸载前清理
    onUnmounted(() => {
      // 删除监听
      emitter.off("form-item-created", callback);
      funcArr = [];
    });

    return {
      submitForm,
    };
  },
});
</script>

<style>
</style>