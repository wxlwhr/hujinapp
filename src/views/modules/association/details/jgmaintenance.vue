<template>
  <el-card class="registerStyle">
    <div slot="header" class="header">
      <div slot="header" class="clearfix btnCard">
        <span style="float: left;">机构注册信息详情</span>
        <span style="float: left;margin-left:100px">版本记录：</span>
        <div style="float: left;">
          <el-select v-model="productType" placeholder="版本记录" style="width:260px;">
            <el-option v-for="(item,index) in banbenList" :key="index" :label="item.lastUpdateTime" :value="item.id" />
          </el-select>
        </div>
        <el-button style="float: left;margin-left:10px" type="primary" @click="search(productType)">查看</el-button>
        <el-button style="float: left;margin-left:10px" type="primary" @click="goNew">返回最新版本</el-button>
        <el-button style="float: left;margin-left:10px" type="primary" plain @click="getBackById">变更详情</el-button>
        <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      </div>
    </div>
    <div class="baseBox">
      <el-form ref="form" :model="form" :rules="rules" class="basic-form" disabled>
        <fieldset v-if="isShowgs" class="fieldsetStyle">
          <legend style="margin-left: 40px; font-size:17px">机构基本信息</legend>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="统一社会信用代码" prop="succ">
                <el-input
                  v-model.trim="form.succ"
                  placeholder="请输入"
                  clearable
                  maxlength="18"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="rinm">
                <el-input v-model.trim="form.rinm" placeholder="机构名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构简称" prop="riam">
                <el-input v-model.trim="form.riam" placeholder="机构简称" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="组织机构代码（如有）"
                prop="ozcd"
              >
                <el-input
                  v-model.trim="form.ozcd"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="法人机构注册地区"
                prop="registerAddr"
              >
                <el-cascader
                  v-model="form.registerAddr"
                  :options="registerAddrArr"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="详细地址"
                prop="officeAddr"
              >
                <el-input
                  v-model.trim="form.officeAddr"
                  placeholder="详细地址"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
          >
            <el-col
              :span="8"
            >
              <el-form-item
                label="联系人"
                prop="monitorName"
              >
                <el-input
                  v-model.trim="form.monitorName"
                  placeholder="请输入"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="联系方式"
                prop="managerTel"
              >
                <el-input
                  v-model.trim="form.managerTel"
                  placeholder="请输入"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否会员" prop="isMemberCifa">
                <el-select v-model="form.isMemberCifa" placeholder="请选择">
                  <el-option
                    v-for="item in huiyuanArr"
                    :key="item.codeKey"
                    :label="item.codeValue"
                    :value="item.codeKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="官网地址" prop="websit">
                <el-input v-model="form.websit" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位联系邮箱" prop="email">
                <el-input v-model="form.email" placeholder="单位联系邮箱" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立时间" prop="crTime">
                <el-date-picker
                  v-model="form.crTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="公司简介" prop="bussScope">
                <el-input v-model="form.bussScope" type="textarea" :rows="3" placeholder="请输入" maxlength="500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="资质荣誉" prop="mainNetBuss">
                <el-input v-model="form.mainNetBuss" type="textarea" :rows="3" placeholder="请输入" maxlength="500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="公司Logo" prop="fileName14" class="radio_enter">
                <el-image
                  v-if="urlG"
                  style="width: 120px; height: 120px;border-radius: 6px 6px;"
                  :src="urlG"
                  :preview-src-list="srcListG"
                />
                <div v-else>
                  <p class="el-button" style="width: 120px;height: 120px;line-height: 100px;" @click="loctionClick">刷新图片</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照扫描件" prop="fileName" class="radio_enter">
                <el-image
                  v-if="urlY"
                  style="width: 120px; height: 120px;border-radius: 6px 6px;"
                  :src="urlY"
                  :preview-src-list="srcListY"
                >
                  <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload()">
                    <pdf
                      v-if="testmsgY==='pdf'"
                      :src="urlY"
                      :page="1"
                    />
                    <span v-else>格式不支持预览<br>请点击下载</span>
                  </div>
                </el-image>
                <div v-else>
                  <p class="el-button" style="width: 120px;height: 120px;line-height: 100px;">暂无图片</p>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <div v-else>
          <fieldset class="fieldsetStyle">
            <legend style="margin-left: 40px; font-size:17px">机构基本信息</legend>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
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
                <el-form-item label="机构简称" prop="riam">
                  <el-input v-model.trim="form.riam" placeholder="机构简称" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="组织机构代码（如有）"
                  prop="ozcd"
                >
                  <el-input
                    v-model.trim="form.ozcd"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col
                v-if="isShow"
                :span="8"
              >
                <el-form-item
                  label="金融机构编码"
                  prop="ficd"
                >
                  <el-input
                    v-model.trim="form.ficd"
                    placeholder="编码"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col
                v-if="isShow"
                :span="8"
              >
                <el-form-item
                  label="LEI码（如有）"
                  prop="lei"
                >
                  <el-input
                    v-model.trim="form.lei"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
              >
                <el-form-item
                  label="法人机构注册地区"
                  prop="registerAddr"
                >
                  <el-cascader
                    v-model="form.registerAddr"
                    :options="registerAddrArr"
                  />
                </el-form-item>
              </el-col>
              <el-col

                :span="8"
              >
                <el-form-item
                  label="详细地址"
                  prop="officeAddr"
                >
                  <el-input
                    v-model.trim="form.officeAddr"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="isShow" :span="8">
                <el-form-item
                  label="机构类别"
                  prop="ficp"
                >
                  <el-select v-model="form.ficp" placeholder="请选择">
                    <el-option
                      v-for="item in jigou"
                      :key="item.codeKey"
                      :label="item.codeValue"
                      :value="item.codeValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :span="8"
              >
                <el-form-item
                  label="联系人"
                  prop="monitorName"
                >
                  <el-input
                    v-model.trim="form.monitorName"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
              >
                <el-form-item
                  label="联系方式"
                  prop="managerTel"
                >
                  <el-input
                    v-model.trim="form.managerTel"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单位联系邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="单位联系邮箱" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="isShow" :gutter="20">
              <el-col :span="8">
                <el-form-item label="分公司数量" prop="departName">
                  <el-input v-model.trim="form.departName" placeholder="分公司数量" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="子公司数量" prop="quartersName">
                  <el-input v-model.trim="form.quartersName" placeholder="子公司数量" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持有金融业务许可证的子公司数量" prop="fbln">
                  <el-input v-model.trim="form.fbln" placeholder="持有金融业务许可证的子公司数量" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="营业执照扫描件" prop="fileName" class="radio_enter">
                  <!-- <p style="color:#409EFF;cursor:pointer" @click="fileDownload()">{{ form.fileName }}</p> -->
                  <el-image
                    v-if="urlY"
                    style="width: 120px; height: 120px;border-radius: 6px 6px;"
                    :src="urlY"
                    :preview-src-list="srcListY"
                  >
                    <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload()">
                      <pdf
                        v-if="testmsgY==='pdf'"
                        :src="urlY"
                        :page="1"
                      />
                      <span v-else>格式不支持预览<br>请点击下载</span>
                    </div>
                  </el-image>
                  <div v-else>
                    <p class="el-button" style="width: 120px;height: 120px;line-height: 100px;">暂无图片</p>
                  </div>
                </el-form-item>
              </el-col>
              <el-col v-if="isShow" :span="12">
                <el-form-item label="授权函" prop="fileName3" class="radio_enter">
                  <!-- <p style="color:#409EFF;cursor:pointer" @click="fileDownload()">{{ form.fileName3 }}</p> -->
                  <el-image
                    v-if="urlS"
                    style="width: 120px; height: 120px;border-radius: 6px 6px;"
                    :src="urlS"
                    :preview-src-list="srcListS"
                  >
                    <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload3()">
                      <pdf
                        v-if="testmsgS==='pdf'"
                        :src="urlS"
                        :page="1"
                      />
                      <span v-else>格式不支持预览<br>请点击下载</span>
                    </div>
                  </el-image>
                  <div v-else>
                    <p class="el-button" style="width: 120px;height: 120px;line-height: 100px;">暂无图片</p>
                  </div>
                </el-form-item>
              </el-col>
              <el-col v-if="isShow" :span="24">
                <el-form-item label="金融业务许可证（或备案证书）扫描件" class="radio_enter" prop="fileName2">
                  <el-row v-if="fileList2.length>0" :gutter="20">
                    <el-col v-for="item in fileList2" :key="item.fileID" :span="3">
                      <!-- <p style="color:#409EFF;cursor:pointer" @click="fileDownload2(item.fileID)">{{ item.name }}</p> -->
                      <el-image
                        v-if="item.url"
                        style="width: 120px; height: 120px;border-radius: 6px 6px;"
                        :src="item.url"
                        :preview-src-list="item.srcList"
                      >
                        <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload2(item.testmsg,item.url,item.fileID)">
                          <pdf
                            v-if="item.testmsg==='pdf'"
                            :src="item.url"
                            :page="1"
                          />
                          <span v-else>格式不支持预览<br>请点击下载</span>
                        </div>
                      </el-image>
                      <div v-else>
                        <p class="el-button" style="width: 120px;height: 120px;line-height: 100px;">暂无图片</p>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row v-else>
                    <el-col :span="16">
                      <el-button type="text" disabled>暂无文件</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
          <fieldset v-if="isShow" class="fieldsetStyle">
            <legend style="margin-left: 40px;font-size:17px">App发布情况</legend>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="总部发布App总数" prop="fblc">
                  <el-input v-model.trim="form.fblc" placeholder="总部发布App总数" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分公司发布App总数" prop="fblia">
                  <el-input v-model.trim="form.fblia" placeholder="分公司发布App总数" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持有金融业务许可证的子公司发布App总数" prop="opnm">
                  <el-input v-model.trim="form.opnm" placeholder="持有金融业务许可证的子公司发布App总数" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
          <fieldset v-if="isShow" class="fieldsetStyle">
            <legend style="margin-left: 40px;font-size:17px">客户端软件安全内控管理制度</legend>
            <el-row :gutter="20">
              <el-col :span="8" class="wjStyle">
                <el-form-item label="开发规范" prop="fileName4" class="radio_enter">
                  <el-table :data="fileList4" :show-header="false" style="width: 100%;" empty-text="暂无文件">
                    <el-table-column prop="originalName" label="名称" show-overflow-tooltip />
                    <el-table-column label="操作" width="50">
                      <template slot-scope="scope">
                        <span style="color:#409EFF;cursor:pointer" @click="fileDownload4(scope.row.fileID)">下载</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="wjStyle">
                <el-form-item label="运维管理文档" prop="fileName5" class="radio_enter">
                  <el-table :data="fileList5" :show-header="false" style="width: 100%" empty-text="暂无文件">
                    <el-table-column prop="originalName" label="名称" show-overflow-tooltip />
                    <el-table-column label="操作" width="50">
                      <template slot-scope="scope">
                        <span style="color:#409EFF;cursor:pointer" @click="fileDownload5(scope.row.fileID)">下载</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="wjStyle">
                <el-form-item label="安全管理文档" prop="fileName6" class="radio_enter">
                  <el-table :data="fileList6" :show-header="false" style="width: 100%" empty-text="暂无文件">
                    <el-table-column prop="originalName" label="名称" show-overflow-tooltip />
                    <el-table-column label="操作" width="50">
                      <template slot-scope="scope">
                        <span style="color:#409EFF;cursor:pointer" @click="fileDownload6(scope.row.fileID)">下载</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </div>
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">其他文件</legend>
          <el-row>
            <el-col :span="8" class="wjStyle">
              <el-form-item label="其他文件" prop="fileName7" class="radio_enter">
                <el-table :data="fileList7" :show-header="false" style="width: 100%;" empty-text="暂无文件">
                  <el-table-column prop="originalName" label="名称" show-overflow-tooltip />
                  <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                      <span style="color:#409EFF;cursor:pointer" @click="fileDownload7(scope.row.fileID)">下载</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="statusMess.length>0" class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">审核记录</legend>
          <el-table :data="statusMess" tooltip-effect="dark" style="width:100%">
            <el-table-column label="审核机构" prop="auditUser" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核人" prop="auditUserName" min-width="100" show-overflow-tooltip />
            <el-table-column label="审核阶段" prop="currentState" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核意见" prop="remark" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.remark?scope.row.remark:'--' }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="审核备注" prop="userName5" min-width="120" show-overflow-tooltip /> -->
            <el-table-column label="审核时间" prop="auditTime" min-width="120" show-overflow-tooltip />
          </el-table>
        </fieldset>
      </el-form>
      <div>
        <el-row style="text-align:center;padding-bottom:20px">
          <el-col :span="24">
            <el-button v-for="(item,index) in ButtonArr" :key="index" type="primary" @click="changeButton(item.buttonId)">{{ item.buttonName }}</el-button>
            <el-button type="primary" @click="goBack">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" title="审核意见" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportForm" :model="reportForm" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="意见" prop="comment">
                <el-input v-model="reportForm.comment" :rows="5" type="textarea" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isReasonable('reportForm')">提 交</el-button>
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!--变更详情弹窗-->
    <el-dialog :visible.sync="dialogTableVisibleBack" width="1200px">
      <div v-show="gridBackData.length>0" id="table-width" style="padding:20px;width:100%">
        <fieldset v-for="(item,index) in gridBackData" :key="index" class="fieldsetStyle" style="padding:20px;">
          <legend style="margin-left: 40px;">变更记录</legend>
          <div>
            <el-row>
              <el-col :span="6" style="text-align:left">
                <span>变更人：{{ item.name }}</span>
              </el-col>
              <el-col :span="8" style="text-align:left">
                <span>机构名称：{{ item.orgName }}</span>
              </el-col>
              <el-col :span="8" style="text-align:left">
                <span>变更时间：{{ item.changeTime }}</span>
              </el-col>
            </el-row>
            <br>
            <el-table :data="item.detailList" border>
              <el-table-column property="changeItem" label="变更项目" />
              <el-table-column property="beforeValue" label="变更前" />
              <el-table-column property="afterValue" label="变更后" />
            </el-table>
          </div>
        </fieldset>
      </div>
      <div v-show="gridBackData.length===0" style="text-align:center;padding:20px">
        <p>暂无记录</p>
      </div>
    </el-dialog>
    <workflow ref="referencePdf" />
  </el-card>
