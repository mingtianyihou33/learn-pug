<template>
  <div class="table-pagination-warp">
    <el-pagination @size-change="pageSizesChange" @current-change="pageChange" :current-page=options.page
                   :page-sizes=options.sizes :page-size=options.size :layout=options.layout :total=options.total>
    </el-pagination>

  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    pageOption: {
      default: () => ({
        page: 1,
        size: 20,
        total: 0
      })
    }
  },
  methods: {
    // 翻页回调
    pageChange (pageNum) {
      this.$emit('change', { page: pageNum, size: this.pageOption.size, total: this.pageOption.total })
    },
    // 每页记录条数改变回调
    pageSizesChange (size) {
      this.$emit('change', { page: this.pageOption.page, size: size, total: this.pageOption.total })
    }
  },
  computed: {
    options () {
      return Object.assign({
        total: 0,
        batch: 20,
        sizes: [2, 3, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next,jumper'
      }, this.pageOption)
    }
  }
}
</script>
<style lang="scss" scoped>
  .table-pagination-warp {
    width: 100%;
    padding: 20px 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
