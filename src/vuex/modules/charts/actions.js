import { LINE_DATA } from './types.js'
import lineData from '@/mockDatas/line2.json'

export default {
  [LINE_DATA](context, payload) {
    let p = new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(lineData)
      }, 2500)
    })

    return p
  }
}
