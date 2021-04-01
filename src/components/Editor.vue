<template>
  <div ref="container" style="text-align:left;width:100%;word-break:break-all" />
</template>

<script>
import E from 'wangeditor'
import { getToken } from '@/utils/auth.js'
// https://www.kancloud.cn/wangfupeng/wangeditor3/332599
function parseDom(str) {
  const ele = document.createElement('div')
  ele.innerHTML = str
  return ele.childNodes
}
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: Boolean,
      default: true
    },
    video: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    mobileFilter: {
      type: Boolean,
      default: false
    },
    contentHeight: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isPc: true
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.setContent(newValue)
      },
      immediate: false
    }
  },
  mounted() {
    this.editor = new E(this.$refs.container)
    // this.editor.customConfig.uploadImgShowBase64 = true
    this.editor.customConfig.debug = true
    this.editor.customConfig.showLinkImg = false
    this.editor.customConfig.uploadImgServer = `nifa-autonomy-file/upload/uploadImage?token=${getToken()}`
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.uploadImgTimeout = 3000000
    this.editor.customConfig.zIndex = 0
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024 // 5m
    // 自定义菜单配置
    if (this.title) {
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'table', // 表格
        'video', // 插入视频
        'link', // 插入链接
        'justify', // 对齐方式
        'image', // 插入图片
        'undo', // 撤销
        'redo' // 重复
      ]
      if (!this.video) {
        this.editor.customConfig.menus.splice(this.editor.customConfig.menus.findIndex(item => item === 'video'), 1)
      }
      if (!this.IsPC()) {
        this.editor.customConfig.menus = [
          'head', 'bold', 'fontSize', 'fontName', 'foreColor', 'link', 'justify', 'image']
      }
    } else {
      this.editor.customConfig.menus = []
    }
    this.editor.customConfig.onchange = html => {
      // html 即变化之后的内容
      if (this.mobileFilter) {
        const dom = parseDom('<div>' + html + '</div>')
        html = this.filterMobileImage(dom)
      }
      this.$emit('editorData', html)
    }
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.uploadImgHooks = {
      before: (xhr, editor, files) => {
        console.log('----------before----------')
        console.log(xhr)
        console.log(editor)
        console.log(files)
      },
      success: (xhr, editor, result) => {
        console.log('---------success-----------')
        console.log(xhr, editor, result)
      },
      fail: (xhr, editor, result) => {
        console.log('---------fail-----------')
        console.log(xhr, editor, result)
      },
      error: (xhr, editor) => {
        console.log('---------error-----------')
        console.log(xhr, editor)
      },
      timeout: (xhr, editor) => {
        console.log('--------timeout------------')
        console.log(xhr, editor)
      },
      customInsert: (insertImg, result, editor) => {
        console.log('---------customInsert-----------')
        const url = `nifa-autonomy-file/upload/showImage?imgPathEncode=${result.data.photoLinkPath}&token=${getToken()}`
        insertImg(url)
      }
    }
    // 自定义处理粘贴的文本内容
    this.editor.customConfig.pasteTextHandle = content => {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      if (this.mobileFilter) {
        // 过滤样式适配手机
        const dom = parseDom("<div class='paste'>" + content + '</div>')
        return this.filterMobileImage(dom)
      } else {
        return content
      }
    }
    this.editor.create()
    this.editor.$textElem.attr('contenteditable', !this.disable)
    if (this.contentHeight) {
      const container = document.querySelector('.w-e-text-container')
      container.style.height = this.contentHeight
    }
  },
  methods: {
    IsPC() {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
          this.isPc = false
          break
        } else {
          this.isPc = true
        }
      }
      return this.isPc
    },
    filterMobileImage(dom) {
      const nodeList = dom[0].querySelectorAll('img')
      const imageList = this.ConvertToArray(nodeList)
      imageList.forEach(image => {
        // 去掉图片的固定宽度，改为 100%
        image.removeAttribute('width')
        image.removeAttribute('height')
        // image.style.width = '100%'
      })
      return dom[0].innerHTML
    },
    ConvertToArray(nodes) {
      var array = null
      array = Array.prototype.slice.call(nodes, 0)// 非ie浏览器  ie8-将NodeList实现为COM对象，不能用这种方式检测
      return array
    },
    setContent(html) {
      this.editor.txt.html(html)
    },
    getContent() {
      this.editor.txt.html()
    }
  }
}
</script>

<style scoped>
.w-e-toolbar .w-e-menu{
  z-index: 0
}
</style>
