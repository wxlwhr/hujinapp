<template>
  <el-card class="continuewz">
    <div slot="header" class="clearfix btnCard">
      <span>产品与服务信息</span>
    </div>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="auditForm.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品与服务名称" prop="productName">
              <el-input v-model="auditForm.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="productType">
              <el-select v-model="auditForm.productType" :clearable="true" placeholder="请选择">
                <el-option
                  v-for="item in productTypeList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="datepicker">
            <el-form-item label="发布时间" prop="releaseTime">
              <el-date-picker
                v-model="auditForm.releaseTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="8" class="datepicker">
            <el-form-item label="" prop="createTime">
              <el-row>
                <el-col :span="15">
                  <el-radio-group v-model="auditForm.sortKey">
                    <el-radio label="sortKeyRelease">发布时间</el-radio>
                    <el-radio label="sortKeyThumb">点赞数</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="9">
                  <el-select v-model="auditForm.sort" placeholder="请选择">
                    <el-option
                      v-for="item in sortList"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>

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
    <el-card v-loading="IsloadingA">
      <div>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in productData" :key="index" :span="8">
            <el-card class="product_list">
              <img :src="item.filePath" class="card_img" alt="">
              <el-row>
                <el-col style="width:200px;font-weight:bold;font-size:18px;margin-bottom:15px;">
                  <div v-if="item.productName.length < 10">
                    {{ item.productName }}
                  </div>
                  <el-tooltip v-else class="item" effect="dark" :content="item.productName" placement="top">
                    <div style="width:200px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                      {{ item.productName }}
                    </div>
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-row>
                <el-col style="font-size:14px;color:#92959B;margin-bottom:10px">
                  <div v-if="item.companyName !== null && item.companyName.length < 10">
                    公司：{{ item.companyName }}
                  </div>
                  <el-tooltip
                    v-else
                    class="item"
                    effect="dark"
                    :content="item.companyName"
                    placement="top"
                  >
                    <div style="width:200px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                      公司：{{ item.companyName }}
                    </div>
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-row>
                <el-col style="font-size:14px;color:#92959B;margin-bottom:10px">
                  类型：{{ item.productType }}
                </el-col>
              </el-row>
              <el-row>
                <el-col style="font-size:14px;color:#92959B;margin-bottom:10px;">
                  {{ item.releaseTime }}
                </el-col>
              </el-row>
              <el-row>
                <el-col class="card_text" style="font-size:14px;margin-bottom:10px">
                  简介：{{ item.productSynopsis }}
                </el-col>
              </el-row>
              <div class="card_bot">
                <span v-if="!item.flag" @click="addZan(item)">
                  <img src="../../assets/zan.png" :class="[$store.getters.srnm === ''?'img_s':'img']" style="height:20px;width:20px" alt=""> {{ item.productThumb }}
                </span>
                <span v-else @click="alerdyZan(item)">
                  <img src="../../assets/zan_s.png" :class="[$store.getters.srnm === ''?'img_s':'img']" style="height:20px;width:20px" alt=""> {{ item.productThumb }}
                </span>
                <el-button v-if="$store.getters.srnm !== ''" type="text" style="marginLeft:18px;marginRight:10px" @click="getPhone(item)">获取联系方式</el-button>
                <el-button :class="[$store.getters.srnm === ''?'is_xh':'']" type="text" @click="showDialog(item)">查看</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-pagination
      :current-page="pageInfoa.pageNumber"
      :page-size="pageInfoa.pageSize"
      :page-sizes="[9, 18, 27, 36,45,99]"
      :total="totala"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChangea"
      @current-change="handleCurrentChangea"
    />
    <el-dialog
      title="接收联系方式的手机号（可修改）"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div style="width:100%;text-align:center">
        <el-input v-model.trim="phoneNum" clearable style="width:80%" placeholder="请输入内容" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getPhoneSure">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { commonValidate2 } from '@/utils/formValidate'
