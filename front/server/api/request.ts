import axios from 'axios'
// 创建axios实例
const requester = axios.create({
    //设置基础路径
    baseURL: 'http://127.0.0.1:5000/smiling-cat/',
    // 请求超时时间
    timeout: 15000
})
 
// http request 拦截器
requester.interceptors.request.use(
    config => {
        // 发送请求前的处理
        // 这里可以处理 token
        return config
    },
    err => {
        // 请求错误的处理
        return Promise.reject(err)
    }
)
 
// http response 拦截器
requester.interceptors.response.use(
    //处理响应数据
    response => {
        // //判断请求是否正常
        // if (response.data.code !== 200) {
        //     //出现错误,错误处理,提示错误信息
        //     return Promise.reject(response.data)
        // } else {
        //     //成功返回数据
        //     return response.data
        // }
        return response
    },
    // 抛出错误
    error => {
        return Promise.reject(error.response)
    }
)
 
export default requester