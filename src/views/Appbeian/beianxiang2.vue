<template>
  <el-card class="detailStyle">
    <div slot="header" class="header">
      <div v-if="isPc" style="margin-left:3%;">
        <img :src="bgMonitorImg" alt="">
        <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      </div>
      <div v-else>
        <h2 style="text-align:center">备案名单</h2>
      </div>
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
                  <p>机构名称：{{ form.rinm }}</p>
                </el-col>
                <el-col :span="24">
                  <p>机构类别：{{ form.ficp }}</p>
                </el-col>
                <el-col :span="24">
                  <p>机构地址：{{ form.registerAddr }}</p>
                </el-col>
              </el-row>
            </fieldset></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="0">
        <span slot="label"><svg-icon slot="prefix" icon-class="IOS" style="margin-left: 6px;" /> iOS</span>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20" :xs="24">
            <fieldset class="fieldsetStylepc">
              <legend style="margin-left: 40px;font-size:20px">iOS备案详情</legend>
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
                  <p style="font-size:20px;font-weight:bold">{{ form.AppName }}</p>
                  <p>备案版本：{{ form.iosVersion }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案编号：{{ form.iosrecordNumber }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案日期：{{ form.iosrecordNumberTime }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>应用权限：<el-tag v-for="(item,index) in form.iosPermissions" :key="index" style="margin-left:10px;margin-bottom:5px">{{ item }}</el-tag></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>检测机构：{{ form.iosdetectionOrg }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>认证机构：{{ form.iosapproveOrg }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col v-for="(item,index) in form.iosfileArr" :key="index" :span="4" :xs="12" style="margin-bottom:1px">
                  <el-image
                    style="width:100%;height:350px;border-radius: 6px 6px;"
                    :src="item"
                    fit="cover"
                    :preview-src-list="form.iosfileArr"
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
              <el-table :data="form.iosRecordInfoHistories" tooltip-effect="dark" style="width:95%;margin:auto">
                <el-table-column label="序号" type="index" />
                <el-table-column label="版本号" prop="appVersion" show-overflow-tooltip />
                <el-table-column label="更新时间" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{ scope.row.updateTime }}
                  </template>
                </el-table-column>
              </el-table>
            </fieldset>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane v-if="form.andVersion" name="1">
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
                  <p style="font-size:20px;font-weight:bold">{{ form.AppName }}</p>
                  <p>备案版本：{{ form.andVersion }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案编号：{{ form.andrecordNumber }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>备案日期：{{ form.andrecordNumberTime }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>应用权限：<el-tag v-for="(item,index) in form.andPermissions" :key="index" style="margin-left:10px;margin-bottom:5px">{{ item }}</el-tag></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>检测机构：{{ form.anddetectionOrg }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <p>认证机构：{{ form.andapproveOrg }}</p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col v-for="(item,index) in form.andfileArr" :key="index" :span="4" :xs="12" style="margin-bottom:1px">
                  <el-image
                    style="width:100%;height:350px;border-radius: 6px 6px;"
                    :src="item"
                    fit="cover"
                    :preview-src-list="form.andfileArr"
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
              <el-table :data="form.andRecordInfoHistories" tooltip-effect="dark" style="width:95%;margin:auto;">
                <el-table-column label="序号" type="index" />
                <el-table-column label="版本号" prop="appVersion" show-overflow-tooltip />
                <el-table-column label="更新时间" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{ scope.row.updateTime }}
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
import bgMonitor from '@/assets/login/logow3.png'
import { getxiangqing } from '@/xiangqing'
export default {
  data() {
    return {
      bgMonitorImg: bgMonitor, // 图
      fileArr: [],
      iosfileArr: [],
      activeName: '2',
      drawer: false,
      isPc: true,
      form: {
        rinm: '',
        ficp: '',
        registerAddr: '',
        appIconPath: '',
        AppName: '',
        iosstampPath: '',
        iosauditStatus: '',
        iosappVersion: '',
        iosapproveOrg: '',
        iosdetectionOrg: '',
        iosrecordNumberTime: '',
        iosrecordNumber: '',
        iosfileArr: [],
        iosPermissions: [],
        iosRecordInfoHistories: [],
        andstampPath: '',
        andauditStatus: '',
        andappVersion: '',
        andapproveOrg: '',
        anddetectionOrg: '',
        andrecordNumberTime: '',
        andrecordNumber: '',
        andPermissions: [],
        andfileArr: [],
        andRecordInfoHistories: []

      }
    }
  },
  created() {
    this.form = getxiangqing(this.$route.query.index)
    this.IsPC()
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
        }
      })
    }
  }
}
</script>
<style lang="scss">
.detailStyle{
  .el-image{
    position: static;
  }
  .el-card__header{
    height: 80px;
    line-height: 80px;
     background-color: rgb(255, 255, 255);
  }
      .el-card__body{
    min-height:100vh;
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
.detailStyle{
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
.detailStyle{
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