import { getClock } from '@/api/general.js'
import { queryOrg, repeatthumb, getPhone, phone } from '@/api/TechnologyProducts.js'
export default {
  data() {
    return {
      id: '',
      phoneNum: '',
      centerDialogVisible: false,
      sortList: [
        {
          label: '正序',
          value: '正序'
        },
        {
          label: '倒序',
          value: '倒序'
        }
      ],
      productTypeList: [],
      productData: [],
      searchData: {},
      formMsg: {},
      queryParams: {
        startDates: '',
        endDates: ''
      },
      IsloadingA: false,
      loading: null,
      paramsOldA: {},
      auditForm: {
        sort: '正序',
        sortKey: 'sortKeyRelease',
        companyName: '',
        productName: '',
        productType: '',
        auditStatus: '已发布',
        releaseTime: [],
        sortKeyRelease: '',
        sortKeyThumb: ''
      },
      pageInfoa: {
        pageNumber: 1,
        pageSize: 9
      },
      totala: 0,
      activeName: '1',
      rules: {
        comment: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appVersion: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        returnState: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appName: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.pageInfoa = searchData.pageInfo
        this.auditForm = searchData.searchForm
      }
    }
    getClock('C5900000').then(res => {
      this.productTypeList = res.map(item => {
        return {
          label: item.codeValue,
          value: item.codeKey
        }
      })
      this.getAuditForm()
    })
  },
  methods: {
    getPhoneSure() {
      getPhone({ id: this.id, phone: this.phoneNum }).then(res => {
        this.$message({
          type: 'success',
          message: '获取成功,请注意查收短信'
        })
        this.centerDialogVisible = false
      })
    },
    getPhone(data) {
      this.id = data.id
      phone(data.id).then(res => {
        this.phoneNum = res.phone
      })
      this.centerDialogVisible = true
    },
    addZan(data) {
      if (this.$store.getters.srnm === '') {
        this.$message({
          type: 'warning',
          message: '协会管理员不能点赞'
        })
      } else {
        repeatthumb({ id: data.id, thumb: '1' }).then(res => {
          this.getAuditForm('1')
        })
      }
    },
    alerdyZan() {
      this.$message({
        type: 'warning',
        message: '您已经赞过了'
      })
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm()
        } else {
          return false
        }
      })
    },
    getAuditForm(tips = '2') {
      this.pageInfoa.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoa, this.auditForm)
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDates = this.auditForm.releaseTime.length ? this.auditForm.releaseTime[0] : ''
      this.queryParams.endDates = this.auditForm.releaseTime.length ? this.auditForm.releaseTime[1] : ''
      if (this.queryParams.sortKey === 'sortKeyThumb') {
        if (this.queryParams.sort === '正序') {
          this.queryParams.sortKeyThumb = '0'
        } else if (this.queryParams.sort === '倒序') {
          this.queryParams.sortKeyThumb = '1'
        } else {
          this.queryParams.sortKeyThumb = ''
        }
      } else if (this.queryParams.sortKey === 'sortKeyRelease') {
        if (this.queryParams.sort === '正序') {
          this.queryParams.sortKeyRelease = '0'
        } else if (this.queryParams.sort === '倒序') {
          this.queryParams.sortKeyRelease = '1'
        } else {
          this.queryParams.sortKeyRelease = ''
        }
      } else {
        this.queryParams.sortKeyRelease = ''
        this.queryParams.sortKeyThumb = ''
      }
      delete this.queryParams.sort
      delete this.queryParams.sortKey
      delete this.queryParams.releaseTime
      if (tips === '2') {
        this.IsloadingA = true
      }
      queryOrg(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.productData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldA = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.auditForm.sort = '正序'
      this.auditForm.sortKey = 'sortKeyRelease'
      this.getAuditForm()
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfoa.pageSize = val
      this.IsloadingA = true
      queryOrg(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.productData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangea(val) {
      this.paramsOldA.pageNumber = val
      this.pageInfoa.pageNumber = val
      this.IsloadingA = true
      queryOrg(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.productData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    showDialog(data) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfoa,
        searchForm: this.auditForm,
        activeName: this.activeName
      }
      this.searchData.queryParams = this.queryParams
      this.$router.push({
        name: 'productDetail',
        query: {
          type: true,
          id: data.id,
          riid: data.riid,
          searchData: JSON.stringify(this.searchData)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.continuewz{
  .product_list{
  height: 260px;
  margin-bottom: 20px;
   .el-card__body  {
    min-height: 260px;
    max-height: 260px;
  }
}
  .card_bot{
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
  .img{
    position: absolute;
    left: -12%;
    top: 23%;
  }
  .img_s{
    position: absolute;
    left: -50%;
    top: 23%;
  }
  .is_xh{
    margin-left: 15px;
  }
  .card_text{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    line-height: 20px;
  }
  .card_img{
    height: 100px;
    width: 100px;
    border-radius: 5px;
    position: absolute;
    right: 20px;
  }
}

</style>
