var devStart = require('./development.js')
var prdStart = require('./production.js')
var DEV_ENV = process.env.NODE_ENV === 'development'
var TEST_ENV = process.env.NODE_ENV === 'test'
var PRD_ENV = process.env.NODE_ENV === 'production'
var DR_ENV = process.env.NODE_ENV === 'dr'
// import a from 'pm2'

if (DEV_ENV || TEST_ENV) {
  devStart()
} else if (PRD_ENV || DR_ENV) {
  prdStart()
}

