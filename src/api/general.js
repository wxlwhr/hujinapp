import service from '@/utils/request'
// 通用码表接口
// C2000031 ios权限
// C2000030 android权限
// C1000008 机构信息审核状态
// C5900000 产品服务类型字典
// C6100000 投诉中投诉类别
export function getClock(params) {
  return service({
    url: `nifaReport/code/baseCode/${params}`,
    method: 'get'
  })
}
// 请求省市县地址
export function getAdrr() {
  return service({
    url: 'nifaReport/code/allArea',
    method: 'get'
  })
}
// 获取机构树
export function getTree(params) {
  return service({
    // url: 'nifaReport/note/tree',
    url: 'nifaReport/note/orgtree',
    method: 'post',
    data: params
  })
}
// 工作日志
export function getWorkInfo(params) {
  return service({
    url: 'nifaReport/log/getList',
    method: 'get',
    params
  })
}
