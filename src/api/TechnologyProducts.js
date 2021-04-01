import service from '@/utils/request'
// 列表查询
export function query(params) {
  return service({
    url: `nifaReport/product/query`,
    method: 'post',
    data: params
  })
}

// 列表查询
export function queryOrg(params) {
  return service({
    url: `nifaReport/product/queryOrg`,
    method: 'post',
    data: params
  })
}

// 新增
export function add(params) {
  return service({
    url: `nifaReport/product/add`,
    method: 'post',
    data: params
  })
}

// 查看详情
export function queryMonitor(id) {
  return service({
    url: `nifaReport/product/queryOne?id=${id}`,
    method: 'get'
  })
}

// SubmiSsion 1,编辑/保存，2撤回按钮，3下架
export function pruductupdate(params) {
  return service({
    url: `nifaReport/product/pruductupdate`,
    method: 'post',
    data: params
  })
}

// 提交
export function productsubmit(params) {
  return service({
    url: `nifaReport/product/productsubmit`,
    method: 'post',
    data: params
  })
}

// 删除
export function productdelete(id) {
  return service({
    url: `nifaReport/product/productdelete?id=${id}`,
    method: 'get'
  })
}

// 审核
export function shenhe(data) {
  console.log(8888, data)
  return service({
    url: `nifaReport/product/productaudit?id=${data.id}&auditStatus=${data.auditStatus}&remark=${data.remark}`,
    method: 'get'
  })
}

// 点赞
export function repeatthumb(data) {
  return service({
    url: `nifaReport/product/repeatthumb?id=${data.id}&thumb=${data.thumb}`,
    method: 'get'
  })
}

// 获取联系方式
export function getPhone(data) {
  return service({
    url: `nifaReport/product/getPhone?id=${data.id}&phone=${data.phone}`,
    method: 'get'
  })
}

// 审核、下架记录
export function productauditlog(id) {
  return service({
    url: `nifaReport/product/productauditlog?id=${id}`,
    method: 'get'
  })
}

// 获取手机号
export function phone(id) {
  return service({
    url: `nifaReport/product/phone?id=${id}`,
    method: 'get'
  })
}

// 项目类型查询
export function superversionQuery(id) {
  return service({
    url: `nifaReport/supervise/tree/${id}`,
    method: 'get'
  })
}

// 项目类型回显
export function superversion(id) {
  return service({
    url: `nifaReport/product/superversion?id=${id}`,
    method: 'get'
  })
}

// 机构操作日志查询
export function queryLog(params) {
  return service({
    url: `nifaReport/product/queryLog`,
    method: 'post',
    data: params
  })
}

