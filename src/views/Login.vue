<template>
  <div>
    <div class="login-page mx-auto p-3 w-330">
      <h5 class="my-4 text-center">登录到者也</h5>
      <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            :rules="emailRules"
            v-model="emailVal"
            placeholder="请输入邮箱地址"
            type="text"
            ref="inputRef"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            type="password"
            placeholder="请输入密码"
            :rules="passwordRules"
            v-model="passwordVal"
          />
        </div>
        <template #submit>
          <button type="submit" class="btn btn-primary btn-block btn-large">
            登录
          </button>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "../components/createMessage";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Login",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // 邮箱和密码初始值和规则
    const emailVal = ref("");
    const passwordVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];

    const onFormSubmit = (result: boolean) => {
      // console.log("result", result);
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
        };
        // 因为返回的是promise对象所以可以使用then方法
        store
          .dispatch("loginAndFetch", payload)
          .then((data) => {
            createMessage("登录成功，2秒后跳转首页", "success");
            setTimeout(() => {
              router.push("/");
            }, 2000);
            // console.log(data);
          })
          .catch((e) => {
            console.log(e);
          });
        // store.commit("login");
      }
    };

    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style>
</style>