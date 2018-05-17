<template>
  <div v-loading="loading" class="content-box-wrap">
    <!-- 状态：交易完成 准备生成待签名文件 -->
    <div class="export-file-wrap content-box" v-if="tabIndex === '1'">
      <p class="step-title">Step1.1：设置时间范围，导出待签名文件</p>
      <div class="item-text">
        <span class="label-text">起始时间：</span>
        <span class="nums">{{ beginDate }}</span>
        <span class="remark">上一次批量交易的截止时间为{{ latestEndDate }}</span>
      </div>
      <div class="item-text">
        <span class="label-text">截止日期：</span>
        <span class="nums">
          <!-- <el-input class="end-height" v-model="inputDate" placeholder="" size="mini" @blur="validateNums()"></el-input> -->

          <el-date-picker
            v-model="inputDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>

          <!-- <span class="el-form-item__error disnone" :class="{'disblock': !inputDateIsLegal && inputDateOnBlur}">请输入大于起始高度，小于当前高度值以内的合法整数</span> -->
        </span>
        <span class="remark">
          建议每周周一处理上周7天交易，距离上一次截止时间一周的日期为{{ recommendDate }}
        </span>
      </div>
      <div class="item-button">
        <el-button type="primary" @click="exportFilePopup()">生成待签名交易文件</el-button>
      </div>
    </div>
    <!-- 状态：生成中... -->
    <div class="content-box" v-if="tabIndex === '2'">
      <p class="step-title">Step1.1：设置时间范围，导出待签名文件</p>
      <div class="item-text">
        <span class="label-text">起始日期：</span>
        <span class="nums">{{ beginDate }}</span>
        <span class="remark">上一次批量交易的截止时间为{{ latestEndDate }}</span>
      </div>
      <div class="item-text">
        <span class="label-text">结束日期：</span>
        <span class="nums">{{ inputDateResult }}</span>
        <span class="remark">
          建议每周周一处理上周7天交易，距离上一次截止时间一周的日期为{{ recommendDate }}
        </span>
      </div>
      <div class="loading" v-loading="createFileStatus" element-loading-text="文件生成中..." element-loading-background="rgba(0, 0, 0, 0.0)"></div>
    </div>
    <!-- 状态：已生成 -->
    <div class="content-box" v-if="tabIndex === '3'">
      <p class="step-title">Step1.2：下载待签名文件并拷贝粘贴至指定U盘</p>
      <div class="file-box">
        <p class="item-label">待签名文件已生成：</p>
        <p class="file-info">{{fileName}}</p>
        <transaction-table :table-data="tableData"></transaction-table> 
      </div>
      <div class="download">
        <el-button type="primary">
          <a class="download-white" :href="downloadExportFileUrl" download>下载</a>
        </el-button>
      </div>
    </div>
    <!-- 状态：上一笔交易未完成 -->
    <div class="content-box" v-if="tabIndex === '4'">
      <p class="step-title">Step1.1：设置时间范围，导出待签名文件</p>
      <div class="file-box">
        <p class="item-label">最近一笔交易未完成：</p>
        <transaction-table :table-data="lastTableData"></transaction-table>
      </div>
      <p class="unfinished-tip">上一笔交易尚未完成，请完成后，再导出新的代签名文件</p>
      <div class="reload">
        <el-button type="primary" @click="reload()">刷新页面</el-button>
      </div>
    </div>
    <!-- 状态：生成失败 -->
    <div class="content-box" v-if="tabIndex === '5'">
      <p class="step-title">Step1.1：设置时间范围，导出待签名文件</p>
      <div class="item-text">
        <span class="label-text">起始日期：</span>
        <span class="nums">{{ beginDate }}</span>
        <span class="remark">上一次批量交易的截止时间为{{ latestEndDate }}</span>
      </div>
      <div class="item-text">
        <span class="label-text">结束日期：</span>
        <span class="nums">{{ inputDateResult }}</span>
        <span class="remark">
          建议每周周一处理上周7天交易，距离上一次截止时间一周的日期为{{ recommendDate }}
        </span>
      </div>
      <div class="text-center">
        <el-button type="danger" @click="checkUnusualPopup()">确认文件生成异常已处理</el-button>
      </div>
      <div class="text-center">
        <el-button type="text">
          <a class="download" :href="downloadLogFileUrl" download>下载交易报表与日志到本地</a>
        </el-button>
      </div>
    </div>
    <!-- 审核异常已处理身份验证弹框 -->
    <el-dialog class="dialog-check" title="请超级管理员输入账户密码" center :visible.sync="checkUnusualPopupStatus" :close-on-click-modal="false" width="460px">
      <p class="subtitle">是否确认已处理好异常交易{{blockRange}}，并允许新交易覆盖区块高度？</p>
      <el-form :model="signin" :rules="rules" ref="ruleForm">
        <el-form-item label="账号：" label-width="80px" prop="name">
          <el-input v-model="signin.name" auto-complete="off"></el-input>
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
import {addDate, dateFormat} from '@/utils'
import TransactionTable from '@/components/TransactionTable.vue'

