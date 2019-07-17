// const jwt = require('jsonwebtoken')
const JwtUtil = require('./token');
let jwt = new JwtUtil()
let verifyToken = async (ctx) => {
  console.log(ctx.request.path, 1111111111);
  if (ctx.request.path === '/users/login'){
    return true
  } else {
    let token = ctx.request.headers.token
    let res = await jwt.verifyToken(token)
    console.log(res, 2222222222);
    if (!res) {
     return false
    } else {
      console.log(res.exp - Math.floor(Date.now() / 1000));
      if ((res.exp - Math.floor(Date.now()/1000)) < 5) {
        console.log('token 快过期了');
        let data = {
          userName:res.userName,
          id: res.id
        }
        let jwt = new JwtUtil(data)
        let token = jwt.createToken()
        ctx.set('Token', token)
      }
      return true
    }
  }
}

module.exports = verifyToken
