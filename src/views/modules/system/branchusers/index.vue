<template>
  <el-card class="workReportStyle">
    <div slot="header" class="clearfix btnCard">
      <span>用户管理</span>
      <div class="elCardBtnBox">
        <el-button type="primary" @click="newConstruction">新建 +</el-button>
      </div>
    </div>
    <el-form ref="auditForm" :model="auditForm" :rules="auditFormrules" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="address">
            <el-input v-model="auditForm.address" type="text" placeholder="部门名称" clearable maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="textRight">
          <el-button type="primary" @click="demand('auditForm')">查 询</el-button>
          <el-button @click="clear('auditForm')">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <br>
    <el-table v-loading="IsloadingA" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" show-overflow-tooltip />
      <el-table-column prop="userName" label="登录名" min-width="140" show-overflow-tooltip />
      <el-table-column prop="address" label="部门名称" min-width="140" show-overflow-tooltip />
      <el-table-column prop="name" label="联系人" min-width="140" show-overflow-tooltip />
      <el-table-column prop="mobile" label="联系人手机号" min-width="140" show-overflow-tooltip />
      <el-table-column
        property="type"
        label="账号状态"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userStatus === 1 ? '启用': '停用' }}</span>
          <el-switch v-model="scope.row.userStatusFlag" style="display: block" @change="stateChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.userName !== auditForm.userName" type="text" @click="deleteUpdate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      :title="centerDialogVisible3?'新建账户':'修改账户'"
      width="570px"
      class="dialogStyle"
      center
    >
      <el-form ref="formModel" :rules="rules" :model="formModel" label-width="120px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="登录名" prop="userName">
              <el-input v-model="formModel.userName" :disabled="isTrue" placeholder="请输入内容" maxlength="18" />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="部门名称" prop="address">
              <el-input v-model.trim="formModel.address" placeholder="请输入内容" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="联系人" prop="name">
              <el-input v-model.trim="formModel.name" placeholder="请输入内容" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="联系人手机号" prop="mobile">
              <el-input v-model.trim="formModel.mobile" placeholder="请输入内容" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="">
              <p>提示：最多新增10个子账户，初始密码为Ab123456</p>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="isLogin" type="primary" @click="confirm('formModel')">确定</el-button>
        <el-button @click="abolish">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :total="total"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>
<script>
import { getList, countOrg, addBranch, updateBranch, userStatus } from '@/api/user-management.js'
import { commonValidate2 } from '@/utils/formValidate'
export default {
  name: 'WorkReportNotice',
  data() {
    return {
      auditForm: {
        address: '',
        riid: this.$store.getters.riid,
        userName: this.$store.getters.userName,
        rolecode: ''
      },
      centerDialogVisible: false, // 控制弹框
      centerDialogVisible3: false, // 控制弹框
      isTrue: false,
      paramsOldA: {},
      isLogin: false,
      IsloadingA: false,
      date: [],
      panNumbur: 0,
      masKing: null,
      formModel: {
        userName: '',
        address: '',
        name: '',
        mobile: '',
        radio2: '0',
        deptcode: '',
        rolecode: '',
        riid: this.$store.getters.riid,
        userId: ''
      },
      // 分页参数
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      // 表格数据
      tableData: [],
      auditFormrules: {
        address: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }]
      },
      rules: {
        userName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        address: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        name: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写正确的联系方式', trigger: 'blur', max: 20 }, { pattern: /^1\d{10}$/, message: '请填写正确的联系方式', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.$store.getters.srnm === '0') {
      this.formModel.rolecode = 'finUser3'
      this.auditForm.rolecode = 'finUser3'
    } else if (this.$store.getters.srnm === '1') {
      this.formModel.rolecode = 'cerUser3'
      this.auditForm.rolecode = 'cerUser3'
    } else if (this.$store.getters.srnm === '2') {
      this.formModel.rolecode = 'tesUser3'
      this.auditForm.rolecode = 'tesUser3'
    } else if (this.$store.getters.srnm === '3') {
      this.formModel.rolecode = 'kjUser3'
      this.auditForm.rolecode = 'kjUser3'
    }
    // else if (this.$store.getters.srnm === '') {
    //   this.formModel.rolecode = 'pbcUse4'
    //   this.auditForm.rolecode = 'pbcUse4'
    // }
    this.$nextTick(function() {
      this.getArr()
    })
  },
  methods: {
    stateChange(val) {
      val.userStatusFlag = !val.userStatusFlag
      this.$confirm('是否更改账号状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const paramsObj = {
          userName: val.userName,
          userStatus: val.userStatus === 1 ? 0 : 1
        }
        userStatus(paramsObj).then(res => {
          this.$message({
            showClose: true,
            message: '操作成功',
            duration: 1000,
            type: 'success'
          })
          this.getArr()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    },
    // 清空搜索
    clear(formName) {
      this.$refs[formName].resetFields()
      this.getArr()
    },
    // 获取列表数据
    getArr() {
      this.pageInfo.pageNum = 1
      const paramsObj = Object.assign({}, this.pageInfo, this.auditForm)
      paramsObj.rolecode = paramsObj.rolecode.substring(0, paramsObj.rolecode.length - 1)
      this.IsloadingA = true
      getList(paramsObj).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.paramsOldA = paramsObj
        this.total = res.total
      })
    },
    // 新建
    newConstruction() {
      this.panNumbur = 0
      this.isTrue = true
      countOrg({ deptCode: this.$store.getters.userName }).then(res => {
        this.centerDialogVisible = true
        this.centerDialogVisible3 = true
        this.$nextTick(function() {
          this.$refs.formModel.resetFields()
          this.formModel.userName = `${this.$store.getters.userName}_${res}`
        })
      }).catch(res => {
        this.formModel.succ = ''
      })
    },
    // 取消
    abolish() {
      this.centerDialogVisible = false
      this.isTrue = false
    },
    // 确定
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.panNumbur === 0) {
            this.isLogin = true
            addBranch(this.formModel).then(res => {
              this.isLogin = false
              this.centerDialogVisible = false
              this.$message({
                showClose: true,
                message: '新增成功',
                duration: 1000,
                type: 'success'
              })
              this.getArr()
            }).catch(res => {
              this.isLogin = false
            })
          } else {
            this.isLogin = true
            updateBranch(this.formModel).then(res => {
              this.centerDialogVisible = false
              this.isTrue = false
              this.isLogin = false
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.getArr()
            }).catch(res => {
              this.isLogin = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 修改
    handleUpdate(val) {
      this.centerDialogVisible = true
      this.centerDialogVisible3 = false
      this.isTrue = true
      this.panNumbur = 1
      this.$nextTick(function() {
        this.formModel.userId = val.userId
        this.formModel.userName = val.userName
        this.formModel.address = val.address
        this.formModel.name = val.name
        this.formModel.mobile = val.mobile
      })
    },
    // 删除
    deleteUpdate(val) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateBranch({ userName: val.userName, delFlag: '1', userId: val.userId }).then(res => {
            this.getArr()
            this.$message({
              type: 'success',
              duration: 1000,
              message: '删除成功'
            })
          })
        })
        .catch(() => {})
    },
    // 查询
    demand(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getArr()
        } else {
          return false
        }
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.paramsOldA.pageSize = size
      this.IsloadingA = true
      getList(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.paramsOldA.pageNum = pageNum
      this.IsloadingA = true
      getList(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.workReportStyle{
  .btn{
    margin-left: 20px;
  }
  .el-range-editor--medium.el-input__inner{
    width: 250px
  }
}
</style>
