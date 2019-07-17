const jwt = require('jsonwebtoken')

class Jwt {
  constructor(data) {
    this.data = data
  }

  createToken(data) {
    // let data = this.data
    // let created = Math.floor(Date.now()/1000)
    let secretOrPrivateKey = "miyao" // 秘钥
    let token = jwt.sign(
      data,
      secretOrPrivateKey,
      {
        expiresIn: 1800,  // 15秒过期
      }
    )
    return token
  }
  verifyToken(token) {
    // let token = this.data
    // console.log(token, 222222);
    let secretOrPrivateKey = 'miyao' // 秘钥
    try {
      let result = jwt.verify(token, secretOrPrivateKey)
      return result
    }catch (e) {
      return false
    }
  }
}

module.exports = Jwt
