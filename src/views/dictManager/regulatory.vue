<template>
  <el-card class="tabStyle">
    <div slot="header" class="clearfix btnCard">
      <span>监管要求字典维护</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="监管要求" name="1">
        <el-tooltip
          class="item"
          effect="dark"
          content="新增菜单"
          placement="top"
        >
          <div class="increase" @click="addNew('', '4')"><i class="el-icon-plus"></i></div>
        </el-tooltip>

        <el-table
          v-loading="IsloadingA"
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          :expand-row-keys="expands"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="label" label="摸排项" show-overflow-tooltip />
          <!-- <el-table-column
            prop="result"
            label="摸排范围"
            width="180"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="gist"
            label="摸排要点"
            align="center"
            show-overflow-tooltip
          /> -->
          <el-table-column label="操作" min-width="300px" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="addNew(scope.row, '1')"
                >新增</el-button
              >
              <el-button type="text" @click="addNew(scope.row, '2')"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteNew(scope.row.id)"
                >删除</el-button
              >
              <el-button type="text" @click="addNew(scope.row, '3')"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 弹层---新增 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dictFormDialogVisible"
      :close-on-click-modal="false"
      @close="closeDialog('dictForm')"
    >
      <hr class="hrStyle" />
      <br />
      <el-form
        ref="dictForm"
        v-loading="IsloadingB"
        :model="dictForm"
        :rules="dictFormRules"
        :disabled="disabled"
        label-width="120px"
      >
        <el-form-item label="字典名称：" prop="name">
          <el-input v-model="dictForm.name" placeholder="请输入值" />
        </el-form-item>
        <el-form-item label="序号：" prop="orderNum">
          <el-input v-model="dictForm.orderNum" placeholder="请输入值" />
        </el-form-item>
        <div v-for="(domain, index) in dictForm.mopaiPointsList" :key="index">
          <el-form-item :label="'摸排要点-' + (index + 1) + ':'">
            <el-row>
              <el-col :span="18">
                <el-input v-model="domain.scope" placeholder="请输入值" />
              </el-col>
              <el-col :span="6">
                <el-button
                  v-if="index === 0 && !disabled"
                  style="marginleft: 20px"
                  @click.prevent="addDomain(domain)"
                  >添加</el-button
                >
                <el-button
                  v-if="index > 0 && !disabled"
                  style="marginleft: 20px"
                  @click.prevent="removeDomain(domain)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item :label="'摸排范围-' + (index + 1) + ':'">
            <el-row>
              <el-col :span="18">
                <el-input v-model="domain.gist" placeholder="请输入值" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            :label="'摸排序号-' + (index + 1) + ':'"
            :prop="'mopaiPointsList.' + index + '.gistNum'"
            :rules="dictFormRules.gistNum"
          >
            <el-row>
              <el-col :span="18">
                <el-input v-model="domain.gistNum" placeholder="请输入值" />
              </el-col>
            </el-row>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="!disabled"
          size="small"
          @click="handleDictCancel('dictForm')"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="handleDictSave('dictForm', '3')"
          >确 定</el-button
        >
        <el-button
          v-if="!disabled"
          size="small"
          @click="resetdialogForm('dictForm')"
          >重 置</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import {
  getSuperviseTree,
  superviseAdd,
  superviseDelete,
  superviseUpdate,
  gist,
} from "@/api/dataDic.js";
import { isValidInput } from "@/utils/formValidate.js";
export default {
  data() {
    const isValidCodeMast = (rule, value, callback) => {
      const numb = /^\d+(\d+)?$/g;
      if (value === undefined) {
        callback(new Error("内容不能为空"));
      } else if (!numb.test(value)) {
        callback(new Error("必须输入数值"));
      } else if (value > 99999999) {
        callback(new Error("最大长度为8位"));
      } else {
        callback();
      }
    };
    return {
      tips: "",
      IsloadingB: false,
      disabled: false,
      activeName: "1",
      IsloadingA: "false",
      dictFormDialogVisible: false,
      dialogTitle: "新增字典",
      dictForm: {
        name: "",
        type: "",
        orderNum: "",
        mopaiPointsList: [
          {
            scope: "",
            gist: "",
            gistNum: "",
          },
        ],
      },
      dictFormRules: {
        gistNum: [
          {
            required: false,
            validator: (rule, value, callback) => {
              if (value !== "") {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false
                ) {
                  callback(new Error("请填写大于0的数字"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
        gist: [
          { required: false, message: "内容不能为空", trigger: "blur" },
          { max: 50, message: "最大长度为50位", trigger: "blur" },
          { validator: isValidInput, trigger: "blur" },
        ],
        name: [
          { required: true, message: "内容不能为空", trigger: "blur" },
          { max: 85, message: "最大长度为85位", trigger: "blur" },
          { validator: isValidInput, trigger: "blur" },
        ],
        orderNum: [
          { validator: isValidCodeMast, trigger: "blur" },
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
      },
      tableData: [],
      expands: [],
    };
  },
  mounted() {
    this.handleClick();
  },
  methods: {
    addDomain() {
      this.dictForm.mopaiPointsList.push({
        scope: "",
        gist: "",
        gistNum: "",
      });
    },
    removeDomain(item) {
      var index = this.dictForm.mopaiPointsList.indexOf(item);
      if (index !== -1) {
        this.dictForm.mopaiPointsList.splice(index, 1);
      }
    },
    handleClick() {
      switch (this.activeName) {
        case "1":
          this.gettable("1");
          break;
        case "2":
          this.gettable("2");
          break;
      }
    },
    gettable() {
      this.expands = [];
      this.IsloadingA = true;
      getSuperviseTree("1")
        .then((res) => {
          this.IsloadingA = false;
          this.tableData = res;
          this.expands.push(res[0].id);
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
    addNew(row, num) {
      this.dialogTitle = "新增字典";
      this.dictFormDialogVisible = true;
      if (num === "3") {
        this.tips = "查看";
        this.dictForm.mopaiPointsList = [];
        this.IsloadingB = true;
        gist(row.id).then((res) => {
          this.dictForm.mopaiPointsList =
            res.length > 0
              ? res
              : [
                  {
                    scope: "",
                    gist: "",
                  },
                ];
          this.IsloadingB = false;
        });
        this.disabled = true;
        this.dialogTitle = "字典查看";
        this.dictForm.name = row.label;
        this.dictForm.gist = row.gist;
        this.dictForm.orderNum = row.orderNum;
        this.dictForm.type = row.type;
        this.dictForm.id = row.id;
        this.dictForm.parentId = row.parentId;
        this.dictForm.scope = row.result;
      } else if (num === "2") {
        this.tips = "";
        this.dictForm.mopaiPointsList = [];
        this.IsloadingB = true;
        gist(row.id).then((res) => {
          this.dictForm.mopaiPointsList =
            res.length > 0
              ? res
              : [
                  {
                    scope: "",
                    gist: "",
                  },
                ];
          this.IsloadingB = false;
        });
        this.disabled = false;
        this.dialogTitle = "维护字典";
        this.dictForm.name = row.label;
        this.dictForm.gist = row.gist;
        this.dictForm.orderNum = row.orderNum;
        this.dictForm.type = row.type;
        this.dictForm.id = row.id;
        this.dictForm.parentId = row.parentId;
        this.dictForm.scope = row.result;
      } else if (num === "1") {
        this.tips = "";
        this.disabled = false;
        this.dictForm.type = Number(row.type) + 1 + "";
        this.dictForm.parentId = row.id;
        this.dictForm.name = "";
        this.dictForm.orderNum = "";
        this.dictForm.id = "";
        this.dictForm.mopaiPointsList = [
          {
            scope: "",
            gist: "",
          },
        ];
      }else if(num === '4'){
        // 二次改造-新增添加功能
        let id=this.tableData[0].parentId
        this.tips = "";
        this.disabled = false;
        this.dictForm.type = '1';
        this.dictForm.parentId = id;
        this.dictForm.name = "";
        this.dictForm.orderNum = "";
        this.dictForm.id = "";
        this.dictForm.mopaiPointsList = [
          {
            scope: "",
            gist: "",
          },
        ];
      }
    },
    deleteNew(id) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          superviseDelete(id)
            .then((res) => {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.handleClick();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    // 重置--dialog
    resetdialogForm(formName) {
      this.$refs[formName].resetFields();
      this.dictForm.name = "";
      this.dictForm.orderNum = "";
      this.dictForm.mopaiPointsList = [
        {
          scope: "",
          gist: "",
        },
      ];
    },
    // 弹层--取消
    handleDictCancel(formName) {
      this.dictFormDialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // 关闭弹框
    closeDialog(formName) {
      this.$refs[formName].resetFields();
    },
    handleDictSave(formName, num = "1") {
      if (this.tips === "查看") {
        this.dictFormDialogVisible = false;
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogTitle === "维护字典") {
              this.loading = this.$loading({
                lock: true,
              });
              superviseUpdate(this.dictForm).then((res) => {
                this.handleClick();
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.loading.close();
                this.dictFormDialogVisible = false;
              });
            } else {
              this.loading = this.$loading({
                lock: true,
              });
              superviseAdd(this.dictForm).then((res) => {
                this.handleClick();
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
                this.loading.close();
                this.dictFormDialogVisible = false;
              });
            }
          } else {
            return false;
          }
        });
      }
    },
  },
};
</script>
<style  lang="scss">
.tabStyle {
  .el-table .cell {
    text-align: inherit;
    padding-left: 30px;
  }
  .increase {
    width: 32px;
    height: 32px;
    background-color: #dcd9d8;
    position: absolute;
    margin: 12px;
    z-index: 999;
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
  }
}
</style>
