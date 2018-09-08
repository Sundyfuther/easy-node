var fs = require('fs')
var $HOME = require('os').homedir()
var spawn = require('child_process').spawn
var chalk = require('chalk')
var pm2LogrotatePath = `${$HOME}/.pm2/modules/pm2-logrotate`

if (!fs.existsSync(pm2LogrotatePath)) {
  console.log(
     chalk.bold.green('[PM2][Module] ') + 'Calling ' + chalk.bold.red('[NPM]') + ' to install pm2-logrotate...'
  )

  var instalInstance = spawn('npm', ['run', 'i:log'], {
    stdio: 'inherit',
    env: process.env,
    shell: true
  })

  instalInstance.on('close', () => {
    var files = fs.readdirSync(pm2LogrotatePath)
    console.log('Module successfully installed and launched')
    console.log(chalk.bold.green(files))
  })

  instalInstance.on('error', function (err) {
    console.error(err.stack || err)
  })
}
