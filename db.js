
// 数据操作模块


// 1. 加载 mongodb 模块
var mongodb = require('mongodb');
var config = require('./config.js');


// 2. 封装一个连接数据库的方法
function connect(callback) {
  
  var MongoClient = mongodb.MongoClient;

  MongoClient.connect(config.conStr, function (err, db) {
    if (err) {
      throw err;
    }

    callback(db);
  });
}



// 3. 封装一个查询给定的集合中所有数据的方法
module.exports.findAll = function (colName, callback) {
  // 1. 连接数据库
  connect(function (db) {
    
    db.collection(colName).find({}).toArray(function (err, docs) {
      // 1. 关闭数据库连接
      db.close();

      // 2.调用回调函数，把结果返回
      callback(err, docs);
    });
  });
};


// 4. 封装一个查询单条记录的方法

module.exports.findOne = function (colName, filter, callback) {
  // 1. 连接数据库
  connect(function (db) {
    // 根据条件查询
    db.collection(colName).findOne(filter, function (err, doc) {
      // 1. 关闭数据库连接
      db.close();

      // 2. 把查询到的结果直接返回给用户
      callback(err, doc);
    });
  });
};


// 5. 封装一个 根据给定的字符串转换为 ObjectID 对象的方法
module.exports.ObjectID = function (objIdStr) {
  
  // var ObjectID = mongodb.ObjectID;
  // return new ObjectID(objIdStr);

  return new mongodb.ObjectID(objIdStr);
};



// 6. 封装一个 insert 插入数据的方法
module.exports.insertOne = function (colName, data, callback) {
  // 1. 连接数据库
  connect(function (db) {
    db.collection(colName).insertOne(data, function (err, result) {
      // 1. 关闭数据库连接
      db.close();

      // 2. 通过回调函数将数据返回
      callback(err, result);
    });
  });
};


// 7. 封装一个 update 操作
module.exports.updateOne = function (colName, filter, data, callback) {
  // 1. 连接数据库
  connect(function (db) {
    db.collection(colName).updateOne(filter, data, function (err, result) {
      db.close();
      callback(err, result);
    });
  });
};


// 8. 封装删除一条记录的方法
module.exports.deleteOne = function (colName, filter, callback) {
  connect(function (db) {
    db.collection(colName).deleteOne(filter, function (err, result) {
      db.close();
      callback(err, result);
    });
  });
};