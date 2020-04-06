// 时间格式化
export function format(value) {
  let minute = Math.floor(value / 60);
  let second = Math.floor(value % 60);
  return `${addZero(minute)}:${addZero(second)}`;
}

// 补0函数
export function addZero(s) {
  return s < 10 ? "0" + s : s;
}

/**
 * https://github.com/videojs/video.js/blob/master/src/js/utils/promise.js
 * Silence a Promise-like object.
 *
 * This is useful for avoiding non-harmful, but potentially confusing "uncaught
 * play promise" rejection error messages.
 *
 * @param  {Object} value
 *         An object that may or may not be `Promise`-like.
 */
export function isPromise(v) {
  return v !== undefined && v !== null && typeof v.then === 'function'
}

export function silencePromise(value) {
  if (isPromise(value)) {
    value.then(null, () => {})
  }
}
