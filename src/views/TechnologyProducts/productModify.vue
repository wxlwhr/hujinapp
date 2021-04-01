<template>
  <el-card class="AppRegistration AuthenticationTest">
    <div slot="header" class="clearfix btnCard">
      <span>科技产品修改</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules">
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">产品与服务信息修改</legend>
        <el-row :gutter="20" style="margin:20px 30px 0 30px">
          <el-col :span="8">
            <el-form-item label="名称" prop="productName">
              <el-input
                v-model.trim="form.productName"
                placeholder="请输入"
                clearable
                maxlength="18"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="productType">
              <el-select v-model="form.productType" :clearable="true" placeholder="请选择">
                <el-option
                  v-for="item in productTypeList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="productPeople">
              <el-input v-model.trim="form.productPeople" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:20px 30px 0 30px">
          <el-col :span="8">
            <el-form-item label="联系方式" prop="productTel">
              <el-input v-model.trim="form.productTel" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-form-item
              label="简介"
              prop="productSynopsis"
            >
              <el-input
                v-model="form.productSynopsis"
                rows="5"
                placeholder="请输入"
                style="width:100%"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-form-item
              label="应用介绍"
              prop="productIntroduction"
            >
              <el-input
                v-model="form.productIntroduction"
                rows="5"
                placeholder="请输入"
                style="width:100%"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-form-item>
              <span style="color:#F56C6C;font-size:12px;">*</span>
              <span style="margin-right:15px">监管要求</span>
              <el-button type="primary" @click="addRequirement()"> 修改 </el-button>
              <span v-if="jgTips" style="color:#F56C6C;font-size:12px;margin-left:15px">请完善监管要求</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-table
              height="200px"
              :data="tableDataSelect1"
            >
              <el-table-column label="摸排序号" prop="gistNum" type="index" width="150">
                <template slot-scope="scope">
                  {{ scope.row.gistNum?scope.row.gistNum:'--' }}
                </template>
              </el-table-column>
              <el-table-column prop="superType" label="项目类型" show-overflow-tooltip />
              <el-table-column prop="keyPoint" label="要点" show-overflow-tooltip />
              <!-- <el-table-column label="操作" min-width="50">
                <template slot-scope="scope">
                  <el-button type="text" :disabled="scope.row.disable" @click="addSelected(scope.row)">添加</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </el-col>
        </el-row>
      </fieldset>
    </el-form>
    <div>
      <el-row style="text-align:center;">
        <el-col :span="24">
          <!-- <el-button v-if="!$route.query.sty" type="primary" @click="save()">保存</el-button> -->
          <el-button type="primary" @click="claimButton()">提交</el-button>
          <el-button type="primary" @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </div>
    <workflow />
    <el-dialog
      title="修改监管要求"
      :visible.sync="addVisible"
      width="1200px"
      center
    >
      <el-form ref="forms" label-position="left" label-width="80px" :model="forms">
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px; font-size:17px">选择</legend>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-form-item label="项目类型">
                <el-cascader
                  ref="select"
                  v-model="forms.succ"
                  style="width:70%"
                  :options="options"
                  :props="{value:'label'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-button type="primary" @click="superversionQuery">查 询</el-button>
              <el-button @click="superversionReset">重 置</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table
                v-loading="IsloadingA"
                :data="tableDataSelect"
              >
                <el-table-column label="摸排序号" prop="gistNum" type="index" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.gistNum?scope.row.gistNum:'--' }}
                  </template>
                </el-table-column>
                <el-table-column prop="superType" label="项目类型" show-overflow-tooltip />
                <el-table-column prop="keyPoint" label="要点" show-overflow-tooltip />
                <el-table-column label="操作" min-width="50">
                  <template slot-scope="scope">
                    <el-button type="text" :disabled="scope.row.disable" @click="addSelected(scope.row)">添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px; font-size:17px">已选</legend>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table
                :data="tableDataSelected"
              >
                <el-table-column label="摸排序号" prop="gistNum" type="index" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.gistNum?scope.row.gistNum:'--' }}
                  </template>
                </el-table-column>
                <el-table-column prop="superType" label="项目类型" show-overflow-tooltip />
                <el-table-column prop="keyPoint" label="要点" show-overflow-tooltip />
                <el-table-column label="操作">
                  <template slot-scope="scope" min-width="50">
                    <el-button type="text" @click="deleteSelected(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { getSuperviseTree, gist } from '@/api/dataDic.js'
