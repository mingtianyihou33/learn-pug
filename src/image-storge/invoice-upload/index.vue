<!-- 票据录入 --->
<template lang="pug">
  d2-container
    page-header(slot="header" @submit="queryTableData" ref="header")
    page-main(:table-data="table" :loading="loading")
    page-footer(slot="footer" :pageOption="pageInfo" @change="handlePaginationChange")
</template>
<script>
import PageHeader from './componnets/PageHeader/index'
import PageMain from './componnets/PageMain/index'
import PageFooter from './componnets/PageFooter/index'
import { UploadListQuery } from '@api/image-storge/invoice.upload'

export default {
  name: 'invoiceUpload', // 票据录入
  mixins: [],
  components: { PageHeader, PageMain, PageFooter },
  data () {
    return {
      table: [],
      loading: false,
      pageInfo: {
        page: 1,
        size: 20,
        total: 100
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 查询列表数据
     **/
    queryTableData (form) {
      if (!form) {
        form = this.$refs.header.form
      }
      this.loading = true
      UploadListQuery({ ...form, ...this.pageInfo }).then(res => {
        this.table = res.detail
        this.pageInfo.total = res.total
        this.loading = false
      })
    },
    /**
     * 页码信息改变
     * @param pageInfo
     */
    handlePaginationChange (pageInfo) {
      this.pageInfo = pageInfo
      this.queryTableData()
    }
  },
  created () {
  },
  mounted () {
    this.queryTableData()
  }
}
</script>
<style lang="scss">
  @import "../scss/atom";
  @import "../scss/scroll";
</style>
