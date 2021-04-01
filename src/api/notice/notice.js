import service from '@/utils/request'
// 列表数据
export function getListApi(params) {
  return service({
    url: 'nifaReport/note/releaseQuery',
    method: 'post',
    data: params
  })
}
// 接收方获取列表
export function getListApijs(params) {
  return service({
    url: 'nifaReport/note/receiveQuery',
    method: 'post',
    data: params
  })
}
// 删除
export function goDelete(id) {
  return service({
    url: `nifaReport/note/delete/${id}`,
    method: 'get'
  })
}
