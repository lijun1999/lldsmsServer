// 引用模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
app.use(bodyParser());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();

})

app.set('views', path.join(__dirname, 'views'));  // 设置视图文件目录

app.set('view engine', 'ejs'); //设置模板引擎为ejs

app.use(express.static(path.join(__dirname, 'public')));  // 配置静态资源目录

//mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ms'
});

connection.connect();

//返回值
var rd = {
    meta: {},
    data: []
}
// 路由规则
//-------------------------------登陆页面-----------------------------------------------
//登录
app.post('/login', function (req, res) {
    if (req.body.type === 'admin') {
        sql = "select pw from admin where uname = '" + req.body.uname + "'"
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = []
                return res.send(rd)
            }
            if (results.length === 0) {
                rd.meta = {
                    msg: "用户不存在",
                    status: 202
                }
                rd.data = []
                return res.send(rd)
            }
            if (results[0].pw === req.body.pw) {
                rd.meta = {
                    msg: "登陆成功",
                    status: 200
                }
                rd.data = []
                res.send(rd)
            } else {
                rd.meta = {
                    msg: "密码不正确",
                    status: 201
                }
                rd.data = []
                res.send(rd)
            }
        })
    } else {
        sql = "select pw from user where uname = '" + req.body.uname + "'"
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                return res.send(rd)
            }
            if (results.length === 0) {
                rd.meta = {
                    msg: "用户不存在",
                    status: 202
                }
                return res.send(rd)
            }
            if (results[0].pw === req.body.pw) {
                rd.meta = {
                    msg: "登陆成功",
                    status: 200
                }
                res.send(rd)
            } else {
                rd.meta = {
                    msg: "密码不正确",
                    status: 201
                }
                res.send(rd)
            }
        })
    }
});

