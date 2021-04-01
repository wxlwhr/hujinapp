import {
  loginByUsername,
  JGloginByUsername,
  logout,
  getUserInfo
} from '@/api/login'
import { Message } from 'element-ui'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  MessageBox
} from 'element-ui'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    id: '',
    avatar: '',
    introduction: '',
    roles: true,
    rolecode: true,
    permission_routers: [],
    permissions_routers: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_ID: (state, status) => {
      state.userId = status
    },
    SET_DEPTNAME: (state, status) => {
      state.deptName = status
    },
    SET_RINM: (state, status) => {
      state.rinm = status
    },
    SET_DEPTID: (state, status) => {
      state.deptId = status
    },
    SET_DEPTCODE: (state, status) => {
      state.deptcode = status
    },
    SET_SRNM: (state, status) => {
      state.srnm = status
    },
    SET_USERNAME: (state, status) => {
      state.userName = status
    },
    SET_RIID: (state, status) => {
      state.riid = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLECODE: (state, rolecode) => {
      state.rolecode = rolecode
    },
    SET_PERMISSIONS_ROUTERS: (state, permissions_routers) => {
      state.permissions_routers = permissions_routers
    }
  },

  actions: {
    // 审核用户名登录
    JGloginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        JGloginByUsername(userInfo).then(response => {
          if (response.result) {
            sessionStorage.setItem('RIID', response.result.riid)
            sessionStorage.setItem('userName', response.result.userName)
          }
          if (response.token) {
            const token = response.token
            commit('SET_TOKEN', token)
            setToken(token)
          }
          resolve({
            route: '/'
          })
        })
      })
    },
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(
          username,
          userInfo.password,
          userInfo.verifyCode,
          userInfo.uuid,
          userInfo.loginWeb
        )
          .then(response => {
            const token = response.access_token
            const redirect = response.redirect
            const loginLimit = response.loginLimit
            const loginWebLimit = response.loginWebLimit
            if (loginWebLimit && loginWebLimit.webLimit === '1') {
              Message.error({
                message: '账号与权限不符',
                showClose: false
              })
            }
            // 非个工作日
            if (loginLimit && loginLimit.isRedirect === '1') {
              resolve({
                message: loginLimit.message
              })
            } else {
              if (token) {
                commit('SET_TOKEN', token)
                setToken(token)
              }

              // 密码修改
              if (redirect === '0') {
                resolve({
                  route: '/changePassword'
                })
              } else {
                resolve({
                  route: '/'
                })
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo({ ownsys: 'nifa' }).then(res => {
          const data = res
          if (data.permission_routers && data.permission_routers.length > 0) {
            // if (data.userName === '91610000675118277X') {
            //   data.permission_routers.push('sys:risk', 'sys:risk:app', 'sys:risk:check')
            // }
            // 验证返回的permission_routers是否是一个非空数组
            commit('SET_PERMISSIONS_ROUTERS', data.permission_routers)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)// 用户名
          commit('SET_ID', data.userId)// 用户id
          commit('SET_DEPTNAME', data.deptName)// 部门名称
          commit('SET_DEPTID', data.deptId) // 部门id
          commit('SET_DEPTCODE', data.deptcode) // 部门id
          commit('SET_USERNAME', data.userName) // 登录名
          commit('SET_RIID', data.riid)// jigouid
          commit('SET_SRNM', data.srnm)// 机构类型
          commit('SET_RINM', data.rinm)// 机构类型
          if (data.rolecode === 'finUser2' || data.rolecode === 'tesUser2' || data.rolecode === 'cerUser2' || data.rolecode === 'kjUser2') {
            commit('SET_ROLECODE', false)// 用户角色
          }
          if (data.rolecode === 'finUser1' || data.rolecode === 'tesUser1' || data.rolecode === 'cerUser1' || data.rolecode === 'kjUser1') {
            commit('SET_ROLECODE', false)// 用户角色
          }
          if (data.userName.substring(0, 1) === 'A' || data.deptcode === 'S0000000000002' || data.deptcode === 'S0000000000007' || data.deptcode === 'S0000000000008') {
            commit('SET_ROLES', false)// 分支机构是false
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改密码时 - - 无提示强制退出   most
    MostforcedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        commit('SET_PERMISSIONS_ROUTERS', [])
        removeToken()
        resolve()
      })
    },
    // 退出
    FedLogOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        MessageBox.confirm('确定退出平台吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(_ => {
          logout().then(res => {
            if (res.code === 599) {
              commit('SET_TOKEN', '')
              commit('SET_ROLES', '')
              commit('SET_PERMISSIONS_ROUTERS', [])
              commit('SET_INSTITUTION', '')
              removeToken()
              resolve()
              // location.reload() // 为了重新实例化vue-router对象 避免bug
            }
          }).catch(error => {
            reject(error)
          })
        })
      })
    },

    // 用户互斥 - 登出
    ForcedLogOut({
      commit
    }, noRole) {
      return new Promise(resolve => {
        const tip = noRole
        // ? '可以取消继续留在该页面， 或者重新登录'
        // : '您的账号已在其它地方登录或Token已失效，请重新登录!'
        MessageBox.confirm(tip, '提示', {
          confirmButtonText: '重新登录',
          type: 'warning',
          showCancelButton: false,
          closeOnClickModal: false,
          showClose: false
        }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          commit('SET_PERMISSIONS_ROUTERS', [])
          commit('SET_INSTITUTION', '')
          removeToken()
          resolve()

          location.reload()
        })
      })
    }

    // // 动态修改权限
    // ChangeRoles({
    //   commit,
    //   dispatch
    // }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
