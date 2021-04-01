<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div style="float:left;padding-left:10px;font-size:20px;line-height:50px">移动金融客户端应用软件备案管理系统</div>
    <div class="right-menu" style="line-height:50px">
      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click"
      >
        <span class="el-dropdown-link">
          {{ rinm }} {{ name }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/changePassword">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item v-if="rolecode">
            <span
              style="display:block;"
              @click="showDialog"
            >信息维护</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span
              style="display:block;"
              @click="logout"
            >退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 信息维护 -->
    <el-dialog
      :visible.sync="centerDialogVisible2"
      :close-on-click-modal="false"
      title="信息维护"
      width="500px"
      center
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :rules="rules1" :model="form" label-width="130px" style="width:500px">
            <el-row>
              <el-col :span="22">
                <el-form-item label="登录名:" prop="userName">
                  <el-input v-model.trim="form.userName" style="width:280px" disabled clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model.trim="form.name" placeholder="请输入内容" style="width:280px" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="手机号:" prop="mobile">
                  <el-input v-model.trim="form.mobile" placeholder="请输入内容" style="width:280px" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="22"
              >
                <el-form-item
                  label="验证码"
                  prop="verCode"
                  class="radio_enter"
                >
                  <el-input
                    v-model.trim="form.verCode"
                    placeholder="请输入"
                    style="width:140px"
                    clearable
                    @blur="isverCode(form.verCode)"
                  />
                  <el-button
                    :disabled="disabled"
                    plain
                    type="primary"
                    round
                    @click="getverific"
                  >{{ btntxt }}</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model.trim="form.email" placeholder="请输入内容" style="width:280px" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="abolish">取 消</el-button>
        <el-button :loading="isTrue" type="primary" @click="confirm('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核流程 -->
    <el-dialog :visible.sync="custRecoDialogVisible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="60%" title="审核流程" center>
      <div style="padding: 0 20px" shadow="hover">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top" color="#0bbd87">
            <div class="divStyle">
              <h4>注册信息复审通过</h4>
              <el-button type="text" @click="goZcxx">查看注册信息</el-button>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top" color="red">
            <div class="divStyle">
              <h4>注册信息复审未通过</h4>
              <el-alert
                :closable="false"
                title="修改意见"
                type="warning"
                effect="dark"
              >
                <p>机构编码错误</p>
              </el-alert>
              <el-button type="text" @click="goZcxx">修改注册信息</el-button>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top" color="#0bbd87">
            <div class="divStyle">
              <h4>注册信息复审中，请稍后</h4>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/12" placement="top" color="#0bbd87">
            <div class="divStyle">
              <h4>注册信息初审通过</h4>
              <el-button type="text" @click="goZcxx">查看注册信息</el-button>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top" color="red">
            <div class="divStyle">
              <h4>注册信息初审未通过</h4>
              <el-alert
                :closable="false"
                title="修改意见"
                type="warning"
                effect="dark"
              >
                <p>请上传高清营业执照图片</p>
              </el-alert>
              <el-button type="text" @click="goZcxx">修改注册信息</el-button>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top" color="#0bbd87">
            <div class="divStyle">
              <h4>注册信息初审中，请稍后</h4>
            </div>
          </el-timeline-item>
        </el-timeline>
        <br>
        <div>
          <el-row style="text-align:center;">
            <el-col :span="24">
              <el-button type="primary" @click="goApp">新增App备案</el-button>
              <el-button type="primary" @click="custRecoDialogVisible = false">关闭</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Aes from '@/utils/Aes'
import {
  isVerific,
  verific
} from '@/api/register/register.js'
import Hamburger from '@/components/Hamburger'
// import LangSelect from '@/components/LangSelect'
import { userinfo, updateinfo } from '@/api/login.js'
export default {
  components: {
    Hamburger
    // LangSelect
  },
  data() {
    return {
      userName: '',
      disabled: false,
      centerDialogVisible2: false,
      custRecoDialogVisible: false,
      isTrue: false,
      btntxt: '获取验证码',
      form: {
        verCode: '',
        userName: '',
        radio2: '',
        mobile: '',
        name: '',
        email: '',
        rolecode: '', // 机构管理员角色
        deptcode: this.$store.getters.deptcode,
        userId: ''
      },
      rules1: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        radio2: [{ required: true, message: '请选择', trigger: 'change' }],
        verCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        email: [
          { required: false, message: '内容不能为空最多输入50位', trigger: 'blur', max: 50 },
          { pattern: /^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写正确的手机号', trigger: 'blur', max: 20 },
          { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'blur' }
        ],
        userName: [{ required: true, message: '请选择要创建的机构名称', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'rinm', 'rolecode'])
  },
  methods: {
    getverific() {
      // var _this = this
      // this.$refs['form'].validateField('mobile', function(errorMessage, aaa) {
      //   if (errorMessage.length > 0) {
      //     _this.form.mobile = ''
      //   }
      // })
      if (this.form.mobile) {
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
        verific(Aes.encrypt(this.form.mobile)).then(res => {})
      } else {
        this.$message({
          message: '请您先输入联系方式',
          type: 'warning'
        })
      }
    },
    isverCode(data) {
      if (data) {
        isVerific(this.form.mobile, data).then(res => {
          if (res !== '验证码验证通过！') {
            this.$message({
              message: '短信验证码验证失败',
              type: 'warning'
            })
            this.form.verCode = ''
          }
        }).catch(() => {
          this.form.verCode = ''
        })
      }
    },
    goApp() {
      this.$router.push({ name: 'list' })
      // this.custRecoDialogVisible = false
      // this.$router.push({ name: 'AppRegistrationNew' })
    },
    goZcxx() {
      this.$router.push({ name: 'fillInfo' })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定提交', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.isTrue = true
            updateinfo(this.form).then(res => {
              this.$message({
                showClose: true,
                message: '修改成功',
                duration: 1000,
                type: 'success'
              })
              this.isTrue = false
              this.centerDialogVisible2 = false
            // this.$router.go(0)
            }).catch(res => {
              this.isTrue = false
            })
          })
        } else {
          return false
        }
      })
    },
    abolish() {
      this.centerDialogVisible2 = false
    },
    showDialog() {
      this.centerDialogVisible2 = true
      userinfo({ username: this.$store.getters.userName }).then(res => {
        this.isTrue1 = false
        this.form.userName = res.userName
        this.form.userId = res.userId
        this.form.name = res.name
        this.form.mobile = Aes.decrypt(res.mobile)
        this.form.rolecode = res.rolecode
        this.form.email = res.email
      }).catch(res => {
        this.isTrue1 = false
      })
    }
  }
}
</script>

<style  lang="scss">
.navbar {
  height: 50px;
  // line-height: 50px;
  border-radius: 0px !important;
  .divStyle{
    background:rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;
  }
  .divStyle:hover {
    box-shadow: 5px 10px 15px 2px rgba(0,0,0,0.1);
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    // height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
