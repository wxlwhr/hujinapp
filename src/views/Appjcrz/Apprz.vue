<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>App认证信息查看</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
      <el-tab-pane label="待提交检测" name="1">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditForm.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item min-width="80" label="检测机构名称" prop="deptName">
                  <el-input v-model="auditForm.deptName" type="text" placeholder="检测机构名称" clearable maxlength="50" />
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
          <el-table-column prop="detectionName" min-width="80" label="检测机构" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.detectionName?scope.row.detectionName:'--' }}
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
              <el-button type="text" @click="tableExamine(scope.row,'tableExamine')">
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
      <el-tab-pane label="待检测" name="2">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormb.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="检测机构名称" prop="deptName">
                  <el-input v-model="auditFormb.deptName" type="text" placeholder="检测机构名称" clearable maxlength="50" />
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
          :data="tableDatab"
          @sort-change="sortChangeb"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="detectionName" min-width="80" label="检测机构" show-overflow-tooltip />
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
          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待提交检测'" type="info" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='待检测'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='已检测待认证'" type="danger" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='已认证待初审'" type="success" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          v-if="totalab>0"
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
          <el-form ref="auditFormc" :model="auditFormc" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormc.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="检测机构名称" prop="deptName">
                  <el-input v-model="auditFormc.deptName" type="text" placeholder="检测机构名称" clearable maxlength="50" />
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
          <el-table-column prop="detectionName" min-width="80" label="检测机构" show-overflow-tooltip />
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
          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待提交检测'" type="info" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='待检测'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='已检测待认证'" type="danger" style="width:90px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='已认证待初审'" type="success" style="width:90px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="办理" placement="top">
                  <img src="@/icons/png/banli-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalac>0"
          :current-page="pageInfoac.pageNumber"
          :page-size="pageInfoac.pageSize"
          :total="totalac"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeac"
          @current-change="handleCurrentChangeac"
        />
      </el-tab-pane>
      <el-tab-pane label="已认证" name="4">
        <div class="search">
          <el-form ref="auditFormd" :model="auditFormd" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormd.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="检测机构名称" prop="deptName">
                  <el-input v-model="auditFormd.deptName" type="text" placeholder="检测机构名称" clearable maxlength="50" />
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
          <el-table-column prop="detectionName" min-width="80" label="检测机构" show-overflow-tooltip />
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
          <!-- <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus==='待提交检测'" type="info" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='待检测'" type="warning" style="width:85px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='已检测待认证'" type="danger" style="width:90px">{{ scope.row.auditStatus }}</el-tag>
              <el-tag v-if="scope.row.auditStatus==='已认证待初审'" type="success" style="width:90px">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.auditStatus!=='待认证'" type="text" @click="showDialog(scope.row,'1')">认证</el-button>
              <el-button :disabled="scope.row.auditStatus!=='待提交检测'" type="text" @click="showDialog1(scope.row.auditStatus)">提交检测</el-button>
              <el-button type="text" @click="deleteChange(scope.row.id)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          v-if="totalad>0"
          :current-page="pageInfoad.pageNumber"
          :page-size="pageInfoad.pageSize"
          :total="totalad"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangead"
          @current-change="handleCurrentChangead"
        />
      </el-tab-pane>
      <el-tab-pane label="检测退至认证机构" name="5">
        <div class="search">
          <el-form ref="auditForme" :model="auditForme" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditForme.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="检测机构名称" prop="deptName">
                  <el-input v-model="auditForme.deptName" type="text" placeholder="检测机构名称" clearable maxlength="50" />
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
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForme('auditForme')">查 询</el-button>
                <el-button @click="clearAuditForme('auditForme')">重 置</el-button>
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
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="detectionName" min-width="80" label="检测机构" show-overflow-tooltip />
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
              <el-button type="text" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="办理" placement="top">
                  <img src="@/icons/png/banli-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalae>0"
          :current-page="pageInfoae.pageNumber"
          :page-size="pageInfoae.pageSize"
          :total="totalae"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeae"
          @current-change="handleCurrentChangeae"
        />
      </el-tab-pane>
      <el-tab-pane label="退回金融机构" name="6">
        <div class="search">
          <el-form ref="auditFormf" :model="auditFormf" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormf.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="检测机构名称" prop="deptName">
                  <el-input v-model="auditFormf.deptName" type="text" placeholder="检测机构名称" clearable maxlength="50" />
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
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.rinm }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="detectionName" min-width="80" label="检测机构" show-overflow-tooltip />
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
          <el-table-column prop="updateTime" label="日期" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.appVersion===null?'--':scope.row.appVersion===''?'--':scope.row.appVersion }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">区块链信息</el-button>
            </template>
          </el-table-column> -->

        </el-table>
        <el-pagination
          v-if="totalaf>0"
          :current-page="pageInfoaf.pageNumber"
          :page-size="pageInfoaf.pageSize"
          :total="totalaf"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeaf"
          @current-change="handleCurrentChangeaf"
        />
      </el-tab-pane>
      <el-tab-pane label="协会退至认证机构" name="7">
        <div class="search">
          <el-form ref="auditFormg" :model="auditFormg" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormg.rinm" type="text" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="检测机构名称" prop="deptName">
                  <el-input v-model="auditFormg.deptName" type="text" placeholder="检测机构名称" clearable maxlength="50" />
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
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormg('auditForme')">查 询</el-button>
                <el-button @click="clearAuditFormg('auditForme')">重 置</el-button>
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
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="detectionName" min-width="80" label="检测机构" show-overflow-tooltip />
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
              <el-button type="text" @click="tableExamine(scope.row,'tableExamine')">
                <el-tooltip class="item" effect="dark" content="办理" placement="top">
                  <img src="@/icons/png/banli-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalag>0"
          :current-page="pageInfoag.pageNumber"
          :page-size="pageInfoag.pageSize"
          :total="totalag"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeag"
          @current-change="handleCurrentChangeag"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="检测机构选择" :visible.sync="centerDialogVisible" width="60%" center>
      <div style="padding: 0 20px">
        <el-form ref="reportForm" :model="reportForm" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item label="检测机构" prop="appNum1">
                <el-select
                  v-model="reportForm.appNum1"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isReasonable('reportForm')">提 交</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
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
import { searchQuery } from '@/api/appbeian/register.js'
export default {
  data() {
    return {
      searchData: {},
      blockloading: false,
      blockSrc: '',
      dialogTableVisible: false,
      paramsObj: {},
      centerDialogVisible: false,
      jctgDialogVisible: false,
      paramsOldA: {},
      paramsOldB: {},
      paramsOldC: {},
      paramsOldD: {},
      paramsOldE: {},
      paramsOldF: {},
      paramsOldG: {},
      auditForm: {
        appName: '',
        rinm: '',
        auditStatus: '',
        appVersion: '',
        deptName: '',
        time: []
      },
      auditFormb: {
        appName: '',
        rinm: '',
        appVersion: '',
        deptName: '',
        time: []
      },
      auditFormc: {
        appName: '',
        rinm: '',
        appVersion: '',
        deptName: '',
        time: []
      },
      auditFormd: {
        appName: '',
        rinm: '',
        appVersion: '',
        deptName: '',
        time: []
      },
      auditForme: {
        appName: '',
        rinm: '',
        appVersion: '',
        deptName: '',
        time: []
      },
      auditFormf: {
        appName: '',
        rinm: '',
        appVersion: '',
        deptName: '',
        time: []
      },
      auditFormg: {
        appName: '',
        rinm: '',
        appVersion: '',
        deptName: '',
        time: []
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
      totalaf: 0,
      pageInfoaf: {
        pageNumber: 1,
        pageSize: 10
      },
      pageInfoag: {
        pageNumber: 1,
        pageSize: 10
      },
      totalag: 0,
      IsloadingA: false,
      loading: null,
      options: [],
      list: [
        { value: '0', label: '北京互联网' },
        { value: '00', label: '北京互联网' },
        { value: '000', label: '北京互联网' },
        { value: '1', label: '上海互联网' }
      ],
      reportForm: {
        appName1: ''
      },
      rules: {
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appVersion: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appName1: [{ required: true, validator: commonValidate2, trigger: 'blur' }],
        appName: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      },
      activeName: '1',
      tableData: [],
      tableDatab: [],
      tableDatac: [],
      tableDatad: [],
      tableDatae: [],
      tableDataf: [],
      tableDatag: []
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        if (searchData.activeName === '1') {
          this.pageInfoa = searchData.pageInfo
          this.auditForm = searchData.paramsObj
        } else if (searchData.activeName === '2') {
          this.pageInfoab = searchData.pageInfo
          this.auditFormb = searchData.paramsObj
        } else if (searchData.activeName === '3') {
          this.pageInfoac = searchData.pageInfo
          this.auditFormc = searchData.paramsObj
        } else if (searchData.activeName === '4') {
          this.pageInfoad = searchData.pageInfo
          this.auditFormd = searchData.paramsObj
        } else if (searchData.activeName === '5') {
          this.pageInfoae = searchData.pageInfo
          this.auditForme = searchData.paramsObj
        } else if (searchData.activeName === '6') {
          this.pageInfoaf = searchData.pageInfo
          this.auditFormf = searchData.paramsObj
        } else if (searchData.activeName === '7') {
          this.pageInfoag = searchData.pageInfo
          this.auditFormg = searchData.paramsObj
        }
      }
    }
    const tabMsg = this.$route.params.tabMsg ? this.$route.params.tabMsg.tabMsg : 'noMsg'
    if (tabMsg === '待检测') {
      this.activeName = '2'
      this.getAuditFormb()
    } else if (tabMsg === '已检测待认证') {
      this.activeName = '3'
      this.getAuditFormc()
    } else if (tabMsg === '已认证待初审') {
      this.activeName = '4'
      this.getAuditFormd()
    } else if (tabMsg === '检测退至认证机构') {
      this.activeName = '5'
      this.getAuditForme()
    } else if (tabMsg === '退回金融机构') {
      this.activeName = '6'
      this.getAuditFormf()
    } else if (tabMsg === '协会退至认证机构') {
      this.activeName = '7'
      this.getAuditFormg()
    } else {
      this.activeName = '1'
      this.getAuditForm()
    }
  },
  methods: {
    // 列表办理
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
      }
      this.searchData.paramsObj = this.paramsObj
      this.$router.push({
        name: 'apprzxq',
        query: {
          type,
          id: obj.id,
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    // 排序
    sortChange(column) {
      this.paramsObj.auditStatus = '待提交检测'
      if (column.order === 'descending') {
        this.getAuditForm()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForm()
        this.paramsObj.sort = '0'
      }
    },
    sortChangeb(column) {
      this.paramsObj.auditStatus = '待检测'
      if (column.order === 'descending') {
        this.getAuditFormb()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormb()
        this.paramsObj.sort = '0'
      }
    },
    sortChangec(column) {
      this.paramsObj.auditStatus = '已检测待认证'
      if (column.order === 'descending') {
        this.getAuditFormc()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormc()
        this.paramsObj.sort = '0'
      }
    },
    sortChanged(column) {
      this.paramsObj.auditStatus = '已认证待初审'
      if (column.order === 'descending') {
        this.getAuditFormd()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormd()
        this.paramsObj.sort = '0'
      }
    },
    sortChangee(column) {
      this.paramsObj.auditStatus = '检测退至认证机构'
      if (column.order === 'descending') {
        this.getAuditForme()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForme()
        this.paramsObj.sort = '0'
      }
    },
    sortChangef(column) {
      this.paramsObj.auditStatus = '退回金融机构'
      if (column.order === 'descending') {
        this.getAuditFormf()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormf()
        this.paramsObj.sort = '0'
      }
    },
    sortChangeg(column) {
      this.paramsObj.auditStatus = '退回金融机构'
      if (column.order === 'descending') {
        this.getAuditFormg()
        this.paramsObj.sort = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormg()
        this.paramsObj.sort = '0'
      }
    },
    handleClick(activeName) {
      switch (activeName) {
        case '1':
          this.getAuditForm()
          sessionStorage.setItem('tabMsg', '待提交检测')
          break
        case '2':
          this.getAuditFormb()
          sessionStorage.setItem('tabMsg', '待检测')
          break
        case '3':
          this.getAuditFormc()
          sessionStorage.setItem('tabMsg', '已检测待认证')
          break
        case '4':
          this.getAuditFormd()
          sessionStorage.setItem('tabMsg', '已认证待初审')
          break
        case '5':
          this.getAuditForme()
          sessionStorage.setItem('tabMsg', '检测退至认证机构')
          break
        case '6':
          this.getAuditFormf()
          sessionStorage.setItem('tabMsg', '退回金融机构')
          break
        case '7':
          this.getAuditFormg()
          sessionStorage.setItem('tabMsg', '协会退至认证机构')
          break
      }
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
      this.paramsObj.auditStatus = '待提交检测'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      delete this.paramsObj.time
      this.IsloadingA = true
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list
        this.paramsOldA = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
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
    seachAuditFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb(0)
        } else {
          return false
        }
      })
    },
    getAuditFormb(tips = 1) {
      if (tips === 0) {
        this.pageInfoab.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoab, this.auditFormb)
      this.paramsObj.auditStatus = '待检测'
      delete this.paramsObj.time
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      this.IsloadingA = true
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalab = res.total
        this.tableDatab = res.list
        this.paramsOldB = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormb(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormb(0)
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
    goBlockChain(row) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`
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
        this.pageInfoac.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoac, this.auditFormc)
      this.paramsObj.auditStatus = '已检测待认证'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      delete this.paramsObj.time
      this.IsloadingA = true
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalac = res.total
        this.tableDatac = res.list
        this.paramsOldC = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormc(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormc(0)
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
        this.pageInfoad.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoad, this.auditFormd)
      this.paramsObj.auditStatus = '已认证待初审'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      delete this.paramsObj.time
      this.IsloadingA = true
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalad = res.total
        this.tableDatad = res.list
        this.tableDatad.map(item => {
          item.id = item.appId
        })
        this.paramsOldD = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormd(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormd(0)
    },
    handleSizeChangead(val) {
      this.paramsOldD.pageSize = val
      this.pageInfoad.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totalad = res.total
        this.tableDatad = res.list
        this.tableDatad.map(item => {
          item.id = item.appId
        })
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
        this.tableDatad.map(item => {
          item.id = item.appId
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.indexOf(query) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    seachAuditForme(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForme(0)
        } else {
          return false
        }
      })
    },
    getAuditForme(tips = 1) {
      if (tips === 0) {
        this.pageInfoae.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoae, this.auditForme)
      this.paramsObj.auditStatus = '检测退至认证机构'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      delete this.paramsObj.time
      this.IsloadingA = true
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalae = res.total
        this.tableDatae = res.list
        this.paramsOldE = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditForme(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForme(0)
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
    seachAuditFormf(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormf(0)
        } else {
          return false
        }
      })
    },
    getAuditFormf(tips = 1) {
      if (tips === 0) {
        this.pageInfoaf.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoaf, this.auditFormf)
      this.paramsObj.auditStatus = '退回金融机构'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      delete this.paramsObj.time
      this.IsloadingA = true
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalaf = res.total
        this.tableDataf = res.list
        this.paramsOldF = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormf(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormf(0)
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

    seachAuditFormg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormg(0)
        } else {
          return false
        }
      })
    },
    getAuditFormg(tips = 1) {
      if (tips === 0) {
        this.pageInfoag.pageNumber = 1
      }
      this.paramsObj = Object.assign({}, this.pageInfoag, this.auditFormg)
      this.paramsObj.auditStatus = '协会退至认证机构'
      this.paramsObj.sort = this.paramsObj.sort ? this.paramsObj.sort : '1'
      delete this.paramsObj.time
      this.IsloadingA = true
      searchQuery(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalag = res.total
        this.tableDatag = res.list
        this.paramsOldG = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditFormg(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormg(0)
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
    showDialog1(tyee) {
      this.centerDialogVisible = true
    },
    isReasonable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.centerDialogVisible = false
        } else {
          return false
        }
      })
    },
    rzSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.jctgDialogVisible = false
        } else {
          return false
        }
      })
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
      }
      this.searchData.paramsObj = this.paramsObj
      this.$router.push({
        name: 'apprzxq',
        query: {
          from: '详情页', // 只有工作台进去可以选择检测机构
          Num,
          id: row.id,
          searchData: JSON.stringify(this.searchData)
        }
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
