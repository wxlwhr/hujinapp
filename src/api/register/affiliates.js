import service from '@/utils/request'
// 注册时候的模糊查询
export function certificationUnit(params) {
  return service({
    url: `nifaReport/osnm/osnmOrg`,
    method: 'get',
    params
  })
}
// 匹配时候的模糊查询
export function certification(params) {
  return service({
    url: `nifaReport/osnm/osnmOrgReturn`,
    method: 'get',
    params
  })
}
// 我关联的列表
export function osnmOrgList(paramObj) {
  return service({
    url: 'nifaReport/osnm/osnmOrgList',
    method: 'post',
    data: paramObj
  })
}
// 我关联啦几个
export function queryOsnmCount(params) {
  return service({
    url: 'nifaReport/osnm/queryOsnmCount',
    method: 'get',
    params
  })
}
// 关联我的列表
export function orgOsnmList(paramObj) {
  return service({
    url: 'nifaReport/osnm/orgOsnmList',
    method: 'post',
    data: paramObj
  })
}
// 协会的关联列表
export function orgOsnmListAll(paramObj) {
  return service({
    url: 'nifaReport/osnm/orgOsnmListAll',
    method: 'post',
    data: paramObj
  })
}
// App关联机构列表
export function orgList(paramObj) {
  return service({
    url: 'nifaReport/osnm/app/orgList',
    method: 'post',
    data: paramObj
  })
}
// 单个关闭共享
export function reRiidAppId(params) {
  return service({
    url: 'nifaReport/osnm/relieveByRiidAppId',
    method: 'get',
    params
  })
}
// 审核关联列表状态
export function guanlianState(paramObj) {
  return service({
    url: 'nifaReport/osnm/updatePass',
    method: 'post',
    params: paramObj
  })
}
// 获取可以关联的App
export function appglGet(params) {
  return service({
    url: `nifaReport/osnm/queryOsnmOrgApp`,
    method: 'get',
    params
  })
}
// app备案的关联App
export function appglAdd(params) {
  return service({
    url: `nifaReport/osnm/app/osnmOrg`,
    method: 'get',
    params
  })
}
// 机构信息关联的的关联App
export function osnmOrgRelevance(params) {
  return service({
    url: `nifaReport/osnm/osnmOrgRelevance`,
    method: 'get',
    params
  })
}
// 取消关联App
export function quxiaoGuanli(params) {
  return service({
    url: `nifaReport/osnm/app/remore/osnmOrg`,
    method: 'get',
    params
  })
}
// 更改共享状态
export function guanStateApp(paramObj) {
  return service({
    url: 'nifaReport/osnm/updateIsShare',
    method: 'post',
    data: paramObj
  })
}
// 备案App直接被动注销
export function relieves(id, data) {
  return service({
    url: `nifaReport/app/record/relieves/${id}`,
    method: 'put',
    data
  })
}
// 总部机构关联备案的App注销状态
export function getosnmOrg(params) {
  return service({
    url: `nifaReport/osnm/checkOrgAppCount`,
    method: 'get',
    params
  })
}
export function getriidOrg(params) {
  return service({
    url: `nifaReport/osnm/checkOsnmAppCount`,
    method: 'get',
    params
  })
}
// 查询总部机构的App状态
export function queryOsnmAppByRiid(params) {
  return service({
    url: `nifaReport/osnm/queryOsnmAppByRiid`,
    method: 'get',
    params
  })
}
