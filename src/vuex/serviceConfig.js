import Axios from 'axios'

// Axios doc https://github.com/mzabriskie/axios

Axios.defaults.baseURL = 'http://api.bitse.com:4000'
Axios.defaults.headers.common['Authorization'] = 'token' // Cookie.get()
Axios.defaults.headers.post['Content-Type'] = 'application/json'
