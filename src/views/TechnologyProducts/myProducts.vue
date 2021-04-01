<template>
  <el-card class="continuewz">
    <div slot="header" class="clearfix btnCard">
      <span>我的产品服务</span>
      <div class="elCardBtnBox">
        <el-button type="primary" @click="prductionAdd">新增</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane label="待提交" name="1">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <!-- <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditForm.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col> -->
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
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditForm.createTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForm('auditForm','待提交')">查 询</el-button>
                <el-button @click="clearAuditForm('auditForm','待提交')">重 置</el-button>
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
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail(scope.row,'0')">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.companyName">{{ scope.row.companyName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteChange(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoa.pageNumber"
          :page-size="pageInfoa.pageSize"
          :total="totala"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
      </el-tab-pane>
      <el-tab-pane label="待审核" name="2">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <!-- <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditFormb.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditFormb.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
                  <el-select v-model="auditFormb.productType" :clearable="true" placeholder="请选择">
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
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditFormb.createTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormb('auditFormb','待审核')">查 询</el-button>
                <el-button @click="clearAuditFormb('auditFormb','待审核')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatab"
          @sort-change="sortChangeb"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail(scope.row,'0')">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.companyName">{{ scope.row.companyName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="back(scope.row)">撤回</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoab.pageNumber"
          :page-size="pageInfoab.pageSize"
          :total="totalab"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeab"
          @current-change="handleCurrentChangeab"
        />
      </el-tab-pane>
      <el-tab-pane label="退回" name="3">
        <div class="search">
          <el-form ref="auditFormc" :model="auditFormc" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <!-- <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditFormc.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditFormc.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
                  <el-select v-model="auditFormc.productType" :clearable="true" placeholder="请选择">
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
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditFormc.createTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormc('auditFormc','退回')">查 询</el-button>
                <el-button @click="clearAuditFormc('auditFormc','退回')">重 置</el-button>
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
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail(scope.row,'0')">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.companyName">{{ scope.row.companyName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteChange(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoac.pageNumber"
          :page-size="pageInfoac.pageSize"
          :total="totalac"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeac"
          @current-change="handleCurrentChangeac"
        />
      </el-tab-pane>
      <el-tab-pane label="已发布" name="4">
        <div class="search">
          <el-form ref="auditFormd" :model="auditFormd" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <!-- <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditFormd.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditFormd.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
                  <el-select v-model="auditFormd.productType" :clearable="true" placeholder="请选择">
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
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditFormd.createTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormd('auditFormd','已发布')">查 询</el-button>
                <el-button @click="clearAuditFormd('auditFormd','已发布')">重 置</el-button>
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
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail(scope.row,'0')">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.companyName">{{ scope.row.companyName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="update(scope.row)">更新</el-button>
              <el-button type="text" @click="baibai(scope.row)">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoad.pageNumber"
          :page-size="pageInfoad.pageSize"
          :total="totalad"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangead"
          @current-change="handleCurrentChangead"
        />
      </el-tab-pane>
      <el-tab-pane label="已下架" name="5">
        <div class="search">
          <el-form ref="auditForme" :model="auditForme" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <!-- <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditForme.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditForme.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
                  <el-select v-model="auditForme.productType" :clearable="true" placeholder="请选择">
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
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditForme.createTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForme('auditForme','已下架')">查 询</el-button>
                <el-button @click="clearAuditForme('auditForme','已下架')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatae"
          @sort-change="sortChangee"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail(scope.row,'0')">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.companyName">{{ scope.row.companyName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
              <el-button type="text" @click="deleteChange(scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          :current-page="pageInfoae.pageNumber"
          :page-size="pageInfoae.pageSize"
          :total="totalae"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeae"
          @current-change="handleCurrentChangeae"
        />
      </el-tab-pane>
      <el-tab-pane label="全部" name="6">
        <div class="search">
          <el-form ref="auditFormf" :model="auditFormf" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <!-- <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditFormf.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditFormf.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
                  <el-select v-model="auditFormf.productType" :clearable="true" placeholder="请选择">
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
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditFormf.createTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
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
          @sort-change="sortChangef"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail(scope.row,'0','已下架')">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.companyName">{{ scope.row.companyName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.auditStatus === '待提交' || scope.row.auditStatus === '退回'">
                <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
                <el-button type="text" @click="deleteChange(scope.row)">删除</el-button>
              </div>
              <div v-if="scope.row.auditStatus === '待审核'">
                <el-button type="text" @click="back(scope.row)">撤回</el-button>
              </div>
              <div v-if="scope.row.auditStatus === '已发布'">
                <el-button type="text" @click="update(scope.row)">更新</el-button>
                <el-button type="text" @click="baibai(scope.row)">下架</el-button>
              </div>
              <div v-if="scope.row.auditStatus === '已下架'">
                --
              </div>
            </template>

          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoaf.pageNumber"
          :page-size="pageInfoaf.pageSize"
          :total="totalaf"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeaf"
          @current-change="handleCurrentChangeaf"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-loading="blockloading" :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
    <el-dialog :visible.sync="returnAdviceVal" title="下架原因" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportForm3" :model="reportForm3" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="原因" prop="comment">
                <el-input v-model="reportForm3.comment" :rows="5" type="textarea" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subReturn('reportForm3')">提 交</el-button>
        <el-button @click="returnAdviceVal = false">关 闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { commonValidate2 } from '@/utils/formValidate'
import { query, productdelete, pruductupdate } from '@/api/TechnologyProducts.js'
import { getClock } from '@/api/general.js'
export default {
  data() {
    return {
      id: '',
      reportForm3: {
        comment: ''
      },
      returnAdviceVal: false,
      productTypeList: [],
      searchData: {},
      areaMsg: [],
      blockloading: false,
      blockSrc: '',
      dialogTableVisible: false,
      paramsTableData: [],
      formMsg: {},
      registerAddrArr: [],
      queryParams: {
        riid: this.$store.getters.riid
      },
      IsloadingA: false,
      loading: null,
      paramsOldA: {},
      paramsOldB: {},
      paramsOldC: {},
      paramsOldD: {},
      paramsOldE: {},
      paramsOldF: {},
      paramsOldG: {},
      paramsOldH: {},
      paramsOldI: {},
      paramsOldJ: {},
      paramsOldK: {},
      auditForm: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: '',
        riid: this.$store.getters.riid
      },
      auditFormb: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: '',
        riid: this.$store.getters.riid
      },
      auditFormc: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: '',
        riid: this.$store.getters.riid
      },
      auditFormd: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: '',
        riid: this.$store.getters.riid
      },
      auditForme: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: '',
        riid: this.$store.getters.riid
      },
      auditFormf: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: '',
        riid: this.$store.getters.riid
      },
      pageInfoa: {
        pageNumber: 1,
        pageSize: 10
      },
      totala: 0,
      pageInfoab: {
        pageNumber: 1,
        pageSize: 10
      },
      totalab: 0,
      pageInfoac: {
        pageNumber: 1,
        pageSize: 10
      },
      totalac: 0,
      pageInfoad: {
        pageNumber: 1,
        pageSize: 10
      },
      totalad: 0,
      pageInfoae: {
        pageNumber: 1,
        pageSize: 10
      },
      totalae: 0,
      pageInfoaf: {
        pageNumber: 1,
        pageSize: 10
      },
      totalaf: 0,
      pageInfoag: {
        pageNumber: 1,
        pageSize: 10
      },
      activeName: '1',
      tableData: [],
      tableDatab: [],
      tableDatac: [],
      tableDatad: [],
      tableDatae: [],
      tableDataf: [],
      rules: {
        comment: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appVersion: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        returnState: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        productName: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        if (searchData.activeName === '1') {
          this.pageInfoa = searchData.pageInfo
          this.auditForm = searchData.searchForm
        } else if (searchData.activeName === '2') {
          this.pageInfoab = searchData.pageInfo
          this.auditFormb = searchData.searchForm
        } else if (searchData.activeName === '3') {
          this.pageInfoac = searchData.pageInfo
          this.auditFormc = searchData.searchForm
        } else if (searchData.activeName === '4') {
          this.pageInfoad = searchData.pageInfo
          this.auditFormd = searchData.searchForm
        } else if (searchData.activeName === '5') {
          this.pageInfoae = searchData.pageInfo
          this.auditForme = searchData.searchForm
        } else if (searchData.activeName === '6') {
          this.pageInfoaf = searchData.pageInfo
          this.auditFormf = searchData.searchForm
        }
      }
    }
    const tabMsg = this.$route.params.tabMsg ? this.$route.params.tabMsg.tabMsg : 'noMsg'
    console.log(666, tabMsg)
    getClock('C5900000').then(res => {
      this.productTypeList = res.map(item => {
        return {
          label: item.codeValue,
          value: item.codeKey
        }
      })
      if (tabMsg === '待审核') {
        this.activeName = '2'
        this.getAuditFormb('待审核')
      } else if (tabMsg === '退回') {
        this.activeName = '3'
        this.getAuditFormc('退回  ')
      } else if (tabMsg === '已发布') {
        this.activeName = '4'
        this.getAuditFormd('已发布')
      } else if (tabMsg === '已下架') {
        this.activeName = '5'
        this.getAuditForme('已下架')
      } else if (tabMsg === '全部') {
        this.activeName = '6'
        this.getAuditFormf('全部')
      } else {
        this.activeName = '1'
        this.getAuditForm('待提交')
      }
    })
  },
  methods: {
    subReturn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          pruductupdate({ submiSsion: '3', id: this.id, remark: this.reportForm3.comment }).then(res => {
            this.returnAdviceVal = false
            this.getAuditFormd('已发布')
            this.reportForm3.comment = ''
            this.$message({
              type: 'success',
              message: '下架成功'
            })
          })
        } else {
          return false
        }
      })
    },
    update(data) {
      if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
          searchForm: this.auditForm,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoab,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
      } else if (this.activeName === '3') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoac,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      } else if (this.activeName === '4') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoad,
          searchForm: this.auditFormd,
          activeName: this.activeName
        }
      } else if (this.activeName === '5') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoae,
          searchForm: this.auditForme,
          activeName: this.activeName
        }
      } else if (this.activeName === '6') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoaf,
          searchForm: this.auditFormf,
          activeName: this.activeName
        }
      }
      this.searchData.queryParams = this.queryParams
      this.$router.push({
        name: 'productModify',
        query: {
          id: data.id,
          sty: '更新',
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    baibai(data) {
      this.id = data.id
      this.returnAdviceVal = true
    },
    back(data) {
      this.$confirm('是否确定撤回该条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        pruductupdate({ submiSsion: '2', id: data.id }).then(res => {
          this.getAuditFormb('待审核')
          this.$message({
            type: 'success',
            message: '撤回成功'
          })
        })
      }).catch(() => {

      })
    },
    deleteChange(data) {
      this.$confirm('是否确定删除该条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        productdelete(data.id).then(res => {
          const tabMsg = sessionStorage.getItem('tabMsg')
          if (tabMsg === '待提交') {
            this.getAuditForm('待提交')
          } else if (tabMsg === '待审核') {
            this.getAuditFormb('待审核')
          } else if (tabMsg === '退回') {
            this.getAuditFormc('退回')
          } else if (tabMsg === '已发布') {
            this.getAuditFormd('已发布')
          } else if (tabMsg === '已下架') {
            this.getAuditForme('已下架')
          } else if (tabMsg === '全部') {
            this.getAuditFormf('全部')
          }
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      }).catch(() => {

      })
    },
    canNotPass() {
      this.$confirm('是否确定不同意？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'info',
          message: '审核不通过'
        })
      }).catch(() => {

      })
    },
    pass() {
      this.$confirm('是否确定同意？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审核通过'
        })
      }).catch(() => {

      })
    },
    prductionAdd() {
      this.$router.push(
        {
          name: 'addProduct'
        }
      )
    },
    tableExamine(obj, type) {
      if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
          searchForm: this.auditForm,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoab,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
      } else if (this.activeName === '3') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoac,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      } else if (this.activeName === '4') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoad,
          searchForm: this.auditFormd,
          activeName: this.activeName
        }
      } else if (this.activeName === '5') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoae,
          searchForm: this.auditForme,
          activeName: this.activeName
        }
      } else if (this.activeName === '6') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoaf,
          searchForm: this.auditFormf,
          activeName: this.activeName
        }
      }
      this.searchData.queryParams = this.queryParams
      this.$router.push({
        name: 'AppVivw',
        query: {
          type,
          id: obj.id,
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    // 审核状态切换时的事件
    tabClick(data) {
      switch (data.label) {
        case '待提交':
          this.getAuditForm('待提交')
          sessionStorage.setItem('tabMsg', '待提交')
          break
        case '待审核':
          this.getAuditFormb('待审核')
          sessionStorage.setItem('tabMsg', '待审核')
          break
        case '退回':
          this.getAuditFormc('退回')
          sessionStorage.setItem('tabMsg', '退回')
          break
        case '已发布':
          this.getAuditFormd('已发布')
          sessionStorage.setItem('tabMsg', '已发布')
          break
        case '已下架':
          this.getAuditForme('已下架')
          sessionStorage.setItem('tabMsg', '已下架')
          break
        case '全部':
          this.getAuditFormf('全部')
          sessionStorage.setItem('tabMsg', '全部')
          break
      }
    },
    sortChange(column) {
      if (column.order === 'descending') {
        this.getAuditForm('待提交')
        this.queryParams.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForm('待提交')
        this.queryParams.sortKeyEstab = '0'
      }
    },
    sortChangeb(column) {
      if (column.order === 'descending') {
        this.getAuditFormb('待审核')
        this.queryParams.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormb('待审核')
        this.queryParams.sortKeyEstab = '0'
      }
    },
    sortChangec(column) {
      if (column.order === 'descending') {
        this.getAuditFormc('退回')
        this.queryParams.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormc('退回')
        this.queryParams.sortKeyEstab = '0'
      }
    },
    sortChanged(column) {
      if (column.order === 'descending') {
        this.getAuditFormd('已发布')
        this.queryParams.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormd('已发布')
        this.queryParams.sortKeyEstab = '0'
      }
    },
    sortChangee(column) {
      if (column.order === 'descending') {
        this.getAuditForme('已下架')
        this.queryParams.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForme('已下架')
        this.queryParams.sortKeyEstab = '0'
      }
    },
    sortChangef(column) {
      if (column.order === 'descending') {
        this.getAuditFormf('全部')
        this.queryParams.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormf('全部')
        this.queryParams.sortKeyEstab = '0'
      }
    },
    seachAuditForm(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditForm(auditStatus) {
      sessionStorage.setItem('tabMsg', '待提交')
      this.pageInfoa.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoa, this.auditForm)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sortKeyEstab = this.queryParams.sortKeyEstab ? this.queryParams.sortKeyEstab : '1'
      this.queryParams.startDate = this.auditForm.createTime.length ? this.auditForm.createTime[0] : ''
      this.queryParams.endDate = this.auditForm.createTime.length ? this.auditForm.createTime[1] : ''
      delete this.queryParams.createTime
      this.IsloadingA = true
      console.log(this.queryParams, 888)
      query(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsTableData = res.list.map(item => {
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
    clearAuditForm(formName, auditStatus) {
      // this.auditForm.registerArea = []
      this.$refs[formName].resetFields()
      this.auditForm.time = []
      this.getAuditForm(auditStatus)
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfoa.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldA).then(res => {
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
      query(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormb(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormb(auditStatus) {
      this.pageInfoab.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoab, this.auditFormb)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sortKeyEstab = this.queryParams.sortKeyEstab ? this.queryParams.sortKeyEstab : '1'
      this.queryParams.startDate = this.auditFormb.createTime.length ? this.auditFormb.createTime[0] : ''
      this.queryParams.endDate = this.auditFormb.createTime.length ? this.auditFormb.createTime[1] : ''
      delete this.queryParams.createTime
      this.IsloadingA = true
      query(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalab = res.total
        this.tableDatab = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsTableData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldB = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormb(formName, auditStatus) {
      // this.auditFormb.registerArea = []
      this.$refs[formName].resetFields()
      this.auditFormb.time = []
      this.getAuditFormb(auditStatus)
    },
    handleSizeChangeab(val) {
      this.paramsOldB.pageSize = val
      this.pageInfoab.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalab = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeab(val) {
      this.paramsOldB.pageNumber = val
      this.pageInfoab.pageNumber = val
      this.IsloadingA = true
      query(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalab = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormc(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormc(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormc(auditStatus) {
      this.pageInfoac.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoac, this.auditFormc)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sortKeyEstab = this.queryParams.sortKeyEstab ? this.queryParams.sortKeyEstab : '1'
      this.queryParams.startDate = this.auditFormc.createTime.length ? this.auditFormc.createTime[0] : ''
      this.queryParams.endDate = this.auditFormc.createTime.length ? this.auditFormc.createTime[1] : ''
      delete this.queryParams.createTime
      this.IsloadingA = true
      query(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalac = res.total
        this.tableDatac = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsTableData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldC = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormc(formName, auditStatus) {
      // this.auditFormc.registerArea = []
      this.$refs[formName].resetFields()
      this.auditFormc.time = []
      this.getAuditFormc(auditStatus)
    },
    handleSizeChangeac(val) {
      this.paramsOldC.pageSize = val
      this.pageInfoac.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalac = res.total
        this.tableDatac = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeac(val) {
      this.paramsOldC.pageNumber = val
      this.pageInfoac.pageNumber = val
      this.IsloadingA = true
      query(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalac = res.total
        this.tableDatac = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormd(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormd(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormd(auditStatus) {
      this.pageInfoad.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoad, this.auditFormd)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sortKeyEstab = this.queryParams.sortKeyEstab ? this.queryParams.sortKeyEstab : '1'
      this.queryParams.startDate = this.auditFormd.createTime.length ? this.auditFormd.createTime[0] : ''
      this.queryParams.endDate = this.auditFormd.createTime.length ? this.auditFormd.createTime[1] : ''
      delete this.queryParams.createTime
      this.IsloadingA = true
      query(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalad = res.total
        this.tableDatad = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsTableData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldD = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormd(formName, auditStatus) {
      // this.auditFormd.registerArea = []
      this.$refs[formName].resetFields()
      this.auditFormd.time = []
      this.getAuditFormd(auditStatus)
    },
    handleSizeChangead(val) {
      this.paramsOldD.pageSize = val
      this.pageInfoad.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totalad = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangead(val) {
      this.paramsOldD.pageNumber = val
      this.pageInfoad.pageNumber = val
      this.IsloadingA = true
      query(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totalad = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditForme(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForme(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditForme(auditStatus) {
      this.pageInfoae.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoae, this.auditForme)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sortKeyEstab = this.queryParams.sortKeyEstab ? this.queryParams.sortKeyEstab : '1'
      this.queryParams.startDate = this.auditForme.createTime.length ? this.auditForme.createTime[0] : ''
      this.queryParams.endDate = this.auditForme.createTime.length ? this.auditForme.createTime[1] : ''
      delete this.queryParams.createTime
      this.IsloadingA = true
      query(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalae = res.total
        this.tableDatae = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsTableData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldE = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditForme(formName, auditStatus) {
      this.$refs[formName].resetFields()
      // this.auditForme.registerArea = []
      this.auditForme.time = []
      this.getAuditForme(auditStatus)
    },
    handleSizeChangeae(val) {
      this.paramsOldE.pageSize = val
      this.pageInfoae.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldE).then(res => {
        this.IsloadingA = false
        this.totalae = res.total
        this.tableDatae = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeae(val) {
      this.paramsOldE.pageNumber = val
      this.pageInfoae.pageNumber = val
      this.IsloadingA = true
      query(this.paramsOldE).then(res => {
        this.IsloadingA = false
        this.totalae = res.total
        this.tableDatae = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormf(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormf(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormf(auditStatus) {
      this.pageInfoaf.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoaf, this.auditFormf)
      this.queryParams.auditStatus = ''
      delete this.queryParams.time
      this.queryParams.sortKeyEstab = this.queryParams.sortKeyEstab ? this.queryParams.sortKeyEstab : '1'
      this.queryParams.startDate = this.auditFormf.createTime.length ? this.auditFormf.createTime[0] : ''
      this.queryParams.endDate = this.auditFormf.createTime.length ? this.auditFormf.createTime[1] : ''
      delete this.queryParams.createTime
      this.IsloadingA = true
      query(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalaf = res.total
        this.tableDataf = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsTableData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldF = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormf(formName, auditStatus) {
      this.$refs[formName].resetFields()
      // this.auditFormf.registerArea = []
      this.auditFormf.time = []
      this.getAuditFormf(auditStatus)
    },
    handleSizeChangeaf(val) {
      this.paramsOldF.pageSize = val
      this.pageInfoaf.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldF).then(res => {
        this.IsloadingA = false
        this.totalaf = res.total
        this.tableDataf = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeaf(val) {
      this.paramsOldF.pageNumber = val
      this.pageInfoaf.pageNumber = val
      this.IsloadingA = true
      query(this.paramsOldF).then(res => {
        this.IsloadingA = false
        this.totalaf = res.total
        this.tableDataf = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    goDetail(data, type, name) {
      if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
          searchForm: this.auditForm,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoab,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
      } else if (this.activeName === '3') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoac,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      } else if (this.activeName === '4') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoad,
          searchForm: this.auditFormd,
          activeName: this.activeName
        }
      } else if (this.activeName === '5') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoae,
          searchForm: this.auditForme,
          activeName: this.activeName
        }
      } else if (this.activeName === '6') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoaf,
          searchForm: this.auditFormf,
          activeName: this.activeName
        }
      }
      this.searchData.queryParams = this.queryParams
      this.$router.push({
        name: 'productDetail',
        query: {
          id: data.id,
          searchData: JSON.stringify(this.searchData),
          name
        }
      })
    },
    showDialog(data) {
      if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
          searchForm: this.auditForm,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoab,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
      } else if (this.activeName === '3') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoac,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      } else if (this.activeName === '4') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoad,
          searchForm: this.auditFormd,
          activeName: this.activeName
        }
      } else if (this.activeName === '5') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoae,
          searchForm: this.auditForme,
          activeName: this.activeName
        }
      } else if (this.activeName === '6') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoaf,
          searchForm: this.auditFormf,
          activeName: this.activeName
        }
      }
      this.searchData.queryParams = this.queryParams
      if (this.activeName === '3') {
        this.$router.push({
          name: 'productModify',
          query: {
            id: data.id,
            sty: '退回',
            searchData: JSON.stringify(this.searchData)
          }
        })
      } else {
        this.$router.push({
          name: 'productModify',
          query: {
            id: data.id,
            searchData: JSON.stringify(this.searchData)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.continuewz{
   #block{
    iframe{
      min-height: calc(100vh - 120px);
    }
  }
    .el-date-editor .el-range__close-icon{
    line-height: 24px
  }
}
</style>
