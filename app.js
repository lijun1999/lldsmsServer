// 引用模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var async = require('async')

// Socket.io
// var socketServer = app.listen(3001)
// var io = require('socket.io').listen(socketServer)
// require('./dao/socket')(io)


app.use(bodyParser());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "content-type,request-origin,authorization");
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();

})

app.set('views', path.join(__dirname, 'views')); // 设置视图文件目录

app.set('view engine', 'ejs'); //设置模板引擎为ejs

app.use(express.static(path.join(__dirname, 'public'))); // 配置静态资源目录


// console.log = function(){}


// 路由规则
require('./router/index')(app);

app.listen(3000); // 监听 3000 端口

console.log('server started at port 3000');