</template>

<script>
// 接口方法
import {
  HXSearchFil,
  WorkFlow,
  registRiid,
  getBAnben,
  getBAnbenXQ,
  registVivw,
  getChangeDetails,
  reviewAudit
} from '@/api/register/register.js'
import { statusComplate } from '@/api/appbeian/register.js'// saveGuanlian
import { mapGetters } from 'vuex'
import { getNext, getUsers } from '@/api/workflow/index.js'
import { getButton, claim, flowNotPass, flowTodo } from '@/api/workflow/index.js'
import { getAdrr, getClock } from '@/api/general.js'
import bgMonitor from '@/assets/login/logow.png'
import pdf from 'vue-pdf'
export default {
  components: { pdf },
  data() {
    return {
      reportForm: {
        comment: ''
      },
      ButtonArr: [],
      options: [],
      jcList: [],
      jgZt: [],
      WorkFlowObj: {},
      paramsData: {},
      workObj: {},
      paramsWorkButton: {},
      registerAddrArr: [],
      gridBackData: [],
      bgMonitorImg: bgMonitor,
      Buttonstatus: '',
      isShow: true,
      isShowgs: true,
      centerDialogVisible: false,
      dialogTableVisibleBack: false,
      statusMess: [],
      banbenList: [],
      productType: '',
      fileID: '',
      fileList2: [],
      fileID3: '',
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: [],
      testmsgY: '',
      testmsgS: '',
      urlY: '',
      srcListY: [],
      urlG: '',
      srcListG: [],
      urlS: '',
      srcListS: [],
      form: {
        srnm: '', // 机构类型
        // osnm: '',
        // 文件
        fileName: '',
        fileName2: '',
        fileName14: '',
        fileName3: '',
        fileName4: '',
        fileName5: '',
        fileName6: '',
        fileName7: '',
        // 表单数据
        ficp: '', // 机构类别
        verCode: '', // 验证码
        password: '', // 确认登录密码
        succ: '', // 统一社会信用代码
        ficd: '', // 金融机构编码（如有）
        ozcd: '', // 组织机构代码（如有）
        fbln: '', // 持有金融业务许可证的子公司数量
        fblc: '', // 总部发布App总数
        fblia: '', // 分公司发布App总数
        lei: '', // LEI码（如有）
        opnm: '', // 持有金融业务许可证的子公司发布App总数
        registerAddr: [], // 法人机构注册地区
        registerProvince: null,
        registerCity: null,
        registerArea: null,
        officeAddr: '', // 详细地址
        monitorName: '', // 联系人
        email: '',
        managerTel: '', // 联系方式
        quartersName: '', // 子公司数量
        departName: '', // 分公司数量
        setPassword: '', // 设置登录密码
        rinm: '', // 机构名称
        riam: '', // 机构简称
        riid: '',
        websit: '', // 网址
        crTime: '', // 成立时间
        bussScope: '', // 简介
        isMemberCifa: '', // 是否会员
        mainNetBuss: '', // 资质
        buildTime: '2019-11-18'
      },
      huiyuanArr: [
        {
          codeKey: '0',
          codeValue: '是'
        },
        {
          codeKey: '1',
          codeValue: '否'
        }
      ],
      rules: {
        crTime: [{ required: true, message: '请选择', trigger: 'change' }],
        comment: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        fileName: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName14: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName3: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName4: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName5: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName6: [{ required: true, message: '请上传文件', trigger: 'change' }],
        ozcd: [
          { required: false, message: '请按正确格式填写组织机构代码', trigger: 'blur', max: 14 },
          { pattern: /^[0-9A-Za-z]{8}-[A-Za-z0-9]{1}$/, message: '请按正确格式填写组织机构代码', trigger: 'blur' }
        ],
        fblia: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        fblc: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        opnm: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        departName: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        quartersName: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        fbln: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        lei: [
          { required: false, message: 'LEI最多30位', trigger: 'blur', max: 30 },
          { pattern: /^[0-9a-zA-Z]+$/, message: '只能输入数字或者字母', trigger: 'blur' }
        ],
        ficd: [{ required: false, pattern: /^[A-Z]{1}[0-9]{13}$/, message: '请输入正确的金融机构编码', trigger: 'blur' }],
        ficp: [{ required: true, message: '请选择机构类别', trigger: 'change' }],
        rinm: [
          { required: true, message: '请输入机构名称最多50个字符', trigger: 'blur', max: 50 }
        ],
        riam: [
          { required: false, message: '请输入机构简称最多30个字符', trigger: 'blur', max: 30 }
        ],
        succ: [
          {
            required: true,
            message: '请正确填写18位统一社会信用代码',
            trigger: 'blur',
            min: 18,
            max: 18
          },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }
        ],
        registerAddr: [{ required: true, message: '请选择', trigger: 'change' }],
        officeAddr: [{ required: true, message: '内容不能为空且最多50位', trigger: 'blur', max: 50 }],
        monitorName: [
          { required: true, message: '请输入联系人最多30个字符', trigger: 'blur', max: 30 }
        ],
        email: [
          { required: true, message: '内容不能为空最多输入50位', trigger: 'blur', max: 50 },
          { pattern: /^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        managerTel: [
          { required: true, message: '请填写正确的联系方式', trigger: 'blur', max: 20 },
          { pattern: /^1\d{10}$/, message: '请填写正确的联系方式', trigger: 'blur' }
        ]
      },
      workFlowParams: {},
      nodeMatching: '',
      nextNodeAll: {},
      nextUserAll: {},
      message: '工作流组件',
      jigou: [],
      nextNodeData: [],
      nextNode: '',
      // 机构类型
      historyList: [
        {
          name: '2019-12-01 08:23:45',
          code: '2014-12-07'
        }
      ],
      loading: null
    }
  },
  computed: {
    ...mapGetters(['riid', 'businessFlag', 'workFlow2business']),
    paramsObj() {
      const obj = Object.assign({}, this.paramsData)
      delete obj.registerAddr
      obj.workflow = this.workFlowParams
      return obj
    }
  },
  mounted() {
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
    this.vivw()
    getClock('C1000008').then(res => {
      this.jgZt = res
    })
    getClock('C5000000').then(res => {
      this.jigou = res
    })
    // 获取版本信息
    if (this.$route.query.riid) {
      this.getData(this.$route.query.riid)
    }
  },
  methods: {
    getStatus() {
      statusComplate(this.form.riid).then(res => {
        console.log(res)
        if (res === '初审待审核' || res === '已认证待初审') {
          this.loading.close()
          this.$message({
            message: '提交成功',
            type: 'success' })
        } else {
          this.getStatus()
        }
      })
    },
    isRequired(val) {
      if (val === '保险集团（控股）公司' || val === '其他') {
        this.rules.ficd[0].required = false
        this.$refs['form'].clearValidate('ficd')
      } else {
        this.rules.ficd[0].required = true
      }
    },
    loctionClick() {
      HXSearchFil(this.form.riid).then(res => {
        this.srcListY = []
        this.srcListG = []
        this.srcListS = []
        this.fileList7 = []
        this.fileList2 = []
        this.fileList4 = []
        this.fileList5 = []
        this.fileList6 = []
        res.forEach(element => {
          if (element.ownSystem === '1') {
            this.form.fileName = element.originalName
            this.fileID = element.attachId
            this.urlY = element.preview
            this.testmsgY = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
            this.srcListY.push(element.preview)
          } else if (element.ownSystem === '14') {
            this.form.fileName14 = element.originalName

            this.urlG = element.preview
            this.srcListG.push(element.preview)
          } else if (element.ownSystem === '2') {
            this.fileList2.push(
              {
                name: element.originalName,
                testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                url: element.preview,
                fileID: element.attachId,
                srcList: [element.preview]
              }
            )
          } else if (element.ownSystem === '3') {
            this.form.fileName3 = element.originalName
            this.fileID3 = element.attachId
            this.urlS = element.preview
            this.testmsgS = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
            this.srcListS.push(element.preview)
          } else if (element.ownSystem === '4') {
            this.fileList4.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          } else if (element.ownSystem === '5') {
            this.fileList5.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          } else if (element.ownSystem === '6') {
            this.fileList6.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          } else if (element.ownSystem === '12') {
            this.fileList7.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          }
        })
      })
    },
    // 查询版本
    getData(riid) {
      getBAnben({ riid: riid }).then(res => {
        this.banbenList = res
        if (res.length > 0) {
          this.productType = this.banbenList[0].id
        }
      })
    },
    goNew() {
      this.vivw('0')
      this.productType = this.banbenList[0].id
    },
    // 变更详情
    getBackById() {
      this.dialogTableVisibleBack = true
      getChangeDetails(this.$route.query.riid, this.productType).then(res => {
        this.gridBackData = res
      })
    },
    search(val) {
      getBAnbenXQ({ id: val }).then(res => {
        for (var key in this.form) {
          this.form[key] = res[0][key]
        }
        registRiid(val).then(res => {
          this.statusMess = res
        })
        this.isRequired(this.form.ficp)
        this.form.registerAddr = []
        this.form.registerAddr[0] = Number(this.form.registerProvince)
        this.form.registerAddr[1] = Number(this.form.registerCity)
        this.form.registerAddr[2] = Number(this.form.registerArea)
        if (res[0].commAttachInfo.length > 0) {
          this.srcListY = []
          this.srcListG = []
          this.srcListS = []
          this.fileList7 = []
          this.fileList2 = []
          this.fileList4 = []
          this.fileList5 = []
          this.fileList6 = []
          res[0].commAttachInfo.forEach(element => {
            if (element.ownSystem === '1') {
              this.form.fileName = element.originalName
              this.fileID = element.attachId
              this.urlY = element.preview
              this.testmsgY = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
              this.srcListY.push(element.preview)
            } else if (element.ownSystem === '14') {
              this.form.fileName14 = element.originalName

              this.urlG = element.preview
              this.srcListG.push(element.preview)
            } else if (element.ownSystem === '2') {
              this.fileList2.push(
                {
                  name: element.originalName,
                  testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                  url: element.preview,
                  fileID: element.attachId,
                  srcList: [element.preview]
                }
              )
            } else if (element.ownSystem === '3') {
              this.form.fileName3 = element.originalName
              this.fileID3 = element.attachId
              this.urlS = element.preview
              this.testmsgS = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
              this.srcListS.push(element.preview)
            } else if (element.ownSystem === '4') {
              this.fileList4.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            } else if (element.ownSystem === '5') {
              this.fileList5.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            } else if (element.ownSystem === '6') {
              this.fileList6.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            } else if (element.ownSystem === '12') {
              this.fileList7.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            }
          })
        } else {
          this.urlY = ''
          this.srcListY = []
          this.urlG = ''
          this.srcListG = []
          this.urlS = ''
          this.srcListS = []
          this.fileID = ''
          this.fileID3 = ''
          this.fileList7 = []
          this.fileList2 = []
          this.fileList4 = []
          this.fileList5 = []
          this.fileList6 = []
        }
        this.$nextTick(function() {
          this.$refs['form'].clearValidate()
          this.$message({
            message: '已切换到当前版本',
            type: 'success'
          })
        })
      })
    },
    changeButton(val) {
      this.Buttonstatus = val
      if (val === 'claim') { // 认领
        claim(this.paramsWorkButton).then(res => {
          this.$router.go(0)
        })
      } else if (val === 'submit') {
        this.reportForm.comment = '同意'
        this.centerDialogVisible = true
        this.$nextTick(function() {
          this.$refs['reportForm'].clearValidate()
        })
      } else {
        this.reportForm.comment = ''
        this.centerDialogVisible = true
      }
    },
    isReasonable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true
          })
          if (this.Buttonstatus === 'submit') {
            getNext(this.paramsWorkButton).then(res => {
              this.nextNodeAll = res
              this.nextNodeData = res.flowNextNode.nextNodes
              if (this.nextNodeData[0].nodeId.indexOf('End') !== -1) {
                this.workFlowParams = this.nextNodeAll
                this.nextStep()
              } else {
                getUsers(this.nextNodeAll).then(res => {
                  this.nextUserAll = res
                  this.workFlowParams = Object.assign({}, this.nextUserAll)
                  this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
                  this.nextStep()
                }).catch(() => {
                  this.loading.close()
                  this.$message({
                    message: '获取审核人员失败',
                    type: 'error' })
                })
              }
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '获取审核节点失败',
                type: 'error' })
            })
          } else {
            this.paramsWorkButton.comment = this.reportForm.comment
            flowNotPass(this.paramsWorkButton).then(res => {
              this.loading.close()
              this.goBack()
            }).catch(() => {
              this.loading.close()
            })
          }
        } else {
          return false
        }
      })
    },
    nextStep() {
      this.paramsObj.workflow.comment = this.reportForm.comment
      reviewAudit(this.paramsObj).then(res => {
        this.loading.close()
        this.$message({
          message: '审核成功',
          type: 'success' })
        this.goBack()
      }).catch(() => {
        this.loading.close()
      })
    },
    vivw(type) {
      if (this.$route.query.type === '0') {
        registVivw(this.$route.query.riid).then(res => {
          for (var key in this.form) {
            this.form[key] = res[key]
          }
          this.isRequired(this.form.ficp)
          this.form.registerAddr = []
          this.form.registerAddr[0] = Number(this.form.registerProvince)
          this.form.registerAddr[1] = Number(this.form.registerCity)
          this.form.registerAddr[2] = Number(this.form.registerArea)
          this.$nextTick(function() {
            if (this.form.srnm === '0') {
              this.isShowgs = false
            } else if (this.form.srnm === '3') {
              this.isShowgs = true
            } else {
              this.isShowgs = false
              this.isShow = false
            }
            if (type === '0') {
              this.$message({
                message: '已切换到最新版本',
                type: 'success'
              })
            }
            registRiid(res.riid).then(res => {
              this.statusMess = res
            })
            HXSearchFil(this.form.riid).then(res => {
              this.srcListY = []
              this.srcListG = []
              this.srcListS = []
              this.fileList7 = []
              this.fileList2 = []
              this.fileList4 = []
              this.fileList5 = []
              this.fileList6 = []
              res.forEach(element => {
                if (element.ownSystem === '1') {
                  this.form.fileName = element.originalName
                  this.fileID = element.attachId
                  this.urlY = element.preview
                  this.testmsgY = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
                  this.srcListY.push(element.preview)
                } else if (element.ownSystem === '14') {
                  this.form.fileName14 = element.originalName

                  this.urlG = element.preview
                  this.srcListG.push(element.preview)
                } else if (element.ownSystem === '2') {
                  this.fileList2.push(
                    {
                      name: element.originalName,
                      testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                      url: element.preview,
                      fileID: element.attachId,
                      srcList: [element.preview]
                    }
                  )
                } else if (element.ownSystem === '3') {
                  this.form.fileName3 = element.originalName
                  this.fileID3 = element.attachId
                  this.urlS = element.preview
                  this.testmsgS = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
                  this.srcListS.push(element.preview)
                } else if (element.ownSystem === '4') {
                  this.fileList4.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                } else if (element.ownSystem === '5') {
                  this.fileList5.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                } else if (element.ownSystem === '6') {
                  this.fileList6.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                } else if (element.ownSystem === '12') {
                  this.fileList7.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                }
              })
            })
            this.$refs['form'].clearValidate()
          })
        })
      } else if (this.$route.query.type === '1') {
        flowTodo(this.$route.query.riid).then(res => {
          this.workObj = {
            name: res.name,
            sendSubjectionName: res.sendSubjectionName,
            subjectionId: res.subjectionId,
            trackId: res.trackId,
            workId: res.workId
          }
          WorkFlow(this.workObj).then(res => {
            for (var key in this.form) {
              this.form[key] = res.formData.data[key]
            }
            this.WorkFlowObj = res
            this.isRequired(this.form.ficp)
            this.form.registerAddr = []
            this.form.registerAddr[0] = Number(this.form.registerProvince)
            this.form.registerAddr[1] = Number(this.form.registerCity)
            this.form.registerAddr[2] = Number(this.form.registerArea)
            this.$nextTick(function() {
              if (this.form.srnm === '0') {
                this.isShowgs = false
              } else if (this.form.srnm === '3') {
                this.isShowgs = true
              } else {
                this.isShowgs = false
                this.isShow = false
              }
              registRiid(this.form.riid).then(res => {
                this.statusMess = res
              })
              this.paramsData = this.form
              HXSearchFil(this.form.riid).then(res => {
                this.srcListY = []
                this.srcListG = []
                this.srcListS = []
                this.fileList7 = []
                this.fileList2 = []
                this.fileList4 = []
                this.fileList5 = []
                this.fileList6 = []
                res.forEach(element => {
                  if (element.ownSystem === '1') {
                    this.form.fileName = element.originalName
                    this.fileID = element.attachId
                    this.urlY = element.preview
                    this.testmsgY = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
                    this.srcListY.push(element.preview)
                  } else if (element.ownSystem === '14') {
                    this.form.fileName14 = element.originalName

                    this.urlG = element.preview
                    this.srcListG.push(element.preview)
                  } else if (element.ownSystem === '2') {
                    this.fileList2.push(
                      {
                        name: element.originalName,
                        testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                        url: element.preview,
                        fileID: element.attachId,
                        srcList: [element.preview]
                      }
                    )
                  } else if (element.ownSystem === '3') {
                    this.form.fileName3 = element.originalName
                    this.fileID3 = element.attachId
                    this.urlS = element.preview
                    this.testmsgS = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
                    this.srcListS.push(element.preview)
                  } else if (element.ownSystem === '4') {
                    this.fileList4.push(
                      {
                        originalName: element.originalName,
                        fileID: element.attachId
                      }
                    )
                  } else if (element.ownSystem === '5') {
                    this.fileList5.push(
                      {
                        originalName: element.originalName,
                        fileID: element.attachId
                      }
                    )
                  } else if (element.ownSystem === '6') {
                    this.fileList6.push(
                      {
                        originalName: element.originalName,
                        fileID: element.attachId
                      }
                    )
                  } else if (element.ownSystem === '12') {
                    this.fileList7.push(
                      {
                        originalName: element.originalName,
                        fileID: element.attachId
                      }
                    )
                  }
                })
              })
              this.$refs['form'].clearValidate()
            })
          })
          getButton(this.workObj).then(res => {
            this.ButtonArr = res.flowResult.flowButtons
            this.paramsWorkButton = res
          })
        })
      } else {
        this.workObj = {
          name: this.$route.query.name,
          sendSubjectionName: this.$route.query.sendSubjectionName,
          subjectionId: this.$route.query.subjectionId,
          trackId: this.$route.query.trackId,
          workId: this.$route.query.workId
        }
        WorkFlow(this.workObj).then(res => {
          for (var key in this.form) {
            this.form[key] = res.formData.data[key]
          }
          this.WorkFlowObj = res
          this.isRequired(this.form.ficp)
          this.form.registerAddr = []
          this.form.registerAddr[0] = Number(this.form.registerProvince)
          this.form.registerAddr[1] = Number(this.form.registerCity)
          this.form.registerAddr[2] = Number(this.form.registerArea)
          this.$nextTick(function() {
            if (this.form.srnm === '0') {
              this.isShowgs = false
            } else if (this.form.srnm === '3') {
              this.isShowgs = true
            } else {
              this.isShowgs = false
              this.isShow = false
            }
            this.getData(this.form.riid)
            registRiid(this.form.riid).then(res => {
              this.statusMess = res
            })
            this.paramsData = this.form
            HXSearchFil(this.form.riid).then(res => {
              this.srcListY = []
              this.srcListG = []
              this.srcListS = []
              this.fileList7 = []
              this.fileList2 = []
              this.fileList4 = []
              this.fileList5 = []
              this.fileList6 = []
              res.forEach(element => {
                if (element.ownSystem === '1') {
                  this.form.fileName = element.originalName
                  this.fileID = element.attachId
                  this.urlY = element.preview
                  this.testmsgY = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
                  this.srcListY.push(element.preview)
                } else if (element.ownSystem === '14') {
                  this.form.fileName14 = element.originalName

                  this.urlG = element.preview
                  this.srcListG.push(element.preview)
                } else if (element.ownSystem === '2') {
                  this.fileList2.push(
                    {
                      name: element.originalName,
                      testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                      url: element.preview,
                      fileID: element.attachId,
                      srcList: [element.preview]
                    }
                  )
                } else if (element.ownSystem === '3') {
                  this.form.fileName3 = element.originalName
                  this.fileID3 = element.attachId
                  this.urlS = element.preview
                  this.testmsgS = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
                  this.srcListS.push(element.preview)
                } else if (element.ownSystem === '4') {
                  this.fileList4.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                } else if (element.ownSystem === '5') {
                  this.fileList5.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                } else if (element.ownSystem === '6') {
                  this.fileList6.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                } else if (element.ownSystem === '12') {
                  this.fileList7.push(
                    {
                      originalName: element.originalName,
                      fileID: element.attachId
                    }
                  )
                }
              })
            })
            this.$refs['form'].clearValidate()
          })
        })
        getButton(this.workObj).then(res => {
          this.ButtonArr = res.flowResult.flowButtons
          this.paramsWorkButton = res
        })
      }
    },
    fileDownload() {
      if (this.testmsgY === 'pdf') {
        this.$refs.referencePdf.open(this.urlY, this.fileID)
      } else {
        location.href = `nifa-autonomy-file/upload/download/${this.fileID}`
      }
    },
    fileDownload2(testmsg, url, fileID) {
      if (testmsg === 'pdf') {
        this.$refs.referencePdf.open(url, fileID)
      } else {
        location.href = `nifa-autonomy-file/upload/download/${fileID}`
      }
    },
    fileDownload3() {
      if (this.testmsgS === 'pdf') {
        this.$refs.referencePdf.open(this.urlS, this.fileID3)
      } else {
        location.href = `nifa-autonomy-file/upload/download/${this.fileID3}`
      }
    },
    fileDownload4(fileID) {
      location.href = `nifa-autonomy-file/upload/download/${fileID}`
    },
    fileDownload5(fileID) {
      location.href = `nifa-autonomy-file/upload/download/${fileID}`
    },
    fileDownload6(fileID) {
      location.href = `nifa-autonomy-file/upload/download/${fileID}`
    },
    fileDownload7(fileID) {
      location.href = `nifa-autonomy-file/upload/download/${fileID}`
    },
    submit(formName) {
      this.$store.dispatch('workFlow', { flowID: 'organRegister' })
      this.$store.dispatch('openWorkFlow', true)
    },
    // 返回上一页
    goBack() {
      if (sessionStorage.getItem('routerName') === 'home-index') {
        this.$router.go(-1)
      } else {
        const obj = JSON.parse(this.$route.query.searchData)
        obj.ifReview = true
        this.$router.push({
          name: sessionStorage.getItem('routerName'),
          params: {
            searchData: obj
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
#table-width{
    .el-table__header{
    width: 100% !important;
    }
    .el-table__body{
    width: 100% !important;
    }
  }
.registerStyle{
  .el-dialog--center .el-dialog__body{
    padding: 0;
  }
  .radio_enter {
      > label {
        width: 100%;
        text-align: left;
      }
    }
    .fontStyle{
      width:100%;
      text-align:left;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }
   .wjStyle{
     .el-table .cell {
    text-align: left;
    color: #333;
    }
   }
    .styleone{
      color: red;
      position: absolute;
      top: 10px;
      right: 485px;
    }
    .anniu {
      width: 25%;
      margin: -20px auto 20px auto;
      display: flex;
    }
    .lei {
      position: relative;
      top: 36px;
      left: -20px;
    }
    .el-card__body {
      padding: 0;
    }
    .el-upload--picture-card{
    display: none
   }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width:120px;
    height:120px
  }
    .baseBox {
      .basic-form {
        padding: 5px;
      }
      .el-input--medium {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
      .el-cascader {
        width: 100%;
      }
    }
}
</style>
