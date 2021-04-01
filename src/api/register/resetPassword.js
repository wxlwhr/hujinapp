import service from '@/utils/request'
import Aes from '@/utils/Aes'

// 回显手机号码
export function echoPhone(params) {
  return service({
    url: '/sysmanage/sys/user/getMobileByUserName',
    method: 'get',
    params: params
  })
}
// 手机获取验证码
export function verific(yanzheng) {
  return service({
    url: `nifaReport/regist/sendCode/${yanzheng}/0`,
    method: 'post'
  })
}
// 手机获取验证码真伪
export function isVerific(sj, ym) {
  return service({
    url: `nifaReport/regist/verfiCode/${Aes.encrypt(sj)}/${ym}`,
    method: 'get'
  })
}
// 重置密码
export function resetPassword(paramObj) {
  return service({
    url: '/sysmanage/sys/user/resetPassword',
    method: 'post',
    data: paramObj
  })
}
