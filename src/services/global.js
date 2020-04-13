/* eslint prefer-promise-reject-errors: 0 */ // --> OFF

import { Axios } from '@/helpers';

export default class AppService {
  static addErrorHandle = errorHandle => {
    if (!AppService.hasDefaultHandle) {
      AppService.addDefaultResponseInterceptor();
      AppService.hasDefaultHandle = true;
    }

    Axios.addResponseInterceptor(undefined, data => {
      if (!data.ignoreError) {
        errorHandle(data.msg);
      }
      return Promise.reject(data.msg);
    });

  };

  static addDefaultResponseInterceptor = () => {
    Axios.addResponseInterceptor(
      response => {
        if (response.status === 200) {
          return response.data;
        }

        const msg = response.data.msg || '未知错误';

        return Promise.reject({
          ignoreError: response.config.headers['x-ignore-default-error-handle'],
          msg,
        });
      },
      error => {
        const msg =
          (error.response && error.response.data && error.response.data.msg) || '未知错误';

        return Promise.reject({
          ignoreError: false,
          msg,
        });
      }
    );
  };

  static hasDefaultHandle = false;
}
