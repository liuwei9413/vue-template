import { CHECK_USERNAME, CHECK_PASSWORD } from './types.js'
// import Axios from 'axios'

// const api = Axios.create()

export default {
  [CHECK_USERNAME]: (conext, { name = '' }) => {
    // api.post('/accounttokens', {username: '123', password: 'adsf'})
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve((name === 'Sherry'))
      }, 1000)
    })
  },
  [CHECK_PASSWORD]: (conext, { name = '', password = '' }) => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve((password === '1234567890' && name === 'Sherry'))
      }, 1000)
    })
  }
}
