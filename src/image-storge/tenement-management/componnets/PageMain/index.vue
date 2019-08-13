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
      <el-table-column label="租户名称" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="name"/>
      <el-table-column label="租户简称" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="abbreviation"/>
      <el-table-column label="租户地址" min-width="70" :show-overflow-tooltip="true" align="center"
                       prop="address"/>
      <el-table-column label="租户电话" min-width="60" :show-overflow-tooltip="true" align="center"
                       prop="telephone"/>

      <el-table-column label="操作" min-width="70" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
          <el-button type="primary" size="mini" @click="del(scope.row.id)">删除</el-button>
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
    /**
     * 删除租户
     **/
    del (id) {
      this.$emit('del', id)
    },
    /**
     * 修改租户
     **/
    edit (id) {
      this.$emit('edit', id)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
