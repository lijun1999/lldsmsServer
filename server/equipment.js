//获取设备列表
exports.getEqList = function (req, res, connection) {
  const pagenum = (req.query.pagenum - 1) * req.query.pagesize
  let total = 0
  let sql1 = null,
    sql2 = null
  let rd = {
    meta: {},
    data: []
  }
  if (req.query.query === '') {
    if (req.query.type == 0) {
      sql1 = `select * from eq order by eid`
      sql2 = `select * from eq order by eid limit ${pagenum},${req.query.pagesize}`
    } else if (req.query.type == 1) {
      sql1 = `select ename,emanufacture,COUNT(*) as num from eq GROUP BY ename,emanufacture limit ${pagenum},${req.query.pagesize}`
      sql2 = `select ename,emanufacture,COUNT(*) as num from eq GROUP BY ename,emanufacture ORDER BY ename limit ${pagenum},${req.query.pagesize}`
    } else {
      sql1 = `select * from eq order by ename limit`
      sql2 = `select * from eq order by ename limit ${pagenum},${req.query.pagesize}`
    }
  } else {
    if (req.query.type == 0) {
      sql1 = `select * from eq where eid= '${req.query.query}' order by eid`
      sql2 = `select * from eq  where eid= '${req.query.query}' order by eid limit ${pagenum},${req.query.pagesize}`
    } else if (req.query.type == 1) {
      sql1 = `select ename,emanufacture,COUNT(*) as num from eq GROUP BY ename,emanufacture HAVING ename = '${req.query.query}' ORDER`
      sql2 = `select ename,emanufacture,COUNT(*) as num from eq GROUP BY ename,emanufacture HAVING ename = '${req.query.query}' ORDER BY ename limit ${pagenum},${req.query.pagesize}`
    } else {
      sql1 = `select * from eq where ename= '${req.query.query}' order by ename`
      sql2 = `select * from eq  where ename= '${req.query.query}' order by ename limit ${pagenum},${req.query.pagesize}`
    }

  }
  console.log('获取设备列表' + sql1 + '\n获取设备列表' + sql2)
  connection.query(sql1, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: { eq: [], total: 0 }
      })
    } else if (results.length === 0) {
      return res.send({
        meta: {
          msg: "未查询到相关内容",
          status: 202
        },
        data: { eq: [], total: 0 }
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
            data: { eq: [], total: 0 }
          })
        }
        res.send({
          meta: {
            msg: "查询成功",
            status: 200
          },
          data: { eq: results, total: total, type: req.query.type }
        })
      })
    }
  });
}

//添加设备
exports.addEq = function (req, res, connection) {
  const sql = `insert into eq value('${req.body.eid}','${req.body.ename}','${req.body.address}','${req.body.state}','${req.body.emanufacture}',now())`
  console.log('添加设备' + sql)
  let rd = {
    meta: {},
    data: []
  }
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
        msg: "添加设备成功",
        status: 200
      },
      data: []
    })
  })
}

// 修改设备信息
exports.editEq = function (req, res, connection) {
  const sql = `update eq set ename='${req.body.ename}',emanufacture='${req.body.emanufacture}',address='${req.body.address}',state='${req.body.state}' where eid = '${req.body.eid}'`
  console.log('修改设备' + sql)
  let rd = {
    meta: {},
    data: []
  }
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

//删除设备
exports.delEq = function (req, res, connection) {
  sql = `delete from eq where eid = '${req.query.eid }'`
  console.log('修改设备' + sql)
  let rd = {
    meta: {},
    data: []
  }
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
          status: 200
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

// 设备报修
exports.repairEq = function (req, res, connection) {
  const sql = `insert into repair(eid,aid,date,state) value('${req.body.eid}','${req.body.aid}',now(),'0')`
  console.log('报修设备' + sql)
  let rd = {
    meta: {},
    data: []
  }
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "报修失败",
          status: 203
        },
        data: []
      })
    }
    return res.send({
      meta: {
        msg: "报修成功",
        status: 200
      },
      data: []
    })
  })
}

//设备保修列表
exports.getRepairEqList = function (req, res, connection) {
  const pagenum = (req.query.pagenum - 1) * req.query.pagesize
  let total = 0
  let sql1 = null,
    sql2 = null
  console.log(req.query.type)
  if (req.query.type == 'true') {
    sql1 = `SELECT rid,repair.eid,ename,aid,uname,repair.date,repair.state,repairdate FROM repair,eq,admin where repair.state = '0' and repair.eid= eq.eid and aid = uid order by repairdate`
    sql2 = `SELECT rid,repair.eid,ename,aid,uname,repair.date,repair.state,repairdate FROM repair,eq,admin where repair.state = '0' and repair.eid= eq.eid and aid = uid order by repairdate limit ${pagenum},${req.query.pagesize}`
  } else {
    sql1 = "SELECT rid,repair.eid,ename,aid,uname,repair.date,repair.state,repairdate FROM repair,eq,admin where repair.state = '1' and repair.eid= eq.eid and aid = uid order by repairdate"
    sql2 = `SELECT rid,repair.eid,ename,aid,uname,repair.date,repair.state,repairdate FROM repair,eq,admin where repair.state = '1' and repair.eid= eq.eid and aid = uid order by repairdate limit ${pagenum},${req.query.pagesize}`
  }
  connection.query(sql1, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "查询出错，请重试",
          status: 203
        },
        data: rd.data = { eq: [], total: 0 }
      })
    } else if (results.length === 0) {
      return res.send({
        meta: {
          msg: "未查询到相关内容",
          status: 202
        },
        data: { eq: [], total: 0 }
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
            data: { eq: [], total: 0 }
          })
        }
        res.send({
          meta: {
            msg: "查询成功",
            status: 200
          },
          data: { eq: results, total: total, type: req.query.type }
        })
      })
    }
  });
}

//设备已修
exports.repaired = function (req, res, connection) {
  const sql = `update repair set repairdate=now(),state='1' where eid = '${req.body.eid}'`
  console.log('已修设备改状态' + sql)
  let rd = {
    meta: {},
    data: []
  }
  connection.query(sql, function (error, results, fields) {
    if (error) {
      return res.send({
        meta: {
          msg: "更改设备维修状态失败",
          status: 203
        },
        data: []
      })
    }
    if (results.affectedRows !== 0) {
      return res.send({
        meta: {
          msg: "更改设备维修状态成功",
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