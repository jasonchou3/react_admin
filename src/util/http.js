/**
 * Created by JasonChou on 17/4/2.
 */
/*global toast:true*/
/* eslint no-undef: "error" */
import axios from 'axios'

const querystring = require('query-string');

const instance = axios.create({
    timeout: 15000,
});

instance.defaults.withCredentials = true;

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';


class Http {
    // baseURL = 'http://api.wenshenjishi.com';
    baseURL = 'http://localhost:7001';

    get(url, opts) {
        return this.request(url, 'get', opts);
    }

    post(url, opts) {
        return this.request(url, 'post', opts);
    }

    delete(url, opts) {
        return this.request(url, 'delete', opts);
    }

    put(url, opts) {
        return this.request(url, 'put', opts);
    }

    async request(url, method, options = {}) {
        let response;
        options['url'] = url;
        options['method'] = method;
        options['baseURL'] = this.baseURL;

        if (method === 'post' || method === 'put')
            options['transformRequest'] = [function (data) {
                data = querystring.stringify(data, {arrayFormat: 'bracket'});
                return data;
            }];

        try {
            response = await instance(options);
            response.isOk = true;
            response.isToast = false;
        } catch (e) {
            if (e.message.startsWith('timeout')) {
                response = {
                    isToast: true,
                    status: 408,
                    data: {
                        errcode: 408,
                        msg: '请求超时，当前网络不稳定，请检查网络！'
                    },
                };

                toast(response.data.msg);
            } else if (e.message === 'Network Error') {
                response = {
                    status: 10001,
                    isToast: true,
                    data: {
                        errcode: 10000,
                        msg: '当前网络不可用，请检查网络！'
                    },
                };

                toast(response.data.msg);
            } else {
                response = e.response;
            }
        }

        console.log("=== start ===");
        console.log(options);
        console.log("=== res:  ===");
        console.log(response.data);
        console.log("=== end   ===");
        return response;
    }
}


export const http = new Http();