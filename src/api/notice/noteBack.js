import service from '@/utils/request'
// ------------------------------公告 - 阅读、反馈情况-----------------------------------------------

// 根据noteId 获取列表数据
export function getListApi(params) {
  return service({
    url: 'nifaNote/note/queryOrgByCondition',
    method: 'post',
    params: params
  })
}

// 催办
export function urgingApi(params) {
  return service({
    url: 'nifaNote/note/noteToWorkBench',
    method: 'post',
    params: params
  })
}
// 反馈内容详情
export function queryOrgByRiid(params) {
  return service({
    url: 'nifaNote/note/queryOrgByRiid',
    method: 'post',
    params: params
  })
}
// 发现错误退回接口
export function noteBack(params) {
  return service({
    url: 'nifaNote/note/returnNoteBackInfoById?pnrId=' + params.pnrId + '&returnType=' + params.returnType + '&returnRemarks=' + params.returnRemarks,
    method: 'post'
  })
}
// 根据prnid获取操作记录
export function getBackByPrnid(params) {
  return service({
    url: 'nifaNote/note/returnNoteBackInfoListById?pnrId=' + params.pnrId,
    method: 'post'
  })
}
// 修改反馈时间
export function updateBackLine(data) {
  return service({
    url: '/nifaNote/note/updateBackLine',
    method: 'get',
    params: data
  })
}