export default {
  name: 'Export',
  components: {
    TransactionTable
  },
  data() {
    return {
      loading: false, // loading图
      status: '', // 当前交易状态
      operid: '', // 当前交易操作id
      tabIndex: '', // 当前选项卡下标
      nowDate: dateFormat(parseInt(new Date().getTime() / 1000), 'yyyy-MM-dd'), // 今天的日期
      beginDate: '', // 起始日期
      latestEndDate: '2018-05-07', // 最近一笔交易结束日期
      recommendDate: '', // 推荐日期
      inputDate: '', // 待输入日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      inputDateResult: '', // 后台返回的截止日期
      createFileStatus: true, // 生成文件状态
      checkUnusualPopupStatus: false, // 审核异常已处理弹框状态
      blockRange: '', // 区块范围
      signin: { // 管理员登录信息
        name: '',
        password: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      fileName: '', // 文件名
      downloadExportFileUrl: '', // 下载已生成文件
      downloadLogFileUrl: '', // 下载日志
      tableData: [], // 已生成文件相关交易数据
      lastTableData: [] // 最近一笔未完成交易相关数据
    }
  },
  created() {
  },
  mounted() {
    this.getLatestTransaction()
  },
  methods: {
    // 获取最近一笔交易基本信息
    getLatestTransaction() {
      this.loading = true
      this.$axios.getLatestTransaction()
        .then((res) => {
          this.loading = false
          if (Object.keys(res.data).length > 0) {
            this.latestEndDate = res.data.endDate // 最近一笔交易结束日期
            if (res.data.status <= 5) { // 未完成并未开始审核
              this.operid = res.data.operID // 最近一笔交易操作id
              this.getNowTransaction()
            } else if (res.data.status >= 6 && res.data.status <= 9) { // 最近一笔交易开始审核并未完成
              this.lastTableData = []
              this.lastTableData.push(res.data)
              this.tabIndex = '4'
            } else if (res.data.status >= 10) { // 已完成
              this.beginDate = addDate(res.data.endDate)
              this.recommendDate = addDate(res.data.endDate, 7)
              this.inputDate = this.nowDate > this.recommendDate ? this.recommendDate : this.nowDate
              this.tabIndex = '1'
            }
          } else { // 第一次创建交易 无latest记录
            this.beginDate = addDate(this.latestEndDate)
            this.recommendDate = addDate(this.latestEndDate, 7)
            this.inputDate = this.nowDate > this.recommendDate ? this.recommendDate : this.nowDate
            this.tabIndex = '1'
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 获取当前交易基本信息
    getNowTransaction() {
      this.loading = true
      const params = {
        operid: this.operid
      }
      this.$axios.getNowTransaction(params)
        .then((res) => {
          this.loading = false
          if (res.data.status === '1') { // 生成中
            this.beginDate = res.data.beginDate
            this.inputDateResult = res.data.endDate
            this.tabIndex = '2'
            this.loopExportFileStatus()
          } else if (res.data.status === '2' || res.data.status === '4') { // 已生成 已下载
            this.tabIndex = '3'
            this.tableData = []
            this.tableData.push(res.data)
            this.fileName = res.data.filename
            this.downloadExportFileUrl = res.data.downloadUrl
          } else if (res.data.status === '3') { // 生成失败
            this.tabIndex = '5'
            this.blockRange = `${res.data.beginDate}-${res.data.endDate}`
            this.beginDate = res.data.beginDate
            this.inputDateResult = res.data.endDate
          } else if (res.data.status === '13') { // 生成失败
            // removeStorage('operid') // 重置operid
            this.$alert('您输入的以太坊高度区间内，无置换交易。本次批量操作已完成。', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.getLatestTransaction() // 流程重新开始
                // location.reload()
              }
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 获取区块高度范围
    // getBlockRange() {
    //   const params = {}
    //   this.$axios.getBlockHeightInfo(params)
    //     .then((res) => {
    //       this.beginDate = res.data.from || ''
    //       this.latestHeight = res.data.latest || ''
    //       this.endDate = res.data.to || ''
    //     })
    // },
    // 验证输入
    // validateNums() {
    //   this.inputDateOnBlur = true
    //   if (this.inputDate > this.beginDate && this.inputDate < this.endDate) {
    //     this.inputDateIsLegal = true
    //   } else {
    //     this.inputDateIsLegal = false
    //   }
    // },
    // 生成文件确认弹框
    exportFilePopup() {
      // this.validateNums()
      // if (this.inputDateIsLegal) {
      this.$confirm('是否确认生成待签名交易文件？<br>生成后不可撤回，必须完成全部置换流程。', '是否确认？', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送生成文件请求
        this.exportFile()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消生成'
        })
      })
      // }
    },
    // 生成待签名文件
    exportFile() {
      const params = {
        beginDate: this.beginDate,
        endDate: this.inputDate
      }
      this.loading = true
      this.$axios.exportFile(params)
        .then((res) => {
          this.loading = false
          this.operid = res.data.operid
          // setStorage('operid', this.operid)
          // this.tabIndex = '2'
          // this.inputDateResult = this.inputDate
          this.getNowTransaction()
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 每10s查询一次文件生成状态
    loopExportFileStatus() {
      let timer = null
      // const params = {
      //   operid: this.operid
      // }
      timer = setInterval(() => {
        clearInterval(timer)
        this.getNowTransaction()
        // this.$axios.getNowTransaction(params).then((res) => {
        //   if (res.data.status === '2') { // 已生成
        //     this.tabIndex = '3'
        //     this.tableData = []
        //     this.tableData.push(res.data)
        //     this.fileName = res.data.progressInfo.data.signfile.filename
        //     this.downloadExportFileUrl = res.data.progressInfo.data.signfile.url
        //   } else if (res.data.status === '1') { // 生成中
        //     this.tabIndex = '2'
        //     this.loopExportFileStatus()
        //   }
        // }, (error) => {
        //   console.log(error)
        // })
      }, 10000)
    },
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
          // this.loading = true
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
            .catch(() => {
              // this.loading = false
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
