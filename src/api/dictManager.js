import service from '@/utils/request'
// 获取树
export function getTree() {
  return service({
    url: `nifaReport/code/listCodeType?id=&codeTypeName=`,
    method: 'get'
  })
}
// 获取右侧列表
export function getTable(params) {
  return service({
    url: `nifaReport/code/baseCode`,
    method: 'get',
    params
  })
}
// 列表删除
export function deletebaseCode(params) {
  return service({
    url: `nifaReport/code/deletebaseCode/${params}`,
    method: 'get'
  })
}
// 修改子节点数据
export function updatebasecode(params) {
  return service({
    url: `nifaReport/code/updatebasecode`,
    method: 'post',
    data: params
  })
}
// 添加子节点数据
export function addbasecode(params) {
  return service({
    url: `nifaReport/code/addbasecode`,
    method: 'post',
    data: params
  })
}
// 添加父节点数据
export function updatecodetype(params) {
  return service({
    url: `nifaReport/code/updatecodetype`,
    method: 'post',
    data: params
  })
}
// 删除父节点数据
export function deletebaseCodeType(params) {
  return service({
    url: `nifaReport/code/deletebaseCodeType/${params}`,
    method: 'get'
  })
}
// 删除父节点数据
export function addcodetype(params) {
  return service({
    url: `nifaReport/code/addcodetype`,
    method: 'post',
    data: params
  })
}
// 父节点查重
export function searchCode(params) {
  return service({
    url: `nifaReport/code/searchCode/${params}`,
    method: 'get'
  })
}
// 子节点查重
export function searchbaseCode(params) {
  return service({
    url: `nifaReport/code/searchbaseCode`,
    method: 'get',
    params
  })
}
