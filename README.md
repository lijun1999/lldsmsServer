# 1. 流浪大师设备管理系统后台 API 接口文档

## 1.1. API V1 接口说明

- 接口基准地址：`http://127.0.0.1:3000
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证，Token有效时间4小时
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌

### 1.1.1. 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- DELETE（DELETE）：从服务器删除资源。

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：/login
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户名   | 不能为空 |
| pw     | 密码     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg (见下表) |
| data | 数据   |  |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- data参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| token    | token值 |                    |

- 响应数据

```json
{
  "meta": { msg: '登陆成功', status: 200 },
  "data": {
  	"token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjMiLCJpYXQiOjE1OTcwNDc1NDQsImV4cCI6MTU5NzA2MTk0NH0.GYkT57fPMniTTViN_B88NmcuYbuKPR8rryHzUkoaUNY'
  }
}
```


## 1.3. 用户列表

### 1.3.1. 获取用户列表

- 请求路径：/userlist
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| pagenum    | 页数   | 不能为空 |
| pagesize     | 一页几行数据     | 不能为空 |
| query     | 用户名     | |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | (见下表) |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- data参数

| 参数名 | 参数说明 | 备注               |
| ------ | -------- | ------------------ |
| total    | 数据条数 |    |
| users    | 用户数据 | 包含uid、uname、email、mobile(见下表) |

- users参数

| 参数名 | 参数说明 | 备注               |
| ------ | -------- | ------------------ |                 |
| uid    | 用户ID |    |
| uname    | 用户名称 |    |
| email    | 邮箱 |    |
| mobile    | 电话 |    |

- 响应数据

```json
{
    "meta": {
        "msg": "查询成功",
        "status": 200
    },
    "data": {
        "users": [
            {
                "uid": "123",
                "uname": "张睿哲",
                "email": "123123114@qq.cpm",
                "mobile": "15111111112"
            }
        ],
        "total": 1
    }
}
```
### 1.3.2. 添加用户

- 请求路径：/adduser
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |
| uname     | 用户名     | 不能为空 |
| pw     | 密码     | 不能为空 |
| email     | 邮箱     | 不能为空 |
| mobile     | 电话     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败，编号已存在 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "编号已存在",
        "status": 203
    },
    "data": []
}
{
    "meta": {
        "msg": "添加用户成功",
        "status": 200
    },
    "data": []
}
```
### 1.3.3. 修改用户信息

- 请求路径：/edituser
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |
| email     | 邮箱     | 不能为空 |
| mobile     | 电话     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "修改成功",
        "status": 200
    },
    "data": []
}
```
### 1.3.4. 删除用户

- 请求路径：/deluser
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "修改成功",
        "status": 200
    },
    "data": []
}
```
### 1.3.5. 修改密码

- 请求路径：/editpw
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |
| pw     | 密码     | 不能为空 |
| type     | 用户类型     | user(用户) / admin(管理员) |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "修改成功",
        "status": 200
    },
    "data": []
}
```

### 1.3.6. 重置用户密码

- 请求路径：/resetpw
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "重置密码成功",
        "status": 200
    },
    "data": []
}
```
## 1.4. 设备列表

### 1.4.1. 获取设备列表

- 请求路径：/eqlist
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| pagenum    | 页数   | 不能为空 |
| pagesize     | 一页几行数据     | 不能为空 |
| query     | 搜索内容     | 设备id/名称；可为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | (见下表) |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败；202未查询到 |
| msg    | 提示信息 |                    |

- data参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| eq | 设备信息   | (见下表) |
| total   | 数据条数 |                    |

- eq参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| eid | 设备ID | |
| ename    | 设备名称 |                    |
| address | 地址   |  |
| state    | 设备状态 |                    |
| emanufacture | 设备制造商   |  |
| buydate    | 购买时间 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "查询成功",
        "status": 200
    },
    "data": {
        "eq": [
            {
                "eid": "1234",
                "ename": "学生电源",
                "address": "11-55-8",
                "state": "借出",
                "emanufacture": "阿萨德",
                "buydate": "2020-05-10T16:00:00.000Z"
            }
        ],
        "total": 1
    }
}
   
```
### 1.4.2. 添加设备

- 请求路径：/addeq
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| eid    | 设备id   | 不能为空 |
| ename     | 设备名     | 不能为空 |
| address| 位置     | 不能为空|
| emanufacture     | 邮箱厂商| 不能为空|
| state     | 状态     |不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "添加设备成功",
        "status": 200
    },
    "data": []
}
   
```
### 1.4.3. 修改设备信息

- 请求路径：/editeq
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| eid    | 设备id   | 不能为空 |
| ename     | 设备名     | 不能为空 |
| address| 位置     | 不能为空|
| emanufacture     | 邮箱厂商| 不能为空|
| state     | 状态     |不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "修改成功",
        "status": 200
    },
    "data": []
}
   
