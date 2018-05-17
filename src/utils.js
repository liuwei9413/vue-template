import md5 from 'md5'
import base64 from 'base64-js'

function strToBase64(str) {
  let uint8array = new TextEncoder('utf-8').encode(str)
  return base64.fromByteArray(uint8array)
}

function fromBase64(base64str) {
  let array = base64.toByteArray(base64str)
  return new TextDecoder('utf-8').decode(array)
}

export const encrypt = function(str) {
  return md5(str)
}

export const setStorage = function(key, obj) {
  let json = JSON.stringify(obj)
  window.localStorage.setItem(key, strToBase64(json))
}

export const getStorage = function(key) {
  const str = window.localStorage.getItem(key)
  if (!str) {
    return null
  }
  const jsonStr = fromBase64(str)
  return JSON.parse(jsonStr)
}

export const clear = function() {
  window.localStorage.clear()
}

export const removeStorage = function(key) {
  window.localStorage.removeItem(key)
}

export const base64Imag2Blob = function(base64Str) {
  const parts = base64Str.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uint8array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; i++) {
    uint8array[i] = raw.charCodeAt(i)
  }
  return new Blob([uint8array], {type: contentType})
}

// 时间戳格式化
export const dateFormat = function(timestamp, format) {
  var newDate = new Date()
  newDate.setTime(timestamp * 1000)
  var date = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S+': newDate.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0' （左补0）
function getFormatDate(arg) {
  if (arg === undefined || arg === '') {
    return ''
  }

  var re = arg + ''
  if (re.length < 2) {
    re = '0' + re
  }

  return re
}

// 日期，在原有日期基础上，增加days天数，默认增加1天
export const addDate = function(dateArg, days) {
  if (days === undefined || days === '') {
    days = 1
  }
  var date = new Date(dateArg)
  date.setDate(date.getDate() + days)
  var month = date.getMonth() + 1
  var day = date.getDate()
  return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day)
}

// 滚动到顶部
export const scrollToTop = function() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
// 过程状态 1.交易文件生成中 2.交易文件已生成 3.交易文件生成失败 4.交易文件已下载 5.交易签名文件已上传 6.签名文件审核中 7.签名文件审核失败 8.审核异常已处理  9.交易广播中  10.交易广播全部完成  11.交易广播部分完成(待补打) 12.交易广播部分完成(已补打) 13.交易广播全部完成(区块内没有需要置换的交易)
// 状态6-9 未完成  状态1-5||10-13 latest接口拿operid

export const statusToStr = function(status) {
  let str = ''
  switch (status) {
    case '10':
      str = '交易完成'
      break
    case '1':
      str = '文件生成中'
      break
    case '2':
      str = '文件已生成'
      break
    case '6':
      str = '审核中'
      break
    case '7':
      str = '审核异常'
      break
    case '8':
      str = '审核异常已处理'
      break
    case '9':
      str = '广播中'
      break
    case '11':
      str = '交易部分完成（待补打）'
      break
    case '12':
      str = '交易部分完成（已补打）'
      break
    case '3':
      str = '文件生成失败'
      break
    case '4':
      str = '已下载'
      break
    case '5':
      str = '已上传'
      break
    case '13':
      str = '交易广播全部完成(区块内没有需要置换的交易)'
      break
  }
  return str
}
