
 
var program = require( 'commander' );
program
    .command( 'init' )
    .description( '初始化项目' )
    .action( function ( options ) { //list命令的实现体
        // to do
        console.log( 'init command' );
    } );

module.exports = {
    init: program
}