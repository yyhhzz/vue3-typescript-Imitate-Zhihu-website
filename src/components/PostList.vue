<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id">
      <div class="card mb-3">
        <div class="row no-gutters">
          <div v-if="post.image" class="col-md-4">
            <img :src="post.image.url" class="card-img" :alt="post.title" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">
                {{ post.excerpt }}
              </p>
              <p class="card-text">
                <small class="text-muted">{{ post.createdAt }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from "vue";
import { PostProps } from "../store";
export default defineComponent( {
  name: "PostList",
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup(props) {
    const posts = computed(() => {
      return props.list.map((post) => {
        if (!post.image) {
          post.image = {
            url:require("@/assets/defaultLogo.jpg")
          }
        }
        return post;
      });
    });
    return {
      posts,
    };
  },
});
</script>

<style>
</style>