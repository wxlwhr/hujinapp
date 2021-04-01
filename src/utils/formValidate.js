/**
 * 公用正则表达式
 */

import store from '../store'
import { Message } from 'element-ui'
var commonPattern = {
  // 特殊字符,针对软件名称
  specialChar_appName: /[!\[\]$%^*\=<>?]/im,
  // 特殊字符
  specialChar: /[!\[\]$%^*\+=<>?]/im,
  specialEng: /[`~!@#$%^&*+<>?:"{},.\/;'[\]]/im,
  specialEng2: /[`~!@#$%^&*\-+<>?:"{},.\/;'[\]]/im,
  // 全角字符
  fullAngle: /[\uff00-\uffff]/g,

  // 空格
  spaceBar: /^\S*$/,
  // 不能只输入空格
  spaceBars: /^\s+$/gi,

  // 三位小数金钱
  money: /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,

  // 数字
  number: /^\d+(\.\d+)?$/,

  // 手机号f
  phone: /^((1[0-9]{10})|((\d{3,4}-)?\d{7,8}))$/,

  // 邮箱
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,

  // 仅手机号验证
  // onlyPhone: /^((134|135|136|137|138|139|147|150|151|152|157|158|159|182|183|187|188)|(130|131|132|155|156|185|186|145)|(133|153|180|189))[0-9]{8}$/,
  onlyPhone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
  // 中文
  chinaNull: /[\u4e00-\u9fa5]/,

  // 传真
  fax: /^(\d{3,4}-)?\d{7,8}$/,
  // 手写日期验证
  time: /^[1-2]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(([0-1][0-9]|2[0-3])([0-5][0-9])([0-5][0-9]|tt)|([0-1][0-9]|2[0-3])([0-5][0-9]|tt)(tt)|(tttttt))$/,
  // 不包含时分秒的手写日期验证
  //   dataValitor: /^[1-2]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
  dataValitor: /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/,
  // 详细时分秒seconds
  dataValitorSeconds: /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)([0-1]?[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/,
  // 身份证正则
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,

  // 密码三级 大写字母+小写字母+数字
  codeThree: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z]+$)(?![a-z0-9]+$)(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]$/,
  // 密码四级 大写字母+特殊字符+小写字母+数字
  codeFour: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z!$%^&*\+=<>?]+$)(?![a-z0-9]+$)(?![a-z!$%^&*\+=<>?]+$)(?![0-9!$%^&*\+=<>?]+$)(?![a-z0-9!$%^&*\+=<>?]+$)(?![A-Z0-9!$%^&*\+=<>?]+$)(?![a-zA-Z!$%^&*\+=<>?]+$)(?![a-z0-9A-Z]+$)[a-zA-Z0-9!$%^&*\+=<>?]$/,
  // 密码五级 大写字母+特殊字符+小写字母+数字+下划线
  codeFive: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z!$%^&*\+=<>?]+$)(?![a-z0-9]+$)(?![a-z!$%^&*\+=<>?]+$)(?![0-9!$%^&*\+=<>?]+$)(?![0-9_]+$)(?![A-Z_]+$)(?![a-z_]+$)(?![_!$%^&*\+=<>?]+$)(?![a-z0-9!$%^&*\+=<>?]+$)(?![a-z_!$%^&*\+=<>?]+$)(?![0-9_!$%^&*\+=<>?]+$)(?![A-Z_!$%^&*\+=<>?]+$)(?![A-Z0-9_]+$)(?![a-z0-9_]+$)(?![A-Za-z_]+$)(?![A-Z0-9!$%^&*\+=<>?]+$)(?![a-zA-Z!$%^&*\+=<>?]+$)(?![a-z0-9A-Z]+$)(?![a-z0-9_!$%^&*\+=<>?]+$)(?![a-zA-Z_!$%^&*\+=<>?]+$)(?![A-Z0-9_!$%^&*\+=<>?]+$)(?![a-z0-9A-Z_]+$)[a-zA-Z0-9_!$%^&*\+=<>?]$/,
  replace: ['@N', '@E', '@I'],
  // 汉字
  isChinese: /^[^\u4e00-\u9fa5]+$/,
  // IP地址
  ip: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
  // 数字或者字母
  reg: /^[0-9a-zA-Z]+$/,
  // 数字或者字母或者'-'
  regs: /^(([0-9a-zA-Z])|[-])+$/,
  // 手机号和电话号
  phoneAndTel: /(^0\d{2,3}-?\d{7,8}$)|(^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$)/,
  // 首尾空格
  headEnd: /^[\s]|[\s]$/gi,
  // 证件类型为全国组织机构代码
  organCode: /(^[A-Za-z0-9]{8}\-[A-Za-z0-9]{1}$)|(^[A-Za-z0-9]{9}$)/,
  // 小数点后3位
  decimal: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/

}
/**
 * [公共验证]
 * @param  {[type]}   rule     [description]
 * @param  {[type]}   value    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */

