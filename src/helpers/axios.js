import axios from 'axios';

export default class Axios {
  static get(url, data) {
    return axios.get(url, { params: data });
  }

  static post(url, data, config) {
    return axios.post(url, data, config);
  }

  static setBaseURL(url) {
    axios.defaults.baseURL = url;
  }

  static addRequestInterceptor(interceptor, onRejected) {
    axios.interceptors.request.use(interceptor, onRejected);
  }

  static addResponseInterceptor(interceptor, onRejected) {
    axios.interceptors.response.use(interceptor, onRejected);
  }
}
