import Vue from 'vue'
import VueI18n from 'vue-i18n'

import elen from 'element-ui/lib/locale/lang/en'
import elcn from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale/'

import en from './en-US.js'
import cn from './zh-CN.js'

Vue.use(VueI18n)

const defaultLang = 'en'

// element i18n config
locale.use(defaultLang === 'en' ? elen : elcn)

let i18n = new VueI18n({
  locale: defaultLang,
  messages: {
    en,
    cn
  }
})
export default i18n

// vue-i18n locale setting
// Vue.$i18n.locale = 'en'
