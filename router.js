// 路由模块

// 1. 加载 express
var express = require('express');
var handler = require('./handler.js');

// 2. 创建路由模块
var router = express.Router();


// 3. 为路由对象挂载路由
router.get('/', handler.index);


router.get('/index', handler.index);


router.get('/students', handler.students);


router.get('/add', handler.addGet);



router.post('/add', handler.addPost);


router.get('/edit', handler.editGet);

router.post('/edit', handler.editPost);

router.get('/delete', handler.delete);


// 查看详情
router.get('/info', handler.info);

// 如果没有静态资源，这里可以不写处理静态资源的路由（挂载处理静态资源的中间件）


// 4. 返回路由对象
module.exports = router;

