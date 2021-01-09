import Axios from 'axios'

export function request(config) {
  const instance = Axios.create({
    baseURL: 'http://.185.210:7878/api/m5',
    timeout: 5000
  });

  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  instance.interceptors.response.use(config => {
    // 对响应数据做点什么
    return config;
  }, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  return instance(config)
}
