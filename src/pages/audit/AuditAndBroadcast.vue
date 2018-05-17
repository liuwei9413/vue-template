<template>
  <div v-loading="loading" class="content-box-wrap">
    <!-- 状态：文件已生成、已下载、已上传、审核异常已处理 -->
    <div class="content-box" v-if="status === '2' || status === '4' || status === '5' || status === '8'">
      <p class="step-title">Step3.1：请选择待验证、广播的已签名交易文件</p>
      <div class="file-box">
        <p class="item-label">当前交易：</p>
        <transaction-table :table-data="tableData"></transaction-table>
        <p class="item-label">请导入刚已签名的交易文件：</p>
        <div class="upload-box">
          <el-upload
            drag
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-remove="onRemove"
            :on-error="onError"
            accept="application/json"
            :with-credentials="true"
            :action="uploadUrl">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传json文件，且不超过5M</div>
          </el-upload>
        </div>
      </div>
      <div class="item-button" v-if="uploadStatus">
        <el-button type="primary" @click="validateFilePopup()">确认文件，开始合规校验</el-button>
      </div>
    </div>
    <!-- 状态：文件合规校验中 -->
    <div class="content-box" v-if="status === '6'">
      <p class="step-title">Step3.2：文件合规校验</p>
      <div class="file-box">
        <p class="item-label">当前交易：</p>
        <transaction-table :table-data="tableData"></transaction-table>
        <p class="item-label">已签名的交易文件：</p>
        <p class="file-info">{{fileNameAndType}}</p>        
      </div>
      <div class="loading" v-loading="status === '6'" :element-loading-text="validateFileLoadingText" element-loading-background="rgba(0, 0, 0, 0.0)"></div>
      <div class="item-footer">
        <p class="status-info">等待校验结果...</p>
      </div>
    </div>
    <!-- 状态：校验成功广播中 -->
    <div class="content-box" v-if="status === '9'">
      <p class="step-title">Step3.3：验证通过，广播交易</p>
      <div class="file-box">
        <p class="item-label">当前交易：</p>
        <transaction-table :table-data="tableData"></transaction-table>
        <p class="item-label">已签名的交易文件：</p>
        <p class="file-info">{{fileNameAndType}}</p>        
      </div>
      <div class="loading" v-loading="status === '9'" :element-loading-text="broadcastFileLoadingText" element-loading-background="rgba(0, 0, 0, 0.0)"></div>
      <div class="item-footer">
        <p class="status-info status-success">本文件中的所有交易已验证全部合规<br>正在广播中...</p>
      </div>
    </div>
    <!-- 状态：交易完成 -->
    <div class="content-box" v-if="status === '10'">
      <p class="step-title">交易完成</p>
      <div class="file-box">
        <p class="item-label">当前交易：</p>
        <transaction-table :table-data="tableData"></transaction-table>
        <p class="item-label">已签名的交易文件：</p>
        <p class="file-info">{{fileNameAndType}}</p>        
      </div>
      <div class="text-center">
        <el-button type="primary" @click="next()">完成，开始下一笔</el-button>
      </div>
      <div class="text-center">
        <el-button type="text">
          <a class="download" :href="downloadUrl" download>下载交易报表与日志到本地</a>
        </el-button>
      </div>
      <div class="item-footer">
        <p class="status-info">本文件中的所有交易已验证全部广播成功！<br>交易报表已邮件发放给所有干系人邮箱！</p>
      </div>
    </div>
    <!-- 状态：校验异常处理 -->
    <div class="content-box" v-if="status === '7'">
      <p class="step-title">Step3.2：文件合规校验</p>
      <div class="file-box">
        <p class="item-label">当前交易：</p>
        <transaction-table :table-data="tableData"></transaction-table>
        <p class="item-label">已签名的交易文件：</p>
        <p class="file-info">{{fileNameAndType}}</p>        
      </div>
      <div class="text-center">
        <el-button type="danger" @click="checkUnusualPopup()">审核异常已处理</el-button>
      </div>
      <div class="text-center">
        <el-button type="text">
          <a class="download" :href="downloadUrl" download>下载交易报表与日志到本地</a>
        </el-button>
      </div>
      <div class="item-footer">
        <p class="status-info">文件不合规！<br>日志文件已保存，以邮件发放给所有干系人邮箱！</p>
      </div>
    </div>
    <!-- 状态：交易部分完成 -->
    <div class="content-box" v-if="status === '11' || status === '12'">
      <p class="step-title">交易部分完成</p>
      <div class="file-box">
        <p class="item-label">当前交易：</p>
        <transaction-table :table-data="tableData"></transaction-table>
        <p class="item-label">已签名的交易文件：</p>
        <p class="file-info">{{fileNameAndType}}</p>        
      </div>
      <div class="text-center">
        <el-button type="primary" @click="next()">完成，开始下一笔</el-button>
      </div>
      <div class="text-center">
        <el-button type="text">
          <a class="download" :href="downloadUrl" download>下载交易报表与日志到本地</a>
        </el-button>
      </div>
      <div class="item-footer">
        <p class="status-info">本文件中的大部分交易已验证全部广播成功！<br>交易报表已邮件发放给所有干系人邮箱！<br>请下载广播失败的交易文件，人工处理相关业务。</p>
      </div>
    </div>
    <!-- 状态：生成中、生成失败、区块内没有需要置换的交易 -->
    <div class="content-box" v-if="status === '1' || status === '3' || status === '13'">
      <p class="step-title">Step3.1：请选择待验证、广播的已签名交易文件</p>
      <div class="file-box">
        <p class="item-label">当前交易：</p>
        <transaction-table :table-data="tableData"></transaction-table>
      </div>
      <div class="reload">
        <el-button type="primary" @click="reload()">刷新页面</el-button>
      </div>
    </div>
    <!-- 审核异常已处理身份验证弹框 -->
    <el-dialog class="dialog-check" title="请超级管理员输入账户密码" center :visible.sync="checkUnusualPopupStatus" :close-on-click-modal="false" width="460px">
      <p class="subtitle">是否确认已处理好异常交易，并允许新交易覆盖区块高度？</p>
      <el-form :model="signin" :rules="rules" ref="ruleForm">
        <el-form-item label="账号：" label-width="80px" prop="username">
          <el-input v-model="signin.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="80px" prop="password">
          <el-input v-model="signin.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="w200" type="danger" @click="submitForm('ruleForm')">审核异常已处理</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/css/page.css'
