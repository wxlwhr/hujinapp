<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>机构注册信息查看</span>
      <div class="elCardBtnBox">
        <el-button type="primary" @click="downloadAll">导出</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
      <el-tab-pane label="初审待审核" name="0">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditForm.rinm" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="注册地区" prop="registerAddr">
                  <el-cascader
                    v-model="auditForm.registerAddr"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input v-model="auditForm.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册机构类型" prop="srnm">
                  <el-select v-model="auditForm.srnm" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in srnmArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提交时间" prop="time">
                  <el-date-picker
                    v-model="auditForm.time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForm('auditForm')">查 询</el-button>
                <el-button @click="clearAuditForm('auditForm')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableData"
          @sort-change="handleSortChange"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
          <el-table-column prop="srnm" label="注册机构类型" show-overflow-tooltip />
          <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
          <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="提交时间" sortable="custom" show-overflow-tooltip />
          <el-table-column v-if="this.$store.getters.roles" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'1')">
                <el-tooltip class="item" effect="dark" content="审核" placement="top">
                  <img src="@/icons/png/shenhe-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total>0"
          :current-page="pageInfo.pageNumber"
          :page-size="pageInfo.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
      </el-tab-pane>
      <el-tab-pane label="复审待审核" name="1">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormb.rinm" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="注册地区" prop="registerAddr">
                  <el-cascader
                    v-model="auditFormb.registerAddr"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input v-model="auditFormb.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册机构类型" prop="srnm">
                  <el-select v-model="auditFormb.srnm" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in srnmArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提交时间" prop="time">
                  <el-date-picker
                    v-model="auditFormb.time"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormb('auditFormb')">查 询</el-button>
                <el-button @click="clearAuditFormb('auditFormb')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatab"
          @sort-change="handleSortChangeb"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
          <el-table-column prop="srnm" label="注册机构类型" show-overflow-tooltip />
          <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
          <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="提交时间" sortable="custom" show-overflow-tooltip />
          <el-table-column v-if="this.$store.getters.roles" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.flag === 'false'" disabled type="text">
                <img src="@/icons/png/shenhe.png" alt="">
              </el-button>
              <el-button v-else type="text" @click="showDialog(scope.row,'1')">
                <el-tooltip class="item" effect="dark" content="审核" placement="top">
                  <img src="@/icons/png/shenhe-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalb>0"
          :current-page="pageInfob.pageNumber"
          :page-size="pageInfob.pageSize"
          :total="totalb"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeb"
          @current-change="handleCurrentChangeb"
        />
      </el-tab-pane>
      <el-tab-pane label="已注册" name="4">
        <div class="search">
          <el-form ref="auditForme" :model="auditForme" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditForme.rinm" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="注册地区" prop="registerAddr">
                  <el-cascader
                    v-model="auditForme.registerAddr"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input v-model="auditForme.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册机构类型" prop="srnm">
                  <el-select v-model="auditForme.srnm" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in srnmArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提交时间" prop="time">
                  <el-date-picker
                    v-model="auditForme.time"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForme('auditForme')">查 询</el-button>
                <el-button @click="clearAuditForme('auditForme')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatae"
          @sort-change="handleSortChangee"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
          <el-table-column prop="srnm" label="注册机构类型" show-overflow-tooltip />
          <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
          <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="提交时间" sortable="custom" show-overflow-tooltip />
        </el-table>
        <el-pagination
          v-if="totale>0"
          :current-page="pageInfoe.pageNumber"
          :page-size="pageInfoe.pageSize"
          :total="totale"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangee"
          @current-change="handleCurrentChangee"
        />
      </el-tab-pane>
      <el-tab-pane label="审核未通过" name="3">
        <div class="search">
          <el-form ref="auditFormd" :model="auditFormd" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormd.rinm" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="注册地区" prop="registerAddr">
                  <el-cascader
                    v-model="auditFormd.registerAddr"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input v-model="auditFormd.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册机构类型" prop="srnm">
                  <el-select v-model="auditFormd.srnm" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in srnmArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提交时间" prop="time">
                  <el-date-picker
                    v-model="auditFormd.time"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormd('auditFormd')">查 询</el-button>
                <el-button @click="clearAuditFormd('auditFormd')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatad"
          @sort-change="handleSortChanged"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
          <el-table-column prop="srnm" label="注册机构类型" show-overflow-tooltip />
          <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
          <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="提交时间" sortable="custom" show-overflow-tooltip />
        </el-table>
        <el-pagination
          v-if="totald>0"
          :current-page="pageInfod.pageNumber"
          :page-size="pageInfod.pageSize"
          :total="totald"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChanged"
          @current-change="handleCurrentChanged"
        />
      </el-tab-pane>
      <el-tab-pane label="全部" name="5">
        <div class="search">
          <el-form ref="auditFormf" :model="auditFormf" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormf.rinm" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="注册地区" prop="registerAddr">
                  <el-cascader
                    v-model="auditFormf.registerAddr"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input v-model="auditFormf.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册机构类型" prop="srnm">
                  <el-select v-model="auditFormf.srnm" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in srnmArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提交时间" prop="time">
                  <el-date-picker
                    v-model="auditFormf.time"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormf('auditFormf')">查 询</el-button>
                <el-button @click="clearAuditFormf('auditFormf')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDataf"
          @sort-change="handleSortChangef"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
          <el-table-column prop="srnm" label="注册机构类型" show-overflow-tooltip />
          <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
          <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
          <el-table-column prop="currentState" label="状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="提交时间" sortable="custom" show-overflow-tooltip />
        </el-table>
        <el-pagination
          v-if="totalf>0"
          :current-page="pageInfof.pageNumber"
          :page-size="pageInfof.pageSize"
          :total="totalf"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangef"
          @current-change="handleCurrentChangef"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-loading="blockloading" :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { commonValidate2 } from '@/utils/formValidate'
