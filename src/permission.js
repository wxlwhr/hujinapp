import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  '/login', // 登陆页
  '/promise', // 准备页
  '/registerone', // 填写资料页
  '/registerRz', // 填写认证料页
  '/registerJc', // 填写检测资料页
  '/registerKj', // 填写公司资料页
  '/waiting', // 注册成功等待的页面
  '/changeNumber', // 更换手机号提示页面
  '/retrievePassword', // 找回密码
  '/changePassword', // 修改密码
  '/list', // 备案查看
  '/beianxiang', // 备案详情
  '/wouldLikeReport', // 风险举报之我要举报
  '/wouldLikeReportTN', // 风险举报之金融科技举报
  '/choseReportWay', // 风险举报之举报类型
  '/reportSearch', // 风险举报之举报查询
  '/reportSearchDetail', // 举报详情
  '/report' // 风险举报首页
] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (from.name !== null) {
    sessionStorage.setItem('routerName', from.name)
  }
  if (getToken() && to.name !== 'list' && to.name !== 'beianxiang') {
  // determine if there has token
  /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.permissions_routers.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => {
        // 拉取user_info
          const permissions_routers = res.permission_routers
          store.dispatch('GenerateRoutes', { permissions_routers }).then(() => {
          // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
