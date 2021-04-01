import service from '@/utils/request'
// 新增、批量新增
export function newSet(params) {
  return service({
    url: `nifaReport/app/risk/save`,
    method: 'post',
    data: params
  })
}
// 新增时，查询机构和app
export function queryByRinm(params) {
  return service({
    url: `nifaReport/app/risk/queryByRinm`,
    method: 'post',
    data: params
  })
}

// 新增时，查询机构和app
export function queryReportByRinm(params) {
  return service({
    url: `nifaReport/app/risk/queryReportByRinm`,
    method: 'post',
    data: params
  })
}

// 查询监测机构
export function queryMonitor(params) {
  return service({
    url: `nifaReport/app/risk/queryMonitor/${params}`,
    method: 'get'
  })
}

// 金融机构模糊查询
export function queryOrg(params) {
  return service({
    url: `nifaReport/app/risk/queryOrg/${params}`,
    method: 'get'
  })
}
// 列表查询
export function querySearch(params) {
  return service({
    url: `nifaReport/app/risk/query`,
    method: 'post',
    data: params
  })
}

// 修改、删除
export function update(params) {
  return service({
    url: `nifaReport/app/risk/update`,
    method: 'post',
    data: params
  })
}

// 修改、删除
export function modify(params) {
  return service({
    url: `nifaReport/app/risk/modify`,
    method: 'post',
    data: params
  })
}

// 新增风险报告
export function saveReport(params) {
  return service({
    url: `nifaReport/app/risk/saveReport`,
    method: 'post',
    data: params
  })
}

// 风险报告列表查询
export function queryReport(params) {
  return service({
    url: `nifaReport/app/risk/queryReport`,
    method: 'post',
    data: params
  })
}

// 风险报告查看详情
export function riskReportDetail(id) {
  return service({
    url: `nifaReport/app/risk/report/${id}`,
    method: 'get'
  })
}

// 风险报告转发、反馈
export function updateReport(params) {
  return service({
    url: `nifaReport/app/risk/updateReport`,
    method: 'post',
    data: params
  })
}
// 风险报告 删除
export function deleteReport(params) {
  return service({
    url: `nifaReport/app/risk/deleteReport`,
    method: 'post',
    data: params
  })
}
// 钓鱼仿冒定时获取数据开关
export function task(status) {
  return service({
    url: `nifaReport/risk/fishing/task/${status}`,
    method: 'get'
  })
}

// 钓鱼仿冒定时获取数据开关状态获取
export function taskStatus() {
  return service({
    url: `nifaReport/risk/fishing/task/status`,
    method: 'get'
  })
}

// 钓鱼仿冒定时获取数据-手动拉取
export function taskPull() {
  return service({
    url: `nifaReport/risk/fishing/task/pull`,
    method: 'get'
  })
}

// 钓鱼仿冒列表查询
export function fishingQuery(params) {
  return service({
    url: `nifaReport/risk/fishing/query`,
    method: 'post',
    data: params
  })
}

// 钓鱼仿冒数据操作
export function fishingUpdate(params) {
  return service({
    url: `nifaReport/risk/fishing/update`,
    method: 'post',
    data: params
  })
}

// 列表查看
export function fishingLook(primaryKey) {
  return service({
    url: `nifaReport/risk/fishing/${primaryKey}`,
    method: 'get'
  })
}
