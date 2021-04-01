import service from '@/utils/request'
// 查询列表
export function searchQuery(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/query`,
    method: 'post',
    data: params
  })
}
// 名单列表
export function searchMingdan(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/recordlist`,
    method: 'post',
    data: params
  })
}
// 查询详情
export function queryOne(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/queryOne`,
    method: 'get',
    params
  })
}
// 查询排序列表
export function serachrecord(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/serachrecord`,
    method: 'post',
    data: params
  })
}
// 修改排序
export function recordsort(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/recordsort`,
    method: 'get',
    params
  })
}
// 查询机构详情
export function searchOrgonfo(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/searchOrgonfo`,
    method: 'get',
    params
  })
}
// 更改状态
export function whetheropen(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/whetheropen`,
    method: 'get',
    params
  })
}
// 更改状态
export function downloadopen(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/downloadopen`,
    method: 'get',
    params
  })
}
// 合并型维护
export function resetname(params) {
  return service({
    url: `nifaRecordQuery/app/recordquery/resetname`,
    method: 'get',
    params
  })
}
// 获取地区
export function getAdrr() {
  return service({
    url: 'nifaRecordQuery/app/recordquery/allArea',
    method: 'get'
  })
}
// 移动端页面接口
export function searchModel(params) {
  return service({
    url: `nifaRecordQuery/mftps/query`,
    method: 'post',
    data: params
  })
}
// 查询详情
export function searchModelone(params) {
  return service({
    url: `nifaRecordQuery/mftps/${params}`,
    method: 'get'
  })
}
