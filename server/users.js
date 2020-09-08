//获取用户列表
exports.getUserlist = function (req, res, connection) {
  const pagenum = (req.query.pagenum - 1) * req.query.pagesize
  let total = 0
  let sql1 = null,
    sql2 = null
  if (req.query.query === '') {
    sql1 = `select uid,uname,email,mobile from user limit ${pagenum},${req.query.pagesize}`
    sql2 = `select uid,uname,email,mobile from user order by uid limit ${pagenum},${req.query.pagesize}`
  } else {
    sql1 = `select uid,uname,email,mobile from user where uname= '${req.query.query}' limit ${pagenum},${req.query.pagesize}`
    sql2 = `select uid,uname,email,mobile from user where uname= '${req.query.query}' order by uid limit ${pagenum},${req.query.pagesize}`
  }
  console.log('获取用户列表' + sql1 + "\n获取用户列表" + sql2)
  connection.query(sql1, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: { users: [], total: 0 }
      })
    } else if (results.length === 0) {
      return res.send({
        meta: {
          msg: "未查询到相关内容",
          status: 202
        },
        data: { users: [], total: 0 }
      })
    } else {
      total = results.length
      connection.query(sql2, function (error, results, fields) {
        if (error) {
          return res.send({
            meta: {
              msg: "查询出错，请重试",
              status: 203
            },
            data: { users: [], total: 0 }
          })
        }
        res.send({
          meta: {
            msg: "查询成功",
            status: 200
          },
          data: { users: results, total: total }
        })
      })
    }
  });
}

//添加用户
exports.addUser = function (req, res, connection) {
  const sql = `insert into user value('${req.body.uid}','${req.body.uname}','${req.body.pw}','${req.body.email}','${req.body.mobile}')`
  console.log('添加用户' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "编号已存在",
          status: 203
        },
        data: []
      })
    }
    return res.send({
      meta: {
        msg: "添加用户成功",
        status: 200
      },
      data: []
    })
  })
}

//修改用户
exports.editUser = function (req, res, connection) {
  const sql = `update user set email='${req.body.email}',mobile='${req.body.mobile}' where uid = '${req.body.uid}'`
  console.log('修改用户' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "修改失败",
          status: 203
        },
        data: []
      })
    }
    if (results.affectedRows !== 0) {
      return res.send({
        meta: {
          msg: "修改成功",
          status: 200
        },
        data: []
      })
    } else {
      return res.send({
        meta: {
          msg: "修改失败",
          status: 203
        },
        data: []
      })
    }
  })
}

//删除用户
exports.delUser = function (req, res, connection) {
  const sql = `delete from user where uid = '${req.query.uid}'`
  console.log('删除用户' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "删除失败",
          status: 203
        },
        data: []
      })
    }
    if (results.affectedRows !== 0) {
      return res.send({
        meta: {
          msg: "删除成功",
          status: 20
        },
        data: []
      })
    } else {
      return res.send({
        meta: {
          msg: "删除失败",
          status: 203
        },
        data: []
      })
    }
  })
}

// 修改的密码
exports.editPw = function (req, res, connection) {
  let sql = null
  if (req.body.type == 'user') {
    sql = `update user set pw = '${req.body.pw}'  where uid = '${req.body.uid}'`
  } else {
    sql = `update admin set pw = '${req.body.pw}'  where uid = '${req.body.uid}'`
  }
  console.log('修改密码' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "修改失败",
          status: 203
        },
        data: []
      })
    }
    if (results.affectedRows !== 0) {
      return res.send({
        meta: {
          msg: "修改成功",
          status: 200
        },
        data: []
      })
    } else {
      return res.send({
        meta: {
          msg: "修改失败",
          status: 203
        },
        data: []
      })
    }
  })
}

//重置密码
exports.resetPw = function (req, res, connection) {
  const sql = `update user set pw = '123456'  where uid = '${req.body.uid}'`
  console.log('重置密码' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "重置密码失败",
          status: 203
        },
        data: []
      })
    }
    if (results.affectedRows !== 0) {
      return res.send({
        meta: {
          msg: "重置密码成功",
          status: 200
        },
        data: []
      })
    } else {
      return res.send({
        meta: {
          msg: "重置密码失败",
          status: 203
        },
        data: []
      })
    }
  })
}

//获取用户已借的设备
exports.getMyEqList = function (req, res, connection) {
  const sql = `select lid,lend.eid,outdate,ename,backdate from lend,eq where uid='${req.query.uid}'  and lend.eid = eq.eid order by outdate desc`
  console.log('用户已借的设备' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: { eq: [], total: 0 }
      })
    }
    if (results.length === 0) {
      return res.send({
        meta: {
          msg: "未查询到相关内容",
          status: 202
        },
        data: { eq: [], total: 0 }
      })
    }
    res.send({
      meta: {
        msg: "查询成功",
        status: 200
      },
      data: { eq: results, total: results.length }
    })
  });
}

//获取用户未还的设备
exports.getNoBackEqList = function (req, res, connection) {
  const sql = `SELECT * FROM lend WHERE uid = ${req.query.uid} AND state = '0' ORDER BY outdate DESC`
  console.log('用户未还的设备' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: { eq: [], total: 0 }
      })
    }
    if (results.length === 0) {
      return res.send({
        meta: {
          msg: "未查询到相关内容",
          status: 202
        },
        data: { eq: [], total: 0 }
      })
    }
    res.send({
      meta: {
        msg: "查询成功",
        status: 200
      },
      data: { eq: results, total: results.length }
    })
  });
}