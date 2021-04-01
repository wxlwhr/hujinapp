import request from '@/utils/request'
import { sm3 } from '@/utils/sm3'
import Aes from '@/utils/Aes'
import 'url-search-params-polyfill'

export function loginByUsername(username, password, verifyCode, uuid, loginWeb) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', `${sm3(password)}`)
  params.append('verifyCode', verifyCode)
  params.append('uuid', uuid)
  params.append('loginWeb', loginWeb)
  return request({
    url: '/login/nifa/login',
    method: 'post',
    data: params
  })
}
// 登录
export function JGloginByUsername(params) {
  return request({
    url: 'sysmanage/sys/user/login',
    method: 'post',
    data: params
  })
}
export function updatePwdData(userName, pwOld, pwNew) {
  return request({
    url: '/sysmanage/outInterFace/updatePw-remote', // sysmanage/sys/user/updatePw-remote
    method: 'post',
    data: {
      userName: userName || '',
      pwOld: pwOld,
      pwNew: pwNew
    }
  })
}

// 登出
export function logout() {
  return request({
    url: 'login/logout',
    method: 'get'
  })
}

// 获取用户信息
export function getUserInfo(obj) {
  return request({
    url: '/sysmanage/outInterFace/user-info',
    method: 'get',
    params: obj
  })
}
// 账号移交
export function userinfo(paramsObj) {
  return request({
    url: 'sysmanage/outInterFace/user/info',
    method: 'get',
    params: paramsObj
  })
}
// 账号移交
export function updateinfo(paramsObj) {
  paramsObj.mobile = Aes.encrypt(paramsObj.mobile)
  return request({
    url: 'sysmanage/outInterFace/user/updateinfo',
    method: 'post',
    data: paramsObj
  })
}
// 账号移交
export function getmap(chinaId) {
  return request({
    url: './static/json/map/' + chinaId + '.json',
    method: 'get'
  })
}
