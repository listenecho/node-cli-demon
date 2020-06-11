// 命令行用户界面
const inquirer = require('inquirer')
const program = require( 'commander' );
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const os = require('os');
// 当前执行node命令执行的目录
const NODE_EXCUT_PATH = process.cwd()
// 当前执行文件的目录
const FILE_EXIST_PATH = __dirname

const folders = [
    {
        name: 'public',
        hasChild: true,
        description: '',
        type: '1',
        children: [
            {
                name: 'index.html',
                hasChild: false,
                description: '',
                type: '2'
            }
        ]
    },
    {
        name: 'src',
        hasChild: true,
        description: '',
        type: '1',
        children: [
            {
                name: 'index.js',
                hasChild: false,
                description: '入口文件',
                type: '2'
            },
            {
                name: 'pages',
                hasChild: true,
                description: '',
                type: '1',
                children: [
                   {
                    name: 'home',
                    hasChild: true,
                    description: '',
                    type: '1',
                    children: [
                        {
                            name: 'index.js',
                            hasChild: false,
                            description: '入口文件',
                            type: '2'
                        }
                    ]
                   }
                ]
            }
        ]
    },
    '.DS_Store',
        '.git',
        '.gitattributes',
        '.gitignore',
        '.npmignore',
        'LICENSE',
        'README.md',
        'package.json'
    
];
const questionList = [
    {
        type: 'input',
        message: '请输入app名称:',
        name: 'appName',
        default: `app`
    },
    {
        type: 'list',
        message: '请选择包管理工具:',
        name: 'pckManage',
        choices: [
            "YARN",
            "NPM",
        ],
    },
    {
        type: 'confirm',
        message: '是否使用TypeScript?',
        name: 'isTypeScript',
    }
]

program
    .command( 'init' )
    .description( '初始化项目' )
    .action( function ( options ) { //list命令的实现体
        inquirer.prompt(questionList).then(answers => {
            const {appName = '', pckManage = '',  isTypeScript = true} = answers
            createRootDir(appName)
            createFileBuild(appName, folders)
            createApp(appName, pckManage, isTypeScript)
        })
    } ).parse(process.argv);


// 创建文件夹
// function createRootDir (name) {
//     try {
//         fs.ensureDirSync(name)
//     } catch (err) {
//         console.log(chalk.red('文件创建失败'))
//         process.exit(1)
//     }
// }

function createRootDir(fileName) {
    if (fs.existsSync(fileName)) {
       deleteFolderRecursive(fileName)
    }
    fs.mkdir(fileName, (err => err && console.log(err)))
 }

 function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

// 创建文件目录结构
function createFileBuild (root, files, count) {
    let _count = count || 0
//   const rootPath = `${NODE_EXCUT_PATH}`
//     const files = [
//    ]
   
   for(const file of files) {
      
       const currentPath = !_count ?  `${NODE_EXCUT_PATH}/${root}/${file.name}` : `${root}/${file.name}`
       console.log(currentPath)
        if( file.type === '1') {
            fs.mkdirSync(currentPath)
        } else if (file.type === '2'){
            fs.writeFileSync(currentPath)
        } else if (typeof file === 'string') {
            fs.writeFileSync( `${NODE_EXCUT_PATH}/${root}/${file}`)
        }
        if(file.hasChild) {
            _count ++ 
            createFileBuild(currentPath, file.children, _count)
        }
   }


//    folders.forEach(folder =>   fs.mkdirSync(`${NODE_EXCUT_PATH}/${root}/${folder}`))
//    files.forEach(file => fs.writeFileSync(`${NODE_EXCUT_PATH}/${root}/${file}`))
}
module.exports = {
    init: program
}

// 开始创建项目

function createApp(appName, pckManage, isTypeScript) {
    // 初始化package.json文件
   initPackageJSON(appName)
}

//初始化package.json文件
function initPackageJSON(appName) {
    console.log(1)
    const packageJson = {
        name: appName,
        version: '1.0.0',
        private: true,
      };
    fs.writeFileSync(
        path.join(`${NODE_EXCUT_PATH}/${appName}`, 'package.json'),
        //os.EOL定义了操作系统的行尾符的常量。
        JSON.stringify(packageJson, null, 2) + os.EOL
    )
}

// 初始化public文件