<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>App备案 （Android、IOS需要分别备案）</span>
      <div class="elCardBtnBox">
        <el-button type="primary" @click="addCase">新增备案</el-button>
        <el-button type="primary" @click="RelatedApp">关联总部App</el-button>
      </div>
    </div>
    <div class="search">
      <el-form
        ref="auditForm"
        :model="auditForm"
        :rules="rules"
        label-width="80px"
      >
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="机构名称" prop="rinm">
              <el-input v-model="auditForm.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="App名称" prop="appName">
              <el-input
                v-model="auditForm.appName"
                type="text"
                placeholder="App名称"
                clearable
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件版本" prop="appVersion">
              <el-input
                v-model="auditForm.appVersion"
                type="text"
                placeholder="软件版本"
                clearable
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="状态" prop="auditStatus">
              <el-select v-model="auditForm.auditStatus" placeholder="状态" clearable>
                <el-option v-for="(item,index) in AppList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24" class="textRight">
            <el-button type="primary" @click="seachAuditForm('auditForm')"
              >查 询</el-button
            >
            <el-button @click="clearAuditForm('auditForm')">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br />
    <el-table
      v-loading="IsloadingA"
      :data="tableData"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="appName" label="App名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.row, '0')">{{
            scope.row.appName
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="productType"
        label="APP产品类型"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="scope.row.productType">
            <el-tag
              v-if="scope.row.productType === 'Android'"
              style="width: 65px"
            >
              {{ scope.row.productType }}
            </el-tag>
            <el-tag
              v-else-if="scope.row.productType === 'IOS'"
              type="success"
              style="width: 65px"
            >
              {{ scope.row.productType }}
            </el-tag>
            <el-tag
              v-else-if="scope.row.productType === 'other'"
              type="warning"
              style="width: 65px"
            >
              {{ scope.row.productType }}
            </el-tag>
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="appFilePath"
        label="外部评估"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="scope.row.appFilePath">
            <span v-if="scope.row.appFilePath === '2'">
              {{ "金融科技产品认证" }}
            </span>
            <span v-else-if="scope.row.appFilePath === '1'">
              {{ "其他" }}
            </span>
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
        <template slot-scope="scope">
          {{
            scope.row.appVersion === null
              ? "--"
              : scope.row.appVersion === ""
              ? "--"
              : scope.row.appVersion
          }}
        </template>
      </el-table-column>
      <el-table-column label="区块链" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.auditStatus !== '待提交'"
            type="text"
            @click="goBlockChain(scope.row, '1')"
            >区块链信息</el-button
          >
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="提交日期"
        sortable="custom"
        show-overflow-tooltip
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip />
      <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.cdNo">
            <el-button type="text" @click="certificateDownload(scope.row)">{{
              scope.row.recordNumber ? scope.row.recordNumber : "--"
            }}</el-button>
          </div>
          <div v-else>
            {{ scope.row.recordNumber ? scope.row.recordNumber : "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="bianhao" label="App归属" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            type="text"
            :disabled="scope.row.osomCheck !== '0'"
            @click="RelatedJg(scope.row)"
          >
            {{ scope.row.osomCheck !== "0" ? "总部机构" : "本机构" }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="App共享" show-overflow-tooltip>
        <template slot-scope="scope">
          <div
            v-if="
              scope.row.osomCheck === '0' && scope.row.auditStatus === '已备案'
            "
          >
            <span>{{ scope.row.isShare === "1" ? "启用" : "停用" }}</span>
            <el-switch
              v-model="scope.row.shareFlag"
              style="display: block"
              @change="stateChange(scope.row)"
            />
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <!-- 普通关联 width="130" -->
          <div v-if="scope.row.appIconPath === '1'">
            <div
              v-if="
                scope.row.auditStatus === '已注销' &&
                scope.row.recordNumber === null
              "
            >
              <el-button type="text">
                <img
                  src="@/icons/png/shanchu-s.png"
                  alt=""
                  @click="deleteChange(scope.row)"
                />
              </el-button>
            </div>
            <div v-else>
              <el-tooltip
                v-if="
                  scope.row.auditStatus === '已备案' ||
                  scope.row.auditStatus === '审核未通过'
                "
                class="item"
                effect="dark"
                content="注销"
                placement="top"
              >
                <el-button type="text" @click="showDialog1(scope.row)">
                  <img src="@/icons/png/zhuxiao-s.png" alt="" />
                </el-button>
              </el-tooltip>
              <div v-else>
                <el-button type="text" disabled>
                  <img src="@/icons/png/xiugai.png" alt="" />
                </el-button>
                <el-button type="text" disabled>
                  <img src="@/icons/png/shanchu.png" alt="" />
                </el-button>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              v-if="
                scope.row.auditStatus === '已备案' ||
                scope.row.flowType === '4' ||
                scope.row.flowType === '3' ||
                scope.row.auditStatus === '已过期'
              "
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="一般变更"
                placement="top"
              >
                <el-button
                  v-if="
                    scope.row.auditStatus === '已备案' ||
                    scope.row.flowType === '4'
                  "
                  type="text"
                  @click="showChange1(scope.row)"
                >
                  <img src="@/icons/png/yiban-s.png" alt="" />
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="重大变更"
                placement="top"
              >
                <el-button
                  v-if="
                    scope.row.auditStatus === '已备案' ||
                    scope.row.auditStatus === '已过期' ||
                    scope.row.flowType === '3'
                  "
                  :disabled="
                    (scope.row.auditStatus !== '已备案' &&
                    scope.row.auditStatus !== '已过期'&&
                      scope.row.auditStatus !== '协会退至金融机构' &&
                      scope.row.auditStatus !== '认证退至金融机构' &&
                      scope.row.auditStatus !== '检测退至金融机构' &&
                      scope.row.auditStatus !== '审核未通过') ||
                    scope.row.auditStatus === '检测退至认证机构' ||
                    scope.row.auditStatus === '认证退至检测机构' ||
                    scope.row.auditStatus === '协会退至检测机构' ||
                    scope.row.auditStatus === '协会退至认证机构' ||
                    ((scope.row.auditStatus === '认证退至金融机构' ||
                      scope.row.auditStatus === '检测退至金融机构' ||
                      scope.row.auditStatus === '审核未通过') &&
                      !returnDis(scope.row))
                  "
                  type="text"
                  @click="showChange2(scope.row)"
                >
                  <img
                    v-if="
                      ((scope.row.auditStatus === '认证退至金融机构' ||
                        scope.row.auditStatus === '协会退至金融机构' ||
                        scope.row.auditStatus === '检测退至金融机构' ||
                        scope.row.auditStatus === '审核未通过') &&
                        returnDis(scope.row)) ||
                      scope.row.auditStatus === '已备案'||
                      scope.row.auditStatus === '已过期'
                    "
                    src="@/icons/png/zhongda-s.png"
                    alt=""
                  />
                  <img v-else src="@/icons/png/zhongda.png" alt="" />
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="注销"
                placement="top"
              >
                <el-button
                  v-if="
                    scope.row.auditStatus === '已备案' ||
                    scope.row.auditStatus === '已过期' ||
                    scope.row.flowType === '4' ||
                    scope.row.flowType === '3'
                  "
                  type="text"
                  :disabled="
                    scope.row.auditStatus !== '已备案' &&
                    scope.row.auditStatus !== '已过期'
                  "
                  @click="showDialog1(scope.row)"
                >
                  <img
                    v-if="
                      scope.row.auditStatus === '已备案' ||
                      scope.row.auditStatus === '已过期'
                    "
                    src="@/icons/png/zhuxiao-s.png"
                    alt=""
                  />
                  <img v-else src="@/icons/png/zhuxiao.png" alt="" />
                </el-button>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.auditStatus === '已备案'"
                class="item"
                effect="dark"
                content="取消共享"
                placement="top"
              >
                <el-button type="text" @click="quxiaoGX(scope.row)">
                  <i class="el-icon-switch-button" style="color: red"
                /></el-button>
              </el-tooltip>
            </div>
            <div v-else>
              <el-tooltip
                v-if="
                  scope.row.auditStatus === '待提交' ||
                  scope.row.auditStatus === '协会退至金融机构' ||
                  scope.row.auditStatus === '审核未通过' ||
                  scope.row.auditStatus === '审核不通过' ||
                  ((scope.row.auditStatus === '认证退至金融机构' ||
                    scope.row.auditStatus === '检测退至金融机构') &&
                    returnDis(scope.row))
                "
                class="item"
                effect="dark"
                content="修改"
                placement="top"
              >
                <el-button
                  type="text"
                  :disabled="
                    scope.row.auditStatus !== '待提交' &&
                    scope.row.auditStatus !== '协会退至金融机构' &&
                    scope.row.auditStatus !== '认证退至金融机构' &&
                    scope.row.auditStatus !== '检测退至金融机构' &&
                    scope.row.auditStatus !== '审核未通过' &&
                    scope.row.auditStatus !== '审核不通过'
                  "
                  @click="showChange(scope.row)"
                >
                  <img src="@/icons/png/xiugai-s.png" alt="" />
                </el-button>
              </el-tooltip>
              <el-button v-else type="text" :disabled="true">
                <img src="@/icons/png/xiugai.png" alt="" />
              </el-button>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  v-if="
                    (scope.row.auditStatus === '待提交' ||
                      scope.row.auditStatus === '协会退至金融机构' ||
                      scope.row.auditStatus === '认证退至金融机构' ||
                      scope.row.auditStatus === '检测退至金融机构' ||
                      scope.row.auditStatus === '审核未通过' ||
                      scope.row.auditStatus === '审核不通过' ||
                      scope.row.auditStatus === '已注销') &&
                    scope.row.recordNumber === null
                  "
                  type="text"
                  @click="deleteChange(scope.row)"
                >
                  <img src="@/icons/png/shanchu-s.png" alt="" />
                </el-button>
              </el-tooltip>
              <el-button
                v-if="
                  scope.row.auditStatus !== '待提交' &&
                  scope.row.auditStatus !== '协会退至金融机构' &&
                  scope.row.auditStatus !== '认证退至金融机构' &&
                  scope.row.auditStatus !== '已注销' &&
                  scope.row.auditStatus !== '检测退至金融机构' &&
                  scope.row.auditStatus !== '审核未通过' &&
                  scope.row.auditStatus !== '审核不通过'
                "
                type="text"
                :disabled="true"
              >
                <img src="@/icons/png/shanchu.png" alt="" />
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totala > 0"
      :current-page="pageInfoa.pageNumber"
      :page-size="pageInfoa.pageSize"
      :total="totala"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChangea"
      @current-change="handleCurrentChangea"
    />
    <el-dialog
      title="注销原因"
      :visible.sync="centerDialogVisible"
      width="60%"
      center
    >
      <div style="padding: 0 20px">
        <el-form
          ref="reportForm"
          :model="reportForm"
          :rules="rules"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="注销原因" prop="productType1">
                <el-input
                  v-model="reportForm.productType1"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入"
                  maxlength="500"
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item label="备注" prop="productType2">
                <el-input v-model="reportForm.productType2" type="textarea" :rows="3" placeholder="请输入" maxlength="500" />
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isReasonable('reportForm')"
          >提 交</el-button
        >
        <el-button type="primary" @click="centerDialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-loading="blockloading"
      :visible.sync="dialogTableVisible"
      top="5vh"
      width="100%"
    >
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe
          id="china-block"
          :src="blockSrc"
          frameborder="0"
          marginWidth="20"
          marginHeight="0"
          width="100%"
          height="100%"
          scrolling="auto"
        />
      </div>
    </el-dialog>
    <el-dialog :visible.sync="RelatedAppTips" width="60%" center>
      <el-table
        ref="multipleTable"
        v-loading="IsloadingA"
        :data="RelatedAppData"
      >
        <el-table-column prop="appName" label="App名称" show-overflow-tooltip />
        <el-table-column
          prop="productType"
          label="App产品类型"
          show-overflow-tooltip
        />
        <el-table-column prop="appVersion" label="版本" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.shareFlag"
              type="text"
              @click="goAssociated(scope.row, '0')"
              >普通关联</el-button
            >
            <!-- <el-button type="text" @click="goAssociated(scope.row,'1')">差异关联</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="RelatedjgTips" width="60%" center>
      <el-table v-loading="IsloadingA" :data="RelatedjgData">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip />
        <el-table-column
          prop="succ"
          label="统一社会信用代码"
          show-overflow-tooltip
        />
        <el-table-column
          prop="monitorName"
          label="机构联系人"
          show-overflow-tooltip
        />
        <el-table-column
          prop="managerTel"
          label="联系方式"
          show-overflow-tooltip
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.shareFlag"
              type="text"
              @click="guanbiGX(scope.row)"
              >取消共享</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageInfob.pageNumber"
        :page-size="pageInfob.pageSize"
        :total="totalb"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChangeb"
        @current-change="handleCurrentChangeb"
      />
    </el-dialog>
    <!-- 重大变更弹窗 -->
    <el-dialog :visible.sync="choseChangeTips" width="30%" center>
      <div
        style="
          padding: 0 20px;
          textalign: center;
          fontweight: bolder;
          fontsize: 16px;
        "
      >
        <i class="el-icon-warning" style="color: #e6a23c" />
        请选择重大变更认证方式
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="changedis" @click="bigChange('2')"
          >金融科技产品认证</el-button
        >
        <el-button
          type="primary"
          :disabled="newChangedis"
          @click="newBigChange()"
          >其他</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { commonValidate2 } from "@/utils/formValidate";
import {
  appglGet,
  appglAdd,
  quxiaoGuanli,
  guanStateApp,
  orgList,
  relieves,
  reRiidAppId,
} from "@/api/register/affiliates.js";
import {
  searchQuery,
  deleteApp,
  deleteAppNew,
  ApprecordCancellation,
} from "@/api/appbeian/register.js";
export default {
  data() {
    return {
      newChangedis: false,
      changedis: false,
      changeData: {},
      choseChangeTips: false,
      searchData: {},
      guanlianradio: "0",
      isTrue: false,
      RelatedAppTips: false,
      RelatedjgTips: false,
      blockloading: false,
      blockSrc: "",
      dialogTableVisible: false,
      paramsObj: {},
      centerDialogVisible: false,
      jctgDialogVisible: false,
      cancellation: {},
      hlShow: true,
      IsloadingA: false,
      loading: null,
      paramsOldA: {},
      paramsOldB: {},
      fileNames: [],
      options: [],
      RelatedAppData: [],
      RelatedjgData: [],
      SelectionArr: [],
      list: [
        { value: "0", label: "北京互联网" },
        { value: "1", label: "上海互联网" },
      ],
      custRecoTbData: [
        {
          xiangmu: "软件权限",
          ispt: "0",
        },
        {
          xiangmu: "数据安全",
          ispt: "0",
        },
        {
          xiangmu: "通讯安全",
          ispt: "0",
        },
      ],
      jcList: [
        {
          name: "合格",
          code: "合格",
        },
        {
          name: "不合格",
          code: "不合格",
        },
      ],
      fileList: [],
      fileNumA: true,
      reportForm: {
        productType1: "",
        // productType2: ''
      },
      auditForm: {
        appName: "",
        rinm: "",
        appVersion: "",
      },
      pageInfoa: {
        pageNumber: 1,
        pageSize: 10,
      },
      totala: 0,
      pageInfob: {
        pageNumber: 1,
        pageSize: 10,
      },
      totalb: 0,
      rules: {
        productType1: [
          { required: true, message: "请填写原因", trigger: "blur" },
        ],
        rinm: [
          { required: false, validator: commonValidate2, trigger: "blur" },
        ],
        appVersion: [
          { required: false, validator: commonValidate2, trigger: "blur" },
        ],
        appName1: [
          { required: true, validator: commonValidate2, trigger: "blur" },
        ],
        appName: [
          { required: false, validator: commonValidate2, trigger: "blur" },
        ],
      },
      AppList: [
        {
          name: "待审核",
          code: "待审核",
        },
        {
          name: "检测通过",
          code: "检测通过",
        },
        {
          name: "检测未通过",
          code: "检测未通过",
        },
        {
          name: "待认证",
          code: "待认证",
        },
        // {
        //   name: '已上链',
        //   code: '已上链'
        // }
      ],
      activeName: "first",
      excludeTableData: [],
      tableData: [],
    };
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData;
      if (searchData.pageName === this.$route.name && searchData.ifReview) {
        this.activeName = searchData.activeName;
        this.pageInfoa = searchData.pageInfo;
        this.auditForm = searchData.paramsObj;
      }
    }
    this.getAuditForm();
  },
  methods: {
    certificateDownload(data) {
      location.href = `nifaReport/app/cert/${data.cdNo}`;
    },
    returnDis(data, tips) {
      if (data.auditStatus === "已备案") {
        return false;
      } else {
        if (data.endorseInfo) {
          return data.endorseInfo === this.$store.getters.userName;
        } else {
          if (tips === "1") {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    goAssociated(row, type) {
      this.$router.push({
        name: "Appassociated",
        query: {
          id: row.id,
          type,
        },
      });
    },
    stateChange(val) {
      val.shareFlag = !val.shareFlag;
      this.$confirm("是否更改共享状态", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          const paramsObj = {
            id: val.id,
            isShare: val.isShare === "1" ? "0" : "1",
          };
          guanStateApp(paramsObj).then((res) => {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.getAuditForm();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更改",
          });
        });
    },
    guanbiGX(row) {
      this.$confirm("关闭后该机构的共享App将变为“已注销”状态", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.IsloadingA = true;
          reRiidAppId({ riid: row.riid, appId: this.pageInfob.id })
            .then((res) => {
              this.$message({
                message: res,
                type: "success",
              });
              this.pageInfob.pageNumber = 1;
              orgList(this.pageInfob)
                .then((res) => {
                  this.IsloadingA = false;
                  this.RelatedjgData = res.list;
                  this.totalb = res.total;
                })
                .catch(() => {
                  this.IsloadingA = false;
                });
            })
            .catch(() => {
              this.IsloadingA = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    quxiaoGX(row) {
      this.$confirm("取消后所有普通关联App将会强制注销", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          relieves(row.id, { remark: "总部机构取消关联强制注销" }).then(
            (res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    quxiao(id) {
      this.$confirm("是否取消关联", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          const objb = {
            riid: this.$store.getters.riid,
            appIds: id,
          };
          quxiaoGuanli(objb)
            .then((res) => {
              this.getAuditForm();
              this.$message({
                message: "取消关联成功",
                type: "success",
              });
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更改",
          });
        });
    },
    RelatedApp() {
      this.RelatedAppTips = true;
      this.IsloadingA = true;
      appglGet({ riid: this.$store.getters.riid })
        .then((res) => {
          this.IsloadingA = false;
          if (res !== null) {
            this.RelatedAppData = res;
          } else {
            this.RelatedAppData = [];
          }
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
    RelatedJg(row) {
      this.RelatedjgTips = true;
      this.IsloadingA = true;
      this.pageInfob.id = row.id;
      orgList(this.pageInfob)
        .then((res) => {
          this.IsloadingA = false;
          this.RelatedjgData = res.list;
          this.totalb = res.total;
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
    checkSelectable(row) {
      if (row.osomCheck === "0") {
        return true;
      } else {
        return false;
      }
    },
    addApp() {
      const obja = {
        riid: this.$store.getters.riid,
        userName: this.$store.getters.userName,
        appIds: this.SelectionArr.length > 0 ? this.SelectionArr.join(",") : "",
      };
      this.isTrue = true;
      appglAdd(obja)
        .then((res) => {
          this.isTrue = false;
          this.RelatedAppTips = false;
          this.getAuditForm();
          this.$message({
            message: "操作成功",
            type: "success",
          });
        })
        .catch(() => {
          this.isTrue = false;
        });
    },
    addCase() {
      this.$router.push({
        name: "AppRegistrationVivw",
        query: {
          appFilePath: "2",
        },
      });
    },
    sortChange(column) {
      if (column.order === "descending") {
        this.getAuditForm();
        this.paramsObj.sort = "1";
      } else if (column.order === "ascending") {
        this.getAuditForm();
        this.paramsObj.sort = "0";
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    showDialog1(row) {
      if (row.isShare === "1") {
        this.$message.error("请先停用App共享");
      } else {
        this.centerDialogVisible = true;
        this.cancellation = row;
      }
    },
    showChange(row) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfoa,
        searchForm: this.auditForm,
        activeName: this.activeName,
        paramsObj: this.paramsObj,
      };
      this.$router.push({
        name: "Appmodify",
        query: {
          tips: row.appFilePath,
          num: "1",
          name: "修改",
          id: row.id,
          appFilePath: row.appFilePath,
          from: "列表",
          auditStatus: row.auditStatus,
          searchData: JSON.stringify(this.searchData),
        },
      });
    },
    // 一般变更
    showChange1(row) {
      if (row.isShare === "1") {
        this.$message.error("请先停用App共享");
      } else {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
          searchForm: this.auditForm,
          activeName: this.activeName,
          paramsObj: this.paramsObj,
        };
        this.$router.push({
          name: "Appmodify",
          query: {
            tips: row.appFilePath,
            update: "更新",
            num: "2", // 更新标识
            name: "一般变更",
            id: row.id,
            auditStatus: row.auditStatus,
            searchData: JSON.stringify(this.searchData),
          },
        });
      }
    },
    // 重大变更
    showChange2(row) {
      if (row.isShare === "1") {
        this.$message.error("请先停用App共享");
      } else {
        this.changeData = row;
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
          searchForm: this.auditForm,
          activeName: this.activeName,
          paramsObj: this.paramsObj,
        };
        if (row.appFilePath === "1") {
          this.changedis =
            row.auditStatus !== "已备案" &&
            row.auditStatus !== "审核未通过" &&
            row.auditStatus !== "审核不通过";
          if (
            row.auditStatus === "检测退至金融机构" ||
            row.auditStatus === "认证退至金融机构" ||
            row.auditStatus === "审核未通过"
          ) {
            this.newBigChange();
          } else {
            this.choseChangeTips = true;
          }
        } else if (row.appFilePath === "2") {
          this.newChangedis =
            row.auditStatus !== "已备案" &&
            row.auditStatus !== "审核未通过" &&
            row.auditStatus !== "审核不通过";
          if (
            row.auditStatus === "检测退至金融机构" ||
            row.auditStatus === "认证退至金融机构" ||
            row.auditStatus === "审核未通过"
          ) {
            this.bigChange("2");
          } else {
            this.choseChangeTips = true;
          }
        }
      }
    },
    bigChange(tips) {
      this.$router.push({
        name: "Appmodify",
        query: {
          tips,
          changeTips: "financialTechnology",
          update: "重大变更",
          num: "2", // 更新标识
          name: "重大变更",
          id: this.changeData.id,
          from: "列表",
          auditStatus: this.changeData.auditStatus,
          searchData: JSON.stringify(this.searchData),
        },
      });
      this.choseChangeTips = false;
    },
    newBigChange() {
      this.$router.push({
        name: "newAppmodify",
        query: {
          changeTips: "other",
          update: "重大变更",
          num: "2", // 更新标识
          name: "重大变更",
          id: this.changeData.id,
          from: "列表",
          auditStatus: this.changeData.auditStatus,
          searchData: JSON.stringify(this.searchData),
        },
      });
      this.choseChangeTips = false;
    },
    isReasonable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.centerDialogVisible = false;
          ApprecordCancellation(this.cancellation.id, {
            remark: this.reportForm.productType1,
            appIconPath: this.cancellation.appIconPath,
          }).then((res) => {
            this.$message({
              message: "注销成功",
              type: "success",
            });
            this.handleCurrentChangea(this.paramsOldA.pageNumber);
          });
        } else {
          return false;
        }
      });
    },
    rzSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.jctgDialogVisible = false;
        } else {
          return false;
        }
      });
    },
    showDialog(row, Num) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfoa,
        searchForm: this.auditForm,
        activeName: this.activeName,
        paramsObj: this.paramsObj,
      };
      sessionStorage.setItem("rowData", JSON.stringify(row));
      this.$router.push({
        name: "AppRegChange",
        query: {
          Num,
          id: row.id,
          appFilePath: row.appFilePath,
          searchData: JSON.stringify(this.searchData),
        },
      });
    },
    goBlockChain(row) {
      this.dialogTableVisible = true;
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`;
    },
    deleteChange(row) {
      this.$confirm("此操作将永久删除该备案信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          if (
            row.auditStatus === "审核未通过" ||
            row.auditStatus === "审核不通过" ||
            row.auditStatus === "待提交" ||
            row.auditStatus === "已注销"
          ) {
            deleteApp(row.id)
              .then((res) => {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.clearAuditForm("auditForm");
              })
              .catch(() => {});
          } else {
            deleteAppNew(row.id)
              .then((res) => {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.clearAuditForm("auditForm");
              })
              .catch(() => {});
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm(0);
        } else {
          return false;
        }
      });
    },
    getAuditForm(tips = 1) {
      if (tips === 0) {
        this.pageInfoa.pageNumber = 1;
      }
      this.paramsObj = Object.assign({}, this.pageInfoa, this.auditForm);
      this.IsloadingA = true;
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : "1";
      searchQuery(this.paramsObj)
        .then((res) => {
          this.IsloadingA = false;
          this.totala = res.total;
          this.tableData = res.list;
          this.paramsOldA = this.paramsObj;
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
    seachReportForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getReportForm();
        } else {
          return false;
        }
      });
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields();
      this.getAuditForm(0);
    },
    handleSizeChangeb(val) {
      this.pageInfob.pageSize = val;
      this.IsloadingA = true;
      orgList(this.pageInfob)
        .then((res) => {
          this.IsloadingA = false;
          this.RelatedjgData = res.list;
          this.totalb = res.total;
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
    handleCurrentChangeb(val) {
      this.pageInfob.pageNumber = val;
      this.IsloadingA = true;
      orgList(this.pageInfob)
        .then((res) => {
          this.IsloadingA = false;
          this.RelatedjgData = res.list;
          this.totalb = res.total;
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val;
      this.pageInfoa.pageSize = val;
      this.IsloadingA = true;
      searchQuery(this.paramsOldA)
        .then((res) => {
          this.IsloadingA = false;
          this.totala = res.total;
          this.tableData = res.list;
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
    handleCurrentChangea(val) {
      this.paramsOldA.pageNumber = val;
      this.pageInfoa.pageNumber = val;
      this.IsloadingA = true;
      searchQuery(this.paramsOldA)
        .then((res) => {
          this.IsloadingA = false;
          this.totala = res.total;
          this.tableData = res.list;
        })
        .catch(() => {
          this.IsloadingA = false;
        });
    },
  },
};
</script>
<style lang="scss">
#block {
  iframe {
    min-height: calc(100vh - 120px);
  }
}
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
.continue {
  .el-date-editor .el-range__close-icon {
    line-height: 24px;
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
}
</style>
