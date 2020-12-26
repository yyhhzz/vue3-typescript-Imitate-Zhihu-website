<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <input type="file" name="file">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-block btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { GlobalDataProps } from "../store";
import { PostProps } from "../store";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent( {
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const titleVal = ref("");
    const contentVal = ref("");
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];
    const contentRules: RulesProp = [
      { type: "required", message: "文章内容不能为空" },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            _id: (new Date().getTime()).toString(),
            title: titleVal.value,
            content: contentVal.value,
            column,
            createdAt: new Date().toLocaleString(),
          };
          store.commit("createPost", newPost);
          router.push({ name: "column", params: { id: column } });
        }
      }
    };

 

    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
    };
  },
});
</script>

<style>
</style>