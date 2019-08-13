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
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="用户简称" prop="abbreviation">
        <el-input v-model="form.abbreviation"/>
      </el-form-item>
      <el-form-item label="用户电话" prop="telephone">
        <el-input v-model="form.telephone"/>
      </el-form-item>
      <el-form-item label="用户角色" prop="roleId">
        <el-select v-model="form.roleId">
          <el-option v-for="role in roles" :key="role.id" :value="role.id" :label="role.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSubmit">{{form.id ? '修改':'新增'}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
import { AddOrUpdate, Detail } from '@api/image-storge/user'
import { Query as RoleQuery } from '@api/image-storge/role'

export default {
  name: 'addOrEdit',
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    const id = to.params.id
    next(instance => {
      instance.resetFormData()
      instance.queryRoles()
      instance.getFormData(id)
    })
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    const id = to.params.id
    next(instance => {
      instance.resetFormData()
      instance.queryRoles()
      instance.getFormData(id)
    })
  },
  data () {
    return {
      form: {
        id: '',
        name: '', // 名称
        abbreviation: '', // 简称
        telephone: '', // 电话
        roleId: '' // 角色Id
      },
      rules: {
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        abbreviation: [{ required: true, message: '请输入用户简介', trigger: 'blur' }],
        telephone: [{ required: true, message: '请输入用户电话', trigger: 'blur' }]
      },
      roles: [] // 角色列表
    }
  },
  methods: {
    ...mapActions('d2admin/page', ['closeCurrent']),
    // [业务逻辑] 重置表单
    resetFormData () {
      Object.assign(this.$data.form, this.$options.data().form)
    },
    /**
     * 查询角色列表
     */
    queryRoles () {
      RoleQuery().then(res => {
        this.roles = res.detail
      })
    },
    // [业务逻辑] 根据 id 获取数据
    getFormData (id) {
      if (id) {
        Detail({ id }).then(res => {
          this.form = res.detail
        }).catch(e => {
        })
      }
    },
    // [业务逻辑] 提交
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          AddOrUpdate({ ...this.form }).then(res => {
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
