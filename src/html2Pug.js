var html2jade = require('html2jade');
const fs = require('fs')
const path = require('path')


function fileToPug(dirPath) {
    const dir = fs.readdirSync(dirPath)
    dir.forEach(file => {
        let filePath = dirPath + '/' + file
        if (fs.statSync(filePath).isDirectory()) {
            fileToPug(filePath)
        } else if (path.extname(filePath) === '.vue') {
            let fileContent = fs.readFileSync(filePath, 'utf-8')
            if (fileContent.indexOf('<template lang="pug">') != -1) { // 编译过的就不用了
                return
            }
            let startIndex = fileContent.indexOf('<template>') + '<template>'.length;
            let endIndex = fileContent.lastIndexOf('</template>')
            let template = fileContent.substring(startIndex, endIndex)
            // donotencode=true 不然会发生中文转码
            html2jade.convertHtml(template, {donotencode: true}, function (err, jade) {
                jade = jade.substring(jade.indexOf("body") + 4)
                fileContent = fileContent.substring(0, startIndex) + jade + fileContent.substring(endIndex)
                fileContent = fileContent.replace('<template>', '<template lang="pug">')
                fs.writeFileSync(filePath, fileContent, 'utf-8')
            });
        }
    })
}

let tarDir = path.join(__dirname, 'image-storge')
fileToPug(tarDir);