// 报告机构编码
const reportCode = (rule, value, callback) => {
  if (commonPattern.chinaNull.test(value)) {
    callback(new Error('内容不能含中文'))
  } else if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}

// 数据包名
const dataCodeName = (rule, value, callback) => {
  if (commonPattern.chinaNull.test(value)) {
    callback(new Error('内容不能含中文'))
  } else if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else {
    callback()
  }
}

const common_Validate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}

const commonValidate2 = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}
const commonValidate2_appName = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar_appName.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}
const noSpaceAndTs = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialEng.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}
const noSpaceAndTs2 = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialEng2.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}
//  必须为数值 且不能含 空格 特殊字符
const common_isValidNum = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (!commonPattern.number.test(value)) {
    callback(new Error('必须输入数值'))
  } else {
    callback()
  }
}

const isValidInput = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}

const isValidNull = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else {
    callback()
  }
}

const isValidMoney = (rule, value, callback) => {
  const arr = ['@N', '@E', '@I']
  const newThree = ['report_union_pay', 'report_capital_settlement', 'report_pay_agency']
  if (newThree.includes(store.getters.roles)) {
    if (arr.includes(value)) {
      callback()
      return
    }
  }
  if (value === '@N') {
    callback()
    return
  }
  if (value.length > 20) {
    callback(new Error('最多输入20位!'))
    return
  }

  if (value === '') {
    callback(new Error('内容不能为空'))
  } else if (!commonPattern.money.test(value)) {
    callback(new Error('请输入正确的数字，最多保留三位小数!'))
  } else {
    callback()
  }
}
// 数字检查
var onlyNumberValidate = (rule, value, callback) => {
  if (!commonPattern.number.test(value)) {
    callback(new Error('必须输入数值'))
  } else {
    callback()
  }
}
// 数字检查可以为空
var NumberValidate = (rule, value, callback) => {
  if (value == null || value === '' || value === undefined) {
    callback()
  } else {
    if (!commonPattern.number.test(value)) {
      callback(new Error('必须输入数值'))
    } else {
      callback()
    }
  }
}
// 座机号
var phoneValidate = (rule, value, callback) => {
  if (!commonPattern.phone.exec(value)) {
    callback(new Error('请正确输入办公电话'))
  } else {
    callback()
  }
}

// 手机号
var telValidate = (rule, value, callback) => {
  if (!commonPattern.onlyPhone.exec(value)) {
    callback(new Error('请正确输入手机号'))
  } else {
    callback()
  }
}

// 邮箱
var emailValidate = (rule, value, callback) => {
  if (!commonPattern.email.exec(value)) {
    callback(new Error('请输入邮箱，如：123456@163.com'))
  } else {
    callback()
  }
}

// 传真
var faxValidate = (rule, value, callback) => {
  if (!commonPattern.fax.exec(value) && value !== '') {
    callback(new Error('请正确输入传真'))
  } else {
    callback()
  }
}

// 登录用户名
var user_Validate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  } else if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}

// 登录用户名
var password_Validate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('密码不能含有空格'))
  } else {
    callback()
  }
}

// 身份证验证(一般系统里用的是这个)
var idCard_Validate = (rule, value, callback) => {
  if (!commonPattern.idCard.test(value)) {
    callback(new Error('身份证格式错误'))
  } else {
    callback()
  }
}
// const isDataValidInput = (rule, value, callback) => {
//   var nowDate = Date.now()
//   var str = value.substring(0, 8)
//   var valDate = str.substring(0, 4) + '/' + str.substring(4, 6) + '/' + str.substring(6, 8)
//   var usertime = (new Date(valDate)).valueOf()
//   if (!commonPattern.time.test(value)) {
//     callback(new Error('请输入正确的年月日时分秒，例20180913tttttt'))
//   } else if (nowDate < usertime) {
//     callback(new Error('请输入当前时间之前的时间!'))
//   } else {
//     callback()
//   }
// }

