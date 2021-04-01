import service from '@/utils/request'
// 待办数据请求
export function oparateData(params) {
  return service({
    url: 'nifaReport/workflow/flowTodoPageClain',
    method: 'get',
    params
  })
}
// 消息提醒
export function getData(params) {
  return service({
    url: 'nifaReport/workflow/flowHaddonePage',
    method: 'get',
    params
  })
}
// 消息
export function getmessage(params) {
  return service({
    url: 'nifaReport/message/queryMessage',
    method: 'post',
    data: params
  })
}
// 改变阅读状态
export function updateMessage(params) {
  return service({
    url: 'nifaReport/message/updateMessage',
    method: 'post',
    data: params
  })
}
