<template>
  <el-card v-loading="IsloadingA" class="xiangStyle" shadow="never">
    <div slot="header" class="clearfix">
      <el-page-header title="" content="应用详情" @back="goBack" />
    </div>
    <el-row type="flex" align="middle" :gutter="10">
      <el-col :span="7" :sm="3" style="padding:0;">
        <el-image
          style="width:100px; height:100px;border-radius: 6px 6px;"
          :src="form.preview"
          fit="cover"
        >
          <div slot="error" class="el-image__error">
            暂无图片
          </div>
        </el-image>
      </el-col>
      <el-col :span="18" style="text-align:left;">
        <p style="font-size:20px">{{ form.appName }}</p>
        <p style="font-size:13px;color:#7b7b7b;">{{ form.rinm }}</p>
        <p style="font-size:13px;color:#7b7b7b;">{{ form.recordNumber }}</p>
        <p style="font-size:13px;color:#7b7b7b;">{{ form.downloads }}次安装</p>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <p style="font-size:20px">应用截图</p>
        <br>
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(item,index) in form.fileList" :key="index">
            <el-image
              style="width:100%;height:350px;border-radius: 6px 6px;"
              :src="item.preview"
              fit="fill"
              @click="fn(item.preview)"
            >
              <div slot="placeholder" style="line-height:300px;" class="image-slot">
                <img style="height:100px;" :src="require('@/assets/loading.gif')">
              </div>
            </el-image>
          </swiper-slide>
        </swiper>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <p style="font-size:20px;padding-bottom:5px;">描述</p>
        <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
          <div ref="desc" class="intro-content" :title="form.description">
            <span v-if="form.description" class="merchant-desc">
              {{ form.description?form.description:'暂无' }}
            </span>
            <div v-if="showExchangeButton" class="unfold" @click="showTotalIntro">
              <i v-show="exchangeButton" class="el-icon-arrow-down" style="color:#7b7b7b;" />
              <i v-show="!exchangeButton" class="el-icon-arrow-up" style="color:#7b7b7b;" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <p style="font-size:20px;padding-bottom:5px;">信息</p>
        <p style="font-size:14px;color:#7b7b7b;">大小：{{ form.fileSize }}</p>
        <p style="font-size:14px;color:#7b7b7b;">版本：{{ form.appVersion }}</p>
        <p style="font-size:14px;color:#7b7b7b;">备案时间：{{ form.recordNumTime }}</p>
        <p style="font-size:14px;color:#7b7b7b;">检测机构：{{ form.detectionOrg }}</p>
        <p style="font-size:14px;color:#7b7b7b;">认证机构：{{ form.approveOrg }}</p>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <p style="font-size:20px;padding-bottom:5px;">应用权限</p>
        <el-tag v-for="(item,index) in form.appPermissions" :key="index" style="margin-right:5px;margin-bottom:5px;border-radius:15px;">{{ item }}</el-tag>
      </el-col>
    </el-row>
    <br>
    <el-row style="text-align:center">
      <el-button type="primary" round @click="downfun"> 下载（{{ form.fileSize }}）</el-button>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      fullscreen
      center
    >
      <el-image
        style="width:100%"
        :src="imgUrl"
      />
    </el-dialog>
  </el-card>
