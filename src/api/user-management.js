import service from '@/utils/request'
import Aes from '@/utils/Aes'
// 分支机构获取列表数据
export function getList(paramsObj) {
  return service({
    url: 'sysmanage/outInterFace/user/list',
    method: 'get',
    params: paramsObj
  })
}
// 新建用户的用户名
export function countOrg(paramsObj) {
  return service({
    url: 'sysmanage/outInterFace/countOrg',
    method: 'get',
    params: paramsObj
  })
}
// 新建用户
export function addBranch(paramObj) {
  return service({
    url: 'sysmanage/outInterFace/saveuser-nifa',
    method: 'post',
    data: paramObj
  })
}
// 用户修改
export function updateBranch(paramObj) {
  var obj = JSON.parse(JSON.stringify(paramObj))
  if (obj.mobile) obj.mobile = Aes.encrypt(obj.mobile)
  return service({
    url: 'sysmanage/outInterFace/user/updateinfo',
    method: 'post',
    data: obj
  })
}
// 用户角色
export function changeRole(params) {
  return service({
    url: '/sysmanage/outInterFace/getRoleByType',
    method: 'get',
    params
  })
}
// 获取监管树
export function getTreeJG(paramsObj) {
  return service({
    url: 'sysmanage/sys/user/getTreeForPresentUser',
    method: 'get',
    params: paramsObj
  })
}
// 账号状态
export function userStatus(paramsObj) {
  return service({
    url: '/sysmanage/outInterFace/user/modifyStatus',
    method: 'post',
    data: paramsObj
  })
}
// 增加监管记录
export function submit(paramObj) {
  return service({
    url: '/nifaReport/supervise/submit' + '?uuid' + '=' + paramObj.sushipei,
    method: 'post',
    data: paramObj
  })
}
// 获取机构树
export function getBranchByUserId(paramsObj) {
  return service({
    url: 'nifaServer/branch/getBranchByUserId',
    method: 'get',
    params: paramsObj
  })
}
// 账号移交
export function userinfo(paramsObj) {
  return service({
    url: 'sysmanage/outInterFace/user/info',
    method: 'get',
    params: paramsObj
  })
}
// 重置密码
export function resetPassword(paramsObj) {
  return service({
    url: 'sysmanage/outInterFace/user/modifyPwd',
    method: 'post',
    data: paramsObj
  })
}
