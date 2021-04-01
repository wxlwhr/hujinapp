<template>
  <el-card class="tabStyle">
    <div slot="header" class="clearfix btnCard">
      <span>检测、认证项维护</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="检测项" name="1">
        <el-table
          v-loading="IsloadingA"
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          :expand-row-keys="expands"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="label"
            label="审查项名称"
            text-align="left"
            show-overflow-tooltip
          />
          <el-table-column
            prop="type"
            label="审查项级别"
            width="180"
            align="center"
          />
          <el-table-column
            prop="code"
            label="审查项代码"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="addNew(scope.row,'1')">新增</el-button>
              <el-button type="text" @click="addNew(scope.row,'2')">编辑</el-button>
              <el-button type="text" @click="deleteNew(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="认证项" name="2">
        <el-table
          v-loading="IsloadingA"
          :data="tableData1"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          :expand-row-keys="expands"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="label"
            label="审查项名称"
            align="left"
          />
          <el-table-column
            prop="type"
            label="审查项级别"
            width="180"
            align="center"
          />
          <el-table-column
            prop="code"
            label="审查项代码"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="addNew(scope.row,'1')">新增</el-button>
              <el-button type="text" @click="addNew(scope.row,'2')">编辑</el-button>
              <el-button type="text" @click="deleteNew(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 弹层---新增 -->
    <el-dialog :title="dialogTitle" :visible.sync="dictFormDialogVisible" @close="closeDialog('dictForm')">
      <hr class="hrStyle">
      <br>
      <el-form ref="dictForm" :model="dictForm" :rules="dictFormRules" label-width="120px">
        <el-form-item label="字典代码：" prop="code">
          <el-input v-model="dictForm.code" placeholder="请输入值" />
        </el-form-item>
        <el-form-item label="字典名称：" prop="name">
          <el-input v-model="dictForm.name" placeholder="请输入值" />
        </el-form-item>
        <el-form-item label="序号：" prop="orderNum">
          <el-input v-model="dictForm.orderNum" placeholder="请输入值" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleDictCancel('dictForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="handleDictSave('dictForm')">确 定</el-button>
        <el-button size="small" @click="resetdialogForm('dictForm')">重 置</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { getTree, addbasecode, deleteId, updatebasecode } from '@/api/dataDic.js'
import { isValidInput } from '@/utils/formValidate.js'
export default {
  data() {
    const isValidCodeMast = (rule, value, callback) => {
      const numb = /^\d+(\d+)?$/g
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
      activeName: '1',
      IsloadingA: 'false',
      dictFormDialogVisible: false,
      dialogTitle: '新增字典',
      dictForm: {
        code: '',
        name: '',
        type: '',
        orderNum: ''
      },
      dictFormRules: {
        code: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 50, message: '最大长度为50位', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { max: 85, message: '最大长度为85位', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' }
        ],
        orderNum: [
          { validator: isValidCodeMast, trigger: 'blur' },
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      tableData: [],
      tableData1: [],
      expands: []
    }
  },
  mounted() {
    this.handleClick()
  },
  methods: {
    handleClick() {
      switch (this.activeName) {
        case '1':
          this.gettable('1')
          break
        case '2':
          this.gettable('2')
          break
      }
    },
    gettable(Num) {
      this.expands = []
      this.IsloadingA = true
      getTree(Num).then(res => {
        this.IsloadingA = false
        if (Num === '1') {
          this.tableData = res
        } else {
          this.tableData1 = res
        }
        this.expands.push(res[0].id)
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    addNew(row, num) {
      this.dialogTitle = '新增字典'
      this.dictFormDialogVisible = true
      if (num === '2') {
        this.dialogTitle = '维护字典'
        this.dictForm.name = row.label
        this.dictForm.code = row.code
        this.dictForm.orderNum = row.orderNum
        this.dictForm.type = row.type
        this.dictForm.id = row.id
        this.dictForm.parentId = row.parentId
      } else {
        this.dictForm.type = Number(row.type) + 1 + ''
        this.dictForm.parentId = row.id
        this.dictForm.code = ''
        this.dictForm.name = ''
        this.dictForm.orderNum = ''
        this.dictForm.id = ''
      }
    },
    deleteNew(id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteId(id).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.handleClick()
        }).catch(() => {

        })
      }).catch(() => {})
    },
    // 重置--dialog
    resetdialogForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 弹层--取消
    handleDictCancel(formName) {
      this.dictFormDialogVisible = false
      this.$refs[formName].resetFields()
    },
    // 关闭弹框
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    handleDictSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '维护字典') {
            this.loading = this.$loading({
              lock: true
            })
            updatebasecode(this.dictForm).then(res => {
              this.handleClick()
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.loading.close()
              this.dictFormDialogVisible = false
            })
          } else {
            this.loading = this.$loading({
              lock: true
            })
            addbasecode(this.dictForm).then(res => {
              this.handleClick()
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.loading.close()
              this.dictFormDialogVisible = false
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style  lang="scss">
.tabStyle {
.el-table .cell{
    text-align:inherit;
}
}
</style>
