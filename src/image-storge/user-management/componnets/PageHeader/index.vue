<template>
  <div>
    <el-form
            ref="form"
            :inline="true"
            :model="form"
            size="mini"
            style="margin-bottom: -18px;">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.name" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
                type="primary"
                @click="handleFormSubmit">
          <d2-icon name="search"/>
          查询
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button
                @click="handleFormReset">
          <d2-icon name="refresh"/>
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-row class="mt10">
      <el-button type="primary" size="mini" @click="add">新增</el-button>
      <el-button type="primary" size="mini" @click="del">删除</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: { // 搜索条件
        name: '' // 用户名称
      }
    }
  },
  methods: {
    /**
     * 添加
     **/
    add () {
      this.$emit('add')
    },
    /**
     * 删除
     **/
    del () {
      this.$emit('del')
    },
    /**
     * 查询
     */
    handleFormSubmit () {
      this.$emit('submit', this.form)
    },
    /**
     * 重置查询条件
     */
    handleFormReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
