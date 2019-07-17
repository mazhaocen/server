'use strict'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const mongoose = require('mongoose');
const app = new Koa()
const JwtUtil = require('./token/token');

app.use(bodyParser())


mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection
db.on('error', console.error.bind(console,'connection error:'))
db.once('open',(cb) => {
  console.log('链接数据库成功')
})
// 跨域配置
app.use(cors({
  origin: (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:8081");
    ctx.set("Access-Control-Allow-Headers",'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, Token, Key, User',)
    ctx.set("Access-Control-Allow-Credentials", true) // 如果 要带参数 或 cookie   withCredentials: true 要设置为 true
    ctx.set("Access-Control-Expose-Headers", 'Token') // 如果 要带参数 或 cookie   withCredentials: true 要设置为 true
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Token'],
}));

let jwt = new JwtUtil()
app.use(async (ctx, next) => {
  // console.log(ctx.request.path, 1111111111);
  if (ctx.request.path === '/users/login'){

   await next()
  } else {
    let token = ctx.request.headers.token
    let res = await jwt.verifyToken(token)
    // console.log(res, 2222222222);
    if (!res) {
      ctx.response.body = {
        code: 0,
        msg: '登录过期'
      }
    } else {
      console.log(res.exp - Math.floor(Date.now() / 1000));
      if ((res.exp - Math.floor(Date.now()/1000)) < 300) {
        console.log('token 快过期了');
        let data = {
          userName:res.userName,
          id: res.id
        }
        // let jwt = new JwtUtil(data)
        token = jwt.createToken(data)
      }
      ctx.set('Token', token)
      await next()
    }
  }
})

const router = require('./router')
app.use(router().routes())
app.use(router().allowedMethods());
app.listen(3000)
console.log('app started at port 3000');

module.exports= {
  mongoose :mongoose
}
