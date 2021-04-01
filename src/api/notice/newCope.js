import service from '@/utils/request'

// 暂存，新增
export function announcement(params) {
  return service({
    url: 'nifaReport/note/add',
    method: 'post',
    data: params
  })
}
export function announcementUP(params) {
  return service({
    url: 'nifaReport/note/update',
    method: 'post',
    data: params
  })
}
// 注册时候的模糊查询
export function certificationUnit(params) {
  return service({
    url: `nifaReport/note/getrinm`,
    method: 'get',
    params
  })
}
