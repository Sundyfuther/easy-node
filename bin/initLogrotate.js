var fs = require('fs')
var $HOME = require('os').homedir()
var spawn = require('child_process').spawn
var chalk = require('chalk')
var pm2LogrotatePath = `${$HOME}/.pm2/modules/pm2-logrotate`

if (!fs.existsSync(pm2LogrotatePath)) {
  console.log(chalk.bold.green('[init] ') + 'module ' + chalk.bold.green('pm2-logrotate'))
  var instalInstance = spawn('npm', ['run', 'i:log'], {
    stdio: 'inherit',
    env: process.env,
    shell: true
  })

  instalInstance.on('close', () => {
    var files = fs.readdirSync(pm2LogrotatePath)
    console.log('check files ' + chalk.bold.green('pm2-logrotate: ') + chalk.bold.green(files))
  })

  instalInstance.on('error', function (err) {
    console.error(err.stack || err)
  })
}
