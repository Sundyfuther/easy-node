#!/usr/bin/env node

var babelCliDir = require('babel-cli/lib/babel/dir')
var path = require('path')

function production () {
  console.log('===================production===================')
  try {
    babelCliDir({
      outDir: 'app/',
      retainLines: true,
      sourceMaps: true
    }, ['src/']) // compile all when start
    require(path.join(__dirname, '../app'))
  } catch (e) {
    if (e && e.code === 'MODULE_NOT_FOUND') {
      console.log('run `npm compile` first!')
      process.exit(1)
    }
    console.log('app started with error and exited', e)
    process.exit(1)
  }

  console.log('app started in production mode')
}

module.exports = production
