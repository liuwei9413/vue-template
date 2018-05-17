<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          fixed
          prop="operID"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="updateTs"
          :formatter="updateTsFormat"
          label="更新时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="thorTotalTrans"
          label="交易笔数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="交易总金额"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="操作人"
          min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.operExportUser }}；{{ scope.row.operSendUser }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当前进度"
          width="150">
          <template slot-scope="scope">
            <span>{{ statusToStr(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="240">
          <template slot-scope="scope">
            <el-button @click="download(scope.row)" type="text" size="small">
              <a class="download" :href="scope.row" download>下载报表与日志</a>
            </el-button>
            <el-button type="text" size="small" v-if="scope.row.status === '7'" @click="checkUnusualPopup(scope.row)">确认异常已处理</el-button>
            <el-button type="text" size="small" v-if="scope.row.status === '11'" @click="openUploadDialog(scope.row)">上传补打款文件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer class="list-footer" v-if="total > 0">
      <el-pagination background :page-size=pagesize :current-page.sync="page" @current-change="pageChange" layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </footer>
    <!-- 上传弹框 -->
    <el-dialog title="上传补打款文件" :visible.sync="dialogUploadVisible" :close-on-click-modal="false">
      <el-upload
        drag
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-remove="onRemove"
        accept="application/json"
        :action="uploadUrl">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传json文件，且不超过5M</div>
      </el-upload>
      <!-- <div class="item-button" v-if="uploadStatus">
        <el-button type="primary" @click="validateFilePopup()">确认文件，开始合规校验</el-button>
      </div> -->
    </el-dialog>
    <!-- 审核异常已处理身份验证弹框 -->
    <el-dialog class="dialog-check" title="请超级管理员输入账户密码" center :visible.sync="checkUnusualPopupStatus" :close-on-click-modal="false" width="460px">
      <p class="subtitle">是否确认已处理好异常交易{{blockRange}}，并允许新交易覆盖区块高度？</p>
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
import {scrollToTop, statusToStr, dateFormat} from '@/utils'

export default {
  name: 'TransactionRecords',
  data() {
    return {
      tableData: [], // 列表
      total: 0, // 总数
      pagesize: 20, // 每页条数
      page: 1, // 当前页码
      operid: '', // 当前交易操作id
      loading: false, // loading图状态
      dialogUploadVisible: false, // 上传文件功能弹框
      uploadUrl: '', // 上传补打款文件地址
      // uploadStatus: false, // 文件是否已成功上传
      checkUnusualPopupStatus: false, // 审核异常已处理弹框状态
      blockRange: '', // 区块范围
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
  },
  mounted() {
    console.log('mounted')
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      scrollToTop() // 滚动到顶部
      this.loading = true
      const params = {
        page: this.page,
        pagesize: this.pagesize
      }
      this.$axios.getTransactionList(params)
        .then((res) => {
          console.log(params)
          this.loading = false
          this.total = res.data.total
          this.tableData = res.data.history
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    },
    // 分页切换
    pageChange() {
      this.getList()
    },
    // unix时间戳转换为指定格式
    updateTsFormat(row, column, value) {
      return dateFormat(value, 'yyyy-MM-dd h:m')
    },
    // 状态值转换
    statusToStr(status) {
      return statusToStr(status)
    },
    // 下载
    download() {},
    // 打开上传弹框
    openUploadDialog(row) {
      this.dialogUploadVisible = true
      this.operid = row.operID
      this.uploadUrl = `${this.baseURL}api/v1/thor/manualfile/${this.operid}`
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
      this.getList() // 重新获取列表
      // this.uploadStatus = true
    },
    // 文件上传失败
    onError() {
      this.$message({
        message: '上传失败，请仔细校验后上传',
        type: 'error'
      })
      // this.uploadStatus = false
    },
    // 取消已上传文件，重新上传
    onRemove(file) {
      this.$message({
        message: '已取消上传'
      })
      // this.uploadStatus = false
    },
    // 审核异常已处理弹框
    checkUnusualPopup(row) {
      this.checkUnusualPopupStatus = true
      this.operid = row.operID
      this.blockRange = `${row.range.from}-${row.range.to}`
    },
    // 审核异常已处理 身份认证表单提交
    submitForm(formName) {
      const params = {
        signin: this.signin,
        operid: this.operid
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.login(params)
            .then((res) => {
              this.checkUnusualPopupStatus = false
              this.$alert('异常审核已确认', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.getList() // 重新获取列表
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
