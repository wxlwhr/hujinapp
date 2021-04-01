import service from '@/utils/request'
// 认证单位
export function certificationUnit(data) {
  return service({
    url: '/nifaReport/app/record/queryAuOrg',
    method: 'get',
    params: data
  })
}
// 认证工作流详情
export function rzWorkFlow(data) {
  return service({
    url: '/nifaReport/workflow/flowFormdata',
    method: 'get',
    params: data
  })
}
// 图片回显
export function imgVive(params) {
  return service({
    url: `nifa-autonomy-file/upload/biz/previewPic/${params}`,
    method: 'get'
  })
}
// 三级层级机构数据请求
export function getTree(data) {
  return service({
    url: 'nifaReport/app/record/queryItemTree',
    method: 'get',
    params: data
  })
}
// 认证
export function getRenzheng(data) {
  return service({
    url: 'nifaReport/app/record/queryItemTree',
    method: 'get',
    params: data
  })
}
// 文件删除
export function deleteaAttach(params) {
  return service({
    url: `nifa-autonomy-file/upload/delete-attach/${params}`,
    method: 'get'
  })
}
// 回显
export function searchQuery(params) {
  return service({
    url: `nifaReport/app/record/query`,
    method: 'post',
    data: params
  })
}
// 文件回显
export function HXSearchFil(params) {
  return service({
    url: 'nifa-autonomy-file/upload/fileList?noteId=' + params,
    method: 'get'
  })
}
// 文件回显
export function HXSearchList(data) {
  return service({
    url: 'nifa-autonomy-file/upload/fileListType',
    method: 'get',
    params: data
  })
}
// 备案信息
export function proChange(paramObj) {
  return service({
    url: 'nifaReport/app/record/update',
    method: 'post',
    data: paramObj
  })
}
// 备案信息(直接到检测，无认证机构流程)
export function proChangeToTest(paramObj) {
  return service({
    url: 'nifaReport/app/record/detection/update',
    method: 'post',
    data: paramObj
  })
}
// 关联备案新增
export function saveGuanlian(paramObj) {
  return service({
    url: 'nifaReport/app/record/osnm/save',
    method: 'post',
    data: paramObj
  })
}
// 获取检测认证全部字典数据
export function getNewTree(params) {
  return service({
    url: `nifaReport/dict/tree/${params}`,
    method: 'get'
  })
}
// 修改提交审核
export function submitChange(paramObj) {
  return service({
    url: 'nifaReport/app/record/updateChange',
    method: 'post',
    data: paramObj
  })
}
export function addPro(paramObj) {
  return service({
    url: 'nifaReport/app/record/add',
    method: 'post',
    data: paramObj
  })
}
// app备案新增
export function savePro(paramObj) {
  return service({
    url: 'nifaReport/app/record/save',
    method: 'post',
    data: paramObj
  })
}

export function previewImage(params) {
  return service({
    url: `nifa-autonomy-file/biz/previewPic/${params}`,
    method: 'get'
  })
}

export function deleteApp(params) {
  return service({
    url: `nifaReport/app/record/remove/${params}`,
    method: 'delete'
  })
}
// 删除流程中的app
export function deleteAppNew(params) {
  return service({
    url: `nifaReport/app/record/delete/${params}`,
    method: 'delete'
  })
}
// 审核记录
export function registRiid(riid) {
  return service({
    url: `nifaReport/audit/app/${riid}`,
    method: 'get'
  })
}
// 详情信息
export function ApprecordDetails(paramObj) {
  return service({
    url: `nifaReport/app/record/${paramObj}`,
    method: 'get'
  })
}

// 备案注销
export function ApprecordCancellation(paramObj, data) {
  return service({
    url: `nifaReport/app/record/relieve/${paramObj}`,
    method: 'put',
    data
  })
}
// 获取历史版本
export function historyEdition(paramObj) {
  return service({
    url: `nifaReport/app/record/versions/${paramObj}`,
    method: 'get'
  })
}
// 切换历史版本
export function switchEdition(paramObj) {
  return service({
    url: `nifaReport/app/record/history/${paramObj}`,
    method: 'get'
  })
}
// 重大变更
export function majorChange(paramObj) {
  return service({
    url: 'nifaReport/app/record/majorChange',
    method: 'post',
    data: paramObj
  })
}
// 检测机构获取认证的用户信息
export function getUserInfo(params) {
  return service({
    url: `sysmanage/outInterFace/getUserInfo/${params}`,
    method: 'get'
  })
}

// 判断数据是否新增完成
export function statusComplate(params) {
  return service({
    url: `nifaReport/app/record/status/${params}`,
    method: 'get'
  })
}
// 上架
export function putaway(id, params) {
  return service({
    url: `nifaReport/app/store/putaway/${id}`,
    method: 'get',
    params
  })
}
// 下架
export function soldOut(id, params) {
  return service({
    url: `nifaReport/app/store/soldOut/${id}`,
    method: 'get',
    params
  })
}
