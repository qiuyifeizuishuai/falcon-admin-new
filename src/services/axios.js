import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from '@/config/PageRoutes';
import Cookies from 'js-cookie';
import qs from "qs";
let loading = null;//加载框

axios.interceptors.request.use(
    config => {
        // if (loading) {
        //     loading.open();
        // } else {
        loading = Loading.service({
            fullscreen: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        // }
        //  get请求数组序列化  === 根据老师的类型获取老师接口序列化
        if (config.method === 'get' && config.url === "/api/user/teacher/getAllTeacherByArrParam") {
            config.paramsSerializer = function (params) {
                return qs.stringify(params, { arrayFormat: "repeat" });
            };
        }
        let token = Cookies.get('token');
        if (token) {
            config.headers = {
                token: token,
                'content-type': 'application/json;charset=utf-8'
            };
        }

        return config;
    },
    error => {
        loading.close();
        return Promise.reject(error.response);
    }
);

axios.interceptors.response.use(
    response => {
        loading.close();
        return Promise.resolve(response.data);
    },
    error => {
        loading.close();
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    if(window.location.hash=='#/'){
                        console.log('nullAccount');
                    }else{
                        Message.error(error.response.data.message);
                    }
                    localStorage.clear();
                    Cookies.remove('token');
                    router.push({ path: '/' });
                    break;
                case 500:
                    Message.error(error.response.data.message);
                    break;
                default:
                    Message.error(error.response.data.message);
                    break;
            }
            return Promise.reject(error.response);
        }
    }
);

// 请求方式
export default class Ajax {
    /**
     * 带错误处理的GET 请求
     * 失败则返回 undefined
     * @param url 路径，形如 /a/b 不包含域名和端口部分
     * @param param 参数
     */
    static async get(url, param) {
        try {
            const result = await axios.get(url, {
                params: param,
            });
            if (result.code == 0) {
                return result;
            } else if (result.code == 3003 || result.code == 4007 || result.code == 2015 || result.code == 2007 || result.code == 2006) {
                router.push({ path: '/' });
                localStorage.clear();
                Cookies.remove('token');
                Message.error(result.message);
                return result;
            } else {
                Message.error(result.message);
                return result;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 带错误处理的 POST 请求
     * 失败则返回 undefined
     * @param url 路径，形如 /a/b 不包含域名和端口部分
     * @param param 参数, 如果要application/json 就传json对象，如果要 application/formData 就传 formData对象
     */
    static async post(url, param) {
        try {
            const result = await axios.post(url, param);
            if (result.code == 0) {
                return result;
            } else if (result.code == 3003 || result.code == 4007 || result.code == 2015 || result.code == 2007 || result.code == 2006) {
                router.push({ path: '/' });
                localStorage.clear();
                Cookies.remove('token');
                Message.error(result.message);
                return result;
            } else {
                Message.error(result.message);
                return result;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 带错误处理的delete 请求
     * 请求成功则返回 T 类型的实例
     * @param url 路径，形如 /a/b 不包含域名和端口部分
     * @param param 参数
     */
    static async delete(url, param) {
        try {
            const result = await axios.delete(url, {
                data: param,
            });
            if (result.code == 0) {
                return result;
            } else if (result.code == 3003 || result.code == 4007 || result.code == 2015 || result.code == 2007 || result.code == 2006) {
                router.push({ path: '/' });
                localStorage.clear();
                Cookies.remove('token');
                Message.error(result.message);
                return result;
            } else {
                Message.error(result.message);
                return result;
            }
        } catch (error) {
            return Promise.reject(error);

        }
    }

    /**
     * 带错误处理的put 请求
     * 请求成功则返回 T 类型的实例
     * @param url 路径，形如 /a/b 不包含域名和端口部分
     * @param param 参数
     */
    static async put(url, param) {
        try {
            const result = await axios.put(url, param);
            if (result.code == 0) {
                return result;
            } else if (result.code == 3003 || result.code == 4007 || result.code == 2015 || result.code == 2007 || result.code == 2006) {
                router.push({ path: '/' });
                localStorage.clear();
                Cookies.remove('token');
                Message.error(result.message);
                return result;
            } else {
                Message.error(result.message);
                return result;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    static async patch(url, param) {
        try {
            const result = await axios.patch(url, param);
            if (result.code == 0) {
                return result;
            } else if (result.code == 3003 || result.code == 4007 || result.code == 2015 || result.code == 2007 || result.code == 2006) {
                router.push({ path: '/' });
                localStorage.clear();
                Cookies.remove('token');
                Message.error(result.message);
                return result;
            } else {
                Message.error(result.message);
                return result;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
