import service from '@/utils/request'
// 获取树
export function getTree(params) {
  return service({
    url: `nifaReport/dict/tree/${params}`,
    method: 'get'
  })
}
// 添加子节点数据
export function addbasecode(params) {
  return service({
    url: `nifaReport/dict`,
    method: 'post',
    data: params
  })
}
// 修改子节点数据
export function updatebasecode(params) {
  return service({
    url: `nifaReport/dict/update`,
    method: 'put',
    data: params
  })
}
// 删除父节点数据
export function deleteId(params) {
  return service({
    url: `nifaReport/dict/${params}`,
    method: 'delete'
  })
}

// -----------------科技产品监管字典------------------------

// 获取树
export function getSuperviseTree(parentId) {
  return service({
    url: `nifaReport/supervise/tree/${parentId}`,
    method: 'get'
  })
}

// 添加子节点数据
export function superviseAdd(params) {
  return service({
    url: `nifaReport/supervise`,
    method: 'post',
    data: params
  })
}

// 修改子节点数据
export function superviseUpdate(params) {
  return service({
    url: `nifaReport/supervise/update`,
    method: 'put',
    data: params
  })
}

// 删除父节点数据
export function superviseDelete(params) {
  return service({
    url: `nifaReport/supervise/${params}`,
    method: 'delete'
  })
}

// 根据字典id查询摸排要点的接口
export function gist(id) {
  return service({
    url: `nifaReport/supervise/gist/${id}`,
    method: 'get'
  })
}
