<template>
  <el-card class="detailStylelist" shadow="never">
    <div slot="header" class="header">
      <div v-if="isPc">
        <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      </div>
      <!-- <div v-else>
        <h2 style="text-align:center">备案名单</h2>
      </div> -->
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="2">
        <span slot="label"><svg-icon slot="prefix" icon-class="reigist" style="margin-left: 6px;" /> 机构信息</span>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20" :xs="24">
            <fieldset class="fieldsetStylepc">
              <legend style="margin-left: 40px;font-size:20px">机构信息</legend>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>机构名称：{{ rinmForm.rinm }}</p>
                </el-col>
                <el-col :span="24">
                  <p>机构类别：{{ rinmForm.ficp }}</p>
                </el-col>
                <el-col :span="24">
                  <p>机构地址：{{ rinmForm.registerAddr }}</p>
                </el-col>
              </el-row>
            </fieldset>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane v-if="this.$route.query.iosId" name="0">
        <span slot="label"><svg-icon slot="prefix" icon-class="IOS" style="margin-left: 6px;" /> iOS</span>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20" :xs="24">
            <fieldset class="fieldsetStylepc">
              <legend style="margin-left: 40px;font-size:20px">iOS备案详情</legend>
              <el-row :gutter="20">
                <el-col :span="3" :xs="10">
                  <el-image
                    style="width:100px; height: 100px;border-radius: 6px 6px;"
                    :src="iosform.appIconPath"
                    fit="cover"
                    @click="imgClick"
                  >
                    <div slot="error" class="el-image__error">
                      暂无图片
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="8" :xs="14" style="text-align:left">
                  <p style="font-size:20px;font-weight:bold">{{ iosform.otherAppName }}</p>
                  <p>备案版本：{{ iosform.appVersion }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案编号：{{ iosform.recordNumber?iosform.recordNumber:"--" }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案日期：{{ iosform.recordNumberTime?iosform.recordNumberTime.split(" ")[0]:"--" }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>应用权限：<el-tag v-for="(item,index) in iosform.appPermissions" :key="index" style="margin-left:10px;margin-bottom:5px">{{ item }}</el-tag></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>检测机构：{{ iosform.detectionOrg?iosform.detectionOrg:'--' }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>认证机构：{{ iosform.approveOrg?iosform.approveOrg:'--' }}</p>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="20">
                <el-col :span="8" :xs="24">
                  <p>审核状态：{{ iosform.auditStatus }}</p>
                </el-col>
                <el-col :span="8" :xs="24">
                  <p>备案编号：{{ iosform.recordNumber?iosform.recordNumber:"--" }}</p>
                  @click="imgVivw()"
                </el-col>
              </el-row> -->
              <el-row :gutter="20">
                <el-col v-for="(item,index) in iosfileArr" :key="index" :span="4" :xs="12" style="margin-bottom:1px">
                  <el-image
                    style="width:100%;height:350px;border-radius: 6px 6px;"
                    :src="item"
                    fit="cover"
                    :preview-src-list="iosfileArr"
                  >
                    <div slot="placeholder" style="line-height:300px;" class="image-slot">
                      <img style="height:100px;" :src="require('@/assets/loading.gif')">
                    </div>
                  </el-image>
                </el-col>
              </el-row>
            </fieldset>
            <fieldset class="fieldsetStylepc">
              <legend style="margin-left: 40px;font-size:20px">版本记录</legend>
              <el-table :data="iosform.appRecordInfoHistories" tooltip-effect="dark" style="width:95%;margin:auto">
                <el-table-column label="序号" type="index" />
                <el-table-column label="版本号" prop="appVersion" show-overflow-tooltip />
                <el-table-column label="更新时间" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{ scope.row.updateTime?scope.row.updateTime:'--' }}
                  </template>
                </el-table-column>
                <!-- <el-table-column label="安装包">
                  <template slot-scope="scope">
                    <span style="color:#409EFF;cursor:pointer" @click="fileDownload(scope.row.appFilePath)">下载</span>
                  </template>
                </el-table-column> -->
              </el-table>
            </fieldset>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane v-if="this.$route.query.andid" name="1">
        <span slot="label"><svg-icon slot="prefix" icon-class="Android" style="margin-left: 6px;" /> Android</span>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20" :xs="24">
            <fieldset class="fieldsetStylepc">
              <legend style="margin-left: 40px;font-size:20px">Android备案详情</legend>
              <el-row :gutter="20">
                <el-col :span="3" :xs="10">
                  <el-image
                    style="width:100px; height: 100px;border-radius: 6px 6px;"
                    :src="form.appIconPath"
                    fit="cover"
                    @click="imgClick"
                  >
                    <div slot="error" class="el-image__error">
                      暂无图片
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="8" :xs="14" style="text-align:left">
                  <p style="font-size:20px;font-weight:bold">{{ form.otherAppName }}</p>
                  <p>备案版本：{{ form.appVersion }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案编号：{{ form.recordNumber?form.recordNumber:"--" }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案日期：{{ form.recordNumberTime?form.recordNumberTime.split(" ")[0]:"--" }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>应用权限：<el-tag v-for="(item,index) in form.appPermissions" :key="index" style="margin-left:10px;margin-bottom:5px">{{ item }}</el-tag></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>检测机构：{{ form.detectionOrg?form.detectionOrg:'--' }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>认证机构：{{ form.approveOrg?form.approveOrg:'--' }}</p>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="20">
                <el-col :span="8" :xs="24">
                  <p>审核状态：{{ form.auditStatus }}</p>
                </el-col>
                <el-col :span="8" :xs="24">
                  <p>备案编号：{{ form.recordNumber?form.recordNumber:"--" }}</p>
                  @click="imgVivw()"
                </el-col>
              </el-row> -->
              <el-row :gutter="20">
                <el-col v-for="(item,index) in fileArr" :key="index" :span="4" :xs="12" style="margin-bottom:1px">
                  <el-image
                    style="width:100%;height:350px;border-radius: 6px 6px;"
                    :src="item"
                    fit="cover"
                    :preview-src-list="fileArr"
                  >
                    <div slot="placeholder" style="line-height:300px;" class="image-slot">
                      <img style="height:100px;" :src="require('@/assets/loading.gif')">
                    </div>
                  </el-image>
                </el-col>
              </el-row>
            </fieldset>
            <fieldset class="fieldsetStylepc">
              <legend style="margin-left: 40px;font-size:20px">版本记录</legend>
              <el-table :data="form.appRecordInfoHistories" tooltip-effect="dark" style="width:95%;margin:auto;">
                <el-table-column label="序号" type="index" />
                <el-table-column label="版本号" prop="appVersion" show-overflow-tooltip />
                <el-table-column label="更新时间" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{ scope.row.updateTime?scope.row.updateTime:'--' }}
                  </template>
                </el-table-column>
                <el-table-column label="安装包">
                  <template slot-scope="scope">
                    <span style="color:#409EFF;cursor:pointer" @click="fileDownload(scope.row.appFilePath)">下载</span>
                  </template>
                </el-table-column>
              </el-table>
            </fieldset>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <br>
    <el-row style="text-align:center;">
      <el-col :span="24">
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
    >

      <div style="width:100%;margin-top:50px;text-align:center">
        <h2>备案证书</h2>
      </div>
      <div class="juzhongStyle">
        <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" style="width: 400px; height: 600px;border-radius: 6px 6px;margin-top:10px" alt="图片为空">
      </div>
    </el-drawer>
  </el-card>
</template>
<script>
import { queryOne, searchOrgonfo } from '@/api/appbeian'
export default {
  data() {
    return {
      fileArr: [],
      iosfileArr: [],
      activeName: '2',
      drawer: false,
      isPc: true,
      rinmForm: {
        rinm: '',
        ficp: '',
        // monitorName: '',
        // managerTel: '',
        registerAddr: ''
      },
      iosform: {
        appIconPath: '',
        otherAppName: '',
        stampPath: '',
        auditStatus: '',
        appVersion: '',
        approveOrg: '',
        detectionOrg: '',
        recordNumberTime: '',
        recordNumber: '',
        appPermissions: [],
        appRecordInfoHistories: []
      },
      form: {
        appIconPath: '',
        otherAppName: '',
        stampPath: '',
        auditStatus: '',
        appVersion: '',
        approveOrg: '',
        detectionOrg: '',
        recordNumberTime: '',
        recordNumber: '',
        appPermissions: [],
        appRecordInfoHistories: []
      }
    }
  },
  created() {
    if (this.$route.query.iosId) {
      this.getIOSForm()
    }
    if (this.$route.query.andid) {
      this.getAndroidFormb()
    }
    this.IsPC()
  },
  mounted() {
    this.getRinm()
  },
  methods: {
    IsPC() {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
          this.isPc = false
          break
        }
      }
    },
    imgClick() {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
    },
    getRinm() {
      searchOrgonfo({ riid: this.$route.query.riid }).then(res => {
        for (var key in this.rinmForm) {
          this.rinmForm[key] = res[key]
        }
      }).catch(() => {

      })
    },
    getIOSForm() {
      if (this.$route.query.iosId) {
        queryOne({ id: this.$route.query.iosId }).then(res => {
          if (res.appPermissions) {
            res.appPermissions = res.appPermissions.split(',')
          }
          for (var key in this.iosform) {
            this.iosform[key] = res[key]
          }
          if (res.stampPath !== null) {
            this.iosfileArr = res.stampPath.split(',')
          }
        }).catch(() => {

        })
      }
    },
    getAndroidFormb() {
      if (this.$route.query.andid) {
        queryOne({ id: this.$route.query.andid }).then(res => {
          if (res.appPermissions) {
            res.appPermissions = res.appPermissions.split(',')
          }
          for (var key in this.form) {
            this.form[key] = res[key]
          }
          if (res.stampPath !== null) {
            this.fileArr = res.stampPath.split(',')
          }
        }).catch(() => {

        })
      }
    },
    imgVivw() {
      this.drawer = true
    },
    fileDownload(fileID) {
      location.href = `nifa-autonomy-file/upload/download/${fileID}`
    },
    goBack() {
      const obj = JSON.parse(this.$route.query.searchData)
      obj.ifReview = true
      this.$router.push({
        name: sessionStorage.getItem('routerName'),
        params: {
          searchData: obj
        },
        query: {
          type: this.$route.query.type
        }
      })
    }
  }
}
</script>
<style lang="scss">
.detailStylelist{
  width: 100%;
  border:none;
  .el-card__header{
    height: 100px;
    padding: 0;
    background: url('~@/assets/login/logow4.png') no-repeat;
    background-size: 100% 100px;
  }
    .el-image{
    position: static;
  }
    .fontStyle{
      width:100%;
      text-align:left;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }
  .juzhongStyle{
       width:800px;
     display: flex;
     justify-content: center;
     align-items: center;
     position: absolute;
    top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
}
@media screen and (max-width: 960px){
.detailStylelist{
  .fieldsetStylepc{
  width: 100%;
  margin: 12px auto;
  border-color: #a2b9f0;
  border-radius: 6px 6px;
  padding: 5px 10px;
  }
}

}
@media screen and (min-width: 960px){
.detailStylelist{
  .fieldsetStylepc{
  width: 100%;
  margin: 12px auto;
  border-color: #a2b9f0;
  border-radius: 6px 6px;
  padding: 30px 50px;
  }
}
}
</style>
