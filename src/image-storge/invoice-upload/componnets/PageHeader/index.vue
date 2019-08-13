<template>
  <div>
    <el-form
            ref="form"
            :inline="true"
            :model="form"
            size="mini"
            style="margin-bottom: -18px;">
      <el-form-item label="发票类型" prop="invoiceType">
        <el-select v-model="form.invoiceType"
                   placeholder="发票类型"
                   style="width: 100px;">
          <el-option :label="type.name" :value="type.id" v-for="(type,index) in invoiceTypes"
                     :key="index.id"></el-option>
        </el-select>
      </el-form-item>

      <!--<el-form-item label="消费类型" prop="consumeType">
          <el-select
                  v-model="form.consumeType"
                  placeholder="消费类型"
                  style="width: 100px;">
              <el-option :label="type" :value="type" v-for="(type,index) in consumeTypes"
                         :key="index"></el-option>
          </el-select>
      </el-form-item>-->

      <!--            <el-form-item label="开票日期" prop="dateOfIssue">-->
      <!--                <el-date-picker-->
      <!--                        v-model="form.dateOfIssue"-->
      <!--                        type="date"-->
      <!--                        :value-format="inputDateFormat"-->
      <!--                        :format="valueDateFormat"-->
      <!--                        :picker-options="timeOption"-->
      <!--                        placeholder="选择日期" style="width: 130px;">-->
      <!--                </el-date-picker>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="录入日期" prop="dateOfEntry">-->
      <!--                <el-date-picker-->
      <!--                        v-model="form.dateOfEntry"-->
      <!--                        type="date"-->
      <!--                        :value-format="inputDateFormat"-->
      <!--                        :format="valueDateFormat"-->
      <!--                        :picker-options="timeOption"-->
      <!--                        placeholder="选择日期" style="width: 130px;">-->
      <!--                </el-date-picker>-->
      <!--            </el-form-item>-->
      <el-form-item label="查验状态" prop="examined">
        <el-select
                v-model="form.examined"
                placeholder="查验状态"
                style="width: 100px;">
          <el-option :label="type.name" :value="type.id" v-for="(type,index) in examineStatuses"
                     :key="index.id"></el-option>
        </el-select>
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
      <el-button type="primary" size="mini">删除</el-button>
      <el-button type="primary" size="mini">查验</el-button>
      <el-button type="primary" size="mini">录入到票据库</el-button>
      <el-upload
              :action="uploadUrl"
              multiple
              name="files"
              class="upload-btn"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload">
        <el-button type="primary" size="mini">
          <d2-icon name="upload"/>
          上传文件
        </el-button>
      </el-upload>
      <el-button type="primary" size="mini">
        <d2-icon name="refresh"/>
        高拍仪录入
      </el-button>
      <el-button type="primary" size="mini">
        <d2-icon name="refresh"/>
        扫描仪录入
      </el-button>
    </el-row>
  </div>
</template>
<script>
import {
  // inputDateFormat,
  // useBeforeCurrentDate,
  // valueDateFormat,
  maxUploadFileSize,
  uploadImageType
} from '../../../setting'
import imgCompress from '../../../plugin/img-compress'
import { QueryInvoiceTypes, QueryExamineStatuses } from '@api/image-storge/invoice.upload'

export default {
  data () {
    return {
      form: { // 搜索条件
        invoiceType: '', // 发票类型
        // consumeType: '', // 消费类型
        // dateOfIssue: '', // 开票日期
        // dateOfEntry: '', // 录入日期
        examined: '' // 查验状态
      },
      uploadUrl: 'http://127.0.0.1:1000/upload', // 图片上传地址
      invoiceTypes: [], // 发票类型
      examineStatuses: [] // 查验类型
      // consumeTypes: ['消费类型1', '消费类型2', '消费类型3'], // 消费类型
      // timeOption: useBeforeCurrentDate,
      // inputDateFormat: inputDateFormat,
      // valueDateFormat: valueDateFormat
    }
  },
  methods: {
    /**
     * 搜索
     **/
    handleFormSubmit () {
      this.$emit('submit', this.form)
    },
    /**
     * 重置搜索条件
     **/
    handleFormReset () {
      this.$refs.form.resetFields()
    },
    /**
     * 上传成功回调函数
     * @param res
     * @param file
     */
    uploadSuccess (res, file) {
      console.log(res)
      this.$message('上传成功')
      // TODO 成功后刷新列表
      this.handleFormSubmit()
    },
    /**
     * 上传之前钩子函数
     * @param file
     * @returns {boolean}
     */
    async beforeUpload (file) {
      console.log(file)
      if (file.size > maxUploadFileSize) {
        file = await imgCompress(file, { convertSize: maxUploadFileSize }, maxUploadFileSize)
      }
      console.log(file)
      if (!uploadImageType.includes(file.type)) {
        this.$message.error('不支持的图片格式!')
        return false
      }
      if (file.size > maxUploadFileSize) {
        this.$message.error(`图片大小不能超过 ${(maxUploadFileSize / 1024 / 1024).toFixed(2)}MB!`)
        // TODO ocr 最大支持单张图片2M 需要进行图片压缩
        return false
      }
      return true
    },
    /**
     * 查询发票类型
     */
    queryInvoiceTypes () {
      QueryInvoiceTypes().then(res => {
        this.invoiceTypes = res.detail
      })
    },
    /**
     * 查询查验类型
     */
    queryExamineStatuses () {
      QueryExamineStatuses().then(res => {
        this.examineStatuses = res.detail
      })
    }
  },
  created () {
    this.queryInvoiceTypes()
    this.queryExamineStatuses()
  }
}
</script>
<style lang="scss" scoped>
  .upload-btn {
    display: inline;
    margin: 0 10px;
  }
</style>
