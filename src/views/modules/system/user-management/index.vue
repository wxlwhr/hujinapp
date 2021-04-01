<template>
  <el-card class="workReport_notice">
    <div slot="header" class="clearfix btnCard">
      <span>用户管理</span>
      <div class="elCardBtnBox">
        <el-button :loading="isTrue1" type="primary" plain @click="turnover">管理员账号移交</el-button>
        <el-button type="primary" style="float:right" @click="newConstruction">新建 +</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="金融机构" name="0">
        <el-form ref="auditForm" :model="auditForm" :rules="auditFormRules" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="auditForm.name" type="text" placeholder="姓名" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="deptName">
                <el-input v-model="auditForm.deptName" type="text" placeholder="机构名称" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="auditForm.mobile" type="text" placeholder="手机号码" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号状态" prop="userStatus">
                <el-select v-model="auditForm.userStatus" placeholder="请选择">
                  <el-option
                    v-for="item in typeArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
        <el-table
          v-loading="IsloadingA"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="80" show-overflow-tooltip />
          <el-table-column
            property="deptName"
            label="机构名称"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="userName"
            label="登录名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="name"
            label="姓名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="mobile"
            label="手机号码"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="creDate"
            label="创建时间"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            label="账号状态"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.userStatus === 1 ? '启用': '停用' }}</span>
              <el-switch v-model="scope.row.userStatusFlag" style="display: block" @change="stateChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <!-- <el-button
            type="text"
            size="small"
            @click="handleUpdate(scope.row)">修改</el-button> -->
              <el-button
                type="text"
                size="small"
                @click.native.prevent="resetRow(scope.row)"
              >初始密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="pageInfo.pageNum"
          :page-size="pageInfo.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
      <el-tab-pane label="认证机构" name="1">
        <el-form ref="auditFormb" :model="auditFormb" :rules="auditFormRules" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="auditFormb.name" type="text" placeholder="姓名" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="deptName">
                <el-input v-model="auditFormb.deptName" type="text" placeholder="机构名称" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="auditFormb.mobile" type="text" placeholder="手机号码" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号状态" prop="userStatus">
                <el-select v-model="auditFormb.userStatus" placeholder="请选择">
                  <el-option
                    v-for="item in typeArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="textRight">
              <el-button type="primary" @click="demand('auditFormb')">查 询</el-button>
              <el-button @click="clear('auditFormb')">重 置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatab"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="80" show-overflow-tooltip />
          <el-table-column
            property="deptName"
            label="机构名称"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="userName"
            label="登录名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="name"
            label="姓名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="mobile"
            label="手机号码"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="creDate"
            label="创建时间"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            label="账号状态"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.userStatus === 1 ? '启用': '停用' }}</span>
              <el-switch v-model="scope.row.userStatusFlag" style="display: block" @change="stateChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="resetRow(scope.row)"
              >初始密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="totalb"
          :current-page="pageInfob.pageNum"
          :page-size="pageInfob.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeb"
          @current-change="handleCurrentChangeb"
        />
      </el-tab-pane>
      <el-tab-pane label="检测机构" name="2">
        <el-form ref="auditFormc" :model="auditFormc" :rules="auditFormRules" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="auditFormc.name" type="text" placeholder="姓名" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="deptName">
                <el-input v-model="auditFormc.deptName" type="text" placeholder="机构名称" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="auditFormc.mobile" type="text" placeholder="手机号码" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号状态" prop="userStatus">
                <el-select v-model="auditFormc.userStatus" placeholder="请选择">
                  <el-option
                    v-for="item in typeArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="textRight">
              <el-button type="primary" @click="demand('auditFormc')">查 询</el-button>
              <el-button @click="clear('auditFormc')">重 置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatac"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="80" show-overflow-tooltip />
          <el-table-column
            property="deptName"
            label="机构名称"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="userName"
            label="登录名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="name"
            label="姓名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="mobile"
            label="手机号码"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="creDate"
            label="创建时间"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            label="账号状态"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.userStatus === 1 ? '启用': '停用' }}</span>
              <el-switch v-model="scope.row.userStatusFlag" style="display: block" @change="stateChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="resetRow(scope.row)"
              >初始密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="totalc"
          :current-page="pageInfoc.pageNum"
          :page-size="pageInfoc.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangec"
          @current-change="handleCurrentChangec"
        />
      </el-tab-pane>
      <el-tab-pane label="监管机构" name="3">
        <el-form ref="auditFormd" :model="auditFormd" :rules="auditFormRules" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="auditFormd.name" type="text" placeholder="姓名" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="deptName">
                <el-input v-model="auditFormd.deptName" type="text" placeholder="机构名称" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="auditFormd.mobile" type="text" placeholder="手机号码" clearable maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号状态" prop="userStatus">
                <el-select v-model="auditFormd.userStatus" placeholder="请选择">
                  <el-option
                    v-for="item in typeArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="textRight">
              <el-button type="primary" @click="demand('auditFormd')">查 询</el-button>
              <el-button @click="clear('auditFormd')">重 置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatad"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="80" show-overflow-tooltip />
          <el-table-column
            property="deptName"
            label="机构名称"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="userName"
            label="登录名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="name"
            label="姓名"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="mobile"
            label="手机号码"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            property="creDate"
            label="创建时间"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            label="账号状态"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.userStatus === 1 ? '启用': '停用' }}</span>
              <el-switch v-model="scope.row.userStatusFlag" style="display: block" @change="stateChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="resetRow(scope.row)"
              >初始密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="totald"
          :current-page="pageInfod.pageNum"
          :page-size="pageInfod.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChanged"
          @current-change="handleCurrentChanged"
        />
      </el-tab-pane>
    </el-tabs>
    <!-- 新增窗口 -->
    <el-dialog
      :visible.sync="centerDialogVisible2"
      :close-on-click-modal="false"
      :title="centerDialogVisible3?'新建账户':'管理员账户移交'"
      :width="widthStyle"
      center
    >
      <el-row>
        <el-col :span="10">
          <el-card v-if="radio2 !== 0 " shadow="never" class="orgLIstStyle">
            <div slot="header">
              <span>请选择机构名称</span>
            </div>
            <el-tree
              ref="tree2"
              :data="superviseCheckBox"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expanded-keys="nodeKey"
              node-key="value"
              @node-click="handleNodeClick"
            />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-form ref="form" :rules="rules" :model="form" label-width="100px" style="width:500px">
            <el-row v-if="centerDialogVisible3">
              <el-col :span="20">
                <el-form-item label="用户类型:" prop="radio2">
                  <el-radio-group v-model.trim="form.radio2" @change="fn">
                    <el-radio :label="0">普通用户</el-radio>
                    <el-radio :label="1">管理用户</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item :rules="form.radio2===''?[{ required: true, message: '请选择用户类型', trigger: 'change' }]:[{ required: true, message: '请在左侧选择要创建的机构名称', trigger: 'change' }]" label="登录名:" prop="userName">
                  <el-input v-model.trim="form.userName" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model.trim="form.name" :disabled="iStrue" placeholder="请输入内容" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="手机号码:" prop="mobile">
                  <el-input v-model.trim="form.mobile" :disabled="iStrue" placeholder="请输入内容" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="!centerDialogVisible3">
              <el-col
                :span="20"
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
                    @click="getverific(form.mobile)"
                  >{{ btntxt }}</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="centerDialogVisible3">
              <el-col v-if="radio2 ===0" :span="20">
                <el-form-item label="角色" prop="rolecode">
                  <el-select v-model="form.rolecode" placeholder="角色" clearable>
                    <el-option v-for="(item,index) in jiaoseArr" :key="index" :label="item.roleName" :value="item.roleCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-else :span="20">
                <el-form-item label="角色" prop="rolecode">
                  <el-select v-model="form.rolecode" placeholder="角色" clearable :disabled="iStrue">
                    <el-option v-for="(item,index) in jiaoseArr1" :key="index" :label="item.roleName" :value="item.roleCode" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model.trim="form.email" :disabled="iStrue" placeholder="请输入内容" maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="abolish">取 消</el-button>
        <el-button :disabled="iStrue" :loading="isLoding" type="primary" @click="confirm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { getList, countOrg, addBranch, changeRole, userStatus, resetPassword, getTreeJG, userinfo, updateBranch } from '@/api/user-management.js'