```

### 1.4.4. 删除设备

- 请求路径：/deleq
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| eid    | 设备id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "删除失败",
        "status": 203
    },
    "data": []
}
   
```
### 1.4.5. 设备报修

- 请求路径：/repaireq
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| eid    | 设备id   | 不能为空 |
| aid     | 管理员id     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "报修成功",
        "status": 200
    },
    "data": []
}
   
```
### 1.4.6. 获取维修设备列表

- 请求路径：/repaireqlist
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| pagenum    | 页数   | 不能为空 |
| pagesize     | 一页几行数据     | 不能为空 |
| type     | 维修状态     | 布尔值：true待维修，false已维修 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | (见下表) |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败；202未查询到 |
| msg    | 提示信息 |                    |

- data参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| eq | 设备信息   | (见下表) |
| total   | 数据条数 |                    |
| type   | 类型 | true待维修，false已维修                    |

- eq参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| rid | 订单编号 | |
| eid | 设备ID | |
| ename    | 设备名称 |                    |
| aid | 报修管理员ID   |  |
| state    | 设备维修状态 |                    |
| date | 报修时间   |  |
| repairdate    | 维修时间 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "查询成功",
        "status": 200
    },
    "data": {
        "eq": [
            {
                "rid": 20,
                "eid": "12349",
                "ename": "学生电源",
                "aid": "001",
                "uname": "admin",
                "date": "2020-08-10T12:25:35.000Z",
                "state": "0",
                "repairdate": null
            }
        ],
        "total": 1,
        "type": "true"
    
   
```
### 1.4.7. 设备已修

- 请求路径：/repaired
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| eid    | 设备id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "更改设备维修状态成功",
        "status": 200
    },
    "data": []
}
   
```
## 1.5. 设备借还

### 1.5.1. 借出获取设备信息

- 请求路径：/lendseleq
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| eid    | 设备id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | (见下表) |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败；202未查询到 |
| msg    | 提示信息 |                    |

- data参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| eid | 设备ID | |
| ename    | 设备名称 |                    |
| address | 位置   |  |
| state    | 设备状态 |                    |
| emanufacture | 制造商   |  |
| buydate    | 购买时间 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "查询成功",
        "status": 200
    },
    "data": [
        {
            "eid": "1234",
            "ename": "学生电源",
            "address": "11-55-8",
            "state": "借出",
            "emanufacture": "阿萨德",
            "buydate": "2020-05-10T16:00:00.000Z"
        }
    ]
}
```
### 1.5.2. 借出

- 请求路径：/eqlend
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |
| aid    | 管理员id   | 不能为空 |
| eqlend    | 借出设备数组   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "借出成功",
        "status": 200
    },
    "data": []
}
   
```
### 1.5.3. 归还获取设备信息

- 请求路径：/backseleq
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| eid    | 设备id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | (见下表) |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败；202未查询到 |
| msg    | 提示信息 |                    |

- data参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| eid | 设备ID | |
| ename    | 设备名称 |                    |
| uid | 用户ID   |  |
| state    | 设备状态 |                    |
| emanufacture | 制造商   |  |
| uname    | 用户名称 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "查询成功",
        "status": 200
    },
    "data": [
        {
            "eid": "1234",
            "ename": "学生电源",
            "uid": "123",
            "emanufacture": "阿萨德",
            "outdate": "2020-03-31T16:00:00.000Z",
            "state": "借出",
            "uname": "张睿哲"
        }
    ]
}
```
### 1.5.4. 归还

- 请求路径：/eqback
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| aid    | 管理员id   | 不能为空 |
| eqlend    | 归还设备数组   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | 空数组 |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败 |
| msg    | 提示信息 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "归还成功",
        "status": 200
    },
    "data": []
}
   
```
## 1.6. 用户

### 1.6.1. 获取已借设备信息

- 请求路径：/myeqlist
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| uid    | 用户id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------------------ |
| meta | 状态信息   | 包含status、msg(见下表) |
| data | 数据   | (见下表) |

- meta参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| status | 状态码   | 200成功；203失败；202未查询到 |
| msg    | 提示信息 |  |

- data参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| eq | 设备信息   | (见下表) |
| total   | 数据条数 |                    |

- eq参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | -------- |
| lid | 订单编号   | |
| eid | 设备ID   | |
| outdate    | 借出时间 |                    |
| ename | 设备名称   |  |
| backdate    | 归还时间 |                    |

- 响应数据

```json
{
    "meta": {
        "msg": "查询成功",
        "status": 200
    },
    "data": {
        "eq": [
            {
                "lid": 38,
                "eid": "1234",
                "outdate": "2020-07-14T16:00:00.000Z",
                "ename": "学生电源",
                "backdate": null
            },
            {
                "lid": 37,
                "eid": "1234",
                "outdate": "2020-07-14T16:00:00.000Z",
                "ename": "学生电源",
                "backdate": "2020-07-14T16:00:00.000Z"
            }
        ]
    "total": 2
}   
```