// 手写日期判断
var time_ValidateNoAtN = (rule, value, callback) => {
  var myDate = new Date()
  var sMouth = (myDate.getMonth() + 1).toString()
  if (sMouth.length === 1) {
    sMouth = '0' + sMouth
  }
  var sDate = myDate.getDate().toString()
  if (sDate.length === 1) {
    sDate = '0' + sDate
  }
  var sYear = myDate.getFullYear().toString()
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else if (value.length !== 14) {
    callback(new Error('填写格式如:yyyyMMddHHmmss'))
  } else if (!commonPattern.dataValitorSeconds.test(value)) {
    callback(new Error('填写格式如:yyyyMMddHHmmss'))
  } else if (Number(value.substring(0, 8)) > Number(sYear + sMouth + sDate)) {
    callback(new Error('日期不能大于当前日期'))
  } else {
    callback()
  }
}
// 日期允许@N
var time_Validate = (rule, value, callback) => {
  var myDate = new Date()
  var sMouth = (myDate.getMonth() + 1).toString()
  if (sMouth.length === 1) {
    sMouth = '0' + sMouth
  }
  var sDate = myDate.getDate().toString()
  if (sDate.length === 1) {
    sDate = '0' + sDate
  }
  var sYear = myDate.getFullYear().toString()
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else if (value === '@N' || value === '@E' || value === '@I') {
    callback()
  } else if (value.length !== 14) {
    callback(new Error('填写格式如:yyyyMMddHHmmss'))
  } else if (!commonPattern.dataValitorSeconds.test(value)) {
    callback(new Error('填写格式如:yyyyMMddHHmmss'))
  } else if (Number(value.substring(0, 8)) > Number(sYear + sMouth + sDate)) {
    callback(new Error('日期不能大于当前日期'))
  } else {
    callback()
  }
}
//
var time_ValidateOnlyAtN = (rule, value, callback) => {
  var myDate = new Date()
  var sMouth = (myDate.getMonth() + 1).toString()
  if (sMouth.length === 1) {
    sMouth = '0' + sMouth
  }
  var sDate = myDate.getDate().toString()
  if (sDate.length === 1) {
    sDate = '0' + sDate
  }
  var sYear = myDate.getFullYear().toString()
  if (value === '') {
    callback(new Error('内容不能为空'))
  } else if (value === '@N') {
    callback()
  } else if (value.length !== 14) {
    callback(new Error('填写格式如:yyyyMMddHHmmss'))
  } else if (!commonPattern.dataValitorSeconds.test(value)) {
    callback(new Error('填写格式如:yyyyMMddHHmmss'))
  } else if (Number(value.substring(0, 8)) > Number(sYear + sMouth + sDate)) {
    callback(new Error('日期不能大于当前日期'))
  } else {
    callback()
  }
}
// 不包含时分秒的时间判断
var data_ValidateNoAtN = (rule, value, callback) => {
  var myDate = new Date()
  var sMouth = (myDate.getMonth() + 1).toString()
  if (sMouth.length === 1) {
    sMouth = '0' + sMouth
  }
  var sDate = myDate.getDate().toString()
  if (sDate.length === 1) {
    sDate = '0' + sDate
  }
  var sYear = myDate.getFullYear().toString()
  if (value === '') {
    callback(new Error('日期不能为空'))
  } else if (value.length !== 8) {
    callback(new Error('长度为8位如:yyyyMMdd'))
  } else if (!commonPattern.dataValitor.test(value)) {
    callback(new Error('填写格式如:yyyyMMdd'))
  } else if (Number(value.substring(0, 8)) > Number(sYear + sMouth + sDate)) {
    callback(new Error('日期不能大于当前日期'))
  } else {
    callback()
  }
}
var data_Validate = (rule, value, callback) => {
  var myDate = new Date()
  var sMouth = (myDate.getMonth() + 1).toString()
  if (sMouth.length === 1) {
    sMouth = '0' + sMouth
  }
  var sDate = myDate.getDate().toString()
  if (sDate.length === 1) {
    sDate = '0' + sDate
  }
  var sYear = myDate.getFullYear().toString()
  if (value === '') {
    callback(new Error('日期不能为空'))
  } else if (value === '@N' || value === '@E' || value === '@I') {
    callback()
  } else if (value.length !== 8) {
    callback(new Error('长度为8位如:yyyyMMdd'))
  } else if (!commonPattern.dataValitor.test(value)) {
    callback(new Error('填写格式如:yyyyMMdd'))
  } else if (Number(value.substring(0, 8)) > Number(sYear + sMouth + sDate)) {
    callback(new Error('日期不能大于当前日期'))
  } else {
    callback()
  }
}
// 保险期间

