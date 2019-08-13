// 时间显示的格式
export const inputDateFormat = 'yyyy-MM-dd'
// 时间值的格式
export const valueDateFormat = 'yyyy-MM-dd'

// 只能选择当前日期之前的时间
export const useBeforeCurrentDate = {
  disabledDate (time) {
    let date = new Date()
    return time.getTime() > date.getTime()
  }
}
// 上传文件支持的最大的大小
export const maxUploadFileSize = 2 * 1024 * 1024
// 上传支持的图片类型
export const uploadImageType = ['image/jpeg', 'image/png']