//-------------------------------用户列表页面-----------------------------------------
//获取用户列表
app.get('/userlist', function (req, res) {
    var pagenum = (req.query.pagenum - 1) * req.query.pagesize
    var total = 0
    var userdata = []
    if (req.query.query === '') {
        sql = "select uid,uname,email,mobile from user order by uid limit " + pagenum + "," + req.query.pagesize
        connection.query("select uid,uname,email,mobile from user", function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            if (results.length === 0) {
                rd.meta = {
                    msg: "未查询到相关内容",
                    status: 202
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            total = results.length
        });
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            rd.meta = {
                msg: "查询成功",
                status: 200
            }
            rd.data = { users: results, total: total }
            res.send(rd)
        })

    } else {
        sql = "select uid,uname,email,mobile from user  where uname= '" + req.query.query + "' order by uid limit " + pagenum + "," + req.query.pagesize
        connection.query("select uid,uname,email,mobile from user where uname= '" + req.query.query + "'", function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            if (results.length === 0) {
                rd.meta = {
                    msg: "未查询到相关内容",
                    status: 202
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            total = results.length
        });
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            rd.meta = {
                msg: "查询成功",
                status: 200
            }
            rd.data = { users: results, total: total }
            res.send(rd)
        })
    }
});
//添加用户
app.post('/adduser', function (req, res) {

    sql = "insert into user value('" + req.body.uid + "','" + req.body.uname + "','" + req.body.pw + "','" + req.body.email + "','" + req.body.mobile + "')"

    connection.query(sql, function (error, results, fields) {
        if (error) {
            rd.meta = {
                msg: "编号已存在",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
        rd.meta = {
            msg: "添加用户成功",
            status: 200
        }
        rd.data = []
        return res.send(rd)
    })

});
//修改用户信息
app.put('/edituser', function (req, res) {
    connection.query("update user set email='" + req.body.email + "',mobile='" + req.body.mobile + "' where uid = '" + req.body.uid + "'", function (error, results, fields) {
        if (error) {
            rd.meta = {
                msg: "修改失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
        if (results.affectedRows !== 0) {
            rd.meta = {
                msg: "修改成功",
                status: 200
            }
            rd.data = []
            return res.send(rd)
        } else {
            rd.meta = {
                msg: "修改失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
    })
});
//删除用户
app.delete('/deluser', function (req, res) {
    connection.query("delete from user where uid = '" + req.query.uid + "'", function (error, results, fields) {
        if (error) {
            rd.meta = {
                msg: "删除失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
        if (results.affectedRows !== 0) {
            rd.meta = {
                msg: "删除成功",
                status: 200
            }
            rd.data = []
            return res.send(rd)
        } else {
            rd.meta = {
                msg: "删除失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
    })
});

//----------------------------- 设备列表页面--------------------------------------
//获取设备列表
app.get('/eqlist', function (req, res) {
    var pagenum = (req.query.pagenum - 1) * req.query.pagesize
    var total = 0
    if (req.query.query === '') {
        sql = "select * from eq order by eid limit " + pagenum + "," + req.query.pagesize
        connection.query("select * from eq", function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            if (results.length === 0) {
                rd.meta = {
                    msg: "未查询到相关内容",
                    status: 202
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            total = results.length
        });
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            rd.meta = {
                msg: "查询成功",
                status: 200
            }
            rd.data = { users: results, total: total }
            res.send(rd)
        })

    } else {
        sql = "select * from eq  where ename= '" + req.query.query + "' order by eid limit " + pagenum + "," + req.query.pagesize
        connection.query("select * from user where ename= '" + req.query.query + "'", function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            if (results.length === 0) {
                rd.meta = {
                    msg: "未查询到相关内容",
                    status: 202
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            total = results.length
        });
        connection.query(sql, function (error, results, fields) {
            if (error) {
                rd.meta = {
                    msg: "查询出错，请重试",
                    status: 203
                }
                rd.data = { users: [], total: 0 }
                return res.send(rd)
            }
            rd.meta = {
                msg: "查询成功",
                status: 200
            }
            rd.data = { users: results, total: total }
            res.send(rd)
        })
    }
});
//添加设备
app.post('/addeq', function (req, res) {

    sql = "insert into eq value('" + req.body.eid + "','" + req.body.ename + "','" + req.body.num + "','" + req.body.snum + "','" + req.body.address + "')"

    connection.query(sql, function (error, results, fields) {
        if (error) {
            rd.meta = {
                msg: "编号已存在",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
        rd.meta = {
            msg: "添加设备成功",
            status: 200
        }
        rd.data = []
        return res.send(rd)
    })

});
//修改设备信息
app.put('/editeq', function (req, res) {
    connection.query("update eq set ename='" + req.body.ename + "',num=" + req.body.num + ",snum=" + req.body.snum + ",address='" + req.body.address + "' where eid = '" + req.body.eid + "'", function (error, results, fields) {
        console.log("update eq set ename='" + req.body.ename + "',num=" + req.body.num + ",snum=" + req.body.snum + ",address='" + req.body.address + "' where eid = '" + req.body.eid + "'");

        if (error) {
            rd.meta = {
                msg: "修改失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
        if (results.affectedRows !== 0) {
            rd.meta = {
                msg: "修改成功",
                status: 200
            }
            rd.data = []
            return res.send(rd)
        } else {
            rd.meta = {
                msg: "修改失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
    })
});
//删除设备
app.delete('/deleq', function (req, res) {
    connection.query("delete from eq where eid = '" + req.query.eid + "'", function (error, results, fields) {
        if (error) {
            rd.meta = {
                msg: "删除失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
        if (results.affectedRows !== 0) {
            rd.meta = {
                msg: "删除成功",
                status: 200
            }
            rd.data = []
            return res.send(rd)
        } else {
            rd.meta = {
                msg: "删除失败",
                status: 203
            }
            rd.data = []
            return res.send(rd)
        }
    })
});

//-----------------------------设备借还-----------------------------
// 获取设备信息
app.get('/seleq', function (req, res) {
    connection.query("select * from eq where eid='" + req.query.eid + "'", function (error, results, fields) {
        console.log("select * from eq where eid='" + req.query.eid + "'");
        console.log(req.query.eid);
        if (error) {
            rd.meta = {
                msg: "查询出错，请重试",
                status: 203
            }
            rd.data = { users: [], total: 0 }
            return res.send(rd)
        }
        if (results.length === 0) {
            rd.meta = {
                msg: "未查询到相关内容",
                status: 202
            }
            rd.data = { users: [], total: 0 }
            return res.send(rd)
        } else if (results[0].snum === 0) {
            rd.meta = {
                msg: "库存不足",
                status: 201
            }
            rd.data = { users: [], total: 0 }
            return res.send(rd)
        }
        rd.meta = {
            msg: "查询成功",
            status: 200
        }
        rd.data = results
        res.send(rd)
    });
});
// 借出
app.post('/eqlend', function (req, res) {
    for (i in req.body.eqlend) {
        sql = "insert into lend(uid,eid,date) value('" + req.body.uid + "','" + req.body.eqlend[i] + "',now())"
        connection.query(sql, function (error, results, fields) {
            console.log(sql);
            if (error) {
                rd.meta = {
                    msg: "借出失败",
                    status: 203
                }
                rd.data = []
                return res.send(rd)
            }
            if (results.affectedRows !== 0) {
                rd.meta = {
                    msg: "借出成功",
                    status: 200
                }
                rd.data = []
                return res.send(rd)
            } else {
                rd.meta = {
                    msg: "借出失败",
                    status: 203
                }
                rd.data = []
                return res.send(rd)
            }
        })
    }



});
app.get('/', function (req, res) {
    connection.query("select * from admin", function (error, results, fields) {
        if (error) {
            return res.send('kk')
        }
    })
});

app.listen(3000);    // 监听 3000 端口

console.log('server started at port 3000');