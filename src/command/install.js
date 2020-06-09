const progarm = require('commander')
const download = require('download-git-repo');

/** github地址 */
const SROUCE_URL = 'listenecho/mercy-shop-server'

progarm.command('install')
.description('下载 github 项目')
.action(options => {
    download(SROUCE_URL, 'lake', { clone: false }, err => {
        console.log(err ? 'ERROR' : 'SUCESS')
    })
})

module.exports = {
    install: progarm
}
