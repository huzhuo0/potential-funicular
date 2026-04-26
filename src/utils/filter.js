// // import Vue from 'vue'

// function make (id, fn) {
//   // Vue.filter(id, fn)
// }

// function makeStar (len = 1) {
//   return new Array(len).join('*')
// }

// const Sensitive = {
//   /**
//    * 手机号过滤规则：保留前3位与后4位，5-8位使用 * 替代
//    */
//   phone: (v) => {
//     if (!v) return v
//     return v.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
//   },

//   /**
//    * 邮箱脱敏规则：保留第一位与@符后全部字符，其余使用 * 替代
//    */
//   email: (v) => {
//     if (!v) return v
//     const array = v.split('@')
//     return `${array[0].charAt(0)}${makeStar(array[0].length)}@${array[1]}`
//   },

//   /**
//    * 名称脱敏规则：保留最后一位
//    * @param v
//    * @returns {*}
//    */
//   nickname: (v) => {
//     if (!v) return v
//     return v.replace(/.(?=.)/g, '*')
//   },

//   /**
//    * 身份证脱敏除了前三位和后三位
//    * @param v
//    * @returns {*}
//    */
//   idcardno: (v) => {
//     if (!v) return v
//     return v.replace(v.substring(3, v.length - 3), '*'.repeat(v.length - 6))
//   },

//   /**
//    * 前置脱敏规则，保留 start 位开头字符，其余使用 * 替代
//    * @param v
//    * @param start
//    * @returns {*}
//    */
//   headStr: (v, start = 0) => {
//     if (!v) return v
//     start = start > v.length ? 0 : start
//     const str = v.substring(start, v.length)
//     return v.replace(str, makeStar(v.length - start + 1))
//   },

//   /**
//    * 后置脱敏规则，保留 end 位结尾字符，其余使用 * 替代
//    * @param v
//    * @param end
//    * @returns {*}
//    */
//   footStr: (v, end = 0) => {
//     if (!v) return v
//     end = end > v.length ? v.length : end
//     const str = v.substring(0, end + 1)
//     return v.replace(str, makeStar(v.length - end + 1))
//   }
// }

// /**
//  * 全局过滤器，若用户不定义 filters 对象，将使用默认对象
//  * @param filters
//  */
// const filter = (filters = Sensitive) => {
//   const keys = Object.keys(filters)
//   for (const key of keys) {
//     make(key, filters[key])
//   }
// }

// export {
//   filter,
//   Sensitive
// }