import TransactionTable from '@/components/TransactionTable.vue'

export default {
  name: 'AuditAndBroadcast',
  components: {
    TransactionTable
  },
  data() {
    return {
      loading: false, // loading图
      status: '', // 当前交易状态
      operid: '', // 当前交易id
      tableData: [], // 当前交易信息
      fileNameAndType: '', // 上传文件名.格式
      uploadUrl: '', // 上传地址
      uploadStatus: false, // 文件是否已成功上传
      dateRange: '', // 起止日期
      validateFileLoadingText: '', // 校验loading提示文字
      validateFileTimer: null, // 校验文件定时器
      broadcastFileLoadingText: '', // 广播loading提示文字
      broadcastFileTimer: null, // 广播文件定时器
      checkUnusualPopupStatus: false, // 审核异常已处理弹框状态
      downloadUrl: '', // 下载地址
      // blockRange: '', // 区块范围
      signin: { // 管理员登录信息
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getLatestTransaction()
  },
  mounted() {
  },
  methods: {
    // 获取最近一笔operid
    getLatestTransaction() {
      this.loading = true
      this.$axios.getLatestTransaction()
        .then((res) => {
          this.loading = false
          this.operid = res.data.operID
          this.getNowTransaction()
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 获取当前交易基本信息
    getNowTransaction() {
      const params = {
        operid: this.operid
      }
      this.loading = true
      this.$axios.getNowTransaction(params)
        .then((res) => {
          this.loading = false
          this.status = res.data.status
          this.tableData = []
          this.tableData.push(res.data)
          this.fileNameAndType = res.data.filename
          this.dateRange = `${res.data.beginDate}至${res.data.endDate}`
          this.uploadUrl = `${this.baseURL}api/v1/thor/${this.operid}/signfile`
          if (this.status === '2') { // 已生成文件待上传
          } else if (this.status === '6') { // 审核中...
            // this.validateFile()
            // clearInterval(this.validateFileTimer)
            // this.validateFileTimer = setInterval(this.validateFile, 5000)
            // this.validateFile()
            this.validateFileLoadingText = `文件合规校验中...进度：${res.data.process}/${res.data.total}`
            clearInterval(this.validateFileTimer)
            this.validateFileTimer = setInterval(this.getNowTransaction, 5000)
          } else if (this.status === '9') { // 广播中...
            // this.broadcastFile()
            // clearInterval(this.broadcastFileTimer)
            // this.validateFileTimer = setInterval(this.broadcastFile, 5000)
            clearInterval(this.validateFileTimer)
            clearInterval(this.broadcastFileTimer)
            this.broadcastFileLoadingText = `交易广播中...进度：${res.data.process}/${res.data.total}`
            this.broadcastFileTimer = setInterval(this.getNowTransaction, 5000)
          } else if (this.status === '10') { // 交易完成
            clearInterval(this.broadcastFileTimer)
            this.downloadUrl = `${this.baseURL}${res.data.downloadUrl}`
          } else if (this.status === '7') { // 校验失败
            clearInterval(this.validateFileTimer)
            this.downloadUrl = `${this.baseURL}${res.data.downloadUrl}`
            // this.blockRange = `${res.data.range.from}-${res.data.range.to}`
          } else if (this.status === '11' || this.status === '12') { // 部分交易完成 部分广播失败
            clearInterval(this.broadcastFileTimer)
            this.downloadUrl = `${this.baseURL}${res.data.downloadUrl}`
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 文件上传前
    beforeUpload(file) {
      // console.log(file)
      const fileTypeIsLegal = file.type === 'application/json'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!fileTypeIsLegal) {
        this.$message({
          message: '上传文件只能是 json格式!',
          type: 'warning'
        })
      }
      if (!isLt5M) {
        this.$message({
          message: '上传文件大小不能超过 5MB!',
          type: 'warning'
        })
      }
      return fileTypeIsLegal && isLt5M
    },
    // 文件上传成功
    onSuccess(res, file) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      // debugger
      // console.log(res)
      this.uploadStatus = true
      this.fileNameAndType = file.name
    },
    // 文件上传失败
    onError(error) {
      // console.log(error)
      // debugger
      this.$message({
        message: error.message,
        type: 'error'
      })
      this.uploadStatus = false
      this.fileNameAndType = ''
    },
    // 取消已上传文件，重新上传
    onRemove(file) {
      this.$message({
        message: '已取消上传'
      })
      // console.log(file)
      this.uploadStatus = false
      this.fileNameAndType = ''
    },
    // 文件合规校验确认弹框
    validateFilePopup() {
      const params = {
        operid: this.operid
      }
      this.$confirm(`是否确认校验文件：${this.fileNameAndType}<br>确认后将不可再更改交易文件，文件有误将全部门示警。`, '是否确认？', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送校验文件请求
        this.loading = true
        this.$axios.verify(params)
          .then((res) => {
            this.loading = false
            // this.validateFile()
            // clearInterval(this.validateFileTimer)
            // this.validateFileTimer = setInterval(this.validateFile, 5000)
            this.getNowTransaction()
          })
          .catch(() => {
            this.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消校验'
        })
      })
    },
    // 校验文件
    validateFile() {
      this.loading = true
      const params = {operid: this.operid}
      this.$axios.getNowTransaction(params)
        .then((res) => {
          this.loading = false
          this.status = res.data.status
          if (res.data.status === '6') { // 校验中...
            this.validateFileLoadingText = `文件合规校验中...进度：${res.data.progressInfo.progress}/${res.data.progressInfo.total}`
          } else if (res.data.status === '7') { // 校验失败
            clearInterval(this.validateFileTimer)
          } else if (res.data.status === '9') { // 校验成功 广播中...
            clearInterval(this.validateFileTimer)
            this.broadcastFile()
            clearInterval(this.broadcastFileTimer)
            this.broadcastFileTimer = setInterval(this.broadcastFile, 5000)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 广播文件
    broadcastFile() {
      const params = {}
      this.loading = true
      this.$axios.getNowTransaction(params)
        .then((res) => {
          this.loading = false
          this.status = res.data.status
          if (res.data.status === '9') { // 状态：广播中
            this.broadcastFileLoadingText = `交易广播中...进度：${res.data.progressInfo.progress}/${res.data.progressInfo.total}`
          } else if (res.data.status === '11') { // 状态：广播部分失败
            clearInterval(this.broadcastFileTimer)
          } else if (res.data.status === '10') { // 状态：交易完成
            clearInterval(this.broadcastFileTimer)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 开始下一笔交易
    next() {
      // location.reload()
      this.getLatestTransaction()
    },
    // 刷新
    reload() {
      location.reload()
    },
    // 审核异常已处理弹框
    checkUnusualPopup() {
      this.checkUnusualPopupStatus = true
    },
    // 审核异常已处理 身份认证表单提交
    submitForm(formName) {
      const params = {
        signin: this.signin,
        operid: this.operid
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.reset(params).then((res) => {
            this.checkUnusualPopupStatus = false
            this.$alert('异常处理已审核，本次交易结束', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.getLatestTransaction() // 流程重新开始
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
