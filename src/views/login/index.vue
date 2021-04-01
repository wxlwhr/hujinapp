<template>
  <div class="loginww">
    <div class="logoTitle" />
    <div class="LoginS">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
        <div class="title">
          <span style="color:#333">欢迎登录</span>
        </div>
        <el-form-item prop="username" class="loginU">
          <el-input v-model="loginForm.username" placeholder="账号" name="username" type="text" maxlength="25" clearable @blur="getPhone" @keyup.enter.native="handleLogin('loginForm')">
            <svg-icon slot="prefix" icon-class="user" style="margin-left: 6px;" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="loginW">
          <el-input v-model="loginForm.password" prefix placeholder="请输入密码" clearable show-password @keyup.enter.native="handleLogin('loginForm')">
            <svg-icon slot="prefix" icon-class="password" style="margin-left: 6px;" />
          </el-input>
        </el-form-item>
        <el-form-item class="loginW">
          <el-input v-model="number1" disabled placeholder="手机号">
            <svg-icon slot="prefix" icon-class="iPhone" style="margin-left: 6px;" />
          </el-input>
        </el-form-item>
        <el-form-item
          prop="verCode"
        >
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input
                v-model.trim="loginForm.verCode"
                placeholder="手机验证码"
                clearable
              />
            </el-col>
            <el-col :span="9">
              <el-button
                style="width:100%;text-align:center"
                :disabled="disabled"
                type="text"
                @click="getverific"
              >{{ btntxt }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="loginForm.verifyCode" placeholder="验证码" clearable @keyup.enter.native="handleLogin('loginForm')" />
            </el-col>
            <el-col :span="9">
              <img :src="captchaImg" alt="" style="width: 100px;height:39px;position: absolute;" @click="handleGetCaptcha">
            </el-col>
          </el-row>
        </el-form-item>
        <div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button :loading="loading" style="width:100%;height:40px;font-size:18px;" type="primary" @click.native.prevent="handleLogin('loginForm')">登录</el-button>
            </el-col>
            <el-col :span="12">
              <el-button :loading="loading" style="width:100%;height:40px;font-size:18px;" type="warning" @click="goRegister">机构注册</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" style="textAlign:center">
              <el-button :loading="loading" style="height:40px;color:black;font-size:14px;color:#409EFF" type="text" @click="goApp">备案名单</el-button>
            </el-col>
            <!-- <el-col :span="8" style="textAlign:center">
              <el-button :loading="loading" style="height:40px;color:black;font-size:14px;color:#E6A23C" type="text" @click="goReport">投诉平台</el-button>
            </el-col> -->
            <el-col :span="12" style="textAlign:center">
              <el-button :loading="loading" style="height:40px;color:black;font-size:14px;color:#F56C6C" type="text" @click="psaawordBack">忘记密码</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="banben">Copyright©2019中国互联网金融协会 联系我们：finapp@nifa.org.cn 400-800-9616</div>
  </div>
</template>
<script>
import captcha from '@/assets/login/captcha.jpg'
import Aes from '@/utils/Aes'
import { getUUID } from '@/utils'
import { isVerific, verific } from '@/api/register/register.js'
import { echoPhone } from '@/api/register/resetPassword.js'
// import { verifyVerCode } from '@/api/register/register.js'
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码长度至少八位'))
      } else {
        callback()
      }
    }
    return {
      disabled: false,
      btntxt: '获取验证码',
      auth_time: '',
      captchaImg: null,
      input: '',
      number1: '',
      number: '',
      isPc: true,
      loginForm: {
        username: '',
        password: '',
        verifyCode: '',
        uuid: '',
        verCode: '',
        loginWeb: 'bussiness' // 记录是有地球的还是没地球的
      },
      loginRules: {
        // , { validator: checkData, trigger: 'blur' }
        verCode: [{ required: true, message: '手机验证码不能为空', trigger: 'blur' }],
        username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verifyCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      registerDialogVisible: false,
      credentDialogVisible: false
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
  created() {
    this.IsPC()
  },
  mounted() {
    this.handleGetCaptcha()
  },
  destroyed() {},
  methods: {
    IsPC() {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
          this.isPc = false
          break
        }
      }
    },
    getPhone() {
      if (this.loginForm.username) {
        echoPhone({ userName: this.loginForm.username }).then(res => {
          const decryptNumber = Aes.decrypt(res)
          this.number = decryptNumber
          this.number1 = decryptNumber.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
        })
      }
    },
    getverific() {
      if (this.number) {
        this.disabled = true
        this.auth_time = 60
        var auth_timetimer = setInterval(() => {
          this.auth_time--
          this.btntxt = this.auth_time + '秒后再次发送'
          if (this.auth_time <= 0) {
            this.disabled = false
            clearInterval(auth_timetimer)
            this.btntxt = '获取验证码'
          }
        }, 1000)
        verific(Aes.encrypt(this.number)).then(res => {})
      } else {
        this.$message({
          message: '请您先输入联系方式',
          type: 'warning'
        })
      }
    },
    // App备案查
    goApp() {
      // this.$router.push({ name: 'list' })
      location.href = 'https://mftp.nifa.org.cn' // 生产
      // location.href = 'http://61.181.59.73:5204'// 预生产
      // if (this.isPc) {
      //   this.$router.push({ name: 'list' })
      // } else {
      //   this.$router.push({ name: 'modellist' })
      // }
    },
    handleGetCaptcha() {
      this.loginForm.verifyCode = ''
      this.loginForm.uuid = getUUID()
      this.captchaImg = this.loginForm.uuid
      this.captchaImg = captcha
      this.captchaImg = `/sysmanage/outInterFace/loginCode?uuid=${this.loginForm.uuid}`
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          isVerific(this.number, this.loginForm.verCode).then(res => {
            if (res === '验证码验证通过！') {
              this.loading = true
              this.$store.dispatch('LoginByUsername', this.loginForm).then(res => {
                if (res.route === '/changePassword') {
                  this.$confirm('您使用的初始密码，建议您进行修改', '提示', {
                    confirmButtonText: '确 定',
                    type: 'warning'
                  })
                    .then(() => {
                      this.loading = false
                      if (res.route) {
                        this.$router.push({ path: res.route, query: { type: '0' }})
                      }
                    })
                    .catch(() => {
                      this.loading = false
                    })
                } else {
                  this.loading = false
                  this.$router.push({ path: res.route })
                }
              }).catch(() => {
                this.handleGetCaptcha()
                this.loading = false
              })
            }
          }).catch(() => {
            this.loginForm.verCode = ''
          })
        }
      })
    },
    goReport() {
      // window.open('https://tousu.nifa.org.cn')
      window.open('http://172.16.2.11:8888/')
    },
    psaawordBack() {
      this.$router.push({ path: '/retrievePassword' })
    },
    downLoadprepUrl() {
      location.href = `${process.env.BASE_API}/commonattach/download?file=manualofoperation.zip`
    },
    // 注册
    goRegister() {
      this.$router.push({ path: '/promise' })
      // this.$confirm('本机构保证报送的材料和信息真实、准确、完整、合规。', '提示', {
      //   confirmButtonText: '承诺',
      //   cancelButtonText: '放弃',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   this.$router.push({ path: '/promise' })
      // }).catch(() => {
      // })
    }
  }
}
</script>
<style lang="scss">
@media screen and (max-width: 960px){
  .loginww {
  width: 100%;
  height: 100%;
  background: url('~@/assets/login/bg_c.jpg') top no-repeat;
  .banben{
  text-align: center;
  width:100%;
  height: 50px;
  line-height:50px;
  font-size:12px;
  position: absolute;
  min-width: 1200px;
  bottom: 0;
  background-color:#fff;
  }
  .logoTitle {
    width: 100%;
    height: 100px;
    background: url('~@/assets/new3logo.png') center center no-repeat;
  }
  .LoginS {
    width: 380px;
    height: 460px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 100;
    .login-form {
      margin: 0 auto;
      width: 80%;
      height: 80%;
      .el-input__inner {
        padding: 0 35px;
      }
      .svg-container {
        width: 20px;
        height: 20px;
      }
      .loginU {
        height: 38px;
      }
      .loginW {
        height: 38px;
      }
    }
    .title {
      margin: 21px 0;
      font-size: 22px;
      color: gray;
      text-align: center;
    }
    .imguser {
      position: absolute;
      top: 8px;
      left: 7px;
      z-index: 9;
    }
    .imgpassword {
      position: absolute;
      top: 9px;
      left: 7px;
      z-index: 9;
    }
  }
 }
}
@media screen and (min-width: 960px){
.loginww {
  width: 100%;
  height: 100%;
  background: url('~@/assets/login/bg_c.jpg') top no-repeat;
  background-size: cover;
  .banben{
  text-align: center;
  width:100%;
  height: 50px;
  line-height:50px;
  font-size:12px;
  position: fixed;
  bottom: 0;
  background-color:#fff;
  }
  .logoTitle {
    width: 100%;
    height: 100px;
    background: url('~@/assets/login/logow.png') #fff 5% center no-repeat;
  }
  .LoginS {
    position: absolute;
    top: 55%;
    left: 70%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 415px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 100;
    .login-form {
      margin: 0 auto;
      width: 80%;
      height: 80%;
      // line-height: 30px;
      .el-input__inner {
        padding: 0 35px;
      }
      .svg-container {
        width: 20px;
        height: 20px;
      }
      .loginU {
        height: 38px;
        // margin-bottom: 25px;
      }
      .loginW {
        height: 38px;
        // margin-bottom: 25px;
      }
    }
    .title {
      margin:7px;
      // margin:20px 0;
      font-size: 22px;
      color: gray;
      text-align: center;
    }
    .imguser {
      position: absolute;
      top: 8px;
      left: 7px;
      z-index: 9;
    }
    .imgpassword {
      position: absolute;
      top: 9px;
      left: 7px;
      z-index: 9;
    }
  }
}
}
</style>

