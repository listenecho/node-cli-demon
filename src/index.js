

const program = require( 'commander' );
const cmd = ['init', 'install']
/** 导入命名 */

/** 解析命令 */
program.parse( process.argv ); 
const {args = []} = program
cmd.includes(args[0])  && require(`./command/${args[0]}`)

