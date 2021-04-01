<template>
  <div class="dashboardcontainer">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" body-style="background-color:#fff;padding:0">
          <div slot="header" class="clearfix itemStylea">
            <span>工作台</span>
            <el-button style="float:right;" type="text" @click="more">更多</el-button>
          </div>
          <div class="noDatB">
            <el-badge v-show="shujuLength>0" :value="shujuLength" :max="99" class="item dwStyle" />
            <el-badge v-show="messageLength>0" :value="messageLength" :max="99" class="item dwStyleb" />
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane label="待办事项" name="0">
                <el-row v-if="shujuArr.length>0">
                  <el-col v-for="(item,index) in shujuArr" :key="index" :span="24" class="borderStyle">
                    <el-col :span="17">
                      <el-tooltip class="item" effect="dark" :disabled="item.title.length<30" :content="item.title" placement="top-start">
                        <el-button class="fontStyle" type="text" @click="goFrom(item)">{{ item.title }}</el-button>
                      </el-tooltip>
                    </el-col>
                    <el-col :span="7" style="text-align:center;">
                      <el-button type="text" disabled>{{ item.sendTime }}</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row v-else>
                  <el-col :span="16">
                    <el-button type="text" disabled>暂无数据</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="消息提醒" name="1">
                <el-row v-if="messageArr.length>0">
                  <el-col v-for="(item,index) in messageArr" :key="index" :span="24" class="borderStyle">
                    <el-col :span="17">
                      <el-popconfirm
                        :title="item.message"
                        icon="el-icon-document"
                        confirm-button-text="标为已读"
                        confirm-button-type="text"
                        @onConfirm="biaoJi(item)"
                      >
                        <el-button slot="reference" class="fontStyle" type="text">{{ item.message }}</el-button>
                      </el-popconfirm>
                      <!-- <el-tooltip class="item" effect="dark" :content="item.message" :disabled="item.message.length<25" placement="top-start">
                        <el-button  class="fontStyle" type="text">{{ item.message }}</el-button>
                      </el-tooltip> -->
                    </el-col>
                    <el-col :span="7" style="text-align:center;">
                      <el-button type="text" disabled>{{ item.createTime }}</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row v-else>
                  <el-col :span="16">
                    <el-button type="text" disabled>暂无数据</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" body-style="background-color:#fff;padding:0">
          <div slot="header" class="clearfix">
            <span>通知公告</span>
            <el-button style="float:right;" type="text" @click="noteMore">更多</el-button>
          </div>
          <div class="noData">
            <el-row v-if="tzgdArr.length>0">
              <el-col v-for="(item,index) in tzgdArr" :key="index" :span="24" class="borderStyle">
                <el-col :span="17">
                  <el-tooltip class="item" effect="dark" :content="item.title" :disabled="item.title.length<25" placement="top-start">
                    <el-button class="fontStyle" type="text" @click="goTzgd(item.id)">{{ item.title }}</el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="7" style="text-align:center;">
                  <el-button type="text" disabled>{{ item.releaseTime }}</el-button>
                </el-col>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="16">
                <el-button type="text" disabled>暂无数据</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 下面部分 -->
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <el-card shadow="hover" body-style="background-color:#fff;padding:0">
          <div slot="header" class="clearfix">
            <span>制度中心</span>
            <!-- <el-button style="float:right;" type="text" @click="goApp">更多</el-button> -->
          </div>
          <div class="noData">
            <el-row>
              <el-col v-for="(item,index) in appArr" :key="index" :span="24" class="borderStyle">
                <el-col :span="16">
                  <el-button type="text" disabled>{{ item.title }}</el-button>
                </el-col>
                <el-col :span="8" style="text-align:right;">
                  <!-- <el-button type="text"><a :href="item.url" style="color:#409EFF;">下载</a></el-button> -->
                  <el-button type="text" @click="download(item.url)">下载</el-button>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="centerDialogVisible"
      title="提示"
      width="30%"
      center
    >
      <span>{{ contenta }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { rzWorkFlow } from '@/api/appbeian/register.js'
import { getListApi, getListApijs } from '@/api/notice/notice.js'
import { oparateData, getmessage, updateMessage } from '@/api/home/index.js'
import {
  getButton
} from '@/api/workflow/index.js'
export default {
  name: 'Dashboard',
  data() {
    return {
      visible: true,
      shujuArr: [],
      shujuLength: '0',
      messageArr: [],
      messageLength: '0',
      tzgdArr: [],
      activeName: '1',
      centerDialogVisible: false,
      contenta: '',
      appArr: [
        {
          title: '银发[2019]237.pdf',
          date: '2019-12-11',
          url: './static/银发[2019]237.pdf'
        },
        {
          title: '移动金融客户端软件安全管理规范',
          date: '2019-12-11',
          url: './static/移动金融客户端应用软件安全管理规范.pdf'
        },
        {
          title: '备案工作操作手册',
          date: '2019-12-11',
          url: './static/备案工作操作手册.pdf'
        },
        {
          title: '备案系统用户手册',
          date: '2019-12-11',
          url: './static/备案系统用户手册.pdf'
        },
        {
          title: '移动金融客户端应用软件备案管理办法（试行）',
          date: '2019-12-11',
          url: './static/移动金融客户端应用软件备案管理办法（试行）.pdf'
        },
        {
          title: '关联备案说明',
          date: '2019-12-11',
          url: './static/关联备案说明.pdf'
        },
        {
          title: '授权函模板',
          date: '2019-12-11',
          url: './static/授权函模板.doc'
        }
      ]

      // 通知公告
    }
  },
  mounted() {
    this.getMessage()
    this.init()
    this.getTongzhi()
  },
  methods: {
    download(data) {
      window.open(data)
    },
    biaoJi(mess) {
      const obj = {
        id: mess.id,
        status: '1'
      }
      updateMessage(obj).then(res => {
        this.getMessage()
      })
    },
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.init() // 工作流
          break
        case '1':
          this.getMessage()
          break
      }
    },
    // 工作流到详情页
    goFrom(obj) {
      if (obj.flowId === 'organRegister') {
        this.$router.push({
          name: 'jgmaintenance',
          query: {
            name: obj.name,
            nodeName: obj.nodeName,
            sendSubjectionName: obj.sendSubjectionName,
            subjectionId: obj.subjectionId,
            trackId: obj.trackId,
            workId: obj.workId
          }
        })
      } else {
        if (this.$store.getters.srnm === '') {
          const obj0 = {
            name: obj.name ? obj.name : '',
            sendSubjectionName: obj.sendSubjectionName,
            subjectionId: obj.subjectionId,
            trackId: obj.trackId,
            workId: obj.workId
          }
          rzWorkFlow(obj0).then(res => {
            this.$router.push({
              name: 'AppVivw',
              query: {
                id: res.formData.data.id,
                name: obj.name,
                nodeName: obj.nodeName,
                sendSubjectionName: obj.sendSubjectionName,
                subjectionId: obj.subjectionId,
                trackId: obj.trackId,
                workId: obj.workId
              }
            })
          })
        } else if (this.$store.getters.srnm === '0') {
          const obj0 = {
            name: obj.name ? obj.name : '',
            sendSubjectionName: obj.sendSubjectionName,
            subjectionId: obj.subjectionId,
            trackId: obj.trackId,
            workId: obj.workId
          }
          rzWorkFlow(obj0).then(res => {
            const id = res.formData.data.id
            const auditStatus = res.formData.data.auditStatus
            const newres = JSON.parse(JSON.stringify(res))
            delete res.formData
            const obj1 = {
              name: res.name ? obj.name : '',
              sendSubjectionName: res.sendSubjectionName || '',
              subjectionId: res.subjectionId,
              trackId: res.trackId,
              workId: res.workId
            }
            if (res.flowID === 'recordDetectionMajorChange') {
              this.$router.push({
                name: 'newAppmodify',
                query: {
                  changeTips: 'other',
                  update: '重大变更',
                  num: '2', // 更新标识
                  name: '重大变更',
                  id,
                  from: '列表',
                  auditStatus
                }
              })
            } else {
              getButton(obj1).then(res => {
                if (newres.formData.data.flowType === '3') {
                  this.$router.push({
                    name: 'Appmodify',
                    query: {
                      num: '2',
                      name: '重大变更',
                      id,
                      queryData: JSON.stringify(res),
                      update: '重大变更'
                    }
                  })
                } else {
                  this.$router.push({
                    name: 'Appmodify',
                    query: {
                      num: '1',
                      name: '修改',
                      id,
                      queryData: JSON.stringify(res)
                    }
                  })
                }
              })
            }
          })
        } else if (this.$store.getters.srnm === '1') {
          this.$router.push({
            name: 'apprzxq',
            query: {
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId
            }
          })
        } else {
          this.$router.push({
            name: 'appjcxq',
            query: {
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId
            }
          })
        }
      }
    },
    getTongzhi() {
      const params = {
        pageSize: 7,
        pageNumber: 1
      }
      if (this.$store.getters.srnm === '') { // 发送方
        params.createDept = this.$store.getters.deptId
        getListApi(params).then(res => {
          this.tzgdArr = res.list
        })
      } else {
        params.riid = this.$store.getters.riid // 接收方用的参数
        getListApijs(params).then(res => {
          this.tzgdArr = res.list
        })
      }
    },
    getMessage() {
      const params = {
        pageSize: 6,
        pageNumber: 1,
        status: '0',
        deptId: this.$store.getters.riid ? this.$store.getters.riid : this.$store.getters.userId
      }
      getmessage(params).then(res => {
        this.messageArr = res.list
        this.messageLength = res.total
      })
    },
    init() {
      const obj = {
        pageSize: 6,
        pageNum: 1
      }
      oparateData(obj).then(res => {
        if (res.list !== null) {
          this.shujuArr = res.list
          this.shujuLength = res.total
        }
      })
    },
    // 更多 - 通知公告
    noteMore() {
      this.$router.push({ name: 'notice_index' })
    },
    goTzgd(id) {
      this.$router.push({
        name: 'notice_detail',
        query: { id }
      })
    },
    more() {
      this.$router.push({ path: '/worbench' })
    }
  }
}
</script>
<style lang="scss" >
.dashboardcontainer {
  min-height:calc(100vh - 144px);
  .el-card__body  {
    min-height: 300px;
    max-height: 300px;
  }
  .noData{
    padding: 15px 20px;
    height: 100%;
    .fontStyle{
      width:100%;
      text-align:left;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }
  }
  .noDatB{
    padding: 0;
    height: 100%;
   .el-tabs--border-card{
    height: 100%;
    box-shadow: none;
    border:none
   }
   .dwStyle{
     position: absolute;
     z-index: 5;
     left: 70px;
  }
   .dwStyleb{
     position: absolute;
     z-index: 5;
     left: 170px;
  }
    .fontStyle{
      width:100%;
      text-align:left;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }
  }
  .borderStyle{
     height: 36px;
     border-bottom: 1px dashed #e5e5e5;
  }
  .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
    color: #333;
  }
}
</style>
