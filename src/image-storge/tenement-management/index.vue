<!-- 租户管理 --->
<template>
  <d2-container>
    <page-header slot="header"
                 @submit="queryTableData"
                 @add="addOrEdit"
                 @del="del"
                 ref="header"></page-header>
    <page-main :table-data="table" ref="main"
               @del="del"
               :loading="loading" @edit="addOrEdit"></page-main>
    <page-footer slot="footer"
                 :pageOption="pageInfo"
                 @change="handlePaginationChange"></page-footer>
  </d2-container>
</template>
<script>
import PageHeader from './componnets/PageHeader/index'
import PageMain from './componnets/PageMain/index'
import PageFooter from './componnets/PageFooter/index'
import { QueryTenement, DelTenement } from '@api/image-storge/tenement'

export default {
  name: 'tenementManagement',
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
     * 查询
     **/
    queryTableData (form) {
      if (!form) {
        form = this.$refs.header.form
      }
      this.loading = true
      QueryTenement({ ...form, ...this.pageInfo }).then(res => {
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
    },
    /**
     * 添加租户
     */
    addOrEdit (id) {
      if (id) { // 编辑租户
        this.$router.push({ name: 'image-storge-tenement-edit', params: { id } })
      } else { // 新增用户
        this.$router.push({ name: 'image-storge-tenement-add' })
      }
    },
    /**
     * 删除租户
     * @param id
     */
    del (id) {
      let ids
      if (id) { // 删除单个租户
        ids = [id]
      } else {
        ids = this.$refs.main.multipleSelection.map(item => item.id)
        if (!ids || ids.length === 0) {
          this.$message('请选择要删除的租户')
          return
        }
      }
      DelTenement({ ids }).then(res => {
        this.$message('删除成功')
        this.queryTableData()
      }).catch(e => {
      })
    }
  },
  created () {
  },
  mounted () {
    this.queryTableData()
  }
}
</script>

<style lang="scss" scoped>

</style>
