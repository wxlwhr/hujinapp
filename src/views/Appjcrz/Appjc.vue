<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>App检测信息查看</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="待检测" name="0">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditForm.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditForm.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditForm.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
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
          @sort-change="sortChange"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="appName" label="App名称" show-overflow-tooltip />
          <el-table-column prop="productType" label="APP产品类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.productType">
                <el-tag v-if="scope.row.productType==='Android'" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='IOS'" type="success" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='other'" type="warning" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appFilePath" label="外部评估" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.appFilePath">
                <span v-if="scope.row.appFilePath==='2'">
                  {{ '金融科技产品认证' }}
                </span>
                <span v-else-if="scope.row.appFilePath==='1'">
                  {{ '其他' }}
                </span>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.appVersion===null?'--':scope.row.appVersion===''?'--':scope.row.appVersion }}
            </template>
          </el-table-column>
          <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="download(scope.row.id)">
                <el-tooltip class="item" effect="dark" content="下载安装包" placement="top">
                  <i class="el-icon-download" />
                </el-tooltip>
              </el-button>
              <el-button type="text" :disabled="returnDis(scope.row.approveReturnFlag)" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="办理" placement="top">
                  <img src="@/icons/png/banli-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totala>0"
          :current-page="pageInfoa.pageNumber"
          :page-size="pageInfoa.pageSize"
          :total="totala"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
      </el-tab-pane>
      <el-tab-pane label="已检测" name="1">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormb.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormb.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormb.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
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
          :data="tableDatb"
          @sort-change="sortChangeb"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="appName" label="App名称" show-overflow-tooltip />
          <el-table-column prop="productType" label="APP产品类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.productType">
                <el-tag v-if="scope.row.productType==='Android'" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='IOS'" type="success" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='other'" type="warning" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appFilePath" label="外部评估" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.appFilePath">
                <span v-if="scope.row.appFilePath==='2'">
                  {{ '金融科技产品认证' }}
                </span>
                <span v-else-if="scope.row.appFilePath==='1'">
                  {{ '其他' }}
                </span>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.appVersion===null?'--':scope.row.appVersion===''?'--':scope.row.appVersion }}
            </template>
          </el-table-column>
          <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="download(scope.row.id)">
                <el-tooltip class="item" effect="dark" content="下载安装包" placement="top">
                  <i class="el-icon-download" />
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
      <el-tab-pane label="认证退至检测机构" name="2">
        <div class="search">
          <el-form ref="auditFormc" :model="auditFormc" :rules="rules" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormc.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormc.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormc.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormc('auditFormc')">查 询</el-button>
                <el-button @click="clearAuditFormc('auditFormc')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatac"
          @sort-change="sortChangec"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="appName" label="App名称" show-overflow-tooltip />
          <el-table-column prop="productType" label="APP产品类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.productType">
                <el-tag v-if="scope.row.productType==='Android'" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='IOS'" type="success" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='other'" type="warning" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appFilePath" label="外部评估" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.appFilePath">
                <span v-if="scope.row.appFilePath==='2'">
                  {{ '金融科技产品认证' }}
                </span>
                <span v-else-if="scope.row.appFilePath==='1'">
                  {{ '其他' }}
                </span>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.appVersion===null?'--':scope.row.appVersion===''?'--':scope.row.appVersion }}
            </template>
          </el-table-column>
          <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="download(scope.row.id)">
                <el-tooltip class="item" effect="dark" content="下载安装包" placement="top">
                  <i class="el-icon-download" />
                </el-tooltip>
              </el-button>
              <el-button type="text" :disabled="returnDis(scope.row.approveReturnFlag)" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="办理" placement="top">
                  <img src="@/icons/png/banli-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalc>0"
          :current-page="pageInfoc.pageNumber"
          :page-size="pageInfoc.pageSize"
          :total="totalc"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangec"
          @current-change="handleCurrentChangec"
        />
      </el-tab-pane>
      <el-tab-pane label="协会退至检测机构" name="3">
        <div class="search">
          <el-form ref="auditFormd" :model="auditFormd" :rules="rules" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormd.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormd.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormd.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
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
          @sort-change="sortChanged"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="appName" label="App名称" show-overflow-tooltip />
          <el-table-column prop="productType" label="APP产品类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.productType">
                <el-tag v-if="scope.row.productType==='Android'" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='IOS'" type="success" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
                <el-tag v-else-if="scope.row.productType==='other'" type="warning" style="width:65px">
                  {{ scope.row.productType }}
                </el-tag>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appFilePath" label="外部评估" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.appFilePath">
                <span v-if="scope.row.appFilePath==='2'">
                  {{ '金融科技产品认证' }}
                </span>
                <span v-else-if="scope.row.appFilePath==='1'">
                  {{ '其他' }}
                </span>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.appVersion===null?'--':scope.row.appVersion===''?'--':scope.row.appVersion }}
            </template>
          </el-table-column>
          <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="download(scope.row.id)">
                <el-tooltip class="item" effect="dark" content="下载安装包" placement="top">
                  <i class="el-icon-download" />
                </el-tooltip>
              </el-button>
              <el-button type="text" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="办理" placement="top">
                  <img src="@/icons/png/banli-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
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
import { searchQuery, HXSearchList } from '@/api/appbeian/register.js'

