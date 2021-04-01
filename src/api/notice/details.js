import service from '@/utils/request'

// 撤回后可删除
export function getVivw(id) {
  return service({
    url: `nifaReport/note/get/${id}`,
    method: 'get'
  })
}
