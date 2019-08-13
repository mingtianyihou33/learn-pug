import Compressor from 'compressorjs'

export default function (file, option, targetSize) {
  return new Promise((resolve, reject) => {
    function compress (file, option, targetSize) {
      option = Object.assign({}, option, {
        quality: 0.9,
        success (result) {
          console.log('success')
          if (result.size > targetSize) {
            console.log('compress')
            compress(result, option, targetSize)
          } else {
            resolve(result)
          }
        },
        error (err) {
          reject(err)
        }
      })
      new Compressor(file, option)
    }

    compress(file, option, targetSize)
  })
}
