import service from '@/utils/request'
// 签署
export function saveDsp(params) {
  return service({
    url: `nifaReport/dsp/saveDsp`,
    method: 'post',
    data: params
  })
}

// 查询是否签署过
export function dspSearch(riid) {
  return service({
    url: `nifaReport/dsp/${riid}`,
    method: 'get'
  })
}

// 提醒
export function remind(riid) {
  return service({
    url: `nifaReport/dsp/remind/${riid}`,
    method: 'get'
  })
}

// 签署列表查询
export function query(params) {
  return service({
    url: `nifaReport/dsp/query`,
    method: 'post',
    data: params
  })
}

// 备案版本更新查询列表
export function version(params) {
  return service({
    url: `nifaReport/dsp/version/query`,
    method: 'post',
    data: params
  })
}

// 更新提醒和查看版本列表
export function his(params) {
  return service({
    url: `nifaReport/dsp/his`,
    method: 'post',
    data: params
  })
}

// 删除备案版本
export function relieve(id) {
  return service({
    url: `nifaReport/dsp/relieve/${id}`,
    method: 'put'
  })
}

// 版本更新消息提醒
export function versionRemind(primaryKey) {
  return service({
    url: `nifaReport/dsp/remind/version/${primaryKey}`,
    method: 'get'
  })
}
