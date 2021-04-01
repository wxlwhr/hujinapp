<template>
  <el-card class="continuewz">
    <div slot="header" class="clearfix btnCard">
      <span>App备案信息查看</span>
      <div class="elCardBtnBox">
        <el-button type="primary" @click="exportMsg">导出</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane label="待提交检测" name="1">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="120px">
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
              <el-col :span="8" class="datepicker">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditForm.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditForm.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForm('auditForm','待提交检测')">查 询</el-button>
                <el-button @click="clearAuditForm('auditForm','待提交检测')">重 置</el-button>
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
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.approveName">{{ scope.row.approveName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.auditStatus==='审核通过'" type="text" @click="showDialog(scope.row,'1')">审核</el-button>
              <el-button v-else type="text" @click="showDialog(scope.row,'0')">查看</el-button>
              <el-button type="text" @click="deleteChange(scope.row.id)">删除</el-button>
            </template>
          </el-table-column> -->
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
      <el-tab-pane label="待检测" name="2">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="120px">
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
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormb.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormb.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormb('auditFormb','待检测')">查 询</el-button>
                <el-button @click="clearAuditFormb('auditFormb','待检测')">重 置</el-button>
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
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
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
      <el-tab-pane label="待认证" name="3">
        <div class="search">
          <el-form ref="auditFormc" :model="auditFormc" :rules="rules" label-width="120px">
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
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormc.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormc.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormc('auditFormc','待认证')">查 询</el-button>
                <el-button @click="clearAuditFormc('auditFormc','已检测待认证')">重 置</el-button>
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
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.approveName">{{ scope.row.approveName }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
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
      <el-tab-pane label="待初审" name="4">
        <div class="search">
          <el-form ref="auditFormd" :model="auditFormd" :rules="rules" label-width="120px">
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
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormd.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormd.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormd.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="备案流程" prop="appFlow">
                  <el-select v-model="auditFormd.appFlow" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormd('auditFormd','初审待审核')">查 询</el-button>
                <el-button @click="clearAuditFormd('auditFormd','已认证待初审')">重 置</el-button>
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
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
          <el-table-column v-if="this.$store.getters.roles" label="操作">
            <template slot-scope="scope">
              <el-button type="text" :disabled="returnDis(scope.row.approveReturnFlag)" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="审核" placement="top">
                  <img v-if="!returnDis(scope.row.approveReturnFlag)" src="@/icons/png/shenhe-s.png" alt="">
                  <img v-else src="@/icons/png/shenhe.png" alt="">
                </el-tooltip>
              </el-button>
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
      <el-tab-pane label="待复审" name="5">
        <div class="search">
          <el-form ref="auditForme" :model="auditForme" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditForme.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditForme.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditForme.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditForme.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditForme.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditForme.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="备案流程" prop="appFlow">
                  <el-select v-model="auditForme.appFlow" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForme('auditForme','复审待审核')">查 询</el-button>
                <el-button @click="clearAuditForme('auditForme','复审待审核')">重 置</el-button>
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
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
          <el-table-column v-if="this.$store.getters.roles" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.attr1 === '0'?false:true" :disabled="returnDis(scope.row.approveReturnFlag)" type="text" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="审核" placement="top">
                  <img v-if="!returnDis(scope.row.approveReturnFlag)" src="@/icons/png/shenhe-s.png" alt="">
                  <img v-else src="@/icons/png/shenhe.png" alt="">
                </el-tooltip>
              </el-button>
              <!-- <el-button v-else :disabled="scope.row.attr1 === '0'?true:false" type="text"> -->
              <el-button v-else disabled type="text">
                <img src="@/icons/png/shenhe.png" alt="">
              </el-button>
            </template>
          </el-table-column>
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
      <el-tab-pane label="已备案" name="6">
        <div class="search">
          <el-form ref="auditFormf" :model="auditFormf" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormf.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormf.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormf.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormf.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormf.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormf.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormf('auditFormf','已备案')">查 询</el-button>
                <el-button @click="clearAuditFormf('auditFormf','已备案')">重 置</el-button>
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
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.cdNo">
                <el-button type="text" @click="certificateDownload(scope.row)">{{ scope.row.recordNumber?scope.row.recordNumber:'--' }}</el-button>
              </div>
              <div v-else>
                {{ scope.row.recordNumber?scope.row.recordNumber:'--' }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.storeStatus === '1'" type="text" @click="handleClick(scope.row.id,'2')">下架</el-button>
              <el-button v-else type="text" @click="handleClick(scope.row.id,'1')">上架</el-button>
            </template>
          </el-table-column> -->
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
      <el-tab-pane label="审核未通过" name="7">
        <div class="search">
          <el-form ref="auditFormg" :model="auditFormg" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormg.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormg.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormg.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormg.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormg.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormg.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormg('auditFormg','审核未通过')">查 询</el-button>
                <el-button @click="clearAuditFormg('auditFormg','审核未通过')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatag"
          @sort-change="sortChangeg"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          :current-page="pageInfoag.pageNumber"
          :page-size="pageInfoag.pageSize"
          :total="totalag"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeag"
          @current-change="handleCurrentChangeag"
        />
      </el-tab-pane>
      <el-tab-pane label="已退回" name="10">
        <div class="search">
          <el-form ref="auditFormj" :model="auditFormj" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormj.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormj.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormj.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormj.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormj.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="!this.$store.getters.roles" :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormj.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态" prop="returnState">
                  <el-input v-model="auditFormj.returnState" type="text" placeholder="状态" clearable maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormj.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormj('auditFormj','已退回')">查 询</el-button>
                <el-button @click="clearAuditFormj('auditFormj','已退回')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDataj"
          @sort-change="sortChangej"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>          <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          :current-page="pageInfoaj.pageNumber"
          :page-size="pageInfoaj.pageSize"
          :total="totalaj"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeaj"
          @current-change="handleCurrentChangeaj"
        />
      </el-tab-pane>
      <el-tab-pane label="已注销" name="8">
        <div class="search">
          <el-form ref="auditFormh" :model="auditFormh" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormh.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormh.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormh.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormh.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormh.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormh.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormh('auditFormh','已注销')">查 询</el-button>
                <el-button @click="clearAuditFormh('auditFormh','已注销')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatah"
          @sort-change="sortChangeh"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.recordNumber?scope.row.recordNumber:'--' }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoah.pageNumber"
          :page-size="pageInfoah.pageSize"
          :total="totalah"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeah"
          @current-change="handleCurrentChangeah"
        />
      </el-tab-pane>
      <el-tab-pane label="已过期" name="9">
        <div class="search">
          <el-form ref="auditFormi" :model="auditFormi" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormi.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormi.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormi.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormi.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormi.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormi.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormi('auditFormi','已过期')">查 询</el-button>
                <el-button @click="clearAuditFormi('auditFormi','已过期')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatai"
          @sort-change="sortChangei"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="认证机构" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.appFilePath==='1'">--</span>
              <span v-else-if="!scope.row.approveName">--</span>
              <span v-else>{{ scope.row.approveName }}</span>
            </template>
          </el-table-column>          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待审核'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核通过'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='审核未通过'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.recordNumber?scope.row.recordNumber:'--' }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoai.pageNumber"
          :page-size="pageInfoai.pageSize"
          :total="totalai"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeai"
          @current-change="handleCurrentChangeai"
        />
      </el-tab-pane>
      <el-tab-pane label="全部" name="11">
        <div class="search">
          <el-form ref="auditFormk" :model="auditFormk" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormk.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="App名称" prop="appName">
                  <el-input v-model="auditFormk.appName" type="text" placeholder="App名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件版本" prop="appVersion">
                  <el-input v-model="auditFormk.appVersion" type="text" placeholder="软件版本" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="auditStatus">
                  <el-date-picker
                    v-model="auditFormk.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="this.$store.getters.roles" :span="8">
                <el-form-item label="机构注册地区" prop="registeredArea">
                  <el-cascader
                    v-model="auditFormk.registerArea"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    clearable
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备案方式" prop="appIconPath">
                  <el-select v-model="auditFormk.appIconPath" clearable placeholder="请选择">
                    <el-option
                      v-for="item in appIconPathOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormk('auditFormk','')">查 询</el-button>
                <el-button @click="clearAuditFormk('auditFormk','')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatak"
          @sort-change="sortChangek"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" min-width="100" label="机构名称" show-overflow-tooltip>
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="approveName" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.auditStatus?scope.row.auditStatus:'--' }}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.bianhao?scope.row.bianhao:'--' }}
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          :current-page="pageInfoak.pageNumber"
          :page-size="pageInfoak.pageSize"
          :total="totalak"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeak"
          @current-change="handleCurrentChangeak"
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
import { searchQuery, putaway, soldOut } from '@/api/appbeian/register.js'
// import { getAdrr } from '@/api/appbeian'
import { getAdrr } from '@/api/general.js'
export default {
  data() {
    return {
      appTypeOptions: [
        {
          value: '1',
          label: '新增备案'
        },
        {
          value: '2',
          label: '一般变更'
        },
        {
          value: '3',
          label: '重大变更'
        }
      ],
      appIconPathOptions: [
        {
          value: '0',
          label: '独立备案'
        },
        {
          value: '1',
          label: '关联备案'
        }
      ],
      appIconPath: '',
      searchData: {},
      areaMsg: [],
      blockloading: false,
      blockSrc: '',
      dialogTableVisible: false,
      paramsTableData: [],
      formMsg: {},
      registerAddrArr: [],
      queryParams: {},
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
        appName: '',
        appIconPath: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: []
      },
      auditFormb: {
        appName: '',
        appIconPath: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: []
      },
      auditFormc: {
        appName: '',
        appIconPath: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: []
      },
      auditFormd: {
        appName: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: [],
        appIconPath: '',
        appFlow: ''
      },
      auditForme: {
        appName: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: [],
        appIconPath: '',
        appFlow: ''
      },
      auditFormf: {
        appName: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: [],
        appIconPath: ''
      },
      auditFormg: {
        appName: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: [],
        appIconPath: ''
      },
      auditFormh: {
        appName: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: [],
        appIconPath: ''
      },
      auditFormi: {
        appName: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: [],
        appIconPath: ''
      },
      auditFormj: {
        appName: '',
        rinm: '',
        appVersion: '',
        returnState: '',
        registerArea: [],
        time: [],
        appIconPath: ''
      },
      auditFormk: {
        appName: '',
        rinm: '',
        appVersion: '',
        registerArea: [],
        time: [],
        appIconPath: ''
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
      totalag: 0,
      pageInfoah: {
        pageNumber: 1,
        pageSize: 10
      },
      totalah: 0,
      pageInfoai: {
        pageNumber: 1,
        pageSize: 10
      },
      totalai: 0,
      pageInfoaj: {
        pageNumber: 1,
        pageSize: 10
      },
      totalaj: 0,
      pageInfoak: {
        pageNumber: 1,
        pageSize: 10
      },
      totalak: 0,
      activeName: '1',
      tableData: [],
      tableDatab: [],
      tableDatac: [],
      tableDatad: [],
      tableDatae: [],
      tableDataf: [],
      tableDatag: [],
      tableDatah: [],
      tableDatai: [],
      tableDataj: [],
      tableDatak: [],
      rules: {
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
        } else if (searchData.activeName === '7') {
          this.pageInfoag = searchData.pageInfo
          this.auditFormg = searchData.searchForm
        } else if (searchData.activeName === '8') {
          this.pageInfoah = searchData.pageInfo
          this.auditFormh = searchData.searchForm
        } else if (searchData.activeName === '9') {
          this.pageInfoai = searchData.pageInfo
          this.auditFormi = searchData.searchForm
        } else if (searchData.activeName === '10') {
          this.pageInfoaj = searchData.pageInfo
          this.auditFormj = searchData.searchForm
        } else if (searchData.activeName === '11') {
          this.pageInfoak = searchData.pageInfo
          this.auditFormk = searchData.searchForm
        }
      }
    }
    this.getRegisterArer()
    const tabMsg = this.$route.params.tabMsg ? this.$route.params.tabMsg.tabMsg : 'noMsg'
    if (tabMsg === '待检测') {
      this.activeName = '2'
      this.getAuditFormb('待检测')
    } else if (tabMsg === '已检测待认证') {
      this.activeName = '3'
      this.getAuditFormc('已检测待认证')
    } else if (tabMsg === '已认证待初审') {
      this.activeName = '4'
      this.getAuditFormd('已认证待初审')
    } else if (tabMsg === '复审待审核') {
      this.activeName = '5'
      this.getAuditForme('复审待审核')
    } else if (tabMsg === '已备案') {
      this.activeName = '6'
      this.getAuditFormf('已备案')
    } else if (tabMsg === '审核未通过') {
      this.activeName = '7'
      this.getAuditFormg('审核未通过')
    } else if (tabMsg === '已注销') {
      this.activeName = '8'
      this.getAuditFormh('已注销')
    } else if (tabMsg === '已过期') {
      this.activeName = '9'
      this.getAuditFormi('已过期')
    } else if (tabMsg === '已退回') {
      this.activeName = '10'
      this.getAuditFormj('已退回')
    } else if (tabMsg === '全部') {
      this.activeName = '11'
      this.getAuditFormk('')
    } else {
      this.activeName = '1'
      this.getAuditForm('待提交检测')
    }
  },
  methods: {
    handleClick(id, num) {
      this.$confirm('是否确认此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (num === '1') {
          putaway(id, { cause: '同步备案系统数据' }).then(res => {
            this.$message({
              message: '上架成功',
              type: 'success'
            })
            this.getAuditFormf('已备案')
          })
        } else {
          soldOut(id, { cause: '同步备案系统数据' }).then(res => {
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this.getAuditFormf('已备案')
          })
        }
      }).catch(() => {

      })
    },
    returnDis(data) {
      if (data !== null && data !== '1' && data !== '') {
        return !(data === this.$store.getters.userName)
      } else {
        return false
      }
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
      } else if (this.activeName === '7') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoag,
          searchForm: this.auditFormg,
          activeName: this.activeName
        }
      } else if (this.activeName === '8') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoah,
          searchForm: this.auditFormch,
          activeName: this.activeName
        }
      } else if (this.activeName === '9') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoai,
          searchForm: this.auditFormi,
          activeName: this.activeName
        }
      } else if (this.activeName === '10') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoaj,
          searchForm: this.auditFormj,
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
    // 获取国籍、金融机构编码、地址
    getRegisterArer() {
      // 三级联动数据
      getAdrr().then(res => {
        this.registerAddrArr = res
      })
    },
    // 审核状态切换时的事件
    tabClick(data) {
      switch (data.label) {
        case '待提交检测':
          this.getAuditForm(data.label)
          sessionStorage.setItem('tabMsg', data.label)
          break
        case '待检测':
          this.getAuditFormb('待检测')
          sessionStorage.setItem('tabMsg', '待检测')
          break
        case '待认证':
          this.getAuditFormc('已检测待认证')
          sessionStorage.setItem('tabMsg', '已检测待认证')
          break
        case '待初审':
          this.getAuditFormd('已认证待初审')
          sessionStorage.setItem('tabMsg', '已认证待初审')
          break
        case '待复审':
          this.getAuditForme('复审待审核')
          sessionStorage.setItem('tabMsg', '复审待审核')
          break
        case '已备案':
          this.getAuditFormf(data.label)
          sessionStorage.setItem('tabMsg', data.label)
          break
        case '审核未通过':
          this.getAuditFormg('审核未通过')
          sessionStorage.setItem('tabMsg', '审核未通过')
          break
        case '已注销':
          this.getAuditFormh('已注销')
          sessionStorage.setItem('tabMsg', '已注销')
          break
        case '已过期':
          this.getAuditFormi('已过期')
          sessionStorage.setItem('tabMsg', '已过期')
          break
        case '已退回':
          this.getAuditFormj('已退回')
          sessionStorage.setItem('tabMsg', '已退回')
          break
        case '全部':
          this.getAuditFormk('')
          sessionStorage.setItem('tabMsg', '全部')
          break
      }
    },
    // 导出
    exportMsg() {
      if (this.activeName === '1') {
        this.areaMsg = this.auditForm.registerArea
      } else if (this.activeName === '2') {
        this.areaMsg = this.auditFormb.registerArea
      } else if (this.activeName === '3') {
        this.areaMsg = this.auditFormc.registerArea
      } else if (this.activeName === '4') {
        this.areaMsg = this.auditFormd.registerArea
        this.appIconPath = this.auditFormd.appIconPath
      } else if (this.activeName === '5') {
        this.areaMsg = this.auditForme.registerArea
        this.appIconPath = this.auditForme.appIconPath
      } else if (this.activeName === '6') {
        this.areaMsg = this.auditFormf.registerArea
        this.appIconPath = this.auditFormf.appIconPath
      } else if (this.activeName === '7') {
        this.areaMsg = this.auditFormg.registerArea
        this.appIconPath = this.auditFormg.appIconPath
      } else if (this.activeName === '8') {
        this.areaMsg = this.auditFormh.registerArea
        this.appIconPath = this.auditFormh.appIconPath
      } else if (this.activeName === '9') {
        this.areaMsg = this.auditFormi.registerArea
        this.appIconPath = this.auditFormi.appIconPath
      } else if (this.activeName === '11') {
        this.areaMsg = this.auditFormk.registerArea
        this.appIconPath = this.auditFormk.appIconPath
      } else {
        this.areaMsg = this.auditFormj.registerArea
        this.appIconPath = this.auditFormj.appIconPath
      }
      if (this.paramsTableData.length > 0) {
        location.href = `nifaReport/app/record/recordInfoOutExcel?appIconPath=${this.appIconPath}&userName=${this.$store.getters.userName}&appName=${this.queryParams.appName}&appVersion=${this.queryParams.appVersion}&auditStatus=${this.queryParams.auditStatus}&rinm=${this.queryParams.rinm}&addTime=${this.queryParams.startDate ? this.queryParams.startDate : ''}&updateTime=${this.queryParams.endDate ? this.queryParams.endDate : ''}&registerArea=${this.areaMsg}`
      } else {
        this.$message.error('待导出数据为空')
      }
    },
    sortChange(column) {
      if (column.order === 'descending') {
        this.getAuditForm('待提交检测')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForm('待提交检测')
        this.queryParams.sort = '0'
      }
    },
    sortChangeb(column) {
      if (column.order === 'descending') {
        this.getAuditFormb('待检测')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormb('待检测')
        this.queryParams.sort = '0'
      }
    },
    sortChangec(column) {
      if (column.order === 'descending') {
        this.getAuditFormc('已检测待认证')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormc('已检测待认证')
        this.queryParams.sort = '0'
      }
    },
    sortChanged(column) {
      if (column.order === 'descending') {
        this.getAuditFormd('已认证待初审')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormd('已认证待初审')
        this.queryParams.sort = '0'
      }
    },
    sortChangee(column) {
      if (column.order === 'descending') {
        this.getAuditForme('复审待审核')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForme('复审待审核')
        this.queryParams.sort = '0'
      }
    },
    sortChangef(column) {
      if (column.order === 'descending') {
        this.getAuditFormf('已备案')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormf('已备案')
        this.queryParams.sort = '0'
      }
    },
    sortChangeg(column) {
      if (column.order === 'descending') {
        this.getAuditFormg('审核未通过')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormg('审核未通过')
        this.queryParams.sort = '0'
      }
    },
    sortChangeh(column) {
      if (column.order === 'descending') {
        this.getAuditFormh('已注销')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormh('已注销')
        this.queryParams.sort = '0'
      }
    },
    sortChangei(column) {
      if (column.order === 'descending') {
        this.getAuditFormi('已过期')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormi('已过期')
        this.queryParams.sort = '0'
      }
    },
    sortChangej(column) {
      if (column.order === 'descending') {
        this.getAuditFormj('已退回')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormj('已退回')
        this.queryParams.sort = '0'
      }
    },
    sortChangek(column) {
      if (column.order === 'descending') {
        this.getAuditFormk('')
        this.queryParams.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormk('')
        this.queryParams.sort = '0'
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
      this.pageInfoa.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoa, this.auditForm)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditForm.time ? this.auditForm.time[0] : ''
      this.queryParams.endDate = this.auditForm.time ? this.auditForm.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list
        this.paramsTableData = res.list
        this.paramsOldA = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditForm(formName, auditStatus) {
      this.auditForm.registerArea = []
      this.$refs[formName].resetFields()
      this.auditForm.time = []
      this.getAuditForm(auditStatus)
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
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormb.time ? this.auditFormb.time[0] : ''
      this.queryParams.endDate = this.auditFormb.time ? this.auditFormb.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalab = res.total
        this.tableDatab = res.list
        this.paramsTableData = res.list
        this.paramsOldB = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormb(formName, auditStatus) {
      this.auditFormb.registerArea = []
      this.$refs[formName].resetFields()
      this.auditFormb.time = []
      this.getAuditFormb(auditStatus)
    },
    handleSizeChangeab(val) {
      this.paramsOldB.pageSize = val
      this.pageInfoab.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldB).then(res => {
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
      searchQuery(this.paramsOldB).then(res => {
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
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormc.time ? this.auditFormc.time[0] : ''
      this.queryParams.endDate = this.auditFormc.time ? this.auditFormc.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalac = res.total
        this.tableDatac = res.list
        this.paramsTableData = res.list
        this.paramsOldC = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormc(formName, auditStatus) {
      this.auditFormc.registerArea = []
      this.$refs[formName].resetFields()
      this.auditFormc.time = []
      this.getAuditFormc(auditStatus)
    },
    handleSizeChangeac(val) {
      this.paramsOldC.pageSize = val
      this.pageInfoac.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldC).then(res => {
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
      searchQuery(this.paramsOldC).then(res => {
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
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormd.time ? this.auditFormd.time[0] : ''
      this.queryParams.endDate = this.auditFormd.time ? this.auditFormd.time[1] : ''
      this.IsloadingA = true
      console.log(6666, this.queryParams)
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalad = res.total
        this.tableDatad = res.list
        this.paramsTableData = res.list
        this.paramsOldD = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormd(formName, auditStatus) {
      this.auditFormd.registerArea = []
      this.$refs[formName].resetFields()
      this.auditFormd.time = []
      this.getAuditFormd(auditStatus)
    },
    handleSizeChangead(val) {
      this.paramsOldD.pageSize = val
      this.pageInfoad.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldD).then(res => {
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
      searchQuery(this.paramsOldD).then(res => {
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
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditForme.time ? this.auditForme.time[0] : ''
      this.queryParams.endDate = this.auditForme.time ? this.auditForme.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalae = res.total
        this.tableDatae = res.list
        this.paramsTableData = res.list
        this.paramsOldE = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditForme(formName, auditStatus) {
      this.$refs[formName].resetFields()
      this.auditForme.registerArea = []
      this.auditForme.time = []
      this.getAuditForme(auditStatus)
    },
    handleSizeChangeae(val) {
      this.paramsOldE.pageSize = val
      this.pageInfoae.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldE).then(res => {
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
      searchQuery(this.paramsOldE).then(res => {
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
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormf.time ? this.auditFormf.time[0] : ''
      this.queryParams.endDate = this.auditFormf.time ? this.auditFormf.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalaf = res.total
        this.tableDataf = res.list
        this.paramsTableData = res.list
        this.paramsOldF = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormf(formName, auditStatus) {
      this.$refs[formName].resetFields()
      this.auditFormf.registerArea = []
      this.auditFormf.time = []
      this.getAuditFormf(auditStatus)
    },
    handleSizeChangeaf(val) {
      this.paramsOldF.pageSize = val
      this.pageInfoaf.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldF).then(res => {
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
      searchQuery(this.paramsOldF).then(res => {
        this.IsloadingA = false
        this.totalaf = res.total
        this.tableDataf = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormg(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormg(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormg(auditStatus) {
      this.pageInfoag.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoag, this.auditFormg)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormg.time ? this.auditFormg.time[0] : ''
      this.queryParams.endDate = this.auditFormg.time ? this.auditFormg.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalag = res.total
        this.tableDatag = res.list
        this.paramsTableData = res.list
        this.paramsOldG = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormg(formName, auditStatus) {
      this.$refs[formName].resetFields()
      this.auditFormg.registerArea = []
      this.auditFormg.time = []
      this.getAuditFormg(auditStatus)
    },
    handleSizeChangeag(val) {
      this.paramsOldG.pageSize = val
      this.pageInfoag.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldG).then(res => {
        this.IsloadingA = false
        this.totalag = res.total
        this.tableDatag = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeag(val) {
      this.paramsOldG.pageNumber = val
      this.pageInfoag.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldG).then(res => {
        this.IsloadingA = false
        this.totalag = res.total
        this.tableDatag = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormh(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormh(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormh(auditStatus) {
      this.pageInfoah.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoah, this.auditFormh)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormh.time ? this.auditFormh.time[0] : ''
      this.queryParams.endDate = this.auditFormh.time ? this.auditFormh.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalah = res.total
        this.tableDatah = res.list
        this.paramsTableData = res.list
        this.paramsOldH = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormh(formName, auditStatus) {
      this.$refs[formName].resetFields()
      this.auditFormh.registerArea = []
      this.auditFormh.time = []
      this.getAuditFormh(auditStatus)
    },
    handleSizeChangeah(val) {
      this.paramsOldH.pageSize = val
      this.pageInfoah.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldH).then(res => {
        this.IsloadingA = false
        this.totalah = res.total
        this.tableDatah = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeah(val) {
      this.paramsOldH.pageNumber = val
      this.pageInfoah.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldH).then(res => {
        this.IsloadingA = false
        this.totalah = res.total
        this.tableDatah = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormi(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormi(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormi(auditStatus) {
      this.pageInfoai.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoai, this.auditFormi)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormi.time ? this.auditFormi.time[0] : ''
      this.queryParams.endDate = this.auditFormi.time ? this.auditFormi.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalai = res.total
        this.tableDatai = res.list
        this.paramsTableData = res.list
        this.paramsOldI = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormi(formName, auditStatus) {
      this.$refs[formName].resetFields()
      this.auditFormi.registerArea = []
      this.auditFormi.time = []
      this.getAuditFormi(auditStatus)
    },
    handleSizeChangeai(val) {
      this.paramsOldI.pageSize = val
      this.pageInfoai.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldI).then(res => {
        this.IsloadingA = false
        this.totalai = res.total
        this.tableDatai = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeai(val) {
      this.paramsOldI.pageNumber = val
      this.pageInfoai.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldI).then(res => {
        this.IsloadingA = false
        this.totalai = res.total
        this.tableDatai = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormj(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormj(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormj(auditStatus) {
      this.pageInfoaj.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoaj, this.auditFormj)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormj.time ? this.auditFormj.time[0] : ''
      this.queryParams.endDate = this.auditFormj.time ? this.auditFormj.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalaj = res.total
        this.tableDataj = res.list
        this.paramsTableData = res.list
        this.paramsOldJ = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormj(formName, auditStatus) {
      this.$refs[formName].resetFields()
      this.auditFormj.registerArea = []
      this.auditFormj.time = []
      this.getAuditFormj(auditStatus)
    },
    handleSizeChangeaj(val) {
      this.paramsOldJ.pageSize = val
      this.pageInfoaj.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldJ).then(res => {
        this.IsloadingA = false
        this.totalaj = res.total
        this.tableDataj = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeaj(val) {
      this.paramsOldJ.pageNumber = val
      this.pageInfoaj.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldJ).then(res => {
        this.IsloadingA = false
        this.totalaj = res.total
        this.tableDataj = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },

    seachAuditFormk(formName, auditStatus) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormk(auditStatus)
        } else {
          return false
        }
      })
    },
    getAuditFormk(auditStatus) {
      this.pageInfoak.pageNumber = 1
      this.queryParams = Object.assign({}, this.pageInfoak, this.auditFormk)
      this.queryParams.auditStatus = auditStatus
      delete this.queryParams.time
      this.queryParams.sort = this.queryParams.sort ? this.queryParams.sort : '1'
      this.queryParams.startDate = this.auditFormk.time ? this.auditFormk.time[0] : ''
      this.queryParams.endDate = this.auditFormk.time ? this.auditFormk.time[1] : ''
      this.IsloadingA = true
      searchQuery(this.queryParams).then(res => {
        this.IsloadingA = false
        this.totalak = res.total
        this.tableDatak = res.list
        this.paramsTableData = res.list
        this.paramsOldK = this.queryParams
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormk(formName, auditStatus) {
      this.auditFormk.registerArea = []
      this.$refs[formName].resetFields()
      this.auditFormk.time = []
      this.getAuditFormk(auditStatus)
    },
    handleSizeChangeak(val) {
      this.paramsOldK.pageSize = val
      this.pageInfoak.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldK).then(res => {
        this.IsloadingA = false
        this.totalak = res.total
        this.tableDatak = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeak(val) {
      this.paramsOldK.pageNumber = val
      this.pageInfoak.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldK).then(res => {
        this.IsloadingA = false
        this.totalak = res.total
        this.tableDatak = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    goBlockChain(row) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`
    },
    certificateDownload(data) {
      location.href = `nifaReport/app/cert/${data.cdNo}`
    },
    showDialog(row, Num) {
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
      } else if (this.activeName === '7') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoag,
          searchForm: this.auditFormg,
          activeName: this.activeName
        }
      } else if (this.activeName === '8') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoah,
          searchForm: this.auditFormh,
          activeName: this.activeName
        }
      } else if (this.activeName === '9') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoai,
          searchForm: this.auditFormi,
          activeName: this.activeName
        }
      } else if (this.activeName === '10') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoaj,
          searchForm: this.auditFormj,
          activeName: this.activeName
        }
      } else if (this.activeName === '11') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoak,
          searchForm: this.auditFormk,
          activeName: this.activeName
        }
      }
      this.searchData.queryParams = this.queryParams
      this.$router.push({
        name: 'AppVivw',
        query: {
          Num,
          name: '详情页',
          row: JSON.stringify(row),
          searchData: JSON.stringify(this.searchData)
        }
      })
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
