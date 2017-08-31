function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

/*
数据库配置
*/
define('db_user','root');

/*
jsonwebtoken加密
*/

define('secret','selabhse');
/*
api请求字段错误
*/

define('postError','请求数据不符合要求！');
define('apiError','网络错误！');
/*
开发环境
 */
process.title = 'HSE-node';
define('port','4001');
define('urladdr','http://localhost:4001/');
define('db_password', '200801541994Zhou');
define('db_database_ip','123.206.202.80');
define('db_database','wsn');

