<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title-container">
        <h3 class="title">修改密码</h3>
      </div>
      <el-form-item prop="passwd">
        <span class="svg-container">
          原密码
        </span>
        <el-input v-model="loginForm.passwd" type="password" placeholder="请输入原密码" class="retrieve" style="margin-left:80px;" />
      </el-form-item>

      <el-form-item prop="newPasswd">
        <span class="svg-container">
          新密码
        </span>
        <el-input v-model="loginForm.newPasswd" type="password" placeholder="请输入新密码" class="retrieve" style="margin-left:80px;" />
      </el-form-item>

      <el-form-item prop="checkNewpass">
        <span class="svg-container">
          确认密码
        </span>
        <el-input v-model="loginForm.checkNewpass" type="password" placeholder="请再次确认密码" class="retrieve" style="margin-left:64px;" />
      </el-form-item>

      <el-button :loading="isTrue" type="primary" style="width:100%;margin-bottom:10px" @click.native.prevent="handleLogin">确认</el-button>
      <el-button v-if="this.$route.query.type !== '0'" type="warning" style="width:100%" class="btn" @click="back">返回</el-button>
    </el-form>
  </div>
</template>

<script>
import { modifyPassword } from '@/api/register/register.js'
import { mapGetters } from 'vuex'
import { sm3 } from '@/utils/sm3'
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.loginForm.newPasswd !== '') {
          this.$refs.loginForm.validateField('newPasswd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value === this.loginForm.passwd) {
        callback(new Error('两次输入密码不能一致!'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.loginForm.checkNewpass !== '') {
          this.$refs.loginForm.validateField('checkNewpass')
        }
        callback()
      }
    }
    var validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.newPasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginRules: {
        passwd: [{ required: true, validator: validatePass, trigger: 'blur' },
          { message: '密码最少为8位', trigger: 'blur', min: 8 },
          { pattern: /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '必须含大小写字母数字最多16位不含字符', trigger: 'blur' }],
        newPasswd: [{ required: true, validator: validatePass2, trigger: 'blur' }, { message: '密码最少为8位', trigger: 'blur', min: 8 },
          { required: true, validator: validatePass3, trigger: 'blur' },
          { pattern: /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '必须含大小写字母数字最多16位不含字符', trigger: 'blur' }],
        checkNewpass: [{ required: true, validator: validatePass4, trigger: 'blur' }, { message: '密码最少为8位', trigger: 'blur', min: 8 },
          { pattern: /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '必须含大小写字母数字最多16位不含字符', trigger: 'blur' }]
      },
      registerDialogVisible: false,
      credentDialogVisible: false,
      isTrue: false,
      loginForm: {
        userName: '',
        newPasswd: '',
        passwd: '',
        checkNewpass: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    if (window.history && window.history.pushState && this.$route.query.type === '0') {
      // 向历史记录中插入了当前页并禁止后退
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    }
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    goBack() {
      this.$store.dispatch('MostforcedLogOut').then(() => {
        this.$router.push({ path: '/login' })
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    back() {
      this.$router.go(-1)
    },
    handleLogin() {
      this.$confirm('是否确定修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const obj = {
              id: this.userName,
              oldPwd: `${sm3(this.loginForm.passwd)}`,
              newPwd: `${sm3(this.loginForm.newPasswd)}`
            }
            this.isTrue = true
            modifyPassword(obj)
              .then(res => {
                this.$notify({
                  title: '密码修改成功',
                  message: '密码修改成功',
                  type: 'success'
                })
                this.isTrue = false
                this.$store.dispatch('MostforcedLogOut').then(() => {
                  this.$router.push({ path: '/login' })
                })
              }).catch(res => {
                this.isTrue = false
              })
          } else {
            return false
          }
        })
      })
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
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    height: 38px;
    width: 66%;
    display: block;
    float: left;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    margin-left: 34px;
    border-radius: 4px;
    background: #fff;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;
      // &:-webkit-autofill {
      //   -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
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
    margin: 80px auto;
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
    display: block;
    float: left;
    line-height: 40px;
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
