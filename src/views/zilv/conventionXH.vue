<template>
  <el-card class="zilv">
    <div slot="header" class="clearfix btnCard">
      <span>自律公约签署</span>
    </div>
    <div v-if="$store.getters.srnm === '0'">
      <div id="text">
        <div ref="fdfDom" style="padding:15px 50px;width:1000px">
          <div v-if="flag" class="wrap">
            <div class="nrap" style="textAlign:center;color:red;fontWeight:600">
              <div style="fontSize:13px;margin:3px 0">已签署</div>
              <div style="fontSize:12px;margin:3px 0">{{ succ }}</div>
              <div style="fontSize:12px">{{ name }}</div>
              <div style="fontSize:12px">{{ date }}</div>
            </div>
          </div>
          <h2 style="textAlign:center">移动金融客户端应用软件备案活动自律公约（试行）</h2>
          <h4 style="textAlign:center;margin: 20px 0">第一章 总则</h4>
          <div class="content">
            第一条为促进移动金融客户端应用软件（以下称客户端软件）备案工作规范推进，推动客户端软件市场健康发展，维护行业声誉，树立良好行业形象，保护金融消费者的合法权益和社会公共利益，根据《中华人民共和国网络安全法》、《中华人民共和国消费者权益保护法》、《中国人民银行关于发布金融行业标准加强移动金融客户端应用软件安全管理的通知》（以下称通知）、《移动金融客户端应用软件备案管理办法（试行）》（以下称备案管理办法）等有关规定，制定本公约。
          </div>
          <div class="content">
            第二条 本公约适用于参与备案机构、服务机构、认证检测机构、软件安全监测机构（以上统称从业机构）从事的有关客户端软件备案及相关服务、认证检测、安全监测等活动。
          </div>
          <div class="content">
            第三条  各方经协商达成共识，承诺共同遵守本公约。
          </div>
          <div class="content">
            自愿接受本公约的自律规则的从业机构，均可申请加入本公约。
          </div>
          <div class="content">
            欢迎各相关行业协会加入本公约，并积极履行自律管理职责。
          </div>
          <div class="content">
            第四条 中国互联网金融协会（以下称互联网金融协会）鼓励互联网金融协会会员单位或其经营移动金融业务的关联公司加入本公约。
          </div>
          <div class="content">
            第五条 从业机构应当采取有效措施加强客户端软件个人信息保护，加强金融消费者权益保护。
          </div>
          <div class="content">
            第六条 从业机构应当加强客户端软件安全管理，持续保障客户端软件安全。
          </div>
          <div class="content">
            第七条 从业机构应当公平竞争，在参与备案相关工作过程中，不得以不合理的条件对其他机构实行差别待遇或者歧视待遇。
          </div>
          <h4 style="textAlign:center;margin: 20px 0">第二章 客户端软件备案</h4>
          <div class="content">
            第八条 参与备案机构应当按照《备案管理办法》要求，通过备案系统向互联网金融协会申请客户端软件备案并提交备案材料，保证所提供材料和信息的真实性、准确性、完整性。
          </div>
          <div class="content">
            对于所提交备案材料不齐全或者不符合要求的，参与备案机构应当按照《备案管理办法》要求的时间进行补充或更改材料。
          </div>
          <div class="content">
            第九条 对于已完成备案的客户端软件，互联网金融协会应及时通过备案系统和其他途径进行公示，向备案机构颁发备案编号、备案标志及其他标志。备案机构可在该客户端软件备案有效期内按要求使用备案编号、备案标志及其他标志。
          </div>
          <div class="content">
            经备案机构授权，互联网金融协会可在“互联网金融协会应用市场”（具体名称以互联网金融协会最终确认为准）等应用市场发布已完成备案的客户端软件，供公众使用。
          </div>
          <div class="content">
            第十条 服务机构应当根据《备案管理办法》的要求，核查客户端软件是否已经取得互联网金融协会颁发的备案编号和备案标志及其他标志，核实其备案信息，拒绝向未按要求进行备案的客户端软件提供发布、推广宣传等服务。
          </div>
          <div class="content">
            对于需更新备案信息的客户端软件，服务机构应当根据《备案管理办法》的要求审核其备案信息更新情况。对于未按照要求办理备案信息更新的，服务机构应视情况采取警示、暂停发布、下架应用程序等措施。
          </div>
          <div class="content">
            第十一条 服务机构接到注销客户端软件备案公告等通知后，应按照互联网金融协会的要求采取暂停发布、下架应用程序等措施。
          </div>
          <div class="content">
            第十二条 服务机构应当建立健全客户端软件备案情况审核制度，如发现参与备案机构存在未履行备案程序的，应当及时通知互联网金融协会，并根据互联网金融协会要求采取相应措施。
          </div>
          <div class="content">
            第十三条 认证检测机构应当按照认证检测基本规范或规则开展认证检测活动，并对所出具的认证检测结论负责。
          </div>
          <div class="content">
            第十四条 认证检测机构应当公开认证检测条件、认证检测程序、收费标准等信息，不得谋取不正当利益，不得不公正对待参与备案机构。
          </div>
          <div class="content">
            第十五条 认证检测机构应当对认证检测过程作出完整记录，归档留存。
          </div>
          <h4 style="textAlign:center;margin: 20px 0">第三章 软件安全与风险提示</h4>
          <div class="content">
            第十六条 互联网金融协会有权通过自身或者委托的第三方软件安全监测机构对客户端软件安全情况进行风险监测，发现软件安全风险信息的，应及时通知相关参与备案机构进行处理。
          </div>
          <div class="content">
            互联网金融协会通过第三方软件安全监测机构开展风险监测的，应事先公示第三方软件安全监测机构及其入选标准、理由等，并对从业机构提出的合理异议进行解释。如从业机构普遍不接受解释的，互联网金融协会应予以调整。
          </div>
          <div class="content">
            第十七条 参与备案机构应加强客户端软件安全管理，建立规范高效的风险信息接收、处理流程，根据互联网金融协会自身或者委托的第三方软件安全监测机构的通知及时处理风险信息，并将处理结果及时反馈给互联网金融协会。
          </div>
          <div class="content">
            第十八条 互联网金融协会可将风险监测发现的共性问题进行脱敏处理后，向所有参与备案机构发出风险提示。
          </div>
          <div class="content">
            第十九条 软件安全监测机构应当严格遵守相关国家标准、行业标准的要求，客观地对客户端软件进行安全监测，不得不公正对待参与备案机构。
          </div>
          <div class="content">
            第二十条 互联网金融协会和软件安全监测机构开展风险监测时，不得在本公约授权范围外泄露监测结果，但法律法规和监管机构另有要求的除外。
          </div>
          <h4 style="textAlign:center;margin: 20px 0">第四章 内控管理与举报投诉</h4>
          <div class="content">
            第二十一条 从业机构应完善内部管理机制，明确内部职责，并配备参与备案相关工作必要的人力、物力、财力等资源。
          </div>
          <div class="content">
            第二十二条 从业机构应对员工开展涉及客户端软件备案工作的培训教育，确保其员工接受全面而适当的训练，具备足够的专业知识。
          </div>
          <div class="content">
            第二十三条 从业机构应当建立健全质量管理体系，并开展内部审核，保证质量管理体系的有效实施。
          </div>
          <div class="content">
            第二十四条 从业机构应互相监督本公约的执行情况，主动向互联网金融协会报告违约行为。
          </div>
          <div class="content">
            第二十五条 从业机构应当建立完善客户端软件投诉制度，设置专人专岗受理金融消费者投诉，公布规范投诉渠道和办理流程，及时高效受理并处理有关投诉建议。
          </div>
          <h4 style="textAlign:center;margin: 20px 0">第五章 第五章营销宣传与信息报送</h4>
          <div class="content">
            第二十六条 从业机构应客观披露参与备案相关工作的情况，不滥用备案编号、备案标志及其他标志，不得利用签署本公约、参与备案相关工作等事实，对金融消费者做出误导性陈述。
          </div>
          <div class="content">
            第二十七条 互联网金融协会可根据法律法规、监管规定、中国人民银行等金融管理部门的要求或因自律管理需要，要求从业机构提供有关客户端软件备案情况的信息，从业机构应予以配合。
          </div>
          <div class="content">
            第二十八条 从业机构应当按照互联网金融协会要求的格式和时间，报送备案相关工作信息、数据。
          </div>
          <div class="content">
            互联网金融协会应建立专门的信息填报系统，用于从业机构报送数据和查询使用。
          </div>
          <h4 style="textAlign:center;margin: 20px 0">第六章 自律管理机制</h4>
          <div class="content">
            第二十九条 互联网金融协会实施自律管理，组织开展以下工作：
          </div>
          <div class="content">
            （一）研究制定有关客户端软件备案工作的行业标准、自律规则；
          </div>
          <div class="content">
            （二）对参与备案机构提交的客户端软件备案材料进行审核；
          </div>
          <div class="content">
            （三）组织开展客户端软件监测分析和风险提示工作；
          </div>
          <div class="content">
            （四）对从业机构遵守自律管理工作情况进行监督检查；
          </div>
          <div class="content">
            （五）对从业机构违反自律管理的行为进行认定；
          </div>
          <div class="content">
            （六）组织开展有关金融消费者权益保护宣传教育工作；
          </div>
          <div class="content">
            （七）将从业机构参与客户端软件备案的情况对外公示并向中国人民银行等金融管理部门报告；
          </div>
          <div class="content">
            （八）配合中国人民银行等金融管理部门开展相关工作；
          </div>
          <div class="content">
            （九）其他相关自律管理工作。
          </div>
          <div class="content">
            第三十条 互联网金融协会开展现场或非现场检查等自律管理活动时，从业机构应自觉接受，如实提供有关材料，积极配合，不得隐瞒、拒绝和阻碍。
          </div>
          <div class="content">
            第三十一条 对自觉遵守本公约并符合以下条件之一的从业机构或人员，互联网金融协会可予以适当的奖励或表彰：
          </div>
          <div class="content">
            （一）建立具有行业先进性的内控制度，有助于严格遵守本公约的；
          </div>
          <div class="content">
            （二）认真落实和执行备案自律工作，连续一年没有被客户举报、投诉，或者被互联网金融协会采取相关自律管理措施的；
          </div>
          <div class="content">
            （三）对备案工作提出重大意见、建议并被主管机关或互联网金融协会采纳的；
          </div>
          <div class="content">
            （四）向互联网金融协会举报备案工作中的违法违规行为，经查证属实的；
          </div>
          <div class="content">
            （五）其他成绩突出的。
          </div>
          <div class="content">
            第三十二条 除本公约另有规定外，备案相关工作的自律惩戒参照《中国互联网金融协会章程》、《中国互联网金融协会自律惩戒管理办法》、《中国互联网金融协会惩戒委员会工作规则》、《中国互联网金融协会申诉委员会工作规则》的有关规定执行。
          </div>
          <div class="content">
            第三十三条 从业机构违反本公约规定的，互联网金融协会可以根据情节轻重，采取特别关注名单、警示约谈、发警示函、强制培训、业内通报、公开谴责、暂停受理备案、注销备案等自律惩戒措施并报告相关金融管理部门；情节严重的，记入客户端软件安全管理黑名单，并向金融管理部门提出行政处罚建议。
          </div>
          <div class="content">
            从业机构为互联网金融协会会员的，还可采取暂停会员权利、取消会员资格等自律惩戒措施。
          </div>
          <div class="content">
            以上惩戒种类可以单独或者合并实施。
          </div>
          <div class="content">
            第三十四条 互联网金融协会理事会下设的负责惩戒的委员会，根据《中国互联网金融协会惩戒委员会工作规则》等规定，负责对从业机构违反本公约规定的行为实施惩戒。
          </div>
          <h4 style="textAlign:center;margin: 20px 0">第七章 附则</h4>
          <div class="content">
            第三十五条 本公约有关术语含义如下：
          </div>
          <div class="content">
            参与备案机构是指在中华人民共和国境内经有权部门批准或者备案设立的，通过互联网依法经营金融业务的机构，包括但不限于各银行业金融机构，证券公司、基金公司、期货公司、私募投资基金管理机构，保险集团（控股）公司、保险公司、保险资产管理公司，清算机构，各非银行支付机构，汽车金融公司，消费金融公司，保险代理机构，从事网络借贷、网络借贷信息中介、股权众筹融资、互联网基金销售、互联网保险、互联网信托和互联网消费金融等互联网金融业务的机构，以及其他金融机构。
          </div>
          <div class="content">
            服务机构是指为备案机构提供客户端软件下载、推广、代理上线等服务的机构，包括但不限于应用市场、推广服务平台、第三方代理机构等。
          </div>
          <div class="content">
            认证检测机构是指依法设立的具备金融科技产品认证资质的从事认证检测业务的机构。
          </div>
          <div class="content">
            软件安全监测机构是指依法设立的从事软件安全监测业务的机构。
          </div>
          <div class="content">
            客户端软件是指在移动终端上为用户提供金融交易服务的应用软件，包括但不限于可执行文件、组件等。
          </div>
          <div class="content">
            第三十六条 本公约由互联网金融协会负责解释。
          </div>
          <div class="content">
            第三十七条 互联网金融协会可结合实际情况对本公约进行修订或补充。
          </div>
          <div class="content">
            第三十八条  本公约自公布之日起施行。
          </div>
        </div>
      </div>
      <div>
        <el-row style="text-align:center;padding-top:50px">
          <el-col v-if="isShow" :span="24">
            <el-checkbox v-model="checked" /> <el-button type="text" @click="ride">自愿遵守自律公约</el-button>
          </el-col>
          <el-col :span="24">
            <el-button v-if="isShow" type="primary" :disabled="!checked" @click="sure">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="$store.getters.srnm === ''">
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
        <el-tab-pane label="已签署" name="1">
          <div class="search">
            <el-form ref="auditForm" :model="auditForm" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="金融机构名称">
                    <el-input v-model="auditForm.rinm" type="text" placeholder="App名称" clearable maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签署日期">
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
              </el-row>
              <el-row>
                <el-col :span="24" class="textRight">
                  <el-button type="primary" @click="seachAuditForm()">查 询</el-button>
                  <el-button @click="clearAuditForm()">重 置</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <br>
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            @sort-change="sortChange"
          >
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column prop="rinm" label="金融机构名称" show-overflow-tooltip />
            <el-table-column prop="monitorName" label="联系人" show-overflow-tooltip />
            <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
            <el-table-column prop="isForeignInst" label="签署状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.isForeignInst === '1'" style="color:#4CA4FF">已签署</span>
                <span v-else style="color:#FF735B">未签署</span>
              </template>
            </el-table-column>
            <el-table-column prop="srTime" label="签署日期" sortable="custom" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.srTime?scope.row.srTime:'--' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button v-if="scope.row.isForeignInst === '1'" type="text" @click="download(scope.row.icpNum)">
                  下载文档
                </el-button>
                <el-button v-else type="text" @click="risk(scope.row.riid)">
                  提醒
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="pageInfo.pageNumber"
            :page-size="pageInfo.pageSize"
            :total="pageInfo.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
        </el-tab-pane>
        <el-tab-pane label="未签署" name="2">
          <div class="search">
            <el-form ref="auditFormb" :model="auditFormb" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="金融机构名称">
                    <el-input v-model="auditFormb.rinm" type="text" placeholder="App名称" clearable maxlength="50" />
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="签署日期">
                    <el-date-picker
                      v-model="getAuditFormb.time"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :default-time="['00:00:00', '23:59:59']"
                    />
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="24" class="textRight">
                  <el-button type="primary" @click="getAuditFormb()">查 询</el-button>
                  <el-button @click="clearAuditFormb()">重 置</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <br>
          <el-table
            v-loading="tableLoadingb"
            :data="tableDatab"
            @sort-change="sortChangeb"
          >
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column prop="rinm" label="金融机构名称" show-overflow-tooltip />
            <el-table-column prop="monitorName" label="联系人" show-overflow-tooltip />
            <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
            <el-table-column prop="isForeignInst" label="签署状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.isForeignInst === '1'" style="color:#4CA4FF">已签署</span>
                <span v-else style="color:#FF735B">未签署</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="srTime" label="签署日期" sortable="custom" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.srTime?scope.row.srTime:'--' }}
                </span>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button v-if="scope.row.isForeignInst === '1'" type="text" @click="download(scope.row.icpNum)">
                  下载文档
                </el-button>
                <el-button v-else type="text" @click="risk(scope.row.riid)">
                  提醒
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="pageInfob.pageNumber"
            :page-size="pageInfob.pageSize"
            :total="pageInfob.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChangeb"
            @current-change="currentChangeb"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import { upLoadPDF } from '@/utils/pdf.js'
