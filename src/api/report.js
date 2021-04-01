import service from '@/utils/request'
// 根据金融机构查询对应app
export function queryByRinm(params) {
  return service({
    url: `nifaInform/inform/queryByRinm`,
    method: 'post',
    data: params
  })
}

// 投诉提交
export function save(params) {
  return service({
    url: `nifaInform/inform/save`,
    method: 'post',
    data: params
  })
}

// 项目查询
export function projectSearch(params) {
  return service({
    url: `nifaInform/inform/project/${params}`,
    method: 'get'
  })
}

// 机构查询
export function registSearch(params) {
  return service({
    url: `/nifaInform/inform/org/${params}`,
    method: 'get'
  })
}

// 手机号加编号查询
export function queryProgress(params) {
  return service({
    url: `nifaInform/inform/queryProgress`,
    method: 'post',
    data: params
  })
}

// 手动转发、处理
export function update(params) {
  return service({
    url: `nifaInform/inform/update`,
    method: 'post',
    data: params
  })
}

// 自动转发
export function forward(params) {
  return service({
    url: `nifaInform/inform/update/forward`,
    method: 'post',
    data: params
  })
}

// 列表查询
export function query(params) {
  return service({
    url: `nifaInform/inform/query`,
    method: 'post',
    data: params
  })
}

// 列表详情
export function inform(params) {
  return service({
    url: `nifaInform/inform/${params}`,
    method: 'get'
  })
}
