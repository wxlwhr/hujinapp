import service from '@/utils/request'

// 获取APP备案排名信息
export function getAppRecordRanking() {
  return service({
    url: `nifaReport/screen/province`,
    method: 'get'
  })
}

// 获取APP备案类型分布
export function getAppTypeOfIndustryFiling() {
  return service({
    url: `nifaReport/screen/type`,
    method: 'get'
  })
}

// 获取APP备案数量分布
export function getAppNumberOfRecords() {
  return service({
    url: `nifaReport/screen/app-count`,
    method: 'get'
  })
}

// 获取备案类型分布
export function getFilingType() {
  return service({
    url: `nifaReport/screen/app-type`,
    method: 'get'
  })
}

// 获取备案类型分布
export function getApplicationPermissions(params) {
  return service({
    url: `nifaReport/screen/app-perm`,
    method: 'get',
    params
  })
}

// 获取全局的number数据
export function getNumberData() {
  return service({
    url: `nifaReport/screen/synthesize`,
    method: 'get'
  })
}

// 获取备案趋势
export function getFilingTrendT(params) {
  return service({
    url: `nifaReport/screen/tendency`,
    method: 'get',
    params
  })
}

// 区块链相关数据展示
export function blockChainDataShow() {
  return service({
    url: `nifaReport/blockchain/queryScreen`,
    method: 'get'
  })
}

// 获取省级的数据
export function getProvinceData(params) {
  return service({
    url: `nifaReport/screen/area-skim`,
    method: 'get',
    params
  })
}

