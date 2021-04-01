import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
import Layout from '@/views/layout/Layout'
// import LayoutHome from '@/views/layout/LayoutHome'
export const constantRouterMap = [
  // 登陆页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 找回密码
  {
    path: '/retrievePassword',
    component: () => import('@/views/login/retrievePassword'),
    hidden: true
  },
  // 修改密码
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('@/views/login/changePassword'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  // 注册通过等待页
  {
    path: '/waiting',
    name: 'waiting',
    component: () => import('@/views/register/waiting'),
    hidden: true
  },
  // 更换手机号
  {
    path: '/changeNumber',
    name: 'changeNumber',
    component: () => import('@/views/register/changeNumber'),
    hidden: true
  },
  // 准备信息页
  {
    path: '/promise',
    name: 'promise',
    component: () => import('@/views/register/indexone'),
    hidden: true
  },
  // 审核流程页
  {
    path: '/reviewProcess',
    name: 'reviewProcess',
    component: () => import('@/views/register/reviewProcess'),
    hidden: true
  },
  // 备案查询页
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/Appbeian/progress'),
    hidden: true
  },
  {
    path: '/beianxiang',
    name: 'beianxiang',
    component: () => import('@/views/Appbeian/beianxiang'),
    hidden: true
  },
  // {
  //   path: '/modellist',
  //   name: 'modellist',
  //   component: () => import('@/views/appmodel'),
  //   hidden: true
  // },
  // {
  //   path: '/modelx',
  //   name: 'modelx',
  //   component: () => import('@/views/appmodel/appmodelx'),
  //   hidden: true
  // },
  // 注册页
  {
    path: '/registerone',
    name: 'registerone',
    component: () => import('@/views/register/register'),
    hidden: true
  },
  {
    path: '/registerJc',
    name: 'registerJc',
    component: () => import('@/views/register/registerJc'),
    hidden: true
  },
  {
    path: '/registerRz',
    name: 'registerRz',
    component: () => import('@/views/register/registerRz'),
    hidden: true
  },
  {
    path: '/registerKj',
    name: 'registerKj',
    component: () => import('@/views/register/registerKj'),
    hidden: true
  },
  // 监管大屏
  {
    path: '/regulatory',
    name: 'regulatory',
    component: () => import('@/views/jgmap'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    name: 'home',
    meta: {
      roles: ['sys:home']
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home-index',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
  },
  // 工作台
  {
    path: '/worbench',
    component: Layout,
    redirect: '/worbench',
    meta: {
      title: 'worbench',
      icon: 'excel',
      roles: ['sys:worbench']
    },
    children: [
      {
        path: '/worbench',
        name: 'worbench',
        component: () => import('@/views/worbench/index'),
        meta: {
          title: '工作台'
        }
      }
    ]
  },
  // 通知公告  - 监管
  {
    path: '/notice',
    component: Layout,
    name: 'notice',
    meta: {
      title: 'notice',
      icon: 'documentation',
      roles: ['sys:notice']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/notice/index'),
        name: 'notice_index',
        meta: {
          title: '通知公告',
          roles: ['sys:notice:public']
        }
      },
      // 通知公告 - 新增
      {
        path: 'new',
        component: () => import('@/views/modules/notice/newCope'),
        name: 'notice_new',
        hidden: true,
        meta: {
          title: 'new'
        }
      },
      // 通知公告 - 意见反馈
      {
        path: 'copeAdvice',
        component: () => import('@/views/modules/notice/copeAdvice'),
        name: 'copeAdvice',
        hidden: true,
        meta: {
          title: 'copeAdvice'
        }
      },
      // 通知公告 - 意见反馈详情
      {
        path: 'copeAdviceDetail',
        component: () => import('@/views/modules/notice/copeAdviceDetail'),
        name: 'copeAdviceDetail',
        hidden: true,
        meta: {
          title: 'copeAdviceDetail'
        }
      },
      // 通知公告 - 详情
      {
        path: 'detail',
        component: () => import('@/views/modules/notice/detail'),
        name: 'notice_detail',
        hidden: true,
        always: false,
        meta: {
          title: 'detail'
        }
      },
      // 通知公告 - 阅读、反馈详情
      {
        path: '/noteBack',
        name: 'note_back',
        component: () => import('@/views/modules/notice/noteBack'),
        meta: {
          title: 'noteBack'
        },
        hidden: true
      },
      // 通知公告 - 阅读详情
      {
        path: '/noteReading',
        component: () => import('@/views/modules/notice/noteReading'),
        name: 'notice_reading',
        hidden: true,
        always: false,
        meta: {
          tagsView: true,
          title: 'noteReading'
        }
      },
      // 通知公告 - 反馈详情
      {
        path: '/notecoupleBack',
        component: () => import('@/views/modules/notice/coupleBack'),
        name: 'notice_coupleBack',
        hidden: true,
        always: false,
        meta: {
          tagsView: true,
          title: 'notecoupleBack'
        }
      }
    ]
  },
  // jgmap
  {
    path: '/jgmap',
    // component: Layout,
    // alwaysShow: true,
    meta: {
      title: '监管大屏',
      icon: 'yonghutongji',
      roles: ['sys:Jgdp'] // you can set roles in root nav
    },
    children: [
      {
        path: '/jgmap',
        redirect: '/regulatory',
        name: 'jgmap',
        meta: { title: '监管大屏' }
      }
    ]
  },
  {
    path: '/progressGl',
    component: Layout,
    meta: {
      title: '备案名单管理',
      icon: 'link',
      roles: ['sys:management']
    },
    children: [
      {
        path: '/progresslist',
        component: () => import('@/views/Appbeian/list'),
        name: 'progresslist',
        meta: { title: '备案名单管理' }
      }
    ]
  },
  // App检测
  {
    path: '/appjcxx',
    component: Layout,
    meta: {
      title: 'App检测信息',
      icon: 'example',
      roles: ['sys:appCheck']
    },
    children: [
      {
        path: '/appjc',
        name: '/appjc',
        component: () => import('@/views/Appjcrz/Appjc'),
        meta: {
          icon: 'example',
          title: 'App备案检测'
        }
      },
      {
        path: '/appjcxq',
        component: () => import('@/views/Appjcrz/Appjcxq'),
        name: 'appjcxq',
        hidden: true,
        meta: { title: 'APP备案' }
      }
    ]
  },
  // App认证
  {
    path: '/apprzxx',
    component: Layout,
    meta: {
      title: 'App认证信息',
      icon: 'example',
      roles: ['sys:appAttestation']
    },
    children: [
      {
        path: '/apprz',
        name: '/apprz',
        component: () => import('@/views/Appjcrz/Apprz'),
        meta: {
          icon: 'example',
          title: 'App备案认证'
        }
      },
      {
        path: '/apprzxq',
        component: () => import('@/views/Appjcrz/Apprzxq'),
        name: 'apprzxq',
        hidden: true,
        meta: { title: 'APP备案' }
      }
    ]
  },
  // 检测机构管理
  {
    path: '/jcjggl',
    component: Layout,
    meta: {
      title: '检测机构管理',
      icon: 'example',
      roles: ['sys:appAttestation']
    },
    children: [
      {
        path: '/InspectionOrganizationManagement',
        name: '/InspectionOrganizationManagement',
        component: () => import('@/views/Appjcrz/InspectionOrganizationManagement'),
        meta: {
          icon: 'list',
          title: '检测机构管理'
        }
      }
    ]
  },
  // APP备案
  {
    path: '/AppRegistration',
    component: Layout,
    redirect: '/AppRegistrationNew',
    meta: {
      title: 'APP备案',
      icon: 'example',
      roles: ['sys:appRecord']
    },
    children: [
      {
        path: '/AppRegistrationNew',
        component: () => import('@/views/AppRegistration/index'),
        name: 'AppRegistrationNew',
        hidden: true,
        meta: { title: 'APP备案' }
      },
      {
        path: '/Appmodify',
        component: () => import('@/views/AppRegistration/Appmodify'),
        name: 'Appmodify',
        hidden: true,
        meta: { title: 'APP修改' }
      },
      {
        path: '/newAppmodify',
        component: () => import('@/views/AppRegistration/newAppmodify'),
        name: 'newAppmodify',
        hidden: true,
        meta: { title: 'APP修改(其他认证)' }
      },
      {
        path: '/AppRegistrationVivw',
        component: () => import('@/views/AppRegistration/AppRegistrationvivw'),
        name: 'AppRegistrationVivw',
        meta: { title: 'APP新增备案' },
        hidden: true
      },
      {
        path: '/AppRegChange',
        component: () => import('@/views/AppRegistration/AppRegChange'),
        name: 'AppRegChange',
        meta: { title: 'APP查看' },
        hidden: true
      },
      {
        path: '/Appassociated',
        component: () => import('@/views/AppRegistration/associated'),
        name: 'Appassociated',
        meta: { title: 'APP关联备案' },
        hidden: true
      }
    ]
  },
  // 协会注册信息
  {
    path: '/jGmassage',
    component: Layout,
    redirect: '/JGmassage',
    // alwaysShow: true,
    meta: {
      title: '机构备案审核',
      icon: 'peoples',
      roles: ['sys:orgExamine'] // you can set roles in root nav
    },
    children: [
      {
        path: '/jgzcmassage',
        component: () => import('@/views/modules/association/index'),
        name: 'jgzcmassage',
        meta: {
          title: '金融机构审核',
          roles: ['sys:orgExamine:financial'] // you can set roles in root nav
        }
      },
      {
        path: '/kjgsmassage',
        component: () => import('@/views/modules/association/kjgsshenhe'),
        name: 'kjgsmassage',
        meta: {
          title: '科技公司审核',
          roles: ['sys:orgExamine:science'] // you can set roles in root nav
        }
      },
      {
        path: '/rzjcmassage',
        component: () => import('@/views/modules/association/rzjcshenhe'),
        name: 'rzjcmassage',
        meta: {
          title: '认证、检测机构审核',
          roles: ['sys:orgExamine:detection']
        }
      },
      {
        path: '/jgmaintenance',
        component: () => import('@/views/modules/association/details/jgmaintenance'),
        name: 'jgmaintenance',
        hidden: true,
        meta: { title: '机构注册信息详情' }
      }
    ]
  },
  // 协会App
  {
    path: '/jGappmassage',
    component: Layout,
    redirect: '/jGappmassage',
    // alwaysShow: true,
    meta: {
      title: '协会信息查看',
      icon: 'peoples',
      roles: ['sys:appExamine'] // you can set roles in root nav
    },
    children: [
      {
        path: '/jgbasmassage',
        component: () => import('@/views/modules/association/jgbamassage'),
        name: 'jgbamassage',
        meta: { title: 'App备案审核' }
      },
      {
        path: '/AppVivw',
        component: () => import('@/views/modules/association/details/AppVivw'),
        name: 'AppVivw',
        hidden: true,
        meta: { title: 'App备案信息详情' }
      }
    ]
  },
  // 自律管理
  {
    path: '/conventionXH',
    component: Layout,
    redirect: '/conventionXH',
    // alwaysShow: true,
    meta: {
      title: '自律管理',
      icon: 'peoples',
      roles: ['sys:dsp'] // you can set roles in root nav
    },
    children: [
      {
        path: '/conventionXH',
        component: () => import('@/views/zilv/conventionXH'),
        name: 'conventionXH',
        meta: {
          title: '自律公约签署',
          roles: ['sys:dsp:sign']
        }
      },
      {
        path: '/editionUpdate',
        component: () => import('@/views/zilv/editionUpdate'),
        name: 'editionUpdate',
        meta: {
          title: '备案版本更新',
          roles: ['sys:dsp:version']
        }
      },
      {
        path: '/versionDetail',
        component: () => import('@/views/zilv/versionDetail'),
        name: 'versionDetail',
        hidden: true,
        meta: { title: 'APP版本维护' }
      }
      // {
      //   path: '/ppppp',
      //   component: () => import('@/views/zilv/index'),
      //   name: 'ppppp',
      //   meta: { title: '公共页面测试' }
      // }
    ]
  },
  // 风险共享
  {
    path: '/RiskSharing',
    component: Layout,
    redirect: '/RiskSharing',
    // alwaysShow: true,
    meta: {
      title: '风险共享',
      icon: 'tab',
      roles: ['sys:risk'] // you can set roles in root nav
    },
    children: [
      {
        path: '/organAdmin',
        component: () => import('@/views/RiskSharing/organAdmin'),
        name: 'organAdmin',
        meta: {
          title: '机构管理',
          roles: ['sys:risk:org'] // you can set roles in root nav
        }
      },
      {
        path: '/riskMessage',
        component: () => import('@/views/RiskSharing/riskMessage'),
        name: 'riskMessage',
        meta: {
          title: '风险信息',
          roles: ['sys:risk:edit']
        }
      },
      {
        path: '/riskMonitor',
        component: () => import('@/views/RiskSharing/riskMonitor'),
        name: 'riskMonitor',
        meta: {
          title: '风险监测',
          roles: ['sys:risk:check']
        }
      },
      {
        path: '/organAndApplication',
        component: () => import('@/views/RiskSharing/organAndApplication'),
        name: 'organAndApplication',
        meta: {
          title: '监测机构及应用',
          roles: ['sys:risk:app'] // you can set roles in root nav
        }
      },
      {
        path: '/riskRemind',
        component: () => import('@/views/RiskSharing/riskRemind'),
        name: 'riskRemind',
        meta: {
          title: '风险提醒',
          roles: ['sys:risk:out']
        }
      },
      {
        path: '/riskReport',
        component: () => import('@/views/RiskSharing/riskReport'),
        name: 'riskReport',
        meta: {
          title: '风险报告',
          roles: ['sys:risk:report'] // you can set roles in root nav
        }
      },
      {
        path: '/fishingAndCounterfeiting',
        component: () => import('@/views/RiskSharing/fishingAndCounterfeiting'),
        name: 'fishingAndCounterfeiting',
        meta: {
          title: '钓鱼仿冒',
          roles: ['sys:risk:fishing'] // you can set roles in root nav
        }
      },
      {
        path: '/fishingJR',
        component: () => import('@/views/RiskSharing/fishingJR'),
        name: 'fishingJR',
        meta: {
          title: '钓鱼仿冒',
          roles: ['sys:risk:fishingOrg'] // you can set roles in root nav
        }
      }
    ]
  },
  // 科技产品服务
  {
    path: '/TechnologyProducts',
    component: Layout,
    redirect: '/TechnologyProducts',
    // alwaysShow: true,
    meta: {
      title: '科技产品服务',
      icon: 'clipboard',
      roles: ['sys:science']
    },
    children: [
      {
        path: '/productsMsg',
        component: () => import('@/views/TechnologyProducts/productsMsg'),
        name: 'productsMsg',
        meta: {
          title: '产品服务信息',
          roles: ['sys:science:edit']
        }
      },
      {
        path: '/myProducts',
        component: () => import('@/views/TechnologyProducts/myProducts'),
        name: 'myProducts',
        meta: {
          title: '我的产品服务',
          roles: ['sys:science:list']
        }
      },
      {
        path: '/productsExamine',
        component: () => import('@/views/TechnologyProducts/productsExamine'),
        name: 'productsExamine',
        meta: {
          title: '产品服务审核',
          roles: ['sys:science:review']
        }
      },
      {
        path: '/OperationLog',
        component: () => import('@/views/TechnologyProducts/OperationLog'),
        name: 'OperationLog',
        meta: {
          title: '机构操作日志',
          roles: ['sys:science:log']
        }
      },
      // 科技产品新增
      {
        path: '/addProduct',
        name: 'addProduct',
        component: () => import('@/views/TechnologyProducts/addProduct'),
        hidden: true
      },
      // 科技产品详情
      {
        path: '/productDetail',
        name: 'productDetail',
        component: () => import('@/views/TechnologyProducts/productDetail'),
        hidden: true
      },
      // 科技产品修改
      {
        path: '/productModify',
        name: 'productModify',
        component: () => import('@/views/TechnologyProducts/productModify'),
        hidden: true
      }
    ]
  },
  // 机构
  {
    path: '/massage',
    component: Layout,
    // alwaysShow: true,
    meta: {
      title: '金融机构信息维护',
      icon: 'peoples',
      roles: ['sys:org']
    },
    children: [
      {
        path: '/maintenance',
        component: () => import('@/views/modules/association/details/register'),
        name: 'maintenance',
        meta: { title: '机构信息维护' }
      }
    ]
  },
  {
    path: '/massagejc',
    component: Layout,
    // alwaysShow: true,
    meta: {
      title: '检测机构信息维护',
      icon: 'peoples',
      roles: ['sys:check']
    },
    children: [
      {
        path: '/maintenancejc',
        component: () => import('@/views/modules/association/details/registerjc'),
        name: 'maintenancejc',
        meta: { title: '机构信息维护' }
      }
    ]
  },
  {
    path: '/massagerz',
    component: Layout,
    // alwaysShow: true,
    meta: {
      title: '认证机构信息维护',
      icon: 'peoples',
      roles: ['sys:attestation']
    },
    children: [
      {
        path: '/maintenancerz',
        component: () => import('@/views/modules/association/details/registerrz'),
        name: 'maintenancerz',
        meta: { title: '机构信息维护' }
      }
    ]
  },
  {
    path: '/massagekj',
    component: Layout,
    // alwaysShow: true,
    meta: {
      title: '科技公司信息维护',
      icon: 'peoples',
      roles: ['sys:sciences']
    },
    children: [
      {
        path: '/maintenancekj',
        component: () => import('@/views/modules/association/details/registerkj'),
        name: 'maintenancekj',
        meta: { title: '机构信息维护' }
      }
    ]
  },
  // 机构
  {
    path: '/affiliates',
    component: Layout,
    // alwaysShow: true,
    meta: {
      title: '机构信息关联',
      icon: 'nested',
      roles: ['sys:orgOsnm']
    },
    children: [
      {
        path: '/affiliates',
        component: () => import('@/views/modules/affiliates'),
        name: 'affiliates',
        meta: {
          title: '机构信息关联',
          roles: ['sys:orgOsnm:org']
        }
      },
      {
        path: '/affiliatesxh',
        component: () => import('@/views/modules/affiliates/xiehui'),
        name: 'affiliatesxh',
        meta: {
          title: '关联管理',
          roles: ['sys:orgOsnm:checkOsnm']
        }
      },
      {
        path: '/gongxiangxh',
        component: () => import('@/views/modules/affiliates/gongxiang'),
        name: 'gongxiangxh',
        meta: {
          title: '共享管理',
          roles: ['sys:orgOsnm:checkApp']
        }
      }
    ]
  },
  // 投诉管理
  {
    path: '/reportManagement',
    component: Layout,
    // alwaysShow: true,
    meta: {
      title: '投诉管理',
      icon: 'jubao',
      roles: ['sys:inform']
    },
    children: [
      {
        path: '/reportXH',
        component: () => import('@/views/Report/reportMsgSearchXH'),
        name: 'reportXH',
        meta: {
          title: '投诉信息管理',
          roles: ['sys:informinfo']
        }
      },
      {
        path: '/information',
        component: () => import('@/views/Report/information'),
        name: 'information',
        hidden: true,
        meta: {
          title: '投诉信息详情'
        }
      },
      {
        path: '/reportDel',
        name: 'reportDel',
        component: () => import('@/views/Report/reportDel'),
        meta: {
          title: '投诉转发管理',
          roles: ['sys:informForward']

        }
      }
    ]
  },
  // 系统管理机构端
  {
    path: '/system',
    component: Layout,
    redirect: '/system/branchusers/index',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: '用户管理',
      icon: 'component',
      roles: ['sys:userManage']
    },
    children: [
      // 分支机构管理用户
      {
        path: 'branchusers',
        component: () => import('@/views/modules/system/branchusers/index'),
        name: 'workBranchusers',
        meta: {
          title: '用户管理',
          roles: ['sys:userManager:other']
        }
      },
      // 分支机构用户管理
      {
        path: '/user-management',
        component: () => import('@/views/modules/system/user-management/index'),
        // alwaysShow: true,
        name: 'userManagement',
        meta: {
          title: '用户管理',
          roles: ['sys:userManager:infa']
        }
      }
    ]
  },
  // // 日志管理
  {
    path: '/journal',
    component: Layout,
    always: false,
    name: 'journal',
    meta: {
      title: '日志管理',
      icon: 'bug',
      roles: ['sys:journal']
    },
    children: [
      {
        path: 'journal',
        name: 'journal_index',
        component: () => import('@/views/journal/index'),
        meta: {
          title: '日志管理'
        }
      }
    ]
  },
  {
    path: '/dictManager',
    component: Layout,
    always: false,
    name: 'dictManage',
    meta: {
      title: '数据字典',
      icon: 'size',
      roles: ['sys:dict']
    },
    children: [
      {
        path: 'dictManager',
        name: 'dictManager',
        component: () => import('@/views/dictManager/index'),
        meta: {
          title: '数据字典'
        }
      }
    ]
  },
  {
    path: '/maintenancewh',
    component: Layout,
    always: false,
    name: 'maintenancewh',
    meta: {
      title: '检测、认证项维护',
      icon: 'tree',
      roles: ['sys:deteCertMain']
    },
    children: [
      {
        path: 'maintenancewhxq',
        name: 'maintenancewhxq',
        component: () => import('@/views/dictManager/jrmaintenance'),
        meta: {
          title: '检测、认证项维护'
        }
      }
    ]
  },
  // 监管字典维护
  {
    path: '/regulatorys',
    component: Layout,
    always: false,
    name: 'regulatorys',
    meta: {
      title: '监管字典维护',
      icon: 'tree',
      roles: ['sys:deteCertMain']
    },
    children: [
      {
        path: 'regulatorysxq',
        name: 'regulatorysxq',
        component: () => import('@/views/dictManager/regulatory'),
        meta: {
          title: '监管字典维护'
        }
      }
    ]
  },
  // 统计报表
  {
    path: '/statement',
    component: Layout,
    redirect: '/statement',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '统计报表',
      icon: 'chart',
      roles: ['sys:report']
    },
    children: [
      // 机构信息统计
      {
        path: 'baobiaoc',
        component: () => import('@/views/modules/statement/baobiaoc'),
        name: 'baobiaoc',
        meta: {
          title: '新增备案情况统计表',
          roles: ['sys:reportAdd'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'baobiao',
        component: () => import('@/views/modules/statement/baobiao'),
        name: 'baobiao',
        meta: {
          title: 'APP备案信息汇总表',
          roles: ['sys:reportApp'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'baobiaod',
        component: () => import('@/views/modules/statement/baobiaod'),
        name: 'baobiaod',
        meta: {
          title: '备案情况统计图',
          roles: ['sys:reportChart'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'baobiaob',
        component: () => import('@/views/modules/statement/baobiaob'),
        name: 'baobiaob',
        meta: {
          title: '累计备案情况统计表',
          roles: ['sys:reportAccu'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