import { commonValidate2 } from '@/utils/formValidate'
import { queryMonitor, pruductupdate, productsubmit, superversion } from '@/api/TechnologyProducts.js'
import { getClock } from '@/api/general.js'
export default {
  data() {
    return {
      jgTips: false,
      arr: [],
      tableDataSelect1: [],
      tableDataSelect: [],
      tableDataSelected: [],
      IsloadingA: false,
      options: [],
      forms: {
        succ: ''
      },
      addVisible: false,
      productTypeList: [],
      form: {
        productName: '',
        productType: '',
        productPeople: '',
        productTel: '',
        productSynopsis: '',
        productIntroduction: '',
        attr2: ''
      },
      reportForm: {
        comment: ''
      },
      rules: {
        tableDataSelect1: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        productSynopsis: [{ required: true, message: '内容不能为空且最多1000字符', trigger: 'blur', max: 1000 }],
        // attr2: [{ required: true, message: '内容不能为空且最多1000字符', trigger: 'blur', max: 1000 }],
        productIntroduction: [{ required: true, message: '内容不能为空且最多1000字符', trigger: 'blur', max: 1000 }],
        comment: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        productType: [{ required: true, message: '请选择', trigger: 'change' }],
        productName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        productPeople: [{ required: true, message: '内容不能为空且最多200个字符', trigger: 'blur', max: 200 }, { validator: commonValidate2, trigger: 'blur' }],
        productTel: [{ required: true, message: '内容不能为空且最多200个字符', trigger: 'blur', max: 200 }, { validator: commonValidate2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    paramsObj() {
      const obj = Object.assign({}, this.form)
      return obj
    }
  },
  mounted() {
    superversion(this.$route.query.id).then(res => {
      this.tableDataSelect1 = JSON.parse(JSON.stringify(res))
      this.tableDataSelected = res
      this.arr = res
    })
    getSuperviseTree('1').then(res => {
      this.options = res
    })
    getClock('C5900000').then(res => {
      this.productTypeList = res.map(item => {
        return {
          label: item.codeValue,
          value: item.codeKey
        }
      })
      this.getMsg()
    })
  },
  methods: {
    addSure() {
      this.tableDataSelect1 = this.tableDataSelected
      this.addVisible = false
      if (this.tableDataSelect1.length > 0) {
        this.jgTips = false
      } else {
        this.jgTips = true
      }
    },
    superversionReset() {
      this.IsloadingA = true
      this.forms.succ = ''
      this.IsloadingA = false
      this.tableDataSelect = []
    },
    superversionQuery() {
      this.IsloadingA = true
      const str = this.forms.succ.length > 0 ? this.forms.succ.join('/') : ''
      gist(this.$refs.select.getCheckedNodes()[0].data.id).then(res => {
        this.tableDataSelect = res.map(item => {
          return {
            superType: str,
            keyPoint: item.scope,
            disable: false,
            id: item.id,
            gistNum: item.gistNum
          }
        })
        this.tableDataSelect.map(item => {
          this.tableDataSelected.map(itemed => {
            if (item.id === itemed.attr1) {
              item.disable = true
            }
          })
        })
        this.IsloadingA = false
      })
    },
    addSelected(data) {
      data.attr1 = data.id
      this.tableDataSelected.push(data)
      data.disable = true
    },
    deleteSelected(data) {
      this.tableDataSelected = this.tableDataSelected.filter(item => item.id !== data.id)
      this.tableDataSelect.map(item => {
        if (item.id === data.attr1) {
          item.disable = false
        }
      })
    },
    addRequirement() {
      this.addVisible = true
    },
    getMsg() {
      queryMonitor(this.$route.query.id).then(res => {
        this.form = res
        for (let i = 0; i < this.productTypeList.length; i++) {
          if (this.productTypeList[i].value === this.form.productType) {
            this.form.productType = this.productTypeList[i].label
            break
          }
        }
      })
    },
    goBack() {
      if (sessionStorage.getItem('routerName') === 'home-index') {
        this.$router.go(-1)
      } else {
        const obj = JSON.parse(this.$route.query.searchData)
        obj.ifReview = true
        this.$router.push({
          name: sessionStorage.getItem('routerName'),
          params: {
            tabMsg: { tabMsg: sessionStorage.getItem('tabMsg') },
            searchData: obj
          }
        })
      }
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.tableDataSelect1.length > 0) {
            const obj = this.form
            obj.submiSsion = '1'
            obj.superVersions = this.tableDataSelect1.map(item => {
              return {
                superType: item.superType,
                keyPoint: item.keyPoint,
                attr1: item.attr1,
                gistNum: item.gistNum
              }
            })
            for (let i = 0; i < this.productTypeList.length; i++) {
              if (this.productTypeList[i].value === obj.productType) {
                obj.productType = this.productTypeList[i].label
                break
              }
            }
            pruductupdate(obj).then(res => {
              this.$router.push({
                name: 'myProducts',
                parms: {
                  searchData: JSON.parse(this.$route.query.searchData)
                }
              })
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            })
          } else {
            this.jgTips = true
          }
        } else {
          if (this.tableDataSelect1.length <= 0) {
            this.jgTips = true
          }
        }
      })
    },
    claimButton() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.tableDataSelect1.length > 0) {
            this.$confirm('是否确定提交？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              const obj = this.form
              obj.superVersions = this.tableDataSelect1.map(item => {
                return {
                  superType: item.superType,
                  keyPoint: item.keyPoint,
                  attr1: item.attr1,
                  gistNum: item.gistNum
                }
              })
              for (let i = 0; i < this.productTypeList.length; i++) {
                if (this.productTypeList[i].value === obj.productType) {
                  obj.productType = this.productTypeList[i].label
                  break
                }
              }
              productsubmit(obj).then(res => {
                this.$router.push({
                  name: 'myProducts'
                // parms: {
                //   searchData: JSON.parse(this.$route.query.searchData)
                // }
                })
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
              })
            })
          } else {
            this.jgTips = true
          }
        } else {
          if (this.tableDataSelect1.length <= 0) {
            this.jgTips = true
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-image__inner{
    display: block;
    height: 150px;
    width:100%;
}
.el-table__header{
    width: 100% !important;
}
.el-table__body{
    width: 100% !important;
}
.AppRegistration{
   .el-collapse-item__header{
        font-size: 17px;
      }
    .el-upload--picture-card{
    display: none
  }
   .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
    .el-input-group__append button.el-button,
  .el-input-group__append div.el-select .el-input__inner,
  .el-input-group__append div.el-select:hover .el-input__inner,
  .el-input-group__prepend button.el-button,
  .el-input-group__prepend div.el-select .el-input__inner,
  .el-input-group__prepend div.el-select:hover .el-input__inner {
    color: #ffffff;
    background: #409eff;
  }
  .radio_enter {
    > label {
      width: 100%;
      text-align: left;
    }
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width:150px;
    height:150px
  }
}
</style>
