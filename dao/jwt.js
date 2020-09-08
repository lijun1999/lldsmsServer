// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
// 创建 token 类
class Jwt {
  constructor(uid) {
    this.uid = uid;
    this.secret = 'I_LOVE_FE3O4';
  }

  //生成token
  generateToken() {
    const data = this.data;
    const secret = this.secret;
    const created = Math.floor(Date.now() / 1000);

    let payload = { uid: this.uid, time: new Date };
    let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 4 }); //四小时有效
    return token;
  }

  // 校验token
  verifyToken() {
    let token = this.data;
    const secret = this.secret;
    let res;
    try {
      let result = jwt.verify(token, secret)
      console.log(result)
      let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}

module.exports = Jwt;