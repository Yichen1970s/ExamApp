import axios from 'axios'
import store from '../store'
const instance = axios.create({
    baseURL:'/api',
    timeout: 5000,
})

//请求拦截器
instance.interceptors.request.use(function (config) {
    //请求之前添加token

 const token = store.state.userToken.token
 config.headers.token = token
 return config

},function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  })

  //相应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


  export default instance