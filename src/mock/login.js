// import { param2Obj } from '@/utils'

// const userMap = {
//   admin: {
//     roles: ['admin'],
//     token: 'admin',
//     introduction: '我是超级管理员',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Super Admin'
//   },
//   huangzhihu: {
//     roles: ['huangzhihu'],
//     token: 'huangzhihu',
//     introduction: '协会',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: '黄志虎'
//   },
//   CR000000000000_001: {
//     roles: ['CR000000000000_001'],
//     token: 'CR000000000000_001',
//     introduction: '机构',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: '北京玖富时代投资顾问有限公司'
//   }
// }

// export default {
//   loginByUsername: config => {
//     const { username } = JSON.parse(config.body)
//     return userMap[username]
//   },
//   getUserInfo: config => {
//     const { token } = param2Obj(config.url)
//     if (userMap[token]) {
//       return userMap[token]
//     } else {
//       return false
//     }
//   },
//   logout: () => 'success'
// }
