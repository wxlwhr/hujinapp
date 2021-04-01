<template>
  <el-card class="AppRegistration AuthenticationTest">
    <div slot="header" class="clearfix btnCard">
      <span>App检测信息详情</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-form ref="form" :model="form" :rules="rules" disabled>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">金融机构基本信息</legend>
        <el-row :gutter="20" style="margin:20px 30px 0 30px">
          <el-col :span="8">
            <el-form-item label="统一社会信用代码">
              <el-input
                v-model.trim="form.succ"
                placeholder="请输入"
                clearable
                maxlength="18"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构名称" prop="rinm">
              <el-input v-model.trim="form.rinm" placeholder="机构名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="法人机构注册地区"
              prop="registerAddr"
            >
              <el-input
                v-model="form.registerAddr"
                style="width:100%"
                type="text"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="8">
            <el-form-item
              label="详细地址"
              prop="officeAddr"
            >
              <el-input
                v-model.trim="form.officeAddr"
                placeholder="编码"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="机构类别"
              prop="ficp"
            >
              <el-select v-model="form.ficp" placeholder="请选择">
                <el-option
                  v-for="item in jigou"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="form.attr2 === '1'" :span="8">
            <el-form-item
              label="联系人"
              prop="monitorName"
            >
              <el-input
                v-model.trim="form.monitorName"
                placeholder="联系人"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.attr2 === '1'" :gutter="20" style="margin: 0 30px">
          <el-col :span="8">
            <el-form-item
              label="联系方式"
              prop="managerTel"
            >
              <el-input
                v-model.trim="form.managerTel"
                placeholder="联系方式"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <!-- <fieldset v-if="form.auditStatus==='已检测待认证'" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">检测机构基本信息</legend>
        <el-row :gutter="20" style="margin:20px 30px 0 30px">
          <el-col :span="8">
            <el-form-item label="统一社会信用代码" prop="succ">
              <el-input
                v-model.trim="form.detectionInfo.succ"
                placeholder="请输入"
                clearable
                maxlength="18"
                @blur="searchSucc(form.succ)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构名称" prop="rinm">
              <el-input v-model.trim="form.detectionInfo.rinm" placeholder="机构名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="法人机构注册地区"
              prop="registerAddr"
            >
              <el-input
                v-model="form.detectionInfo.registerAddr"
                style="width:100%"
                type="text"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="8">
            <el-form-item
              label="详细地址"
              prop="officeAddr"
            >
              <el-input
                v-model.trim="form.detectionInfo.officeAddr"
                placeholder="编码"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="机构类别"
              prop="ficp"
            >
              <el-select v-model="form.detectionInfo.ficp" placeholder="请选择">
                <el-option
                  v-for="item in jigou"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset> -->
      <fieldset v-if="form.approveInfo" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">认证机构基本信息</legend>
        <el-row :gutter="20" style="margin:20px 30px 0 30px">
          <el-col :span="8">
            <el-form-item label="统一社会信用代码">
              <el-input
                v-model.trim="form.approveInfo.succ"
                placeholder="请输入"
                clearable
                maxlength="18"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认证机构名称" prop="rinm">
              <el-input v-model.trim="form.approveInfo.rinm" placeholder="机构名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="法人机构注册地区"
              prop="registerAddr"
            >
              <el-input
                v-model="form.approveInfo.registerAddr"
                style="width:100%"
                type="text"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="8">
            <el-form-item
              label="详细地址"
              prop="officeAddr"
            >
              <el-input
                v-model.trim="form.approveInfo.officeAddr"
                placeholder="编码"
                clearable
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item
              label="机构类别"
              prop="ficp"
            >
              <el-select v-model="form.approveInfo.ficp" placeholder="请选择">
                <el-option
                  v-for="item in jigou"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件信息</legend>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              :show-file-list="false"
            >
              <el-image
                v-if="imageUrl"
                class="avatar"
                :src="imageUrl"
                @click="imgClick"
              >
                <div slot="error" class="el-image__error" style="cursor:pointer;color:#333">
                  格式不支持预览
                </div>
              </el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-col>
          <el-col :span="20">
            <el-col :span="12">
              <span> 包名: {{ form.packageName }}</span>
            </el-col>
            <el-col :span="12">
              <span> 是否为本单位开发: {{ form.devlopType===0?'是':'否' }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 软件名称: {{ form.appName }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 开发单位: {{ form.developer?form.developer:'无' }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 软件版本: {{ form.appVersion }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 开发单位统一社会信用代码: {{ form.creditCode?form.creditCode:'无' }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 语言类型: {{ form.leType === '0'?'中文':'非中文' }}</span>
            </el-col>
            <!-- <el-col :span="12" style="margin-top:25px">
              <span> 是否支持IPv6: {{ form.ipv6 === 0?'是':'否' }}</span>
            </el-col> -->
            <!-- <el-col :span="12" style="margin-top:25px">
              <span style="word-break:break-all"> 认证机构:{{ form.approveOrg }}</span>
            </el-col> -->
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="APP应用页截图" prop="fileName7" class="radio_enter">
              <el-alert
                :closable="false"
                description="截图须与申报软件实际运行界面一致，应清晰展示应用主界面、主要功能页（资金交易或支付等）、版本信息页、隐私政策页（发布、生效或更新日期）等，但不应显示敏感信息。"
                style="height:35px;margin-bottom:10px"
                type="warning"
              />
              <el-upload
                :action="actionUrl"
                :file-list="fileListOne"
                list-type="picture-card"
                :auto-upload="false"
              >
                <i slot="default" class="el-icon-plus" />
                <div slot="file" slot-scope="{file}">
                  <el-image
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    @error="erroeChange(file)"
                  >
                    <div slot="error" class="el-image__error" style="cursor:pointer;color:#333">
                      格式不支持预览
                    </div>
                  </el-image>
                  <span class="el-upload-list__item-actions">
                    <span
                      v-if="file.isShow"
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in" />
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download" />
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" type="textarea" :rows="3" maxlength="500" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.devlopType === 1" :gutter="20">
          <el-col :span="12">
            <el-form-item label="第三方安全加固单位" prop="otherAssistOrg">
              <el-input v-model="form.otherAssistOrg" type="text" placeholder="" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第三方加固单位统一社会信用代码" prop="otherAssistOrgCode">
              <el-input v-model="form.otherAssistOrgCode" type="text" placeholder="" maxlength="18" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="代理公司营业执照电子影印件" prop="fileName3">
              <el-input v-model="form.fileName3" disabled style="width: 100%">
                <template v-if="fileID3" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload3"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ICP/SP许可电子影印件" prop="fileName4">
              <el-input v-model="form.fileName4" disabled style="width: 100%">
                <template v-if="fileID4" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload4"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="APP产品类型" prop="productType">
              <el-select v-model="form.productType" placeholder="APP产品类型" clearable @change="getCode()">
                <el-option v-for="(item,index) in AppList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="APP备案类型" prop="recordType">
              <el-tooltip placement="top">
                <div slot="content">
                  资金交易客户端应用软件：直接面向用户提供资金交易服务的移动金融客户端软件（包括，但不限于手机银行，支付App等）
                  <br>信息采集类客户端应用软件：不直接面向用户提供资金交易服务，但需采集个人敏感信息的移动金融客户端应用软件
                  <br>咨询查询类客户端应用软件：仅提供金融产品推介、信息查询、咨询推送等服务的移动金融客户端应用软件
                </div>
                <el-select v-model="form.recordType" placeholder="APP备案类型" clearable>
                  <el-option v-for="(item,index) in lxList" :key="index" :label="item.name" :value="item.code" />
                </el-select>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.productType!=='other'" :gutter="20">
          <el-col :span="24">
            <el-form-item label="应用权限" prop="appPermissions" class="radio_enter">
              <el-checkbox-group v-model="form.appPermissions">
                <el-checkbox v-for="item in regionalOptions" :key="item.codeKey" :label="item.codeKey">{{ item.codeValue }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="product">
              <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入" maxlength="500" />
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>

      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">个人信息保护策略</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="隐私策略" prop="fileName5">
              <el-input v-model="form.fileName5" disabled style="width: 100%">
                <template v-if="fileID5" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload5"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件安装包</legend>
        <el-table :data="tableData">
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column label="文件名称" prop="originalName" min-width="250" show-overflow-tooltip />
          <el-table-column label="文件大小" prop="attachSize" />
          <el-table-column label="MD5值" min-width="250" prop="md5" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <p type="text" style="color:#409EFF;cursor:pointer" @click="fileDownload8(scope.row.attachId)">下载</p>
            </template>
          </el-table-column>
        </el-table>
      </fieldset>
      <!-- <fieldset v-if="form.auditStatus !=='待提交检测'" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">外部评估机构</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="认证单位">
              <el-input v-model="form.approveInfo.rinm" type="text" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset> -->
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">其他信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="其他信息文件" prop="fileName1">
              <el-input v-model="form.fileName1" disabled style="width: 100%">
                <template v-if="fileID1" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload1"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
    </el-form>
    <el-form ref="reportForm" :model="reportForm" :rules="rules" :disabled="form.auditStatus!=='待检测' && form.auditStatus !=='认证退至检测机构' && form.auditStatus !=='协会退至检测机构'">
      <fieldset v-if="$route.query.from !=='详情页' && (form.auditStatus ==='待检测' || form.auditStatus ==='协会退至检测机构' || form.auditStatus ==='认证退至检测机构')" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">检测信息填写</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item v-show="false" label="检测结果" prop="checkResult">
              <el-select v-model="reportForm.checkResult" placeholder="认证结果" clearable>
                <el-option v-for="(item,index) in jcList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="检测结果" prop="checkResult">
              <el-select v-model="reportForm.checkResult" placeholder="检测结果" clearable>
                <el-option v-for="(item,index) in jcList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报告编号" prop="reportNum">
              <el-input v-model="reportForm.reportNum" type="text" placeholder="报告编号" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item v-show="false" label="认证证书" prop="fileName">
              <el-input v-model="reportForm.fileName" disabled style="width: 100%" />
            </el-form-item>
            <el-form-item label="检测报告盖章页" prop="fileName">
              <el-input v-model="reportForm.fileName" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="reportForm.fileName" type="primary" @click="clearFile">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!reportForm.fileName"
                    ref="upload1"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarerr"
                    :action="actionUrl"
                    class="upload-demo"
                  >
                    <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse v-if="custRecoTbData[0].children" v-model="activeNames">
          <el-collapse-item v-for="(itema,indexa) in testWriteData" :key="indexa" :title="itema.label" :name="indexa">
            <el-table
              v-if="testWriteData.length !== 0"
              :data="itema.children"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row>
                    <el-row v-for="(item,index) in props.row.children" :key="index" :span="24">
                      <el-form-item :label="item.label">
                        <el-radio-group v-model="item.result" @change="fn(props.row.children,props.row)">
                          <el-radio label="0">符合</el-radio>
                          <el-radio label="1">不符合</el-radio>
                          <el-radio label="2">不适用</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-row>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="序号" type="index" width="50" />
              <el-table-column
                label="检测项目"
                prop="label"
              />
              <el-table-column label="检测结果">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.result" @change="fb(scope)">
                    <el-radio label="0">符合</el-radio>
                    <el-radio label="1">不符合</el-radio>
                    <el-radio label="2">不适用</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </fieldset>
      <fieldset v-if="form.auditStatus !=='待检测' && form.auditStatus !=='认证退至检测机构' && form.auditStatus !=='协会退至检测机构'" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">检测信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="检测结果">
              <el-select v-model="reportForm1.checkResult" placeholder="检测结果" clearable>
                <el-option v-for="(item,index) in jcList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报告编号" prop="reportNum">
              <el-input v-model="reportForm1.reportNum" type="text" placeholder="报告编号" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="检测报告盖章页" required>
              <el-input v-model="reportForm1.fileName" disabled style="width: 100%">
                <template v-if="fileID" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse v-model="activeNames1">
          <el-collapse-item v-for="(itema,indexa) in testShowData" :key="indexa" :title="itema.label" :name="indexa">
            <el-table
              v-if="testShowData.length !== 0"
              :data="itema.children"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row>
                    <el-row v-for="(item,index) in props.row.children" :key="index" :span="24">
                      <el-form-item :label="item.label">
                        <el-radio-group v-model="item.result" @change="fn(props.row.children,props.row)">
                          <el-radio label="0">符合</el-radio>
                          <el-radio label="1">不符合</el-radio>
                          <el-radio label="2">不适用</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-row>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="序号" type="index" width="50" />
              <el-table-column
                label="检测项目"
                prop="label"
              />
              <el-table-column label="检测结果">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.result" @change="fb(scope)">
                    <el-radio label="0">符合</el-radio>
                    <el-radio label="1">不符合</el-radio>
                    <el-radio label="2">不适用</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </fieldset>
      <fieldset v-if="statusMess.length>0" class="fieldsetStyle" style="margin:0 auto">
        <legend style="margin-left: 40px;font-size:17px">审核记录</legend>
        <div style="margin-bottom:10px" shadow="never">
          <el-table :data="statusMess" tooltip-effect="dark">
            <el-table-column label="审核机构" prop="auditUserName" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核人" prop="auditUser" min-width="100" show-overflow-tooltip />
            <el-table-column label="审核阶段" prop="currentState" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核意见" prop="remark" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.remark?scope.row.remark:'--' }}
              </template>
            </el-table-column>
            <el-table-column label="审核时间" prop="auditTime" min-width="120" show-overflow-tooltip />
          </el-table>
        </div>
      </fieldset>
    </el-form>
    <br>
    <el-dialog :visible.sync="centerDialogVisible" title="审核意见" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportForm2" :model="reportForm2" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="意见" prop="comment">
                <el-input v-model="reportForm2.comment" :rows="5" type="textarea" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isReasonable('reportForm2')">提 交</el-button>
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="returnAdviceVal" title="退回意见" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportForm3" :model="reportForm3" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="意见" prop="comment">
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
    <div>
      <el-row style="text-align:center;">
        <el-col :span="24">
          <!-- //此处要走工作流 -->
          <el-button v-if="isRL" type="primary" @click="claimButton()">认领</el-button>
          <el-button v-if="isTJ" type="primary" @click="submitWorkflow()">提交</el-button>
          <el-button v-if="isJJ" type="primary" @click="claimButton()">拒绝</el-button>
          <!-- <el-button v-if="this.$route.query.Num==='1'" type="primary" @click="submitWorkflow('form')">提交</el-button> -->
          <el-button type="primary" @click="goBack">返回</el-button>
          <el-button v-if="$route.query.from !=='详情页'" type="primary" @click="returnFnc('金融机构')">退回至金融机构</el-button>
          <el-button v-if="$route.query.from !=='详情页' && form.approveInfo && appFilePath !=='1'" type="primary" @click="returnFnc('认证机构')">退回至认证机构</el-button>
        </el-col>
      </el-row>
    </div>
    <workflow />
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { commonValidate2 } from '@/utils/formValidate'
// registRiid 审核记录
import { proChange, registRiid, getUserInfo, getNewTree, HXSearchFil, HXSearchList, rzWorkFlow, proChangeToTest, ApprecordDetails, statusComplate } from '@/api/appbeian/register.js'
import { getButton, claim } from '@/api/workflow/index.js'
import { Authorized } from '@/utils/formValidate'
import { getAdrr, getClock } from '@/api/general.js'
import { getNext, getUsers, flowTodo, flowJumpreject } from '@/api/workflow/index.js'
export default {
  data() {
    return {
      reportForm3: {
        comment: ''
      },
      returnAdviceVal: false,
      returnName: '',
      returnData: {},
      selectAuthorId: [],
      selectAuthorName: [],
      userRidd: '',
      testShowData: [],
      testWriteData: [],
      activeNames: [],
      activeNames1: [],
      workFlowObj: {},
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      statusMess: [],
      ccc: {},
      reportForm2: {
        comment: ''
      },
      reportForm1: {
        checkResult: '',
        reportNum: '',
        fileName: '',
        orgId: ''
      },
      remnant: 0,
      remnant1: 6,
      disabled: false,
      centerDialogVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      rowData: null,
      tableData: [],
      fileListOne: [
      ],
      imageUrl: '',
      fileID: '',
      fileID1: '',
      fileID2: '',
      fileID3: '',
      fileID4: '',
      fileID5: '',
      fileID6: '',
      fileID7: '',
      custRecoTbData: [],
      reportForm: {
        checkResult: '',
        reportNum: '',
        fileName: ''
      },
      paramsWorkButton: {}, // 认领参数
      isRL: false,
      isTJ: false,
      isJJ: false,
      appFilePath: '',
      submitWorkParams: {},
      form: {
        ipv6: 1,
        attr2: '',
        approveInfo: {},
        id: '',
        detectionList: [],
        detectionInfo: {},
        description: '',
        remark: '',
        appName: '',
        productType: '',
        recordType: '',
        appVersion: '',
        devlopType: '',
        otherAssistOrg: '',
        developer: '',
        creditCode: '',
        reportNum: '',
        appPermissions: [],
        // 文件
        fileName: '',
        fileName1: '',
        fileName2: '',
        fileName3: '',
        fileName4: '',
        fileName5: '',
        fileName7: '',
        fileName6: ''
      },
      registerAddrArr: [],
      jigou: [
        {
          value: '政策性银行',
          label: '政策性银行'
        }, {
          value: '国有商业银行',
          label: '国有商业银行'
        }, {
          value: '股份制商业银行',
          label: '股份制商业银行'
        }, {
          value: '邮政储蓄银行',
          label: '邮政储蓄银行'
        }, {
          value: '证券公司',
          label: '证券公司'
        }, {
          value: '基金公司',
          label: '基金公司'
        }, {
          value: '期货公司',
          label: '期货公司'
        }, {
          value: '私募投资基金管理机构',
          label: '私募投资基金管理机构'
        }, {
          value: '保险集团（控股）公司',
          label: '保险集团（控股）公司'
        }, {
          value: '保险公司',
          label: '保险公司'
        }, {
          value: '保险资产管理公司',
          label: '保险资产管理公司'
        }, {
          value: '中国银联股份有限公司',
          label: '中国银联股份有限公司'
        }, {
          value: '网联清算有限公司',
          label: '网联清算有限公司'
        }, {
          value: '非银行支付机构',
          label: '非银行支付机构'
        }, {
          value: '城市商业银行',
          label: '城市商业银行'
        }, {
          value: '农村商业银行',
          label: '农村商业银行'
        }, {
          value: '农村合作银行',
          label: '农村合作银行'
        }, {
          value: '农村信用社',
          label: '农村信用社'
        }, {
          value: '村镇银行',
          label: '村镇银行'
        }, {
          value: '外资银行',
          label: '外资银行'
        }, {
          value: '农村资金互助社',
          label: '农村资金互助社'
        }, {
          value: '财务公司',
          label: '财务公司'
        }, {
          value: '其他',
          label: '其他'
        }
      ],
      regionalOptions: [],
      applicationList: [
        {
          name: '投资理财类',
          code: '投资理财类'
        },
        {
          name: '金融借贷类',
          code: '金融借贷类'
        },
        {
          name: '金融支付类',
          code: '金融支付类'
        },
        {
          name: '金融银行类',
          code: '金融银行类'
        },
        {
          name: '基金类',
          code: '基金类'
        },
        {
          name: '证券类',
          code: '证券类'
        },
        {
          name: '金融咨询类',
          code: '金融咨询类'
        }
      ],
      AppList: [
        {
          name: 'Android',
          code: 'C2000030'
        },
        {
          name: 'IOS',
          code: 'C2000031'
        },
        {
          name: '其他',
          code: 'other'
        }
      ],
      lxList: [
        {
          name: '资金交易类',
          code: '资金交易类'
        },
        {
          name: '信息采集类',
          code: '信息采集类'
        },
        {
          name: '资讯查询类',
          code: '资讯查询类'
        }
      ],
      jcList: [
        {
          name: '合格',
          code: '0'
        },
        {
          name: '不合格',
          code: '1'
        }
      ],
      CardType: [
        {
          name: '新增',
          code: '1'
        },
        {
          name: '更变',
          code: '2'
        },
        {
          name: '注销',
          code: '3'
        }
      ],
      workFlowParams: {},
      nodeMatching: '',
      nextNodeAll: {},
      nextUserAll: {},
      message: '工作流组件',
      userData: [],
      userChecked: [], // 已选择的人员
      nextNodeData: [],
      nextNode: '',
      rules: {
        comment: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        checkResult: [{ required: true, message: '请选择检测结果', trigger: 'change' }],
        fileName: [{ required: true, message: '请上传文件', trigger: 'change' }],
        bao: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        appName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        recordType: [{ required: false, message: '请选择', trigger: 'change' }],
        productType: [{ required: false, message: '请选择', trigger: 'change' }],
        otherAssistOrg: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        developer: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        creditCode: [
          { required: false, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }
        ],
        appVersion: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        reportNum: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        devlopType: [{ required: false, message: '请选择', trigger: 'change' }],
        appPermissions: [{ required: false, message: '请选择', trigger: 'change' }],
        fileName1: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName3: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName4: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName5: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName6: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName7: [{ required: false, message: '请上传文件', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'businessFlag',
      'permissions_routers',
      'workFlow2business',
      'RIID'
    ]),
    // 上传地址
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.form.id}&ownSystem=18&ownBusiness=nifaReport&flag=1`
    },
    paramsObj() {
      // delete this.ccc.detectionList
      const obj = Object.assign({}, this.form)
      obj.workflow = this.workFlowParams
      obj.workflow.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = this.appFilePath === '1' ? '' : this.selectAuthorName.join(';')
      obj.workflow.flowNextResource.nextNodes[0].authors.Author.selectAuthor = this.appFilePath === '1' ? '' : this.selectAuthorId.join(';')
      obj.appDetectionInfo = this.reportForm
      obj.detectionList = this.custRecoTbData
      obj.detectionList[0].children = this.testWriteData
      if (obj.appPermissions instanceof Array) {
        obj.appPermissions = obj.appPermissions.join(',')
      }
      obj.flag = '2'
      return obj
    }
  },
  mounted() {
    this.getData()
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
    if (this.$route.query.Num === '0') {
      // // 审核记录
      // registRiid(JSON.parse(this.$route.query.row).id).then(res => {
      //   this.statusMess = res
      // })
      ApprecordDetails(this.$route.query.id).then(res => {
        this.rowData = res
        registRiid(this.rowData.id).then(res => {
          this.statusMess = res
        })
        for (var key in this.rowData) {
          if (this.form[key] instanceof Array) {
            this.form[key] = this.rowData[key] || []
          } else if (this.form[key] instanceof String || Number) {
            this.form[key] = this.rowData[key] || ''
          } else if (this.form[key] instanceof Object) {
            this.form[key] = this.rowData[key] || {}
          } else {
            this.form[key] = this.rowData[key]
          }
        }
        if (this.rowData.ipv6 !== null) {
          this.form.ipv6 = Number(this.rowData.ipv6)
        }
        this.form.devlopType = res.devlopType
        if (this.form.productType === 'Android') {
          getClock('C2000030').then(res => {
            this.regionalOptions = res
          })
        } else if (this.form.productType === 'IOS') {
          getClock('C2000031').then(res => {
            this.regionalOptions = res
          })
        }
        if (res.appDetectionInfo) {
          this.reportForm1.reportNum = res.appDetectionInfo.reportNum
          this.reportForm1.checkResult = res.appDetectionInfo.checkResult
          this.form.detectionList = res.detectionList
          this.testShowData = res.detectionList ? res.detectionList[0].children : []
        }
        if (res.appPermissions !== null) {
          this.form.appPermissions = this.form.appPermissions.split(',')
        }
        this.vivw()
        this.getData()
        this.$nextTick(function() {
          this.$refs['form'].clearValidate()
        })
      })
    } else {
      if (this.$route.query.type) {
        registRiid(this.$route.query.id).then(res => {
          this.statusMess = res
        })
        flowTodo(this.$route.query.id).then(res => {
          this.workFlowObj.name = res.name
          this.workFlowObj.sendSubjectionName = res.sendSubjectionName
          this.workFlowObj.subjectionId = res.subjectionId
          this.workFlowObj.trackId = res.trackId
          this.workFlowObj.workId = res.workId
          this.getData()
          this.workDetail(this.workFlowObj, 2)
          this.getFlowButton(this.workFlowObj, 2)
        })
      } else {
        this.getData()
        this.workDetail()
        this.getFlowButton()
      }
    }
  },
  methods: {
    getStatus(data) {
      statusComplate(this.rowData.id).then(res => {
        if (res === '已检测待初审' || res === '已检测待认证') {
          this.loading.close()
          this.$message({
            message: '提交审核成功',
            type: 'success' })
          this.goBack()
        } else {
          setTimeout(() => {
            this.getStatus(data)
          }, 1000)
        }
      })
    },
    imgClick() {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
    },
    erroeChange(e) {
      e.isShow = false
    },
    // 退回
    subReturn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true
          })
          flowJumpreject(this.returnData).then(res => {
            res.comment = this.reportForm3.comment
            if (this.returnName === '金融机构') {
              const data = res
              const node = data.flowNextNode.nextNodes.filter(item => {
                return item.nodeName === '金融机构'
              })
              data.flowNextNode.nextNodes = node
              data.nodeName = '金融机构'
              flowJumpreject(data).then(res => {
                this.loading.close()
                this.$message({
                  message: '退回成功',
                  type: 'success' })
                this.returnAdviceVal = false
                this.goBack()
              })
            } else {
              const data = res
              const node = data.flowNextNode.nextNodes.filter(item => {
                return item.nodeName === '认证机构'
              })
              data.flowNextNode.nextNodes = node
              data.nodeName = '认证机构'
              flowJumpreject(data).then(res => {
                this.loading.close()
                this.$message({
                  message: '退回成功',
                  type: 'success' })
                this.returnAdviceVal = false
                this.goBack()
              })
            }
          })
        } else {
          return false
        }
      })
    },
    returnFnc(data) {
      this.returnName = data
      this.returnAdviceVal = true
    },
    // 工作流认证详情接口
    workDetail(data, num = 1) {
      const obj0 = {
        name: this.$route.query.name,
        sendSubjectionName: this.$route.query.sendSubjectionName,
        subjectionId: this.$route.query.subjectionId,
        trackId: this.$route.query.trackId,
        workId: this.$route.query.workId
      }
      const obj = num === 2 ? data : obj0
      rzWorkFlow(obj).then(res => {
        registRiid(res.formData.data.id).then(res => {
          this.statusMess = res
        })
        if (res.formData.data.approveInfo) {
          this.userRidd = res.formData.data.approveInfo.riid
          getUserInfo(this.userRidd).then(res => {
            this.selectAuthorId = res.map(item => {
              return 'U_' + item.userId + '/D_3dc3ce27b9694262b78f4ad2402354d9'
            })
            this.selectAuthorName = res.map(item => {
              return item.name + '(认证机构)'
            })
          })
        }
        this.ccc = Object.assign({}, res.formData.data)
        this.rowData = res.formData.data
        this.appFilePath = res.formData.data.appFilePath
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key]
        }
        if (this.rowData.ipv6 !== null) {
          this.form.ipv6 = Number(this.rowData.ipv6)
        }
        this.reportForm.orgId = res.formData.data.detectionOrg
        if (res.formData.data.appDetectionInfo) {
          this.reportForm1.reportNum = res.formData.data.appDetectionInfo.reportNum
          this.reportForm1.checkResult = res.formData.data.appDetectionInfo.checkResult
          this.form.detectionList = res.formData.data.detectionList
          this.testShowData = res.formData.data.detectionList ? res.formData.data.detectionList[0].children : []
        }
        if (this.form.productType === 'Android') {
          getClock('C2000030').then(res => {
            this.regionalOptions = res
          })
        } else if (this.form.productType === 'IOS') {
          getClock('C2000031').then(res => {
            this.regionalOptions = res
          })
        }
        if (this.form.appPermissions !== null) {
          this.form.appPermissions = this.form.appPermissions.split(',')
        }
        this.vivw()
      })
    },
    // 获取工作流按钮
    getFlowButton(data, num = 1) {
      const obj0 = {
        name: this.$route.query.name,
        sendSubjectionName: this.$route.query.sendSubjectionName,
        subjectionId: this.$route.query.subjectionId,
        trackId: this.$route.query.trackId,
        workId: this.$route.query.workId
      }
      const obj = num === 2 ? data : obj0

      getButton(obj).then(res => {
        this.returnData = res
        if (res.flowResult.flowButtons !== null) {
          res.flowResult.flowButtons.forEach(el => {
            if (el.buttonId === 'submit') {
              this.isTJ = true
            } else if (el.buttonId === 'stop') {
              this.isJJ = true
            } else if (el.buttonId === 'claim') {
              this.isRL = true
            }
          })
        }

        res.flowResult.flowButtons.forEach(el => {
          if (el.buttonId === 'submit') {
            this.isTJ = true
          } else if (el.buttonId === 'stop') {
            this.isJJ = true
          } else if (el.buttonId === 'claim') {
            this.isRL = true
          }
        })

        this.paramsWorkButton = Object.assign({}, res)
        this.submitWorkParams = Object.assign({}, res)
      })
    },
    // 认证认领接口
    claimButton() {
      claim(this.paramsWorkButton).then(res => {
        location.reload()
      })
    },
    // 提交认证
    submitWorkflow() {
      this.$refs.reportForm.validate(valid => {
        if (valid) {
          this.centerDialogVisible = true
        }
      })
    },
    nextStep() {
      this.loading = this.$loading({
        lock: true
      })
      this.$refs.upload1.submit()
    },
    // 三级层级机构数据请求
    getData() {
      getNewTree('1').then(res => {
        this.custRecoTbData = res
        this.testWriteData = res[0].children || []
      })
    },
    fb(val) {
      if (val.row.children) {
        val.row.children.forEach(item => {
          item.result = val.row.result
        })
      }
    },
    fn(val, row) {
      let zero = 0
      let one = 0

      val.forEach(element => {
        if (element.result === '0') {
          zero += 1
        } else if (element.result === '1') {
          one += 1
        }
      })
      if (one > 0) {
        row.result = '1'
      } else if (zero > 0 && one === 0) {
        row.result = '0'
      } else {
        row.result = '2'
      }
    },
    isReasonable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true
          })
          getNext(this.submitWorkParams).then(res => {
            this.nextNodeAll = res
            this.nextNodeData = res.flowNextNode.nextNodes
            getUsers(this.nextNodeAll).then(res => {
              this.nextUserAll = res
              const arr = res.flowNextResource.nextNodes[0].authors.Author.selectAuthor.split(';')
              const array = res.flowNextResource.nextNodes[0].authors.Author.selectAuthorName.split(';')
              this.userData = arr.map((codeName, i) => ({ codeName, codeId: array[i] }))
              this.workFlowParams = Object.assign({}, this.nextUserAll)
              this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
              if (this.reportForm.orgId) {
                if (this.reportForm.orgId !== '') {
                  this.userData.forEach(el => {
                    if (el.codeName.indexOf(this.reportForm.orgId) !== -1) {
                      this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = el.codeName
                      this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = el.codeId
                    }
                  })
                }
              }
              this.nextStep()
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '获取审核人员失败',
                type: 'error' })
            })
          }).catch(() => {
            this.loading.close()
            this.$message({
              message: '获取审核节点失败',
              type: 'error' })
          })
        } else {
          return false
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
    },
    vivw() {
      HXSearchList({ noteId: this.rowData.id, ownSystem: '8' }).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '8') {
            element.attachSize = Math.round(100 * (element.attachSize / 1048576)) / 100
            element.attachSize = isNaN(element.attachSize) ? 0 : parseFloat(element.attachSize).toFixed(1) + 'MB'
            this.tableData = res
          }
        })
      })
      HXSearchFil(this.rowData.id).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '7') {
            this.fileID = element.attachId
            this.imageUrl = `nifa-autonomy-file/biz/previewPic/${this.fileID}`
          } else if (element.ownSystem === '15') {
            this.fileID2 = element.attachId
            const obj = {
              url: `nifa-autonomy-file/biz/previewPic/${this.fileID2}`,
              fileID: this.fileID2,
              isShow: true
            }
            this.fileListOne.push(obj)
          } else if (element.ownSystem === '9') {
            this.form.fileName3 = element.originalName
            this.fileID3 = element.attachId
          } else if (element.ownSystem === '10') {
            this.form.fileName4 = element.originalName
            this.fileID4 = element.attachId
          } else if (element.ownSystem === '11') {
            this.form.fileName5 = element.originalName
            this.fileID5 = element.attachId
          } else if (element.ownSystem === '12') {
            this.form.fileName6 = element.originalName
            this.fileID6 = element.attachId
          } else if (element.ownSystem === '13') {
            this.form.fileName1 = element.originalName
            this.fileID1 = element.attachId
          } else if (element.ownSystem === '15') {
            this.form.fileName7 = element.originalName
            this.fileID7 = element.attachId
          } else if (element.ownSystem === '18') {
            this.reportForm1.fileName = element.originalName
            this.fileID = element.attachId
          }
        })
      })
    },
    // 清文件名字
    clearFile() {
      this.reportForm.fileName = ''
    },
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID}`
    },
    fileDownload1() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID1}`
    },
    fileDownload2() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID2}`
    },
    fileDownload3() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID3}`
    },
    fileDownload4() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID4}`
    },
    fileDownload5() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID5}`
    },
    fileDownload6() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID6}`
    },
    fileDownload7() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID7}`
    },
    fileDownload8(id) {
      location.href = `nifa-autonomy-file/upload/download/${id}`
    },
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.reportForm.fileName = fileList[0].name
      } else {
        this.reportForm.fileName = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 50
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 50MB!')
        this.reportForm.fileName = ''
        return false
      }
      if (!Authorized(file)) {
        this.reportForm.fileName = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess(res1) {
      this.paramsObj.workflow.comment = this.reportForm2.comment
      this.paramsObj.approveList = null
      if (res1.code !== 200) {
        this.handleAvatarerr()
      } else {
        if (this.appFilePath === '1') {
          proChangeToTest(this.paramsObj, 'ceb52cf8f9b948ef8b535e8bb5f19f41').then(res => {
            this.getStatus()
          }).catch(() => {
            this.loading.close()
            this.$message({
              message: '提交失败',
              type: 'error' })
          })
        } else if (this.appFilePath === '2') {
          proChange(this.paramsObj, 'ceb52cf8f9b948ef8b535e8bb5f19f41').then(res => {
            this.loading.close()
            this.$message({
              message: '提交成功',
              type: 'success' })
            this.goBack()
          }).catch(() => {
            this.loading.close()
            this.$message({
              message: '提交失败',
              type: 'error' })
          })
        }
      }
    },
    // 文件上传失败回调
    handleAvatarerr() {
      this.remnant -= 1
      this.loading.close()
      this.$confirm('您的检测报告盖章页上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    // 审核
    submit(formName) {
      // this.$store.dispatch('openWorkFlow', true)
      // this.loading = this.$loading({
      //   lock: true
      // })
      // proChange({ auditStatus: '审核通过', id: this.rowData.id }).then(res => {
      //   this.loading.close()
      //   this.$router.go(-1)
      // }).catch(() => {
      //   this.loading.close()
      // })
    },
    submit1(formName) {
      this.loading = this.$loading({
        lock: true
      })
      proChange({ auditStatus: '审核未通过', id: this.rowData.id }).then(res => {
        this.loading.close()
        this.$router.go(-1)
      }).catch(() => {
        this.loading.close()
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
