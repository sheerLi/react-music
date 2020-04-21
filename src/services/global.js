/* eslint prefer-promise-reject-errors: 0 */ // --> OFF

import { Axios } from "@/helpers";

export default class AppService {
  static addErrorHandle = (errorHandle) => {
    if (!AppService.hasDefaultHandle) {
      AppService.addDefaultResponseInterceptor();
      AppService.hasDefaultHandle = true;
    }

    Axios.addResponseInterceptor(undefined, (data) => {
      if (!data.ignoreError) {
        errorHandle(data);
      }

      return Promise.reject(data);
    });
  };

  static addDefaultResponseInterceptor = () => {
    Axios.addResponseInterceptor(
      (response) => {
        if (response.data.code === 200) {
          return response.data;
        }

        let msg = response.data.msg || "未知错误";

        // if (Error[response.data.code]) {
        //   msg = Error[response.data.code];
        // }

        return Promise.reject({
          ...response.data,
          ignoreError: response.config.headers["x-ignore-default-error-handle"],
          msg,
        });
      },
      (error) => {
        const msg =
          (error.response && error.response.data && error.response.data.msg) ||
          "未知错误";

        return Promise.reject({
          ignoreError: false,
          msg,
        });
      }
    );
  };
}
