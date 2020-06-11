const commander = require('commander')
// 下载git gitLab 或者其他代码托管库的代码
const download = require('download-git-repo');
const execa = require('execa')
const fs = require("fs");
const path = require('path')
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora()

/** 
 * 实现功能: 通过lake install xxx 实现 npm install 类似的下载，操作并将文件下载到package
 * 
 * 实现步骤： 
 *  1. 新建package文件夹
 *  2. 命令解析, 涉及多条指令 下载
 *  3. 将文件下载到package文件夹
 * 
*/
const progarm = new commander.Command('install')
   .description('下载 github 项目')
   .action(options => {
      console.log(1)
      // const { args = [] } = options
      // // 获取参数第一位
      // if (!args.length) return;
      // isExitFile('package')
      // execaPck(args)
   })
   .option(' --yes', 'Add peppers')
   .option(' --no', 'Add pineapple')
   .allowUnknownOption()
   .parse(process.argv);

console.log(progarm.no, 1)
console.log(progarm.yes, 2)
/**
 * 判断文件夹是否存在
 */

function isExitFile(fileName) {
   if (fs.existsSync(fileName)) {
      return
   }
   fs.mkdir(fileName, (err => err && console.log(err)))
}
/**
 * 下载包
 * 
 */

async function execaPck(packages) {
   for (const pck of packages) {
      await doExeca(pck)
   }
   console.log(chalk.green(`下载完毕.....`))
}


async function doExeca(pck) {
   return new Promise(async (resolve, reject) => {
      try {
         spinner.start(chalk.blue(`正在下载${pck}`))
         await execa(`npm install ${pck} -g --prefix ${path.resolve(__dirname, '../../package')} `)
         spinner.stop()
         console.log(chalk.red(`安装完成${pck}`))
      } catch (error) {
         reject(error)
         spinner.stop()
         console.log(chalk.yellow(`${pck}包下载异常`))
      }
      resolve()
      console.log(chalk.yellow(`${pck}包下载完毕.....`))
   })
}
module.exports = {
   install: progarm
}
