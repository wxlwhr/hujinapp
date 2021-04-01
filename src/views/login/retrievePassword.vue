<template>
  <div class="login-container">
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="24">
        <el-alert
          style="width:60%;margin: auto;"
          :closable="false"
          title="您好！如果您的注册账号密码忘记了，并且注册时预留的手机号不可接收短信，请您致电400-800-9616与客服人员取得联系！"
          center
          type="warning"
        />
      </el-col>
    </el-row>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title-container">
        <h3 class="title">密码找回</h3>
      </div>
      <el-form-item prop="name">
        <el-row>
          <el-col :span="3">
            <span class="svg-container">
              账号
            </span>
          </el-col>
          <el-col :span="21">
            <el-input v-model="loginForm.name" maxlength="25" placeholder="请输入账号" class="retrieve" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="number">
        <el-row>
          <el-col :span="3">
            <span class="svg-container">
              手机号
            </span>
          </el-col>
          <el-col :span="21">
            <el-input v-model="loginForm.number1" disabled placeholder="" class="retrieve" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item prop="verify">
        <el-row>
          <el-col :span="3">
            <span class="svg-container">
              验证码
            </span>
          </el-col>
          <el-col :span="21">
            <el-input v-model="loginForm.verify" placeholder="请输入验证码" style="width:35%" @blur="isverCode(loginForm.number1)" />
            <el-button :disabled="disabled" style="margin-left: 40px;" round type="warning" @click="getverific">{{ btntxt }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item prop="newPassword">
        <el-row>
          <el-col :span="3">
            <span class="svg-container">
              新密码
            </span>
          </el-col>
          <el-col :span="21">
            <el-input v-model="loginForm.newPassword" type="password" autocomplete="new-password" placeholder="请输入新密码" class="retrieve" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="againPassword">
        <el-row>
          <el-col :span="3">
            <span class="svg-container">
              确认密码
            </span>
          </el-col>
          <el-col :span="21">
            <el-input v-model="loginForm.againPassword" type="password" autocomplete="new-password" placeholder="请再次确认密码" class="retrieve" style="margin-left:34px;" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:10px" @click="submit">确认</el-button>
      <el-button type="warning" class="btn" style="width:100%" @click="goBack">返回</el-button>
      <!-- <div style="text-align:center;">
        <el-button type="primary" style="width:100%">确认</el-button>
        <el-button type="warning" style="width:100%" @click="goBack">返回</el-button>
        <el-button type="success" @click="goNumber">原手机号不可用</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import Aes from '@/utils/Aes'
import { sm3 } from '@/utils/sm3'
import { echoPhone, isVerific, verific, resetPassword } from '@/api/register/resetPassword.js'
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      const isWord = /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!isWord.exec(value)) {
        callback(new Error('必须包含大写、小写字母、数字，不能含有特殊字符且长度在8-16位'))
      } else {
        if (this.loginForm.newPassword !== '') {
          // this.$refs.loginForm.validateField('againPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      disabled: false,
      btntxt: '获取验证码',
      auth_time: '',
      loginRules: {
        name: [
          { required: true, trigger: 'blur', validator: this.echoPhone1 }
        ],
        verify: [
          { required: true, trigger: 'blur', message: '验证码不能为空' }
        ],
        newPassword: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        againPassword: [
          { required: true, trigger: 'blur', validator: validatePass2 }
        ]
      },
      registerDialogVisible: false,
      credentDialogVisible: false,
      loginForm: {
        name: '',
        number: '',
        number1: '',
        verify: '',
        newPassword: '',
        againPassword: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    echoPhone1(rule, value, callback) {
      var commonPattern = {
        spaceBar: /^\S*$/
      }
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('用户名不能含有空格'))
        return
      } else {
        callback(
          this.getPhone()
        )
      }
    },
    getverific() {
      if (this.loginForm.number) {
        this.disabled = true
        this.auth_time = 30
        var auth_timetimer = setInterval(() => {
          this.auth_time--
          this.btntxt = this.auth_time + '秒后再次发送'
          if (this.auth_time <= 0) {
            this.disabled = false
            clearInterval(auth_timetimer)
            this.btntxt = '获取验证码'
          }
        }, 1000)
        verific(Aes.encrypt(this.loginForm.number)).then(res => {})
      } else {
        this.$message({
          message: '手机号不能为空',
          type: 'warning'
        })
        this.loginForm.verify = ''
      }
    },
    isverCode(data) {
      if (data) {
        isVerific(this.loginForm.number, this.loginForm.verify).then(res => {
          if (res !== '验证码验证通过！') {
            this.$message({
              message: '短信验证码验证失败',
              type: 'warning'
            })
            this.loginForm.verify = ''
          }
        }).catch(() => {
          this.loginForm.verify = ''
        })
      } else {
        this.$message({
          message: '手机号不能为空',
          type: 'warning'
        })
        this.loginForm.verify = ''
      }
    },
    getPhone() {
      echoPhone({ userName: this.loginForm.name }).then(res => {
        const decryptNumber = Aes.decrypt(res)
        this.loginForm.number = decryptNumber
        this.loginForm.number1 = decryptNumber.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
      })
    },
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const obj = {
            userName: this.loginForm.name,
            mobile: this.loginForm.number,
            code: this.loginForm.verify,
            password: `${sm3(this.loginForm.againPassword)}`
          }
          resetPassword(obj).then(res => {
            this.$notify({
              title: '密码找回成功',
              message: '密码找回成功',
              type: 'success'
            })
            this.$router.push({ path: '/login' })
          })
        } else {
          return false
        }
      })
    },
    // 返回
    goBack() {
      this.$router.push({ path: '/login' })
    },
    goNumber() {
      this.$router.push({ path: '/changeNumber' })
    }
  }
}
</script>
<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $bg;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    height: 38px;
    width: 78%;
    display: block;
    float: left;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    margin-left: 34px;
    border-radius: 4px;
    background: transparent !important;
    input {
      background: transparent !important;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;
      &:-webkit-autofill {
        // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border-radius: 5px;
    color: #454545;
    position: relative;
    border: 0px;
    background: transparent;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.btn {
  margin-left: 0;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 60px auto;
    .down {
      position: absolute;
      top: 0px;
      right: 48px;
      color: #fff;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    width: 70px;
    display: block;
    line-height: 38px;
    color: #fff;
    font-size: 16px;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
