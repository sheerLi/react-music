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

// 歌词解析
export function parseLyric(lrc) {
  const timeExp = /\[(\d{2,}):(\d{2})\.(\d{2,3})?]/g
  const lines = lrc.split('\n')
  const lyric = []
  lines.forEach(item => {
    const result = timeExp.exec(item);
    if(!result) {
      return true;
    }
    const text = item.replace(timeExp, '').trim();
    if(text) {
      lyric.push({
        time: (result[1] * 6e4 + result[2] * 1e3 + (result[3] || 0) * 1) / 1e3,
        text
      })
    }
  });
  return lyric;
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