import { commonValidate2 } from '@/utils/formValidate'
import Aes from '@/utils/Aes'
import {
  isVerific,
  verific
} from '@/api/register/register.js'
export default {
  name: 'WorkReportNotice',
  data() {
    return {
      typeArr: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 0
        },
        {
          label: '全部',
          value: 2
        }
      ],
      iStrue: false,
      disabled: false,
      isLoding: false,
      isTrue1: false,
      IsloadingA: false,
      activeName: '0',
      nodeKey: [],
      btntxt: '获取验证码',
      centerDialogVisible: false, // 控制弹框
      centerDialogVisible2: false, // 控制弹框
      centerDialogVisible3: true, // 控制显示
      superviseCheckBox: [], // 树，数据
      widthStyle: '500px',
      panNumbur: 0,
      active: 0,
      inactive: 1,
      radio2: 0,
      radio3: '',
      userId: '',
      paramsOldA: {},
      paramsOldB: {},
      paramsOldC: {},
      paramsOldD: {},
      auditForm: {
        name: '',
        deptName: '',
        mobile: '',
        userStatus: '',
        srnm: '0'
      },
      auditFormb: {
        name: '',
        deptName: '',
        mobile: '',
        userStatus: '',
        srnm: '1'
      },
      auditFormc: {
        name: '',
        deptName: '',
        mobile: '',
        userStatus: '',
        srnm: '2'
      },
      auditFormd: {
        name: '',
        deptName: '',
        mobile: '',
        userStatus: '',
        userName: this.$store.getters.userName
      },
      form: {
        verCode: '',
        userName: '',
        radio2: '',
        mobile: '',
        name: '',
        rolecode: '',
        email: '',
        deptcode: '',
        riid: this.$store.getters.riid,
        userId: ''
      },
      userList: [],
      jiaoseArr: [],
      jiaoseArr1: [],
      date: [],
      // 起止时间
      startDate: '',
      stopDate: '',
      auditFormRules: {
        name: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        deptName: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        mobile: [{ required: false, pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }]
      },
      rules: {
        name: [{ required: true, message: '内容不能为空且最多20个字符', trigger: 'blur', max: 20 }, { validator: commonValidate2, trigger: 'blur' }],
        radio2: [{ required: true, message: '请选择', trigger: 'change' }],
        rolecode: [{ required: true, message: '请选择', trigger: 'change' }],
        email: [
          { required: false, message: '内容不能为空最多输入50位', trigger: 'blur', max: 50 },
          { pattern: /^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写正确的联系方式', trigger: 'blur', max: 20 },
          { pattern: /^1\d{10}$/, message: '请填写正确的联系方式', trigger: 'blur' }
        ],
        userName: [{ required: true, message: '请选择要创建的机构名称', trigger: 'change' }]
      },
      // 分页参数
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      // 表格数据
      tableData: [],
      // 分页参数
      pageInfob: {
        pageNum: 1,
        pageSize: 10
      },
      totalb: 0,
      // 表格数据
      tableDatab: [],
      // 分页参数
      pageInfoc: {
        pageNum: 1,
        pageSize: 10
      },
      totalc: 0,
      // 表格数据
      tableDatac: [],
      // 分页参数
      pageInfod: {
        pageNum: 1,
        pageSize: 10
      },
      totald: 0,
      // 表格数据
      tableDatad: [],
      currentRow: null
    }
  },
  created() {
    this.getTree()
  },
  mounted() {
    this.$nextTick(function() {
      this.getArr()
      // this.rolecode1()
    })
  },
  methods: {
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.getArr()
          break
        case '1':
          this.getArrb()
          break
        case '2':
          this.getArrc()
          break
        case '3':
          this.getArrd()
          break
      }
    },
    getverific(data) {
      if (data) {
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
        verific(Aes.encrypt(data)).then(res => {})
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
    handleNodeClick(data) {
      this.form.userName = data.deptCode
      this.form.deptcode = data.deptCode
      const obj = {
        username: data.deptCode
      }
      userinfo(obj).then(res => {
        if (res !== null) {
          this.iStrue = true
          this.form.userName = res.userName
          this.form.name = res.name
          this.form.mobile = Aes.decrypt(res.mobile)
          this.form.rolecode = res.roleCode
          this.form.email = res.email
        } else {
          this.iStrue = false
          this.form.name = ''
          this.form.mobile = ''
          this.form.rolecode = ''
          this.form.email = ''
        }
        this.$nextTick(function() {
          this.$refs.form.clearValidate()
        })
      })
    },
    // 获取部门普通用户的登录名
    getSection() {
      countOrg({ deptCode: this.$store.getters.userName }).then(res => {
        this.form.userName = `${this.$store.getters.userName}_${res}`
      }).catch(res => {
        this.form.userName = ''
      })
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            if (this.panNumbur === 0) {
              this.isLoding = true
              addBranch(this.form).then(res => {
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  duration: 1000,
                  type: 'success'
                })
                this.isLoding = false
                this.centerDialogVisible2 = false
                this.getArr()
                this.activeName = '0'
              }).catch(res => {
                this.isLoding = false
              })
            } else {
              this.isLoding = true
              updateBranch(this.form).then(res => {
                this.$message({
                  showClose: true,
                  message: '移交成功',
                  duration: 1000,
                  type: 'success'
                })
                this.isLoding = false
                this.centerDialogVisible2 = false
              }).catch(res => {
                this.isLoding = false
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 修改
    // handleUpdate(val) {
    //   this.centerDialogVisible2 = true
    //   this.panNumbur = 1
    //   this.form = val
    // },
    // 机构树的方法
    // handleCheckChange(data, checked, indeterminate) {
    //   const treeInfo = this.$refs.tree.getCheckedNodes()
    //   this.userList = []
    //   treeInfo.forEach(ele => {
    //     const obj = {
    //       'label': ele.label,
    //       'value': ele.value
    //     }
    //     this.form.userList.push(obj)
    //   })
    // },
    fn(value) {
      this.radio2 = value
      if (value === 0) {
        this.iStrue = false
        this.widthStyle = '500px'
        this.radio3 = ''
        this.form.deptcode = this.$store.getters.deptcode
        this.$nextTick(function() {
          this.$refs.form.resetFields()
          this.form.radio2 = value // 普通用户
          this.getSection()
        })
      } else {
        this.widthStyle = '800px'
        this.form.userName = ''
        this.iStrue = true
        // userinfo({ username: this.$store.getters.userName }).then(res => {
        //   if (res !== null) {
        //     this.iStrue = true
        //     this.form.userName = res.userName
        //     this.form.name = res.name
        //     this.form.mobile = res.mobile
        //     this.form.rolecode = res.roleCode
        //     this.form.email = res.email
        //   } else {
        //     this.iStrue = false
        //     this.form.name = ''
        //     this.form.mobile = ''
        //     this.form.rolecode = ''
        //     this.form.email = ''
        //   }

        // })
        this.$nextTick(function() {
          this.$refs.form.clearValidate()
        })
      }
    },
    // 获取列表数据
    getArr() {
      this.pageInfo.pageNum = 1
      const paramsObj = Object.assign({}, this.pageInfo, this.auditForm)
      // 获取列表数据
      this.IsloadingA = true
      getList(paramsObj).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.paramsOldA = paramsObj
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getArrb() {
      this.pageInfob.pageNum = 1
      const paramsObj = Object.assign({}, this.pageInfob, this.auditFormb)
      // 获取列表数据
      this.IsloadingA = true
      getList(paramsObj).then(res => {
        this.IsloadingA = false
        this.tableDatab = res.list
        this.paramsOldB = paramsObj
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getArrc() {
      this.pageInfoc.pageNum = 1
      const paramsObj = Object.assign({}, this.pageInfoc, this.auditFormc)
      // 获取列表数据
      this.IsloadingA = true
      getList(paramsObj).then(res => {
        this.IsloadingA = false
        this.tableDatac = res.list
        this.paramsOldC = paramsObj
        this.totalc = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getArrd() {
      this.pageInfod.pageNum = 1
      const paramsObj = Object.assign({}, this.pageInfod, this.auditFormd)
      // 获取列表数据
      this.IsloadingA = true
      getList(paramsObj).then(res => {
        this.IsloadingA = false
        this.tableDatad = res.list
        this.paramsOldD = paramsObj
        this.totald = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getTree() {
      // 获取机构树
      getTreeJG({ deptId: this.$store.getters.deptId }).then(res => {
        this.superviseCheckBox = res
        this.nodeKey.push(this.superviseCheckBox[0].value)
      })
      // 普通
      changeRole({ roleType: 'nifa' }).then(res => {
        this.jiaoseArr = res
      })
      // 管理
      changeRole({ roleType: 'pbc' }).then(res => {
        this.jiaoseArr1 = res
      })
    },
    // 状态改变方法
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
          this.handleClick()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    },
    // 查询
    demand(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleClick()
        } else {
          return false
        }
      })
    },
    // 清空
    clear(formName) {
      this.$refs[formName].resetFields()
      this.handleClick()
    },
    // 新建
    newConstruction() {
      this.centerDialogVisible2 = true
      this.centerDialogVisible3 = true
      this.panNumbur = 0
      this.iStrue = false
      this.widthStyle = '500px'
      this.radio2 = 0
      this.form.radio2 = ''
      this.form.rolecode = ''
      this.$nextTick(function() {
        this.$refs.form.resetFields()
      })
    },
    // 取消
    abolish() {
      this.centerDialogVisible2 = false
    },
    // 账号移交
    turnover() {
      this.panNumbur = 1
      this.radio2 = 0
      this.iStrue = false
      this.widthStyle = '500px'
      this.centerDialogVisible3 = false
      this.centerDialogVisible2 = true
      this.isTrue1 = true
      this.$nextTick(function() {
        this.$refs.form.resetFields()
      })
      userinfo({ username: this.$store.getters.userName }).then(res => {
        this.isTrue1 = false
        this.form.userName = res.userName
        this.form.userId = res.userId
        this.form.name = res.name
        this.form.mobile = Aes.decrypt(res.mobile)
        this.form.rolecode = res.roleCode
        this.form.email = res.email
      }).catch(res => {
        this.isTrue1 = false
      })
    },
    resetRow(val) { // 重置密码
      this.$confirm('此操作会将密码重置为Ab123456, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        resetPassword({ username: val.userName }).then(res => {
          this.$message({
            message: '密码重置成功，建议及时修改',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
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
    },
    handleSizeChangeb(size) {
      this.pageInfob.pageSize = size
      this.paramsOldB.pageSize = size
      this.IsloadingA = true
      getList(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.tableDatab = res.list
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 点击切换分页
    handleCurrentChangeb(pageNum) {
      this.pageInfob.pageNum = pageNum
      this.paramsOldB.pageNum = pageNum
      this.IsloadingA = true
      getList(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.tableDatab = res.list
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangec(size) {
      this.pageInfoc.pageSize = size
      this.paramsOldC.pageSize = size
      this.IsloadingA = true
      getList(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.tableDatac = res.list
        this.totalc = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 点击切换分页
    handleCurrentChangec(pageNum) {
      this.pageInfoc.pageNum = pageNum
      this.paramsOldC.pageNum = pageNum
      this.IsloadingA = true
      getList(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.tableDatac = res.list
        this.totalc = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChanged(size) {
      this.pageInfod.pageSize = size
      this.paramsOldD.pageSize = size
      this.IsloadingA = true
      getList(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.tableDatad = res.list
        this.totald = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 点击切换分页
    handleCurrentChanged(pageNum) {
      this.pageInfod.pageNum = pageNum
      this.paramsOldD.pageNum = pageNum
      this.IsloadingA = true
      getList(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.tableDatad = res.list
        this.totald = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.workReport_notice{
.btn{
  margin-left: 20px;
}
.el-range-editor--medium.el-input__inner{
  width: 250px
}
  .el-radio-group label:first-child {
    margin-left: 30px;
  }
.orgLIstStyle {
    .el-card__body {
      max-height: 330px;
      min-height: 330px;
      padding: 10px;
      overflow: auto;
      .el-tree-node__children{
        overflow: inherit;
      }
    }
  }
}
</style>
