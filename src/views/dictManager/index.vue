<!-- 数据字典管理 -->
<template>
  <div class="dataDic" style="margin:0 14px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" :body-style="{height:'850px',overflow:'scroll'}">
          <div slot="header" class="clearfix">
            <span>字典目录</span>
            <div class="elCardBtnBox">
              <el-button type="primary" size="small" @click="addCase">新增</el-button>
            </div>
          </div>
          <div>
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
            <el-tree
              ref="tree2"
              :data="dictTypeData"
              :props="defaultProps"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              :render-content="renderContent"
              class="filter-tree"
              node-key="value"
              highlight-current
              @node-click="getNodeData"
            />
            <!-- :load="loadNode"
            lazy -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div>
          <el-card v-if="editDictTypeFlag" class="box-card" :body-style="{height:'850px',overflow:'scroll'}">
            <div slot="header" class="clearfix">
              <span>字典目录编辑</span>
            </div>
            <div>
              <!-- 表单提交 -->
              <el-form ref="dictTypeForm" :model="dictTypeForm" :rules="dictFormRules" label-width="100px" class="demo-ruleForm">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="编码" prop="codeTypeNum">
                      <el-input v-model="dictTypeForm.codeTypeNum" :disabled="!newAdd" placeholder="请输入编码" @blur="dictTypeFormChange" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="目录名" prop="codeTypeName">
                      <el-input v-model="dictTypeForm.codeTypeName" placeholder="请输入目录名" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="备注" prop="codeTypeDes">
                      <el-input v-model="dictTypeForm.codeTypeDes" placeholder="请输入备注" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="text-align:center;">
                  <el-col>
                    <el-button v-if="dictTypeManager_btn_edit" v-preventReClick type="primary" @click="handlerDictTypeForm('dictTypeForm')">提交</el-button>
                    <el-button v-preventReClick @click="editDictTypeFlag = false">取消</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-card>
          <el-card v-else class="box-card" :body-style="{height:'850px',overflow:'scroll'}">
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="12">
                  <span>字典值</span>
                </el-col>
                <!-- <el-col :span="12" style="text-align: right;">
                  <el-button type="text" size="small" icon="el-icon-refresh" @click="refresh">刷新缓存</el-button>
                </el-col> -->
              </el-row>
            </div>
            <div>
              <div class="filter-container">
                <el-form ref="formData" :model="formData" class="searchContet" label-width="100px">
                  <el-row :gutter="20">
                    <!-- <el-col :span="8">
                      <el-form-item label="字典代码" prop="code">
                        <el-input v-model="formData.code" placeholder="请输入字典代码" />
                      </el-form-item>
                    </el-col> -->
                    <el-col :span="10">
                      <el-form-item label="字典名称" prop="codeValue">
                        <el-input v-model="formData.codeValue" placeholder="请输入字典名称" clearable />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="header" class="clearfix">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-button type="primary" size="small" @click="handleDictValueCreate($event)">新增</el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: right;">
                      <el-button type="primary" size="small" @click.native="search">查 询</el-button>
                      <el-button size="small" @click="resetForm">重 置</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <br>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="序号" type="index" />
                <el-table-column prop="id" label="字典ID" align="center" show-overflow-tooltip />
                <el-table-column prop="codeKey" label="字典代码" align="center" show-overflow-tooltip />
                <el-table-column prop="codeValue" label="字典名称" align="center" show-overflow-tooltip />
                <el-table-column label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateData(scope)"><i class="el-icon-edit" /></el-button>
                    <el-button size="small" type="text" style="color: red" @click="handleDelete(scope)"><i class="el-icon-delete" /></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                :current-page="pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 弹层---新增 -->
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dictFormDialogVisible" custom-class="model-dialog el-dialog-xs" @close="closeDialog">
      <hr class="hrStyle">
      <br>
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ dialogTitle }}</span>
        <span class="dialog-title-bg" />
      </span>
      <el-form ref="dictForm" :model="dictForm" :rules="dictFormRules" label-width="120px">
        <el-form-item v-if="IdType" :rules="(IdType === false) ? idRule.id : []" label="字典ID：" prop="id" hidden>
          <el-input v-model="dictForm.id" placeholder="请输入值" />
        </el-form-item>
        <el-form-item label="字典代码：" prop="codeKey">
          <el-input v-model="dictForm.codeKey" placeholder="请输入值" />
        </el-form-item>
        <el-form-item label="字典名称：" prop="codeValue">
          <el-input v-model="dictForm.codeValue" placeholder="请输入值" @blur="codeValueChange(dictForm.codeValue)" />
        </el-form-item>
        <el-form-item v-if="treeType === '3'" label="序号：" prop="orderNum">
          <el-input v-model="dictForm.orderNum" placeholder="请输入值" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleDictCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="handleDictSave('dictForm')">确 定</el-button>
        <el-button size="small" @click="resetdialogForm">重 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isValidInput } from '@/utils/formValidate.js'
