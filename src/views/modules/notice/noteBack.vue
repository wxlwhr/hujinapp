<template>
  <el-card class="noteBack">
    <div slot="header" class="clearfix btnCard">
      <span>通知公告</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-form ref="refForm" :model="formModel" :inline="true" style="padding:10px 0">
      <el-form-item label="名称" prop="rinm">
        <el-input v-model="formModel.rinm" placeholder="请输入" />
      </el-form-item>
      <!-- <el-form-item label="阅读状态" prop="nrrReStatus">
        <el-select v-model="formModel.nrrReStatus" placeholder="请选择" class="w100">
          <el-option v-for="(item,idx) in nrrReStatusOption" :key="idx" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="退回状态" prop="nrrReStatus">
        <el-select v-model="formModel.returnType" placeholder="请选择" class="w100">
          <el-option v-for="(item,idx) in returnTypeArr" :key="idx" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="反馈状态" prop="backStatus">
        <el-select v-model="formModel.backStatus" placeholder="请选择" class="w100">
          <el-option v-for="(item,idx) in backStatusOption" :key="idx" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" plain @click="hanldSearch">查 询</el-button>
        <el-button type="info" plain @click="resetForm">清 空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" tooltip-effect="dark">
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column label="名称" prop="rinm" min-width="160" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="!isBack" type="text" disabled>{{ scope.row.rinm }}</el-button>
          <el-button v-else :disabled="scope.row.backStatus==='0'" type="text" @click="go2Page(scope.row)">{{ scope.row.rinm }}</el-button>
          <!-- <el-button v-else type="text" @click="go2Page(scope.row)">{{ scope.row.rinm }}</el-button> -->
        </template>
      </el-table-column>
      <el-table-column label="阅读时间" prop="nrrReDate" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.nrrReDate?scope.row.nrrReDate:'--' }}
        </template>
      </el-table-column>
      <el-table-column label="阅读状态" prop="nrrReStatus" min-width="80" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.nrrReStatus|fitersnrrReStatus }}
        </template>
      </el-table-column>
      <el-table-column v-if="isBack" label="反馈时间" prop="backDate" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.backDate?scope.row.backDate:'--' }}
        </template>
      </el-table-column>
      <el-table-column v-if="!isBack" label="反馈时间" prop="backDate" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.backDate?'--':'--' }}
        </template>
      </el-table-column>
      <el-table-column label="反馈截止时间" prop="backLine" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- scope.row.backStatus !== '1' -->
          <el-button :disabled="!isBack" type="text" @click="backLineClick(scope.row)">{{ scope.row.backLine? scope.row.backLine:'--' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="isBack" label="反馈状态" prop="backStatus" min-width="80" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.backStatus|fitersbackStatus }}
        </template>
      </el-table-column>
      <el-table-column v-if="!isBack" label="反馈状态" prop="backStatus" min-width="80" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.backStatus?'--':'--' }}
        </template>
      </el-table-column>
      <el-table-column label="是否退回" prop="returnType" min-width="80" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ (scope.row.returnType==='1'||scope.row.returnType==='2')?'是':'否' }}
        </template>
      </el-table-column>
      <el-table-column v-if="isBack" label="催办时间" prop="backStatus" width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.urgeDate !== "0"?scope.row.urgeDate:'--' }}
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="isBack" label="反馈内容" prop="fbInfo" width="160">
        <template slot-scope="scope">
          <el-popover
            :content="scope.row.fbInfo"
            placement="top-start"
            title="反馈内容"
            width="500"
            trigger="hover">
            <el-button slot="reference" type="text" style="color:#606266">{{ scope.row.fbInfo?scope.row.fbInfo:'--' }}</el-button>
          </el-popover>
        </template>
      </el-table-column> -->
      <!-- <el-table-column v-if="!isBack" label="反馈内容" prop="fbInfo" width="160" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.fbInfo?'--':'--' }}
        </template>
      </el-table-column> -->
      <el-table-column v-if="isBack" label="附件下载" prop="fbInfo" min-width="160">
        <template slot-scope="scope">
          <div v-for="item in scope.row.listFile" :key="item.attachId" @click="handlFile(item.attachId)">
            <el-tooltip :content="item.attachName" class="item" effect="dark" placement="top-start">
              <el-button v-if="scope.row.listFile.length>0" type="text">
                {{ item.attachName }}
              </el-button>
            </el-tooltip>
          </div>
          <span v-if="scope.row.listFile.length===0">--</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isBack" label="操作" width="150px">
        <template slot-scope="scope">
          <!-- <div v-if="isTrue" style="display:inline">
            <el-button v-if="scope.row.backStatus === '0'" :disabled="scope.row.urgeDate !== '0'" type="text" @click="handlUrge(scope)">催办</el-button>
            <el-button v-else type="text" disabled style="color:black">--</el-button>
          </div>
          <el-button v-else type="text" disabled style="color:black">--</el-button> -->
          <!-- <el-button v-if="scope.row.backStatus !== '1'" type="text" disabled style="color:black">--</el-button> -->
          <div>
            <el-button type="text" size="mini" @click="handlUrge(scope)">催办</el-button>
            <el-button v-if="scope.row.backStatus === '1' && scope.row.returnType === '0'" type="text" size="mini" @click="getBack(scope)">退回</el-button>
            <el-button type="text" size="mini" @click="getBackById(scope)">操作记录</el-button>
          </div>
          <el-dialog :visible.sync="dialogFormVisible" width="50%" center title="请选择退回方式">
            <el-form ref="refDialogForm" :model="formModel1">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="退回方式" required>
                    <el-select v-model="formModel1.value" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="退回说明" required>
                    <el-input
                      v-model="formModel1.returnRemarks"
                      :rows="5"
                      type="textarea"
                      placeholder="请输入内容"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button :loading="isTrue" type="primary" @click="goBackInfo(scope)">确 定</el-button>
            </div>
          </el-dialog>
          <!--操作记录弹窗-->
          <el-dialog :visible.sync="dialogTableVisibleBack" title="操作记录" width="70%">
            <el-table v-loading="IsloadingA" :data="gridBackData">
              <el-table-column property="operator" label="操作人" width="150px" />
              <el-table-column property="deptName" label="单位名称" width="250px" />
              <el-table-column label="操作方式" width="100px">
                <template slot-scope="scopea">
                  {{ scopea.row.returnType | returnType }}
                </template>
              </el-table-column>
              <el-table-column property="operateTime" label="操作日期" width="200px" />
              <el-table-column property="operateRemark" label="操作说明" />
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改反馈时间 -->
    <el-dialog :visible.sync="dialogFormVisibleback" title="反馈截止时间" center width="30%">
      <el-form>
        <el-form-item label="反馈截止时间">
          <!-- :picker-options="pickerOptions2" -->
          <el-date-picker
            v-model="backLine"
            :clearable="false"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleback = false">取 消</el-button>
        <el-button type="primary" @click="backLineClose">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>

