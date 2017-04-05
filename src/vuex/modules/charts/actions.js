import { LINE_DATA } from './types.js'
import lineData from '@/mockDatas/line2.json'
import { http } from 'vue'

export default {
  [LINE_DATA](context, payload) {
    console.info(http)
    // return http.get('/lineData')
    let p = new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(lineData)
      }, 2500)
    })

    return p
  }
}
