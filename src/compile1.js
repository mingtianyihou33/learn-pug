const pug = require('pug')
const compiledFunction = pug.compileFile(__dirname + '/index.pug')
console.log(compiledFunction())