import { getAdrr } from '@/api/general.js'
import { JgzSearch } from '@/api/register/register.js'
export default {
  data() {
    return {
      blockloading: false,
      blockSrc: '',
      dialogTableVisible: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      IsloadingA: false,
      JGloading: false,
      loading: null,
      JGoptions: [],
      registerAddrArr: [],
      srnmArr: [
        {
          value: '1',
          label: '认证机构'
        }, {
          value: '2',
          label: '检测机构'
        }
      ],
      searchData: {},
      paramsOldA: {},
      paramsOldB: {},
      paramsOldD: {},
      paramsOldE: {},
      activeName: '0',
      auditForm: {
        rinm: '',
        time: '',
        srnm: '',
        succ: '',
        sortKey: '1',
        registerAddr: [],
        currentState: '初审待审核'
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      auditFormb: {
        rinm: '',
        srnm: '',
        time: '',
        succ: '',
        sortKey: '1',
        registerAddr: [],
        currentState: '复审待审核'
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      totalb: 0,
      auditFormd: {
        rinm: '',
        srnm: '',
        time: '',
        succ: '',
        sortKey: '1',
        registerAddr: [],
        currentState: '审核未通过'
      },
      pageInfod: {
        pageNumber: 1,
        pageSize: 10
      },
      totald: 0,
      auditForme: {
        rinm: '',
        time: '',
        srnm: '',
        succ: '',
        sortKey: '1',
        registerAddr: [],
        currentState: '已备案'
      },
      pageInfoe: {
        pageNumber: 1,
        pageSize: 10
      },
      totale: 0,
      paramsOldF: {},
      auditFormf: {
        rinm: '',
        srnm: '',
        time: '',
        succ: '',
        sortKey: '1',
        registerAddr: [],
        currentState: ''
      },
      pageInfof: {
        pageNumber: 1,
        pageSize: 10
      },
      totalf: 0,
      rules: {
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      },
      tableData: [],
      tableDatab: [],
      tableDatad: [],
      tableDatae: [],
      tableDataf: []
    }
  },
  created() {
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if (searchData.pageName === this.$route.name && searchData.ifReview) {
        this.activeName = searchData.activeName
        if (searchData.activeName === '0') {
          this.pageInfo = searchData.pageInfo
          this.auditForm = searchData.searchForm
        } else if (searchData.activeName === '1') {
          this.pageInfob = searchData.pageInfo
          this.auditFormb = searchData.searchForm
        } else if (searchData.activeName === '4') {
          this.pageInfoe = searchData.pageInfo
          this.auditForme = searchData.searchForm
        } else if (searchData.activeName === '5') {
          this.pageInfof = searchData.pageInfo
          this.auditFormf = searchData.searchForm
        } else {
          this.pageInfod = searchData.pageInfo
          this.auditFormd = searchData.searchForm
        }
      }
    }
    this.handleClick()
  },
  methods: {
    downloadAll() {
      switch (this.activeName) {
        case '0':
          if (this.tableData.length > 0) {
            location.href = `nifaReport/regist/orgInfoOutExcel?userName=${this.$store.getters.userName}&rinm=${this.paramsOldA.rinm}&srnm=${this.paramsOldA.srnm}&succ=${this.paramsOldA.succ}&currentState=${this.paramsOldA.currentState}&startDate=${this.paramsOldA.startDate === undefined ? '' : this.paramsOldA.startDate}&endDate=${this.paramsOldA.endDate === undefined ? '' : this.paramsOldA.endDate}&registerProvince=${this.paramsOldA.registerProvince}&registerCity=${this.paramsOldA.registerCity}&registerArea=${this.paramsOldA.registerArea}`
          } else {
            this.$message.error('待导出数据为空')
          }
          break
        case '1':
          if (this.tableDatab.length > 0) {
            location.href = `nifaReport/regist/orgInfoOutExcel?userName=${this.$store.getters.userName}&rinm=${this.paramsOldB.rinm}&srnm=${this.paramsOldB.srnm}&succ=${this.paramsOldB.succ}&currentState=${this.paramsOldB.currentState}&startDate=${this.paramsOldB.startDate === undefined ? '' : this.paramsOldB.startDate}&endDate=${this.paramsOldB.endDate === undefined ? '' : this.paramsOldB.endDate}&registerProvince=${this.paramsOldB.registerProvince}&registerCity=${this.paramsOldB.registerCity}&registerArea=${this.paramsOldB.registerArea}`
          } else {
            this.$message.error('待导出数据为空')
          }
          break
        case '4':
          if (this.tableDatae.length > 0) {
            location.href = `nifaReport/regist/orgInfoOutExcel?userName=${this.$store.getters.userName}&rinm=${this.paramsOldE.rinm}&srnm=${this.paramsOldE.srnm}&succ=${this.paramsOldE.succ}&currentState=${this.paramsOldE.currentState}&startDate=${this.paramsOldE.startDate === undefined ? '' : this.paramsOldE.startDate}&endDate=${this.paramsOldE.endDate === undefined ? '' : this.paramsOldE.endDate}&registerProvince=${this.paramsOldE.registerProvince}&registerCity=${this.paramsOldE.registerCity}&registerArea=${this.paramsOldE.registerArea}`
          } else {
            this.$message.error('待导出数据为空')
          }
          break
        case '3':
          if (this.tableDatad.length > 0) {
            location.href = `nifaReport/regist/orgInfoOutExcel?userName=${this.$store.getters.userName}&rinm=${this.paramsOldD.rinm}&srnm=${this.paramsOldD.srnm}&succ=${this.paramsOldD.succ}&currentState=${this.paramsOldD.currentState}&startDate=${this.paramsOldD.startDate === undefined ? '' : this.paramsOldD.startDate}&endDate=${this.paramsOldD.endDate === undefined ? '' : this.paramsOldD.endDate}&registerProvince=${this.paramsOldD.registerProvince}&registerCity=${this.paramsOldD.registerCity}&registerArea=${this.paramsOldD.registerArea}`
          } else {
            this.$message.error('待导出数据为空')
          }
          break
        case '5':
          if (this.tableDataf.length > 0) {
            location.href = `nifaReport/regist/orgInfoOutExcel?userName=${this.$store.getters.userName}&rinm=${this.paramsOldF.rinm}&srnm=${this.paramsOldF.srnm}&succ=${this.paramsOldF.succ}&currentState=${this.paramsOldF.currentState}&startDate=${this.paramsOldF.startDate === undefined ? '' : this.paramsOldF.startDate}&endDate=${this.paramsOldF.endDate === undefined ? '' : this.paramsOldF.endDate}&registerProvince=${this.paramsOldF.registerProvince}&registerCity=${this.paramsOldF.registerCity}&registerArea=${this.paramsOldF.registerArea}`
          } else {
            this.$message.error('待导出数据为空')
          }
          break
      }
    },
    handleSortChange(column) {
      if (column.order === 'ascending') {
        this.auditForm.sortKey = '0'
        this.getAuditForm()
      } else if (column.order === 'descending') {
        this.auditForm.sortKey = '1'
        this.getAuditForm()
      }
    },
    handleSortChangeb(column) {
      if (column.order === 'ascending') {
        this.auditFormb.sortKey = '0'
        this.getAuditFormb()
      } else if (column.order === 'descending') {
        this.auditFormb.sortKey = '1'
        this.getAuditFormb()
      }
    },
    handleSortChanged(column) {
      if (column.order === 'ascending') {
        this.auditFormd.sortKey = '0'
        this.getAuditFormd()
      } else if (column.order === 'descending') {
        this.auditFormd.sortKey = '1'
        this.getAuditFormd()
      }
    },
    handleSortChangee(column) {
      if (column.order === 'ascending') {
        this.auditForme.sortKey = '0'
        this.getAuditForme()
      } else if (column.order === 'descending') {
        this.auditForme.sortKey = '1'
        this.getAuditForme()
      }
    },
    handleSortChangef(column) {
      if (column.order === 'ascending') {
        this.auditFormf.sortKey = '0'
        this.getAuditFormf()
      } else if (column.order === 'descending') {
        this.auditFormf.sortKey = '1'
        this.getAuditFormf()
      }
    },
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.getAuditForm()
          break
        case '1':
          this.getAuditFormb()
          break
        case '4':
          this.getAuditForme()
          break
        case '3':
          this.getAuditFormd()
          break
        case '5':
          this.getAuditFormf()
          break
      }
    },
    showDialog(row, type) {
      if (this.activeName === '0') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfo,
          searchForm: this.auditForm,
          activeName: this.activeName
        }
      } else if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfob,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
      } else if (this.activeName === '4') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoe,
          searchForm: this.auditForme,
          activeName: this.activeName
        }
      } else if (this.activeName === '5') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfof,
          searchForm: this.auditFormf,
          activeName: this.activeName
        }
      } else {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfod,
          searchForm: this.auditFormd,
          activeName: this.activeName
        }
      }
      this.$router.push({
        name: 'jgmaintenance',
        query: {
          riid: row.riid,
          searchData: JSON.stringify(this.searchData),
          type
        }
      })
    },
    goOpen(blockchainHash) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${blockchainHash}`
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm('0')
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForm('0')
    },
    seachAuditFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb('0')
        } else {
          return false
        }
      })
    },
    clearAuditFormb(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormb('0')
    },
    seachAuditFormd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormd('0')
        } else {
          return false
        }
      })
    },
    clearAuditFormd(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormd('0')
    },
    seachAuditForme(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForme('0')
        } else {
          return false
        }
      })
    },
    clearAuditForme(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForme('0')
    },
    seachAuditFormf(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormf('0')
        } else {
          return false
        }
      })
    },
    clearAuditFormf(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormf('0')
    },
    getAuditForm(num) {
      if (num === '0') {
        this.pageInfo.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfo, this.auditForm)
      delete params.time
      delete params.registerAddr
      params.srnm = this.auditForm.srnm === '' ? '99' : this.auditForm.srnm
      params.registerProvince = String(this.auditForm.registerAddr[0] ? this.auditForm.registerAddr[0] : '')
      params.registerCity = String(this.auditForm.registerAddr[1] ? this.auditForm.registerAddr[1] : '')
      params.registerArea = String(this.auditForm.registerAddr[2] ? this.auditForm.registerAddr[2] : '')
      params.startDate = this.auditForm.time ? this.auditForm.time[0] : ''
      params.endDate = this.auditForm.time ? this.auditForm.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
        this.paramsOldA = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormb(num) {
      if (num === '0') {
        this.pageInfob.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfob, this.auditFormb)
      delete params.time
      delete params.registerAddr
      params.srnm = this.auditFormb.srnm === '' ? '99' : this.auditFormb.srnm
      params.registerProvince = String(this.auditFormb.registerAddr[0] ? this.auditFormb.registerAddr[0] : '')
      params.registerCity = String(this.auditFormb.registerAddr[1] ? this.auditFormb.registerAddr[1] : '')
      params.registerArea = String(this.auditFormb.registerAddr[2] ? this.auditFormb.registerAddr[2] : '')
      params.startDate = this.auditFormb.time ? this.auditFormb.time[0] : ''
      params.endDate = this.auditFormb.time ? this.auditFormb.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
        this.paramsOldB = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormd(num) {
      if (num === '0') {
        this.pageInfod.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfod, this.auditFormd)
      delete params.time
      delete params.registerAddr
      params.srnm = this.auditFormd.srnm === '' ? '99' : this.auditFormd.srnm
      params.registerProvince = String(this.auditFormd.registerAddr[0] ? this.auditFormd.registerAddr[0] : '')
      params.registerCity = String(this.auditFormd.registerAddr[1] ? this.auditFormd.registerAddr[1] : '')
      params.registerArea = String(this.auditFormd.registerAddr[2] ? this.auditFormd.registerAddr[2] : '')
      params.startDate = this.auditFormd.time ? this.auditFormd.time[0] : ''
      params.endDate = this.auditFormd.time ? this.auditFormd.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
        this.paramsOldD = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditForme(num) {
      if (num === '0') {
        this.pageInfoe.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfoe, this.auditForme)
      delete params.time
      delete params.registerAddr
      params.srnm = this.auditForme.srnm === '' ? '99' : this.auditForme.srnm
      params.registerProvince = String(this.auditForme.registerAddr[0] ? this.auditForme.registerAddr[0] : '')
      params.registerCity = String(this.auditForme.registerAddr[1] ? this.auditForme.registerAddr[1] : '')
      params.registerArea = String(this.auditForme.registerAddr[2] ? this.auditForme.registerAddr[2] : '')
      params.startDate = this.auditForme.time ? this.auditForme.time[0] : ''
      params.endDate = this.auditForme.time ? this.auditForme.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totale = res.total
        this.tableDatae = res.list
        this.paramsOldE = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormf(num) {
      if (num === '0') {
        this.pageInfof.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfof, this.auditFormf)
      delete params.time
      delete params.registerAddr
      params.srnm = this.auditFormf.srnm === '' ? '99' : this.auditFormf.srnm
      params.registerProvince = String(this.auditFormf.registerAddr[0] ? this.auditFormf.registerAddr[0] : '')
      params.registerCity = String(this.auditFormf.registerAddr[1] ? this.auditFormf.registerAddr[1] : '')
      params.registerArea = String(this.auditFormf.registerAddr[2] ? this.auditFormf.registerAddr[2] : '')
      params.startDate = this.auditFormf.time ? this.auditFormf.time[0] : ''
      params.endDate = this.auditFormf.time ? this.auditFormf.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totalf = res.total
        this.tableDataf = res.list
        this.paramsOldF = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfo.pageSize = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangea(val) {
      this.paramsOldA.pageNumber = val
      this.pageInfo.pageNumber = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangeb(val) {
      this.paramsOldB.pageSize = val
      this.pageInfob.pageSize = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeb(val) {
      this.paramsOldB.pageNumber = val
      this.pageInfob.pageNumber = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChanged(val) {
      this.paramsOldD.pageSize = val
      this.pageInfod.pageSize = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChanged(val) {
      this.paramsOldD.pageNumber = val
      this.pageInfod.pageNumber = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangee(val) {
      this.paramsOldE.pageSize = val
      this.pageInfoe.pageSize = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldE).then(res => {
        this.IsloadingA = false
        this.totale = res.total
        this.tableDatae = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangee(val) {
      this.paramsOldE.pageNumber = val
      this.pageInfoe.pageNumber = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldE).then(res => {
        this.IsloadingA = false
        this.totale = res.total
        this.tableDatae = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangef(val) {
      this.paramsOldF.pageSize = val
      this.pageInfof.pageSize = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldF).then(res => {
        this.IsloadingA = false
        this.totalf = res.total
        this.tableDataf = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangef(val) {
      this.paramsOldF.pageNumber = val
      this.pageInfof.pageNumber = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldF).then(res => {
        this.IsloadingA = false
        this.totalf = res.total
        this.tableDataf = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>
<style lang="scss">
#block{
    iframe{
      min-height: calc(100vh - 120px);
    }
  }
// .continue{
//     .el-date-editor .el-range__close-icon{
//     line-height: 24px
//   }
// }
</style>
