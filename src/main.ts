import router from './router';
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from "axios"

axios.defaults.baseURL = '';

// 配置axios拦截器，在axios请求和响应时设置loading值
axios.interceptors.request.use((config) => {
    store.commit('setError', {status: false , message: ''});
    store.commit('setLoading', true)
    return config
})
axios.interceptors.response.use((config) => {
    
    // 这里可以设置延时加载
    // setTimeout(() => {
    // store.commit('setLoading', false)
    // }, 1000);
    store.commit('setLoading', false)
    return config
}, e=> {
    const {error} = e.response.data;
    store.commit('setError', {status: true , message: error});
    store.commit('setLoading', false);
    return Promise.reject(error); // 添加响应拦截器
})

// 测试跨域请求是否成功
// axios.get('/api/columns/{2}').then(res => {
//     console.log('res',res.data);
// }).catch(err => {
// 	console.log(err)
// })
createApp(App).use(router).use(store).mount('#app')