import { saveDsp, dspSearch, query, remind } from '@/api/zilv.js'
export default {
  data() {
    return {
      name: '',
      succ: '',
      activeName: '1',
      flag: false,
      date: '',
      isShow: true,
      checked: false,
      form: {},
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      auditForm: {
        rinm: '',
        time: []
      },
      auditFormb: {
        rinm: '',
        time: []
      },
      organTypeOptions: [],
      tableLoading: false,
      tableLoadingb: false,
      tableData: [],
      tableDatab: [],
      tableDataB: [
        {
          appVersion: '3.6.0',
          tixingshijian: '2020-08-12 12:26:36',
          caozuoren: '王文'
        }
      ],
      sort: '1',
      sortb: '1'
    }
  },
  computed: {
    queryMessage() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfo.pageSize,
        isForeignInst: '1',
        rinm: this.auditForm.rinm,
        sortKey: this.sort,
        time: this.auditForm.time
      }
    },
    queryMessageb() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfob.pageSize,
        isForeignInst: '0',
        rinm: this.auditFormb.rinm,
        sortKey: this.sortb,
        time: this.auditFormb.time
      }
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage(tips = false) {
      if (this.$store.getters.srnm === '') {
        this.queryMsg()
      } else {
        const list = this.$store.getters.userName.split('_')
        if (list.length <= 1) {
          dspSearch(this.$store.getters.riid).then(res => {
            if (res.isForeignInst === '1') {
              this.name = res.monitorName
              this.succ = res.succ
              this.isShow = false
              this.flag = true
              this.date = res.srTime.split(' ')[0]
              this.loading.close()
              if (tips) {
                setTimeout(() => {
                  this.upLoad()
                }, 500)
              }
            } else {
              this.isShow = true
              this.flag = false
            }
          })
        } else if (list.length > 1) {
          dspSearch(this.$store.getters.riid).then(res => {
            if (res.isForeignInst === '1') {
              this.name = res.monitorName
              this.succ = res.succ
              this.isShow = false
              this.flag = true
              this.date = res.srTime.split(' ')[0]
            } else {
              this.isShow = false
              this.flag = false
            }
          })
        }
      }
    },
    risk(riid) {
      remind(riid).then(res => {
        this.$message({
          type: 'success',
          message: '提醒成功'
        })
      })
    },
    download(fileID) {
      location.href = `nifa-autonomy-file/upload/download/${fileID}`
    },
    tabClick(data) {
      switch (data.label) {
        case '已签署':
          this.queryMsg()
          sessionStorage.setItem('tabMsg', '已签署')
          break
        case '未签署':
          this.getAuditFormb()
          sessionStorage.setItem('tabMsg', '未签署')
          break
      }
    },
    getAuditFormb(searchOrReset) {
      this.tableLoadingb = true
      if (searchOrReset) this.pageInfob.pageNumber = 1
      const obj = Object.assign({}, this.queryMessageb, this.pageInfob)
      obj.startDate = this.auditFormb.time.length ? this.auditFormb.time[0] : ''
      obj.endDate = this.auditFormb.time.length ? this.auditFormb.time[1] : ''
      delete obj.time
      delete obj.total
      query(obj).then(res => {
        this.tableDatab = res.list
        this.pageInfob.total = res.total
        this.tableLoadingb = false
        if (searchOrReset) this.pageInfob.pageNumber = 1
      })
    },
    clearAuditFormb(formName, auditStatus) {
      this.auditFormb = {
        rinm: '',
        time: []
      }
      this.getAuditFormb(true)
    },
    sizeChangeb(val) {
      this.pageInfob.pageSize = val
      this.getAuditFormb()
    },
    currentChangeb(val) {
      this.pageInfob.pageNumber = val
      this.getAuditFormb()
    },
    queryMsg(searchOrReset = false) {
      this.tableLoading = true
      if (searchOrReset) this.pageInfo.pageNumber = 1
      const obj = Object.assign({}, this.queryMessage, this.pageInfo)
      obj.startDate = this.auditForm.time.length ? this.auditForm.time[0] : ''
      obj.endDate = this.auditForm.time.length ? this.auditForm.time[1] : ''
      delete obj.time
      delete obj.total
      query(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.tableLoading = false
        if (searchOrReset) this.pageInfo.pageNumber = 1
      })
    },
    seachAuditForm() {
      this.queryMsg(true)
    },
    // 列表重置
    clearAuditForm() {
      this.auditForm = {
        rinm: '',
        time: []
      }
      this.queryMsg(true)
    },
    sortChange(column) {
      if (column.order === 'descending') {
        this.sort = '1'
        this.queryMsg()
      } else if (column.order === 'ascending') {
        this.sort = '0'
        this.queryMsg()
      }
    },
    sortChangeb(column) {
      if (column.order === 'descending') {
        this.sortb = '1'
        this.getAuditFormb()
      } else if (column.order === 'ascending') {
        this.sortb = '0'
        this.getAuditFormb()
      }
    },
    sizeChange(val) {
      this.pageInfo.pageSize = val
      this.queryMsg()
    },
    // 条数变化
    currentChange(val) {
      this.pageInfo.pageNumber = val
      this.queryMsg()
    },
    ride() {
      if (this.checked) {
        this.checked = false
      } else {
        this.checked = true
      }
    },
    sure() {
      this.loading = this.$loading({
        lock: true
      })
      this.flag = true
      saveDsp({ riid: this.$store.getters.riid }).then(res => {
        this.$message({
          type: 'success',
          message: '签署成功！'
        })
        this.getMessage(true)
        this.loading.close()
      })
    },
    goBack() {
    },
    upLoad() {
      const content = this.$refs.fdfDom
      upLoadPDF(content, '金融APP备案自律公约.pdf')
    }
  }
}
</script>

<style lang="scss">
.zilv{
  #text{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 10px;
    border: 1px solid #1989fa;
    border-radius: 5px;
    position: relative;
    .wrap{
      position: absolute;
      top: 1%;
      right: 3%;
      width: 175px;
      height: 85px;
      border: 4px solid red;
      border-radius: 50%;
      text-align: center;
      .nrap{
        margin: 3px auto 0;
        width: 160px;
        height: 71px;
        border: 2px solid red;
        border-radius: 50%;
      }
    }
    .content{
      line-height: 20px;
      margin-bottom: 15px;
      text-indent: 2em;
  }
  }
}
</style>