var isps_Validate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('日期不能为空'))
  } else if (value === '@N') {
    callback()
  } else if (value.length !== 16) {
    callback(new Error('长度为16位如:yyyyMMddyyyyMMdd'))
  } else {
    callback()
  }
}
// 不可填写替代符
var noReplace = (rule, value, callback) => {
  if (commonPattern.replace.includes(value)) {
    callback(new Error('不可以填写替代符'))
  } else {
    callback()
  }
}

// 以下为20190617新增

// 内容不能含有空格
const isValidSpace = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else {
    callback()
  }
}
// 不能只有空格
const isValidSpaces = (rule, value, callback) => {
  if (commonPattern.spaceBars.test(value)) {
    callback(new Error('不能只含有空格'))
  } else {
    callback()
  }
}

const isValidSpecial = (rule, value, callback) => {
  if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}

const idCardNo = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else if (commonPattern.fullAngle.test(value)) {
    callback(new Error('内容不能含有全角字符'))
  } else if (!commonPattern.isChinese.test(value)) {
    callback(new Error('不能输入汉字'))
  } else {
    callback()
  }
}

// IP地址检查
var onlyIpValidate = (rule, value, callback) => {
  if (!commonPattern.ip.test(value)) {
    callback(new Error('必须输入正确IP'))
  } else {
    callback()
  }
}
// 数字或者字母检查
var noChinese = (rule, value, callback) => {
  if (value === '') {
    callback()
  }
  setTimeout(() => {
    if (!commonPattern.reg.test(value)) {
      callback(new Error('必须输入字母或者数字(非全角数值)'))
    } else {
      callback()
    }
  }, 10)
}

// 不能包含汉字
var isChinese = (rule, value, callback) => {
  if (value === '') {
    callback()
  }
  setTimeout(() => {
    if (!commonPattern.isChinese.test(value)) {
      callback(new Error('不能输入汉字'))
    } else {
      callback()
    }
  }, 10)
}

// 数字或者字母检查或者'-'，不允许连续相同的数字
var noChineses = (rule, value, callback) => {
  if (value === '' || value === undefined) {
    callback()
  }
  setTimeout(() => {
    const arr = value.split('')
    if (commonPattern.number.test(value) && arr.length > 1 && Array.from(new Set(arr)).length === 1) {
      callback(new Error('不能输入连续相同的数字'))
    } else if (!commonPattern.regs.test(value)) {
      callback(new Error('不得含有除数字、字母、"-"之外的字符(非全角)'))
    } else {
      callback()
    }
  }, 10)
}

// 手机号电话号校验（必填）
var isTelePhone = (rule, value, callback) => {
  if (value && value !== undefined) {
    if (!commonPattern.phoneAndTel.test(value)) {
      callback(new Error('请输入正确的联系电话'))
    } else {
      callback()
    }
  }
}

// 手机号电话号校验（不必填）
var isValidTelPhone = (rule, value, callback) => {
  if (value === undefined || value === '') {
    callback()
  } else if (!commonPattern.phoneAndTel.test(value)) {
    callback(new Error('请输入正确的联系电话'))
  } else {
    callback()
  }
}

