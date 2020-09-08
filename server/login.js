const Jwt = require('../dao/jwt')

//登录验证
exports.login = function (req, res, connection) {
  let sql = null
  if (req.body.type === 'admin') {
    sql = `select pw from admin where uid = '${req.body.uid}'`
  } else {
    sql = `select pw from user where uid = '${req.body.uid}'`
  }
  console.log(sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: {}
      })
    }
    if (results.length === 0) {
      return res.send({
        meta: {
          msg: "用户不存在",
          status: 202
        },
        data: {}
      })
    }
    if (results[0].pw === req.body.pw) {
      //获取token
      let jwt = new Jwt(req.body.uid)
      let token = jwt.generateToken()
      res.send({
        meta: {
          msg: "登陆成功",
          status: 200,
        },
        data: {
          token: token
        }
      })
    } else {
      res.send({
        meta: {
          msg: "密码不正确",
          status: 201
        },
        data: {}
      })
    }
  })
}