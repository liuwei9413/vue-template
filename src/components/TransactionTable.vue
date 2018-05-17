<template>
  <el-table class="file-table"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="operID"
      label="id"
      width="80">
    </el-table-column>
    <el-table-column
      label="时间范围"
      width="">
      <template slot-scope="scope">
        <span>{{ scope.row.beginDate }}至{{ scope.row.endDate }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="thorTotalTrans"
      label="交易笔数">
    </el-table-column>
    <el-table-column
      prop="totalAmount"
      label="交易总金额">
    </el-table-column>
    <el-table-column
      label="当前进度">
      <template slot-scope="scope">
        <span>{{ statusToStr(scope.row.status) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import '@/css/page.css'
import {statusToStr} from '@/utils'

export default {
  props: {
    tableData: Array
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    statusToStr(status) {
      return statusToStr(status)
    }
  }
}
</script>
