<template>
  <div class="workfloeStyle">
    <el-dialog title="PDF文件预览" :visible.sync="dialogTableVisible" width="70%" center style="margin-bottom:3vh">
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">
          <el-button type="text" @click="fileDownload">下载文件</el-button>
          <el-button type="text" @click.stop="clock">顺时针旋转</el-button>
          <el-button type="text" @click.stop="counterClock">逆时针旋转</el-button>
        </el-col>
        <el-col :span="15">
          <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="3"><el-button type="text" @click="changePdfPage(0)">上一页</el-button></el-col>
            <el-col :span="3"><el-button type="text" disabled style="color:black">{{ currentPage }} / {{ pageCount }}</el-button></el-col>
            <el-col :span="3"><el-button type="text" @click="changePdfPage(1)">下一页</el-button></el-col>
          </el-row>
        </el-col>
      </el-row>
      <div v-loading="loading">
        <pdf
          :src="src"
          height="300px"
          :page="currentPage"
          :rotate="pageRotate"
          @progress="loadedRatio = $event"
          @num-pages="pageCount=$event"
          @page-loaded="currentPage=$event"
          @loaded="loadPdfHandler"
        />
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="3"><el-button type="text" @click="changePdfPage(0)">上一页</el-button></el-col>
          <el-col :span="3"><el-button type="text" disabled style="color:black">{{ currentPage }} / {{ pageCount }}</el-button></el-col>
          <el-col :span="3"><el-button type="text" @click="changePdfPage(1)">下一页</el-button></el-col>
        </el-row>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: { pdf },
  data() {
    return {
      dialogTableVisible: false,
      loading: false,
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      pageRotate: 0,
      loadedRatio: 0,
      fileID: '',
      src: '' // pdf文件地址
    }
  },
  watch: {
    loadedRatio() {
      if (this.loadedRatio === 1) {
        this.loading = false
      } else {
        this.loading = true
      }
    }
  },
  methods: {
    open(url, fileID) {
      this.dialogTableVisible = true
      this.src = url
      this.fileID = fileID
      this.loadPdfHandler()
    },
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID}`
    },
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    clock() {
      this.pageRotate += 90
    },
    counterClock() {
      this.pageRotate -= 90
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1 // 加载的时候先加载第一页
      this.pageRotate = 0
    }
  }
}
</script>

<style lang="scss">
</style>
