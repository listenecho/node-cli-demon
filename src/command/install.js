const progarm = require('commander')
// 下载git gitLab 或者其他代码托管库的代码
const download = require('download-git-repo');
const execa = require('execa')
const fs = require("fs");
const path = require('path')
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora()
/** github地址 */
const SROUCE_URL = 'listenecho/mercy-shop-server'

/** 
 * 实现功能: 通过lake install xxx 实现 npm install 类似的下载，操作并将文件下载到package
 * 
 * 实现步骤： 
 *  1. 新建package文件夹
 *  2. 命令解析
 *  3. 将文件下载到package文件夹
 * 
*/
progarm.command('install')
.description('下载 github 项目')
.action(options => {
   
    const { args = [] } = options
    // 获取参数第一位
    let currentPck = args[0]
    if(!currentPck) return
    isExitFile('package')
       doExeca(currentPck)
})


/**
 * 判断文件夹是否存在
 */

 function isExitFile(fileName) {
    if(fs.existsSync(fileName)) {
        process.exit(1);
    }
    fs.mkdir(fileName, (err => err && console.log(err)))
    // execa('npm init')
 }
 /**
  * 下载包
  * 
  */

 async function doExeca(pck) {
     try {
        spinner.start(`正在下载${pck}`)
        const result = await execa(`npm install ${pck} g --prefix ${path.resolve(__dirname,'../../package')} `)
        spinner.stop()
        
     } catch (error) {
        spinner.stop()
     }
   
  }

module.exports = {
    install: progarm
}
