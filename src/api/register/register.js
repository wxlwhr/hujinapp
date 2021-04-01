import service from '@/utils/request'
import Aes from '@/utils/Aes'
// 获取版本信息
export function getBAnben(params) {
  return service({
    url: `nifaReport/regist/queryhistory`,
    method: 'get',
    params
  })
}
export function getBAnbenXQ(params) {
  return service({
    url: `nifaReport/regist/queryfilehistory`,
    method: 'get',
    params
  })
}
// 立即注册
export function registPro(params) {
  return service({
    url: 'nifaReport/regist/add',
    method: 'post',
    data: params
  })
}
// 获取验证码
export function verifyVerCode(params) {
  return service({
    url: `sysmanage/outInterFace/checkCode/${params.uuid}/${params.verifyCode}`,
    method: 'get'
  })
}
// 修改
export function upData(params) {
  return service({
    url: 'nifaReport/regist/update',
    method: 'post',
    data: params
  })
}

// 注册回显
export function registVivw(params) {
  return service({
    url: `nifaReport/regist/${params}`,
    method: 'get'
  })
}
// 文件删除
export function deleteaAttach(params) {
  return service({
    url: `nifa-autonomy-file/upload/delete-attach/${params}`,
    method: 'get'
  })
}
// 组织机构回显
export function ozcdVivw(params) {
  return service({
    url: `nifaReport/regist/history`,
    method: 'get',
    params
  })
}
// succ回显
export function succVivw(params) {
  return service({
    url: `nifaReport/regist/checksucc`,
    method: 'get',
    params
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
// 修改密码
export function modifyPassword(params) {
  return service({
    url: `sysmanage/sys/user/retpassword`,
    method: 'post',
    data: params
  })
}
// 文件回显
export function HXSearchFil(params) {
  return service({
    url: 'nifa-autonomy-file/upload/fileList?noteId=' + params,
    method: 'get'
  })
}
// 文件回显
export function HXSearchList(data) {
  return service({
    url: 'nifa-autonomy-file/upload/fileListType',
    method: 'get',
    params: data
  })
}
// 机构列表
export function JgzSearch(paramObj) {
  return service({
    url: 'nifaReport/regist/list',
    method: 'post',
    data: paramObj
  })
}
// 手机获取验证码
export function deleteJG(params) {
  return service({
    url: `nifaReport/regist/delete`,
    method: 'get',
    params
  })
}
// 请求授权函
export function ISocr(params) {
  return service({
    url: 'nifaReport/regist/ocr',
    method: 'get',
    params
  })
}
// 工作流提交审核
export function flowRecord(params) {
  return service({
    url: 'nifaReport/regist/flowRecord',
    method: 'post',
    data: params
  })
}
// 工作流提核
export function reviewAudit(params) {
  return service({
    url: 'nifaReport/review/audit',
    method: 'post',
    data: params
  })
}
// 工作流详情
export function WorkFlow(data) {
  return service({
    url: '/nifaReport/workflow/flowFormdata',
    method: 'get',
    params: data
  })
}
// 图片回显
export function imgVive(params) {
  return service({
    url: `nifa-autonomy-file/biz/previewPic/${params}`,
    method: 'get'
  })
}
// 审核流程
export function registRiid(riid) {
  return service({
    url: `nifaReport/audit/org/${riid}`,
    method: 'get'
  })
}
// 变更记录
export function getChangeDetails(riid, version) {
  return service({
    url: `nifaReport/regist/getChangeRecord/${riid}?version=${version}`,
    method: 'get'
  })
}
export function getChangeApp(riid, version) {
  return service({
    url: `nifaReport/app/record/getChangeRecord/${riid}?version=${version}`,
    method: 'get'
  })
}
// 查询出所有已经备案的检测机构
export function querydeletectionList() {
  return service({
    url: `nifaReport/detection/querydeletectionList`,
    method: 'post'
  })
}

// 删除认证所关联的检测机构
export function deletedetectionauth(data) {
  return service({
    url: `nifaReport/detection/deletedetectionauth`,
    method: 'post',
    data
  })
}

// 查询所有的已关联的检测机构（带分页）
export function querylist(data) {
  return service({
    url: `nifaReport/detection/querylist`,
    method: 'post',
    data
  })
}

// 添加已备案的检测机构
export function audit(data) {
  return service({
    url: `nifaReport/detection/audit`,
    method: 'post',
    data
  })
}
// 查询出所有已经关联的检测机构
export function queryDetectionAuth(data) {
  return service({
    url: `nifaReport/detection/queryDetectionAuth`,
    method: 'post',
    data
  })
}
// 检测最后调的接口
export function clearOrgMemData() {
  return service({
    url: `nifaReport/workflow/clearOrgMemData`,
    method: 'post'
  })
}
