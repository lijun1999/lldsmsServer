//借出时，获取设备信息
exports.getLendSelEq = function (req, res, connection) {
  const sql = `select * from eq where eid='${req.query.eid}'`
  console.log('借出设备查询' + sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: []
      })
    }
    if (results.length === 0) {
      return res.send({
        meta: {
          msg: "未查询到相关内容",
          status: 202
        },
        data: []
      })
    }
    res.send({
      meta: {
        msg: "查询成功",
        status: 200
      },
      data: results
    })
  });
}

//借出设备
exports.lendEq = function (req, res, connection) {
  let sql = null
  let sqls = []
  for (item of req.body.eqlend) {
    console.log(item)
    sql = `insert into lend(uid,lendaid,eid,outdate,state) value('${req.body.uid}','${req.body.aid}','${item}',now(),'0')`
    sqls.push(sql)
  }
  console.log(sqls)
  async.eachSeries(sqls, function (item, callback) {
    // 遍历每条SQL并运行
    connection.query(item, function (err, results) {
      if (err) {
        // 异常后调用callback并传入err
        callback(err);
      } else if (results.affectedRows !== 0) {
        callback();
      } else {
        console.log(item + "运行成功");
        // 运行完毕后也要调用callback，不须要參数
        callback();
      }
    });
  }, function (err) {
    // 全部SQL运行完毕后回调
    if (err) {
      return res.send({
        meta: {
          msg: "借出失败，请检查用户号是否正确",
          status: 201
        },
        data: []
      })
    } else {
      return res.send({
        meta: {
          msg: "借出成功",
          status: 200
        },
        data: []
      })
    }
  });
}

//归还时，获取设备信息
exports.getBackSelEq = function (req, res, connection) {
  const sql = `select lend.eid,ename,lend.uid,emanufacture,outdate,eq.state,uname from lend,eq,user where eq.eid = lend.eid and lend.uid = user.uid and lend.eid = '${req.query.eid}' ORDER BY outdate limit 0,1`
  console.log('归还设备查询' + sql)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: []
      })
    }
    if (results.length === 0) {
      return res.send({
        meta: {
          msg: "未查询到相关内容",
          status: 202
        },
        data: []
      })
    }
    res.send({
      meta: {
        msg: "查询成功",
        status: 200
      },
      data: results
    });
  });
}
//归还设备
exports.backEq = function (req, res, connection) {
  let sql = null
  let sqls = []
  for (item of req.body.eqback) {
    sql = `update lend  set state = '1',backaid = '${req.body.aid}',backdate= now() where eid ='${item}'`
    console.log('归还设备：' + sql)
    sqls.push(sql)
  }
  async.eachSeries(sqls, function (item, callback) {
    // 遍历每条SQL并运行
    connection.query(item, function (err, results) {
      if (err) {
        // 异常后调用callback并传入err
        callback(err);
      } else if (results.affectedRows !== 0) {
        callback();
      } else {
        console.log(item + "运行成功");
        // 运行完毕后也要调用callback，不须要參数
        callback();
      }
    });
  }, function (err) {
    // 全部SQL运行完毕后回调
    if (err) {
      // console.log(err);
      console.log('归还失败')
      return res.send({
        meta: {
          msg: "归还失败",
          status: 201
        },
        data: []
      })
    } else {
      return res.send({
        meta: {
          msg: "归还成功",
          status: 200
        },
        data: []
      })
    }
  });
}