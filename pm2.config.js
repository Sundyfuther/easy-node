const $HOME = require('os').homedir()

module.exports = (function () {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */

  const dr = process.argv.includes('--env') && process.argv.includes('dr')
  const prd = process.argv.includes('--env') && process.argv.includes('prd')
  const test = process.argv.includes('--env') && process.argv.includes('test')
  const dev = !process.argv.includes('--env')

  return {
    apps: [
      { // application
        name: 'main-app',
        script: './bin/start.js',
        cwd: './', // 当前工作路径
        max_memory_restart: '500M',
        instances: dev && 1 || test && 2 || (prd || dr) && 4,
        exec_mode: 'cluster',
        log: `${$HOME}/app-logs/outerr.log`,
        merge_logs: true,
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        source_map_support: true,
        min_uptime: '1540s',
        max_restarts: 5,
        restartDelay: 3000,
        cron_restart: '59 4 * * 1',
        watch: [ // 监控变化的目录，一旦变化，自动重启
          'public',
          'bin',
          'src'
        ],
        ignore_watch: [ // 从监控目录中排除
          'test',
          'views',
          'node_modules',
          'logs'
        ],
        env: {
          NODE_ENV: 'development',
          PORT: '7799'
        },
        env_test: {
          NODE_ENV: 'test',
          PORT: '7799'
        },
        env_prd: {
          NODE_ENV: 'production',
          PORT: '7799'
        }
      }
    ]
  }
})()
