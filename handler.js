// 业务模块

// 加载数据模块
var db = require('./db.js');



// 处理请求首页的方法
module.exports.index = function (req, res) {
  // 读取 index.html 文件内容，并渲染给用户即可。
  res.render('index');
};

// 处理请求 students 列表页的方法
module.exports.students = function (req, res) {
  // 1. 读取数据库中的 students 数据
  db.findAll('students', function (err, docs) {
    if (err) {
      throw err;
    }

    // 2. 将读取到的数据渲染给用户
    res.render('students', {list: docs});
  });
  
};


// get 方法请求 /add
module.exports.addGet = function (req, res) {
  // 1. 读取 城市列表、专业列表
  // 1.1 读取城市列表数据
  db.findAll('cities', function (err, docs_city) {
    if (err) {
      throw err;
    }

    // 2. 读取 专业列表
    db.findAll('majors', function (err, docs_major) {
      if (err) {
        throw err;
      }

      // ...
      // 2. 调用模板引擎渲染数据
      res.render('add', {cities: docs_city, majors: docs_major});
    });

  });
};


// post 方法请求 /add
module.exports.addPost = function (req, res) {
  // 1. 获取用户 post 提交来的数据
  // req.body
  // console.log(req.body);

  // 根据用户提交的数据，构建一个和数据库中一样格式的文档（对象）
  var model = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: req.body.sgender.toLowerCase() === 'f' ? '女' : '男',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr,
    smajor: req.body.smajor
  };

  // 2. 把用户提交的数据保存到数据库中。
  db.insertOne('students', model, function (err, result) {
    if (err) {
      throw err;
    }
    // 重定向到 / 页面
    res.redirect('/students');
  });
};


// get 方法请求 /edit
module.exports.editGet = function (req, res) {
  // 1. 获取 _id
  // req.query._id;
  var objId = db.ObjectID(req.query._id);

  // 2. 根据 _id 找到该学员详细信息
  db.findOne('students', {_id: objId}, function (err, doc_stu) {
    if (err) {
      throw err;
    }

    // 3. 读取 所有城市信息
    db.findAll('cities', function (err, docs_city) {
    if (err) {
      throw err;
    }

    // 2. 读取 专业列表
    db.findAll('majors', function (err, docs_major) {
      if (err) {
        throw err;
      }

      // ...
      // 2. 调用模板引擎渲染数据
      res.render('edit', {item: doc_stu, cities: docs_city, majors: docs_major});
    });

  });

  });

  

  // 4. 读取 所有专业信息

  // 5. 渲染
};


// post 方法请求 /edit
module.exports.editPost = function (req, res) {
  // 1. 获取用户提交的数据
  var objId = db.ObjectID(req.body._id);

  var model = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: req.body.sgender.toLowerCase() === 'f' ? '女' : '男',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr,
    smajor: req.body.smajor
  };


  // 2. 根据 _id 更新集合中的数据
  db.updateOne('students', {_id: objId}, model, function (err, result) {
    if (err) {
      throw err;
    }
    // 3. 重定向到列表页
    res.redirect('/students');
  });
};

// get 方法请求 /delete
module.exports.delete = function (req, res) {
  // 1. 获取用户传过来的 _id
   var objId = db.ObjectID(req.query._id);

  // 2. 去数据库中根据 _id 删除数据
  db.deleteOne('students', {_id: objId}, function (err, result) {
    if (err) {
      throw err;
    }
    // 3. 重定向到 列表页
    res.redirect('/students');
  });
};


// get 请求 /info （查看详情）
module.exports.info = function (req, res) {
  // 1. 获取查询的 _id
  // req.query._id

  // req.query._id 是一个字符串，而数据库中是一个ObjectID，无法进行比较
  // 先把 req.query._id 转换为 ObjectID 后才能进行比较

  // 2. 根据 _id 去数据库中查询对应的记录（数据、文档）
  db.findOne('students', {_id: db.ObjectID(req.query._id)}, function (err, doc) {
    if (err) {
      throw err;
    }
    // 3. 调用 res.render() 读取模板文件，将数据记录传递进去，渲染给用户
    res.render('info', {item: doc});
  });

  
};