</template>

<script>
import { getListApi, urgingApi, noteBack, getBackByPrnid, updateBackLine } from '@/api/notice/noteBack.js'
// import { getNoteDetailedByNoticeId } from '@/api/notice/newCope.js'
import { getToken } from '@/utils/auth'
// import {
//   getDetialApi
// } from '@/api/notice/details.js'
export default {
  name: 'NoteBack',
  filters: {
    returnType(val) {
      switch (val) {
        case '1':
          return '补报'
        case '2':
          return '错报'
        case '3':
          return '催办'
        default:
          break
      }
    },
    fitersnrrReStatus(val) {
      switch (val) {
        case '0':
          return '未读'
        case '1':
          return '已读'
        default:
          return '--'
      }
    },
    fitersbackStatus(val) {
      switch (val) {
        case '0':
          return '未反馈'
        case '1':
          return '已反馈'
        default:
          return '--'
      }
    }
  },
  data() {
    return {
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      centerDialogVisible: false,
      backLine: '',
      formDate: {
        backDate: '', // 反馈时间
        fbInfo: '',
        nrrReDate: '', // 阅读时间
        rinm: '',
        listFile: []
      },
      isTrue: false,
      isBack: true,
      formModel: {
        rinm: '',
        nrrReStatus: '',
        returnType: '',
        backStatus: ''
      },
      // 退回按钮表单
      formModel1: {
        value: '',
        returnRemarks: ''
      },
      tableData: [
      ],
      fiName: '',
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: null,
      dialogTableVisible: false,
      dialogFormVisibleback: false,
      dialogTableVisibleBack: false,
      gridData: [],
      // option
      nrrReStatusOption: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '未读',
          value: '0'
        },
        {
          label: '已读',
          value: '1'
        }
      ],
      returnTypeArr: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      backStatusOption: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '未反馈',
          value: '0'
        },
        {
          label: '已反馈',
          value: '1'
        }
      ],
      options: [{
        value: '2',
        label: '错报'
      }, {
        value: '1',
        label: '补报'
      }],
      value: '',
      dialogFormVisible: false,
      pnrId: '',
      returnRemarks: '',
      // 操作记录
      gridBackData: []
    }
  },
  computed: {
  },
  mounted() {
    switch (this.$route.query.activeStatus) {
      case '1': {
        this.formModel.nrrReStatus = '1'
        break
      }
      case '2': {
        this.formModel.nrrReStatus = '0'
        break
      }
      case '3': {
        this.formModel.backStatus = '1'
        break
      }
      case '4': {
        this.formModel.backStatus = '0'
        break
      }
      default:
        break
    }
    this.getData()
    this.fiName = this.$route.query.fiName
  },
  methods: {
    // 更改反馈时间
    backLineClick(row) {
      this.dialogFormVisibleback = true
      this.backLine = row.backLine
      this.pnrId = row.pnrId
    },
    backLineClose() {
      updateBackLine({ pnrId: this.pnrId, backLine: this.backLine }).then(res => {
        this.$message({
          message: '反馈截止时间更新成功',
          type: 'success'
        })
        this.dialogFormVisibleback = false
        this.getData()
      })
    },
    go2Page(row) {
      this.$router.push({
        path: '/notecoupleBack',
        query:
        {
          noteId: row.noteId,
          riid: row.riid,
          pnrId: row.pnrId
        }
      })// 跳转到详情页
    },
    // 获取列表数据
    getData() {
      const obj = Object.assign({}, this.formModel, this.pageInfo)
      obj.noteId = this.$route.query.noteId
      getListApi(obj).then(res => {
        this.tableData = res.page
        this.total = res.total
      })
      // getDetialApi({ id: this.$route.query.noteId }).then(res => {
      //   // const endRead = new Date(res.noteInfo[0].backLine).getTime()
      //   // const currDate = new Date().getTime()
      //   // if (endRead > currDate) {
      //   //   this.isTrue = false
      //   // } else {
      //   //   this.isTrue = true
      //   // }
      //   if (res.noteInfo[0].isBack === '1') {
      //     this.isBack = false
      //   }
      // })
    },

    // 催办
    handlUrge(scope) {
      this.$confirm('您是否确定催办?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const scopeRow = scope.row
        const paramObj = {
          rinm: this.fiName,
          noteId: scopeRow.noteId,
          riid: scopeRow.riid,
          pnrId: scopeRow.pnrId
        }
        urgingApi(paramObj).then(res => {
          // const obj = {
          //   noteId: scopeRow.noteId,
          //   type: 1,
          //   riid: scopeRow.riid
          // }
          this.getData()
          // getNoteDetailedByNoticeId(obj).then(res => {

          // })
          this.$message({
            showClose: true,
            message: '催办成功',
            duration: 1000,
            type: 'success'
          })
        })
      })
    },

    // 查询
    hanldSearch() {
      this.pageInfo.pageNum = 1
      this.getData()
    },

    // 清空
    resetForm() {
      this.$refs.refForm.resetFields()
      this.hanldSearch()
    },

    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    },

    // 下载
    handlFile(attachId) {
      location.href = `nifaNote/note/downloadFile?attachId=${attachId}&token=${getToken()}`
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    errorBack() {
      this.$confirm('确定退回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$notify({
          title: '已退回',
          message: '已退回',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    goBackInfo(scope) {
      this.$confirm('确定退回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (this.formModel1.value === '') {
          this.$message({
            message: '请选择退回类型',
            type: 'info'
          })
        } else if (this.formModel1.returnRemarks === '') {
          this.$message({
            message: '备注不能为空',
            type: 'info'
          })
        } else {
          const obj = {
            pnrId: scope.row.pnrId,
            returnType: this.formModel1.value,
            returnRemarks: this.formModel1.returnRemarks
          }
          this.isTrue = true
          noteBack(obj).then(res => {
            this.$message({
              message: '退回成功',
              type: 'success'
            })
            this.isTrue = false
            this.dialogFormVisible = false
            // this.$router.push({
            //   name: 'note_back'
            // })
            this.getData()
          }).catch(res => {
            this.isTrue = false
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    getBackById(scope) {
      this.dialogTableVisibleBack = true
      const obj = {
        pnrId: scope.row.pnrId
      }
      getBackByPrnid(obj).then(res => {
        this.gridBackData = res
      })
    },
    getBack(scope) {
      this.dialogFormVisible = true
    }
  }
}
</script>
<style  lang="scss">
.noteBack {
  position: relative;
  .back {
    width: 45px;
    height: 45px;
    position: absolute;
    top: -20px;
    right: -20px;
  }
  .w100{
    width: 100%
  }
}
.el-tooltip__popper{
  max-width:50%
  }
</style>
