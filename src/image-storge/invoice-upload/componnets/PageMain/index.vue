<template>
  <div>
    <el-table
            :data="currentTableData"
            v-loading="loading"
            size="mini"
            stripe
            style="width: 100%;"
            @selection-change="handleSelectionChange">
      <el-table-column
              type="selection"
              width="30">
      </el-table-column>
      <el-table-column label="发票类型" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="invoiceTypeName"/>
      <el-table-column label="消费类型" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="consumeTypeName"/>
      <el-table-column label="发票号码" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="invoiceCode"/>
      <el-table-column label="开票日期" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="dateOfIssue"/>
      <el-table-column label="校验码" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="checkCode"/>
      <el-table-column label="税前金额" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="pretaxAmount"/>
      <el-table-column label="税额" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="tax"/>
      <el-table-column label="税后金额" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="afterTaxAmount"/>
      <el-table-column label="税额" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="tax"/>
      <el-table-column label="查验状态" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="examineStatusName"/>

      <el-table-column label="操作" min-width="70" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInvoiceDetail(scope.row.id)">发票详情</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data () {
    return {
      currentTableData: [],
      multipleSelection: []
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showInvoiceDetail (id) {

    }
  }
}
</script>
