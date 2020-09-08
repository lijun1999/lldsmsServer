const { connection: connection } = require('../server/dbServer')
const Login = require('../server/login')
const Users = require('../server/users')
const Equipments = require('../server/equipment')
const EqLendBack = require('../server/eqLendBack')
const Chart = require('../server/chart')
const expressJWT = require('express-jwt');
const secretOrPrivateKey = "I_LOVE_FE3O4";

module.exports = function (app) {
  //-------------------------验证token------------------
  //设置需要保护的API
  app.use(expressJWT({
    secret: secretOrPrivateKey
  }).unless({
    path: ['/login'] //除了这个地址，其他的URL都需要验证
  }));
  // 校验token失败时的处理
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.send({
        meta: {
          msg: "token无效",
          status: 500,
        },
        data: {}
      })
    }
  });


  //-------------------------------登录页面-----------------------------------------
  //登录
  app.post('/login', function (req, res) {
    Login.login(req, res, connection)
  });

  //-------------------------------用户列表页面-----------------------------------------
  //获取用户列表
  app.get('/userlist', function (req, res) {
    Users.getUserlist(req, res, connection)
  });
  //添加用户
  app.post('/adduser', function (req, res) {
    Users.addUser(req, res, connection)

  });
  //修改用户信息
  app.put('/edituser', function (req, res) {
    Users.editUser(req, res, connection)
  });
  //删除用户
  app.delete('/deluser', function (req, res) {
    Users.delUser(req, res, connection)
  });
  //修改管理员用户密码
  app.put('/editpw', function (req, res) {
    Users.editPw(req, res, connection)
  });
  //重置用户密码
  app.put('/resetpw', function (req, res) {
    Users.resetPw(req, res, connection)
  });

  //----------------------------- 设备列表页面--------------------------------------
  //获取设备列表
  app.get('/eqlist', function (req, res) {
    Equipments.getEqList(req, res, connection)
  });
  //添加设备
  app.post('/addeq', function (req, res) {
    Equipments.addEq(req, res, connection)
  });
  //修改设备信息
  app.put('/editeq', function (req, res) {
    Equipments.editEq(req, res, connection)
  });
  //删除设备
  app.delete('/deleq', function (req, res) {
    Equipments.delEq(req, res, connection)
  });
  //设备报修
  app.post('/repaireq', function (req, res) {
    Equipments.repairEq(req, res, connection)
  });
  //获取维修设备列表
  app.get('/repaireqlist', function (req, res) {
    Equipments.getRepairEqList(req, res, connection)
  });
  //设备已修
  app.put('/repaired', function (req, res) {
    Equipments.repaired(req, res, connection)
  });

  //-----------------------------设备借还-----------------------------
  // 借出获取设备信息
  app.get('/lendseleq', function (req, res) {
    EqLendBack.getLendSelEq(req, res, connection)
  });
  // 借出
  app.post('/eqlend', function (req, res) {
    EqLendBack.lendEq(req, res, connection)
  });
  // 归还获取设备信息
  app.get('/backseleq', function (req, res) {
    EqLendBack.getBackSelEq(req, res, connection)
  });
  // 归还
  app.post('/eqback', function (req, res) {
    EqLendBack.backEq(req, res, connection)
  });
  //-----------------------------用户-----------------------------
  // 获取已借设备信息
  app.get('/myeqlist', function (req, res) {
    Users.getMyEqList(req, res, connection)
  });
  // 获取未还设备信息
  app.get('/mynobackeqlist', function (req, res) {
    Users.getNoBackEqList(req, res, connection)
  });
  // ------------------------图表-----------------------
  app.get('/chartdata', function (req, res) {
    Chart.getChartData(req, res, connection)
  });


}