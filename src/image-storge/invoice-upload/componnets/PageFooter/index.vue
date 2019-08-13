<template>
  <pagination v-bind="$attrs"
              @change="pageChange"></pagination>
</template>

<script>
import pagination from '../../../components/pagination'

export default {
  components: { pagination },
  methods: {
    /**
     * 页码或每页大小发生变化后调用
     * @param pageOption
     */
    pageChange (pageOption) {
      this.$emit('change', pageOption)
    }
  }
}
</script>