export default {
  data() {
    return {
      searchData: {},
      blockloading: false,
      blockSrc: '',
      dialogTableVisible: false,
      paramsObj: {
        sort: '0'
      },
      custRecoDialogVisible: false,
      tableDatb: [],
      isTrue: true,
      hlShow: true,
      IsloadingA: false,
      loading: null,
      paramsOldA: {},
      paramsOldB: {},
      paramsOldC: {},
      paramsOldD: {},
      fileNames: [],
      fileList: [],
      fileNumA: true,
      auditForm: {
        appName: '',
        rinm: '',
        auditStatus: '待检测',
        appVersion: ''
      },
      pageInfoa: {
        pageNumber: 1,
        pageSize: 10
      },
      totala: 0,
      auditFormb: {
        appName: '',
        rinm: '',
        auditStatus: '已检测待认证',
        appVersion: ''
      },
      auditFormc: {
        appName: '',
        rinm: '',
        auditStatus: '认证退至检测机构',
        appVersion: ''
      },
      auditFormd: {
        appName: '',
        rinm: '',
        auditStatus: '协会退至检测机构',
        appVersion: ''
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      totalb: 0,
      pageInfoc: {
        pageNumber: 1,
        pageSize: 10
      },
      totalc: 0,
      pageInfod: {
        pageNumber: 1,
        pageSize: 10
      },
      totald: 0,
      rules: {
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appVersion: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appName: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      },
      AppList: [
        {
          name: '待检测',
          code: '待检测'
        },
        {
          name: '已检测',
          code: '已检测'
        }
      ],
      activeName: '0',
      custRecoTbData: [],
      excludeTableData: [],
      tableData: [],
      tableDatab: [],
      tableDatac: [],
      tableDatad: []
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        if (searchData.activeName === '0') {
          this.pageInfoa = searchData.pageInfo
          this.auditForm = searchData.paramsObj
        } else if (searchData.activeName === '1') {
          this.pageInfob = searchData.pageInfo
          this.auditFormb = searchData.paramsObj
        } else if (searchData.activeName === '2') {
          this.pageInfoc = searchData.pageInfo
          this.auditFormc = searchData.paramsObj
        } else if (searchData.activeName === '3') {
          this.pageInfod = searchData.pageInfo
          this.auditFormd = searchData.paramsObj
        }
      }
    }
    const tabMsg = this.$route.params.tabMsg ? this.$route.params.tabMsg.tabMsg : 'noMsg'
    if (tabMsg === '已检测待认证') {
      this.activeName = '1'
      this.getAuditFormb()
    } else if (tabMsg === '认证退至检测机构') {
      this.activeName = '2'
      this.getAuditFormc()
    } else if (tabMsg === '协会退至检测机构') {
      this.activeName = '3'
      this.getAuditFormd()
    } else {
      this.activeName = '0'
      this.getAuditForm()
    }
  },
  methods: {
    returnDis(data) {
      if (data !== null && data !== '1' && data !== '') {
        return !(data === this.$store.getters.userName)
      } else {
        return false
      }
    },
    tableExamine(obj, type) {
      if (this.activeName === '0') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
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
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoc,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      } else if (this.activeName === '3') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfod,
          searchForm: this.auditFormd,
          activeName: this.activeName
        }
      }
      this.searchData.paramsObj = this.paramsObj
      this.$router.push({
        name: 'appjcxq',
        query: {
          type,
          id: obj.id,
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    sortChange(column) {
      if (column.order === 'descending') {
        this.getAuditForm()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForm()
        this.paramsObj.sort = '0'
      }
    },
    sortChangeb(column) {
      if (column.order === 'descending') {
        this.getAuditFormb()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormb()
        this.paramsObj.sort = '0'
      }
    },
    sortChangec(column) {
      if (column.order === 'descending') {
        this.getAuditFormc()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormc()
        this.paramsObj.sort = '0'
      }
    },
    sortChanged(column) {
      if (column.order === 'descending') {
        this.getAuditFormd()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormd()
        this.paramsObj.sort = '0'
      }
    },
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.getAuditForm()
          sessionStorage.setItem('tabMsg', '待检测')
          break
        case '1':
          this.getAuditFormb()
          sessionStorage.setItem('tabMsg', '已检测待认证')
          break
        case '2':
          this.getAuditFormc()
          sessionStorage.setItem('tabMsg', '认证退至检测机构')
          break
        case '3':
          this.getAuditFormd()
          sessionStorage.setItem('tabMsg', '协会退至检测机构')
          break
      }
    },
    download(id) {
      HXSearchList({ noteId: id, ownSystem: '8' }).then(res => {
        location.href = `nifa-autonomy-file/upload/download/${res[0].attachId}`
      })
    },
    // 注销
    addCase() {
      this.$router.push({
        name: 'AppRegistrationVivw'
      })
    },
    addLogout() {
      this.$router.push({
        name: 'AppRegLogout'
      })
    },
    showDialog(row, Num) {
      if (this.activeName === '0') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
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
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoc,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      } else if (this.activeName === '3') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfod,
          searchForm: this.auditFormd,
          activeName: this.activeName
        }
      }
      this.searchData.paramsObj = this.paramsObj
      this.$router.push({
        name: 'appjcxq',
        query: {
          from: '详情页', // 详情页进入时不能填写检测信息
          Num,
          id: row.id,
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm(0)
        } else {
          return false
        }
      })
    },
    getAuditForm(tips = 1) {
      if (tips === 0) {
        this.pageInfoa.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoa, this.auditForm)
      this.IsloadingA = true
      this.paramsObj.auditStatus = '待检测'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list
        this.paramsOldA = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachReportForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getReportForm()
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForm(0)
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfoa.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangea(val) {
      this.paramsOldA.pageNumber = val
      this.pageInfoa.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },

    seachAuditFormd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormd(0)
        } else {
          return false
        }
      })
    },
    getAuditFormd(tips = 1) {
      if (tips === 0) {
        this.pageInfod.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfod, this.auditFormd)
      this.IsloadingD = true
      this.paramsObj.auditStatus = '协会退至检测机构'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
        this.paramsOldD = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachReportFormd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getReportFormd()
        } else {
          return false
        }
      })
    },
    clearAuditFormd(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormd(0)
    },
    handleSizeChanged(val) {
      this.paramsOldD.pageSize = val
      this.pageInfod.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChanged(val) {
      this.paramsOldD.pageNumber = val
      this.pageInfoa.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    goBlockChain(row) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`
    },
    closeBlock() {
      const block = document.getElementById('block')
      block.style.display = 'none'
    },
    getAuditFormb(tips = 1) {
      if (tips === 0) {
        this.pageInfob.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfob, this.auditFormb)
      this.IsloadingA = true
      this.paramsObj.auditStatus = '已检测待认证'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatb = res.list
        this.tableDatb.map(item => {
          item.id = item.appId
        })
        this.paramsOldB = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb(0)
        } else {
          return false
        }
      })
    },
    clearAuditFormb(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormb(0)
    },
    handleSizeChangeb(val) {
      this.paramsOldB.pageSize = val
      this.pageInfob.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatb = res.list
        this.tableDatb.map(item => {
          item.id = item.appId
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeb(val) {
      this.paramsOldB.pageNumber = val
      this.pageInfob.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatb = res.list
        this.tableDatb.map(item => {
          item.id = item.appId
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormc(0)
        } else {
          return false
        }
      })
    },
    getAuditFormc(tips = 1) {
      if (tips === 0) {
        this.pageInfoc.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoc, this.auditFormc)
      this.IsloadingA = true
      this.paramsObj.auditStatus = '认证退至检测机构'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
        this.paramsOldC = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachReportFormc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getReportFormc()
        } else {
          return false
        }
      })
    },
    clearAuditFormc(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormc(0)
    },
    handleSizeChangec(val) {
      this.paramsOldC.pageSize = val
      this.pageInfoc.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatc = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangec(val) {
      this.paramsOldC.pageNumber = val
      this.pageInfoc.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatc = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>
<style lang="scss">
.continue{
    .el-date-editor .el-range__close-icon{
    line-height: 24px
  }
  #block{
    iframe{
      min-height: calc(100vh - 120px);
    }
  }
}
</style>
