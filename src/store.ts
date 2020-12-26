import axios from 'axios';
import { createStore, Commit } from "vuex";

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string; //摘要
  content: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface GlobalErrorProps{
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

// 封装的async await 异步处理方法
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    error:{status:false},
    token: localStorage.getItem('token') || '', // 初始化时获取localStorage里的token
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false},
  },
  mutations: {
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, name: "Young" };
    // },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list;
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data];
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state,e: GlobalErrorProps){
      state.error = e;
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData };
    },
    login(state, rawData) {
      const { token } = rawData.data;
      state.token = token;
      localStorage.setItem('token',token);  // 设置localStorage存储token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //jwt鉴权
    },
    // signUp(state,rawData){

    // }
  },

  // actions 发送异步请求
  actions: {
    // 改造后并且封装了异步方法的请求
    fetchColumns({ commit }) {
      getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    // 改造前的异步请求
    // fetchColumns({ commit }) {
    //   axios.get('./api/columns').then(res => {
    //     commit('fetchColumns', res.data)
    //   })
    // },

    // 改造后没有封装异步方法的请求
    // async fetchColumns({ commit }) {
    //   const { data } = axios.get('./api/columns')
    //   commit('fetchColumns', data)
    // },

    fetchColumn({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit('/api/user/current', 'fetchCurrentUser', commit)
    },
    signUp({commit},payload){
      return postAndCommit('/api/users','signUp',commit,payload)
    },
    login({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },

  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c) => c._id === id);
    },
    getPostByCid: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid);
    },
  },
});

export default store;