// 连续相同的数字校验
var isEqually = (rule, value, callback) => {
  if (value !== undefined) {
    const arr = value.split('')
    if (commonPattern.number.test(value) && arr.length > 1 && Array.from(new Set(arr)).length === 1) {
      callback(new Error('不能输入连续相同的数字'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 首尾空格校验
var isValidHeadEnd = (rule, value, callback) => {
  if (value.match(commonPattern.headEnd)) {
    callback(new Error('首尾不能有空格'))
  } else {
    callback()
  }
}

// 证件类型为 全国组织机构代码时
var isValidOrganCode = (rule, value, callback) => {
  if (!commonPattern.organCode.test(value)) {
    callback(new Error('请输入正确的格式'))
  } else {
    callback()
  }
}

// 小数点后2位校验
var isValiddecimal = (rule, value, callback) => {
  if (value === undefined || value === '') {
    callback()
  } else if (!commonPattern.decimal.test(value)) {
    callback(new Error('最多保留两位小数'))
  } else if (value.length < '2' || value.length > '20') {
    callback(new Error('长度在 2 到 20 个字符'))
  } else {
    callback()
  }
}

// 新增交易校验账户
var isValidAccount = (rule, value, callback) => {
  if (value === undefined || value === '') {
    callback()
  } else {
    setTimeout(() => {
      const arr = value.split('')
      if (commonPattern.number.test(value) && arr.length > 1 && Array.from(new Set(arr)).length === 1) {
        callback(new Error('不能输入连续相同的数字'))
      } else if (!commonPattern.regs.test(value)) {
        callback(new Error('不得含有除数字、字母、"-"之外的字符，且不得使用全角字符'))
      } else {
        callback()
      }
    }, 10)
  }
}

// 新增交易校验银行卡号码
var isValidCustBankcardKey = (rule, value, callback) => {
  if (value === undefined || value === '') {
    callback()
  } else {
    setTimeout(() => {
      const arr = value.split('')
      if (commonPattern.number.test(value) && arr.length > 1 && Array.from(new Set(arr)).length === 1) {
        callback(new Error('不能输入连续相同的数字'))
      } else if (commonPattern.fullAngle.test(value)) {
        callback(new Error('不能使用全角字符'))
      } else if (commonPattern.specialChars.test(value)) {
        callback(new Error('不能填写"&"以外的特殊字符'))
      } else if (!commonPattern.number.test(value)) {
        callback(new Error('不得含有除数字、字母、“-”之外的字符，且不得使用全角字符'))
      } else {
        callback()
      }
    }, 10)
  }
}

// 交易补录交易对手姓名校验
var cardNumberName = (rule, value, callback) => {
  setTimeout(() => {
    if (commonPattern.headEnd.test(value)) {
      callback(new Error('内容首尾不能含有空格'))
    } else if (commonPattern.specialChars.test(value)) {
      callback(new Error('内容不能填写"&"以外的特殊字符'))
    } else if (commonPattern.number.test(value)) {
      callback(new Error('不能只输入数字'))
    } else if (value === '未知') {
      callback(new Error('内容不能为"未知"'))
    } else {
      callback()
    }
  }, 10)
}

// 交易补录交易对手账号校验
var cardNumberNo = (rule, value, callback) => {
  if (value === undefined || value === '') {
    callback()
  } else {
    setTimeout(() => {
      const arr = value.split('')
      if (commonPattern.number.test(value) && arr.length > 1 && Array.from(new Set(arr)).length === 1) {
        callback(new Error('不能输入连续相同的数字'))
      } else if (commonPattern.fullAngle.test(value)) {
        callback(new Error('不能使用全角字符'))
      } else if (!commonPattern.regs.test(value)) {
        callback(new Error('不能包含除字母，数字和"-"以外的字符'))
      } else {
        callback()
      }
    }, 10)
  }
}

// 只单纯进行全角字符校验
const onlyFullAngleValidate = (rule, value, callback) => {
  if (['', undefined].includes(value)) {
    callback()
  } else {
    if (commonPattern.fullAngle.test(value)) {
      callback(new Error('不能使用全角字符'))
    } else {
      callback()
    }
  }
}

// 单纯的不能只是数字
var onlyNoNumberValidate = (rule, value, callback) => {
  if (commonPattern.number.test(value)) {
    callback(new Error('不能只输入数字'))
  } else {
    callback()
  }
}
// 不能有空格和特殊字符
var noTsAndSpace = (rule, value, callback) => {
  if (!commonPattern.spaceBar.test(value)) {
    callback(new Error('内容不能含有空格'))
  } else if (commonPattern.specialChar.test(value)) {
    callback(new Error('内容不能填写特殊字符'))
  } else {
    callback()
  }
}
export function getdqDate() {
  var date = new Date()
  var year = date.getFullYear()
  var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}
export function fileVerify(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'doc'
  const extension1 = testmsg === 'docx'
  const extension2 = testmsg === 'ipa'
  const extension3 = testmsg === 'apk'
  const extension4 = testmsg === 'jpg'
  const extension5 = testmsg === 'png'
  const extension6 = testmsg === 'pdf'
  const extension7 = testmsg === 'rar'
  const extension8 = testmsg === 'zip'
  if (!extension && !extension1 && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7 && !extension8) {
    Message({
      message: '只能上传.doc,.docx,.ipa,.apk,.jpg,.png,.pdf,rar,zip格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
export function neiKong(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'doc'
  const extension1 = testmsg === 'docx'
  const extension6 = testmsg === 'pdf'
  if (!extension && !extension1 && !extension6) {
    Message({
      message: '只能上传.doc,.docx,.pdf格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
export function Notice(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'doc'
  const extension1 = testmsg === 'docx'
  const extension4 = testmsg === 'jpg'
  const extension5 = testmsg === 'png'
  const extension6 = testmsg === 'pdf'
  const extension8 = testmsg === 'zip'
  if (!extension && !extension1 && !extension4 && !extension5 && !extension6 && !extension8) {
    Message({
      message: '只能上传.doc,.docx,.jpg,.png,.pdf,zip格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
// report file upload
export function reportFileUpload(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'doc'
  const extension1 = testmsg === 'docx'
  const extension6 = testmsg === 'pdf'
  const extension8 = testmsg === 'zip'
  if (!extension && !extension1 && !extension6 && !extension8) {
    Message({
      message: '只能上传.doc,.docx,.pdf,zip格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
export function Authorized(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'jpg'
  const extension1 = testmsg === 'png'
  const extension2 = testmsg === 'pdf'
  if (!extension && !extension1 && !extension2) {
    Message({
      message: '只能上传.jpg,.png,.pdf格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
export function tupian(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'jpg'
  const extension1 = testmsg === 'png'
  if (!extension && !extension1) {
    Message({
      message: '请重新上传，只能上传 .jpg, .png格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
export function excel(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'xlsx'
  const extension1 = testmsg === 'xls'
  if (!extension && !extension1) {
    Message({
      message: '请重新上传，只能上传 .xlsx, .xls格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
export function Xuekezheng(file) {
  var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
  const extension = testmsg === 'jpeg'
  const extension1 = testmsg === 'pdf'
  const extension2 = testmsg === 'jpg'
  const extension3 = testmsg === 'png'
  if (!extension && !extension1 && !extension2 && !extension3) {
    Message({
      message: '只能上传.jpg,.png,.pdf,.jpeg格式!',
      duration: 6000,
      center: true,
      type: 'error'
    })
    return false
  } else {
    return true
  }
}
export {
  common_isValidNum,
  common_Validate,
  onlyNumberValidate,
  NumberValidate,
  phoneValidate,
  user_Validate,
  emailValidate,
  telValidate,
  isValidMoney,
  isValidInput,
  isValidNull,
  password_Validate,
  reportCode,
  dataCodeName,
  commonPattern,
  faxValidate,
  idCard_Validate,
  data_Validate,
  time_Validate,
  isps_Validate,
  time_ValidateNoAtN,
  data_ValidateNoAtN,
  noReplace,
  time_ValidateOnlyAtN,
  commonValidate2,
  commonValidate2_appName,
  isValidSpace, // 及以下为20190617新增
  isValidSpaces,
  isValidSpecial,
  idCardNo,
  onlyIpValidate,
  noChinese,
  isChinese,
  noChineses,
  isTelePhone,
  isValidTelPhone,
  isEqually,
  noSpaceAndTs,
  noSpaceAndTs2,
  isValidHeadEnd,
  isValidOrganCode,
  isValiddecimal,
  isValidAccount,
  isValidCustBankcardKey,
  cardNumberName,
  cardNumberNo,
  onlyFullAngleValidate,
  onlyNoNumberValidate,
  noTsAndSpace
}
