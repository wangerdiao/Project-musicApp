import axios from'axios'
const requests = axios.create({
    baseURL:'http://localhost:3000',
    timeout:5000
})
//设置请求拦截器
requests.interceptors.request.use((config) => {
    return config
})
//设置响应拦截器
requests.interceptors.response.use(
    (res) => {
        return res.data
    },
    (error) => {
        return Promise.reject(new Error('fail'))
    }
)
export default requests