</template>
<script>
// import { getxiangqing } from '@/xiangqing'
import { searchModelone } from '@/api/appbeian'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      dialogVisible: false,
      IsloadingA: false,
      imgUrl: '',
      swiperOptions: {
        slidesPerView: 1.6,
        spaceBetween: 20
        // // 自动播放设置
        // autoplay: {
        //   stopOnLastSlide: false,
        //   delay: 1000
        // }
      },
      // 是否展示所有文本内容
      showTotal: true,
      // 显示展开还是收起
      exchangeButton: true,
      // 是否显示展开收起按钮
      showExchangeButton: false,
      rem: '',
      form: {
        rinm: '',
        downloads: '',
        preview: '',
        appName: '',
        attachId: '',
        description: '',
        fileSize: '',
        appVersion: '',
        recordNumTime: '',
        recordNumber: '',
        detectionOrg: '',
        approveOrg: '',
        fileList: [],
        appPermissions: []
      }
    }
  },
  watch: {
    'form.description': function() {
      this.$nextTick(function() {
        // 判断介绍是否超过四行
        const rem = parseFloat(this.getRem())
        if (!this.$refs.desc) {
          return
        }
        const descHeight = window.getComputedStyle(this.$refs.desc).height.replace('px', '')
        if (descHeight > 5.25 * rem) {
          // 显示展开收起按钮
          this.showExchangeButton = true
          this.exchangeButton = true
          // 不是显示所有
          this.showTotal = false
        } else {
          // 不显示展开收起按钮
          this.showExchangeButton = false
          // 没有超过四行就显示所有
          this.showTotal = true
        }
      }.bind(this))
    }
  },
  created() {
    this.getxiangqing()
  },
  methods: {
    getxiangqing() {
      this.IsloadingA = true
      searchModelone(this.$route.query.id).then(res => {
        this.IsloadingA = false
        res.appPermissions = res.appPermissions.split(',')
        this.form = res
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    downfun(id) {
      location.href = `nifaRecordQuery/mftps/download/${this.form.attachId}`
    },
    fn(url) {
      var win = window.open(url)
      win.document.title = 'testing'
      setTimeout(() => {
        win.document.title = '大图预览'
      }, 1000)
      // this.dialogVisible = true
      // this.imgUrl = url
    },
    showTotalIntro() {
      this.showTotal = !this.showTotal
      this.exchangeButton = !this.exchangeButton
    },
    getRem() {
      const defaultRem = 16
      const winWidth = window.innerWidth
      console.log('winWidth:' + winWidth)
      const rem = winWidth / 375 * defaultRem
      return rem
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.xiangStyle{
  p{
      margin: 4px 2px;
  }
  .el-page-header__left .el-icon-back{
    font-size: 30px;
    margin-right: 0px;
  }
  .el-page-header{
    line-height: 32px;
  }
  .el-page-header__content{
    font-size: 25px;
    font-weight: normal;
  }
  .el-page-header__left::after {
    display: none;
  }
  .el-page-header__left{
    margin-right: 10px;
  }
  .el-collapse-item__header{
    font-size: 20px;
    font-weight: inherit;
  }
    .total-introduce {
    height: auto;
    overflow: hidden;
    font-size: 14px;
    color: #7b7b7b;
    .intro-content {
      .merchant-desc {
        width: 100%;
        line-height: 21px;
      }
    }
    .unfold {
      display: block;
      z-index: 11;
      float: right;
      width: 40px;
      height: 21px;
      p {
        margin: 0;
        line-height: 21px;
        color: #7fbe87;
      }
    }
  }
  .detailed-introduce {
    font-size: 14px;
    color: #7b7b7b;
    position: relative;
    overflow: hidden;
    .intro-content {
      // 最大高度设为4倍的行间距
      max-height: 63px;
      line-height: 21px;
      word-wrap: break-word;
      /*强制打散字符*/
      word-break: break-all;
      background: #ffffff;
      /*同背景色*/
      color: #ffffff;
      overflow: hidden;
      .merchant-desc {
        width: 100%;
        line-height: 21px;
      }
      &:after,
      // 这是展开前实际显示的内容
      &:before {
        content: attr(title);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        color: #7b7b7b
        // overflow: hidden;
      }
       // 把最后最后一行自身的上面三行遮住
      &:before {
        display: block;
        overflow: hidden;
        z-index: 1;
        max-height: 43px;
        background: #ffffff;
      }
      &:after {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 81px;
        /*截取行数*/
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
        text-indent: -12em;
        /*尾部留空字符数*/
        padding-right: 4em;
      }
      .unfold {
        z-index: 11;
        width: 40px;
        height: 21px;
        outline: 0;
        position: absolute;
        right: 0;
        bottom: 0;
        p {
          margin: 0;
          line-height: 21px;
          color: #7fbe87;
        }
      }
    }
  }
  .el-carousel__indicators--outside,.el-carousel__arrow--right,.el-carousel__arrow--left{
    display: none;
  }
}
</style>
