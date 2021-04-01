import service from '@/utils/request'

// 新增意见反馈
export function addOpinion(params) {
  return service({
    url: 'nifaReport/note/addOpinion',
    method: 'post',
    data: params
  })
}

// 反馈列表查询
export function opinionQuery(params) {
  return service({
    url: 'nifaReport/note/opinionQuery',
    method: 'post',
    data: params
  })
}

// 反馈详情
export function detail(id) {
  return service({
    url: `nifaReport/note/opinion/${id}`,
    method: 'get'
  })
}
