<!-- 添加或编辑用户 -->
<template>
  <d2-container
          type="card"
          class="page">
    <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            class="page--form">
      <el-form-item label="租户名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="租户简称" prop="abbreviation">
        <el-input v-model="form.abbreviation"/>
      </el-form-item>
      <el-form-item label="租户地址" prop="address">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="租户电话" prop="telephone">
        <el-input v-model="form.telephone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSubmit">{{form.id ? '修改':'新增'}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
import { AddOrUpdateTenement, QueryTenementDetail } from '@api/image-storge/tenement'

export default {
  name: 'addOrEdit',
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    const id = to.params.id
    next(instance => {
      instance.resetFormData()
      instance.getFormData(id)
    })
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    const id = to.params.id
    next(instance => {
      instance.resetFormData()
      instance.getFormData(id)
    })
  },
  data () {
    return {
      form: {
        id: '',
        name: '', // 租户名称
        abbreviation: '', // 租户简称
        address: '', // 租户地址
        telephone: '' // 租户电话
      },
      rules: {
        name: [{ required: true, message: '请输入租户名称', trigger: 'blur' }],
        abbreviation: [{ required: true, message: '请输入租户简介', trigger: 'blur' }],
        address: [{ required: true, message: '请输入租户地址', trigger: 'blur' }],
        telephone: [{ required: true, message: '请输入租户电话', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('d2admin/page', ['closeCurrent']),
    // [业务逻辑] 重置表单
    resetFormData () {
      Object.assign(this.$data.form, this.$options.data().form)
    },
    // [业务逻辑] 根据 id 获取数据
    getFormData (id) {
      if (id) {
        QueryTenementDetail({ id }).then(res => {
          this.form = res.detail
        }).catch(e => {
        })
      }
    },
    // [业务逻辑] 提交
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          AddOrUpdateTenement({ ...this.form }).then(res => {
            if (this.form.id) {
              this.$message('修改成功')
            } else {
              this.$message('保存成功')
            }
            setTimeout(this.closeCurrent, 1000)
          }).catch(e => {
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
