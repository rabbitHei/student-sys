// 1. 加载 express 模块
var express = require('express');
// 加载 config 模块
var config = require('./config.js');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./router.js');

// 2. 创建 app
var app = express();


// 3. 设置、挂载一些中间件
// 3.1 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



// 3.2 挂载 body-parser 中间件
// parse application/x-www-form-urlencoded 
app.use('/', bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use('/', bodyParser.json());


// 3.3 挂载路由模块
app.use(router);



// 4. 启动服务
app.listen(config.port, function () {
  console.log('http://localhost:' + config.port);
});