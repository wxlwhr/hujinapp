<template>
  <publicPage :title="title" :tab-list="tabList" :api="api" @weiHu="weiHu" @stateChangeXz="stateChangeXz" @showDialog="showDialog" />
</template>

<script>
import publicPage from '@/views/zilv/publicPage'
import { searchQuery } from '@/api/appbeian/register.js'
const queryCriteria = [ // 查询条件，支持input、select、时间、地区四种
  {
    Cname: '机构名称', // label
    Ename: 'rinm', // v-modal和prop（一般就是后台定好的字段）
    type: 'input', // 该属性用来区分input、select、时间、地区
    maxlength: '50', // 一些框架自带属性，可以随意加
    clearable: true
  },
  {
    Cname: 'App名称',
    Ename: 'appName',
    type: 'input',
    maxlength: '50',
    clearable: true
  },
  {
    Cname: '软件版本',
    Ename: 'appVersion',
    type: 'input',
    maxlength: '50',
    clearable: true
  },
  {
    Cname: '日期',
    Ename: 'time',
    type: 'time',
    clearable: true,
    beforeNowDay: true
  },
  {
    Cname: '机构注册地区',
    Ename: 'registeredArea',
    type: 'address',
    clearable: true
  }
  // {
  //   Cname: '审核状态',
  //   Ename: 'auditStatus',
  //   type: 'select',
  //   clearable: true,
  //   option: [ // 若为select需要增加option属性
  //     {
  //       codeKey: '01',
  //       codeValue: '待提交'
  //     },
  //     {
  //       codeKey: '02',
  //       codeValue: '待提交检测'
  //     },
  //     {
  //       codeKey: '03',
  //       codeValue: '认证退至金融机构'
  //     }
  //   ]
  // }
]
export default {
  components: {
    publicPage
  },
  data() {
    return {
      api: {
        query: searchQuery// 把列表查询接口传过去
      },
      title: '公共页面测试', // 页面标题
      tabList: [
        {
          tabName: '待提交检测', // tab页标题
          activeName: '0', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型', // tag标签展示
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估', // code值转换
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '待检测', // tab页标题
          activeName: '1', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '待认证', // tab页标题
          activeName: '2', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '待初审', // tab页标题
          activeName: '3', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            },
            {
              Cname: '操作',
              Ename: '',
              type: 'button',
              btnName: '审核',
              butEventName: 'tableExamine'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '待复审', // tab页标题
          activeName: '4', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            },
            {
              Cname: '操作',
              Ename: '',
              type: 'button',
              btnName: '审核',
              butEventName: 'tableExamine'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '已备案', // tab页标题
          activeName: '5', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            },
            {
              Cname: '备案编号',
              Ename: 'recordNumber',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '审核未通过', // tab页标题
          activeName: '6', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '已退回', // tab页标题
          activeName: '7', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '已注销', // tab页标题
          activeName: '8', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '已过期', // tab页标题
          activeName: '9', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        },
        {
          tabName: '全部', // tab页标题
          activeName: '10', // el-tab-pane的name属性
          queryCriteria: queryCriteria,
          tableHead: [ // table表头，支持开关、按钮事件、序号、选择、排序等
            {
              Cname: '', // 加一个空的占位，否则表头顺序会乱
              Ename: '',
              type: 'kong'
            },
            // {
            //   Cname: ' ',
            //   Ename: ' ',
            //   type: 'selection'// 该属性用来区分表头对应的列是何种类
            // },
            {
              Cname: '序号',
              Ename: '',
              type: 'index'
            },
            {
              Cname: '机构名称',
              Ename: 'rinm',
              type: 'button',
              btnEventName: 'showDialog'
            },
            {
              Cname: 'App名称',
              Ename: 'appName',
              type: 'text'
            },
            {
              Cname: 'APP产品类型',
              Ename: 'productType',
              type: 'tag',
              tagList: [
                {
                  name: 'Android',
                  type: ''
                },
                {
                  name: 'IOS',
                  type: 'success'
                },
                {
                  name: 'other',
                  type: 'warning'
                }
              ]
            },
            {
              Cname: '外部评估',
              Ename: 'appFilePath',
              type: 'code',
              codeList: [
                {
                  codeKey: '2',
                  codeValue: '金融科技产品认证'
                },
                {
                  codeKey: '1',
                  codeValue: '其他'
                }
              ]
            },
            {
              Cname: '软件版本',
              Ename: 'appVersion',
              type: 'text'
            },
            {
              Cname: '日期',
              Ename: 'updateTime',
              type: 'sort'
            },
            {
              Cname: '认证机构',
              Ename: 'approveName',
              type: 'text'
            }
            // {
            //   Cname: '可见状态',
            //   Ename: '',
            //   type: 'switch',
            //   switchEventName: 'stateChangeXz'// 若为功能列，则需要功能的方法名作为该字段的值
            // },
            // {
            //   Cname: '合并项维护',
            //   Ename: '',
            //   type: 'button',
            //   btnEventName: 'weiHu'// 若为功能列，则需要功能的方法名作为该字段的值
            // }
          ],
          auditForm: {// 与查询条件一致
            rinm: '',
            appName: '',
            appVersion: '',
            time: '',
            registeredArea: '',
            sort: '1'
          }
        }
      ]
    }
  },
  methods: {
    showDialog(searchData = {}) {
      this.searchData = searchData
      this.$router.push({
        name: 'AppVivw',
        query: {
          Num: '0',
          name: '详情页',
          row: JSON.stringify(searchData.row),
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    weiHu(row) {
      this.$message({
        type: 'info',
        message: '已维护'
      })
    },
    stateChangeXz(val) {
      val.down = !val.down
      this.$confirm('是否更改下载状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'info',
          message: '已更改'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    }
  }
}
</script>

<style>

</style>
