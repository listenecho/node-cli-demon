/*
 * @Author: your name
 * @Date: 2020-06-01 19:51:58
 * @LastEditTime: 2020-06-02 09:56:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli\src\index.js
 */ 

const program = require( 'commander' );

/** 导入命名 */
require('./command')

/** 解析命令 */
program.parse( process.argv ); 