import { getTree, getTable, deletebaseCode, updatebasecode, addbasecode, updatecodetype, deletebaseCodeType, addcodetype, searchCode, searchbaseCode } from '@/api/dictManager.js'
import { getClock } from '@/api/general.js'
export default {
  components: {
    // vOperation
  },
  data() {
    const isValidCodeMast = (rule, value, callback) => {
      const numb = /^\d+(\.\d+)?$/g

      if (value === undefined) {
        callback(new Error('内容不能为空'))
      } else if (!numb.test(value)) {
        callback(new Error('必须输入数值'))
      } else if (value > 99999999) {
        callback(new Error('最大长度为8位'))
      } else {
        callback()
      }
    }
    return {
      dictValueManager_btn_edit: true,
      dictValueManager_btn_del: true,
      dictValueManager_btn_add: true,
      dictTypeManager_btn_edit: true,
      dictTypeManager_btn_del: true,
      dictTypeManager_btn_add: false,
      editDictTypeFlag: false,
      newAdd: false,
      dialogTitle: '',
      show: true,
      secondshow: true,
      pageNum: 1, // 默认开始页码
      pageSize: 10, // 每页显示条数
      total: 0,
      paramsOldA: {
        codeTypeNum: '',
        codeValue: '',
        pageNum: 1, // 默认开始页码
        pageSize: 10 // 每页显示条数
      },
      dictTypeForm: {
        codeTypeNum: '',
        codeTypeName: '',
        codeTypeDes: ''
      },
      dictFormDialogVisible: false,
      currentDictId: undefined,
      parentId: undefined,
      type: '',
      IdType: '', // dialog中 ID Flag
      treeType: '', // 1、2、3级Flag
      initId: '', // 初始化 ID
      tableData: [],
      dictForm: {
        codeKey: '',
        codeValue: '',
        id: '',
        // orderNum: '',
        codeTypeNum: ''
      },
      formData: {
        code: '',
        name: ''
      },
      idRule: {
        id: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      dictFormRules: {
        // id: [
        //   { required: true, message: "内容不能为空", trigger: "blur" }
        // ],
        codeTypeNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 30, message: '最大长度为30位', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        codeTypeName: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 85, message: '最大长度为85位', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        codeTypeDes: [
          { max: 85, message: '最大长度为85位', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        codeKey: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 30, message: '最大长度为30位', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        codeValue: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 85, message: '最大长度为85位', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        orderNum: [
          { validator: isValidCodeMast, trigger: 'blur' },
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      filterText: '',
      dictTypeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    // 初始化Tree
    this.initTreeData()
    // this.dictTypeManager_btn_edit = this.elements['dictTypeManager:btn_edit']
    // this.dictTypeManager_btn_del = this.elements['dictTypeManager:btn_del']
    // this.dictTypeManager_btn_add = this.elements['dictTypeManager:btn_add']
    // this.dictValueManager_btn_edit = this.elements['dictValueManager:btn_edit']
    // this.dictValueManager_btn_del = this.elements['dictValueManager:btn_del']
    // this.dictValueManager_btn_add = this.elements['dictValueManager:btn_add']
  },

  methods: {
    addCase() {
      this.newAdd = true
      this.editDictTypeFlag = true
      this.dictTypeForm.codeTypeNum = ''
      this.dictTypeForm.codeTypeName = ''
      this.dictTypeForm.codeTypeDes = ''
    },
    dictTypeFormChange() {
      if (this.newAdd) {
        searchCode(this.dictTypeForm.codeTypeNum).then(res => {

        }).catch(res => {
          this.dictTypeForm.codeTypeNum = ''
        })
      }
    },
    codeValueChange(data) {
      const paramData = {
        codeValue: data,
        codeTypeNum: this.currentDictId
      }
      searchbaseCode(paramData).then(res => {

      }).catch(res => {
        this.dictForm.codeValue = ''
      })
    },
    edit(node, data) {
      event.stopPropagation()
      this.editDictTypeFlag = true
      this.newAdd = false
      this.currentDictTypeId = data.id
      const Row = JSON.parse(JSON.stringify(data))
      this.dictTypeForm.codeTypeNum = Row.value
      this.dictTypeForm.codeTypeName = Row.label
      this.dictTypeForm.codeTypeDes = Row.codeTypeDes
      this.$refs.tree2.setCurrentKey(data.id)
    },
    remove(node, data) {
      event.stopPropagation()
      this.$confirm('此操作将永久删除字典值, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletebaseCodeType(data.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.editDictTypeFlag = false
          this.initTreeData()
        })
      })
    },
    handlerDictTypeForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.newAdd) {
            addcodetype(this.dictTypeForm).then(() => {
              this.editDictTypeFlag = false
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.initTreeData()
            })
          } else {
            this.dictTypeForm.id = this.currentDictTypeId
            updatecodetype(this.dictTypeForm).then(() => {
              this.editDictTypeFlag = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.initTreeData()
            })
          }
        } else {
          return false
        }
      })
    },
    renderContent(h, { node, data }) {
      return (
        <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            {this.dictTypeManager_btn_edit ? (
              <el-button
                style='font-size: 12px;'
                type='text'
                on-click={() => this.edit(node, data)}
              >
                <i class='el-icon-edit' />
              </el-button>
            ) : (
              <span />
            )}
            {this.dictTypeManager_btn_add ? (
              <el-button
                style='font-size: 12px;'
                type='text'
                on-click={() => this.append(node, data)}
              >
                <i class='el-icon-circle-plus-outline' />
              </el-button>
            ) : (
              <span style='padding:0 5px'/>
            )}
            {this.dictTypeManager_btn_del ? (
              <el-button
                style='font-size: 12px;'
                type='text'
                on-click={() => this.remove(node, data)}
              >
                <i class='el-icon-delete' />
              </el-button>
            ) : (
              <span />
            )}
          </span>
        </span>
      )
    },
    loadNode(node, resolve) {
      if (node.level === 1) {
        getClock(node.data.value).then(res => {
          return resolve(res)
        })
      }
      if (node.level > 1) return resolve([])
    },
    refresh() {
      // const loading = this.$loading({
      //   lock: true,
      //   text: '拼命加载中',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })

      // getPageRefresh().then(res => {
      //   if (res.status === 200) {
      //     this.$message({
      //       message: '刷新缓存成功',
      //       type: 'success'
      //     })
      //     loading.close()
      //   }
      // })
    },
    // 添加数据
    handleDictValueCreate(e) {
      if (this.currentDictId === undefined) {
        this.$message.error('请先选择字典目录')
      } else {
        this.$nextTick(() => {
          this.IdType = false
          this.dictFormDialogVisible = true
          this.dialogTitle = e.target.innerText
        })
        // this.resetdialogForm()
      }
    },
    // 修改数据
    updateData(scope) {
      this.IdType = true
      this.dictFormDialogVisible = true
      this.dialogTitle = '修改'
      const Row = JSON.parse(JSON.stringify(scope.row))
      this.dictForm = Row
      // 判断一二级和三级
      // if (Number(this.treeType) === 3) {
      //   // findByIdDown(scope.row.id).then(res => {
      //   //   if (res.status === 200) {
      //   //     this.dictForm = res.data
      //   //   }
      //   // })
      // } else {
      //   // findByIdUp(scope.row.id).then(res => {
      //   //   if (res.status === 200) {
      //   //     this.dictForm = res.data
      //   //   }
      //   // })
      // }
    },
    // 初始化Tree 数据
    initTreeData() {
      getTree().then(res => {
        this.dictTypeData = res
        // this.initId = this.dictTypeData[0].value // 根节点ID
        // 初始化Table
        this.$nextTick(() => {
          if (this.tableData.length === 0) {
            this.initTableData()
          }
        })
      })
    },
    // 初始化Table 数据
    initTableData() {
      const paramData = {
        codeValue: '',
        codeTypeNum: this.dictTypeData[0].value,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getTable(paramData).then(res => {
        this.currentDictId = this.dictTypeData[0].value
        this.paramsOldA = paramData
        this.tableData = res.list
        this.total = res.total
      })
    },
    // 更新right表格1、2级和3级
    handleDictValueFilter() {
      const paramData = {
        codeValue: this.formData.codeValue ? this.formData.codeValue : '',
        codeTypeNum: this.currentDictId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getTable(paramData).then(res => {
        this.paramsOldA = paramData
        this.tableData = res.list
        this.total = res.total
      })
      // 默认不点击节点，查询根节点
      // if (paramData.parentId === undefined) {
      //   paramData.parentId = this.initId
      // }
      // 判断一二级和三级
      // if (Number(this.treeType) === 3) {
      //   getDownPage(paramData).then(res => {
      //     if (res.status === 200) {
      //       this.tableData = res.list.data.rows
      //       this.total = res.data.total
      //     }
      //   })
      // } else {
      //   getUpPage(paramData).then(res => {
      //     if (res.status === 200) {
      //       this.tableData = res.list.data.rows
      //       this.total = res.data.total
      //     }
      //   })
      // }
      // }
    },
    // 对树节点进行筛选时执行的方法
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 节点被点击时的回调
    getNodeData(data) {
      this.currentDictId = data.value
      this.editDictTypeFlag = false
      const paramData = {
        codeValue: '',
        codeTypeNum: this.currentDictId,
        pageSize: 10,
        pageNum: 1
      }
      getTable(paramData).then(res => {
        this.paramsOldA = paramData
        this.tableData = res.list
        this.total = res.total
      })
      // this.type = Number(data.type) + 1
      // this.treeType = data.type
      // 判断一二级和三级
      // if (Number(this.treeType) === 3) {
      //   getDownPage(paramData).then(res => {
      //     if (res.status === 200) {
      //       this.tableData = res.list.data.rows
      //       this.total = res.data.total
      //     }
      //   })
      // } else {
      //   getUpPage(paramData).then(res => {
      //     if (res.status === 200) {
      //       this.tableData = res.list.data.rows
      //       this.total = res.data.total
      //     }
      //   })
      // }
    },
    // 弹层--新增、修改提交 1\2\3级
    handleDictSave(formName) {
      // 判断新增、修改
      setTimeout(() => {
        this.$refs.dictForm.validate(valid => {
          if (valid) {
            if (this.IdType) {
              updatebasecode(this.dictForm).then(res => {
                this.dictFormDialogVisible = false
                this.handleDictValueFilter()
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              })
            } else {
              this.dictForm.codeTypeNum = this.currentDictId
              delete this.dictForm.id
              addbasecode(this.dictForm).then(res => {
                this.dictFormDialogVisible = false
                this.handleDictValueFilter()
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
              })
            }
          }
        })
      }, 100)
    },
    // 删除
    handleDelete(scope) {
      this.$confirm('此操作将永久删除字典值, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 判断一二级和三级
        deletebaseCode(scope.row.id).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.handleDictValueFilter()
        })
      })
    },
    // 弹层--取消
    handleDictCancel() {
      this.dictFormDialogVisible = false
      this.resetdialogForm()
    },
    // 关闭弹框
    closeDialog() {
      this.resetdialogForm()
    },
    // 重置--dialog
    resetdialogForm() {
      this.dictForm.codeKey = ''
      this.dictForm.codeValue = ''
      // this.dictForm.orderNum = ''
    },
    // 查询
    search() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          // this.searchFlag = true;
          this.pageNum = 1
          this.handleDictValueFilter()
        } else {
          return false
        }
      })
    },
    // 重置--查询表单
    resetForm() {
      this.$refs.formData.resetFields()
      this.handleDictValueFilter()
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.paramsOldA.pageSize = val
      this.IsloadingA = true
      getTable(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.paramsOldA.pageNum = val
      this.IsloadingA = true
      getTable(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}

</script>
<style scoped lang="scss">
.searchContet {
  .el-input {
    min-width: 100%;
  }
  .el-select {
    min-width: 100%;
  }
}
</style>
