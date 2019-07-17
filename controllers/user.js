
let models = require('../common/models')
const JwtUtil = require('../token/token');
let jwt = new JwtUtil()
let verifyToken = require('../token/verifyToken')
// 添加用户
let signIn = async (ctx, next) => {
  let reqData = ctx.request.body
  if (reqData.password1 !== reqData.password2) { // 接收到数据后 比较下密码是否一直  不一致 返回错误
    ctx.response.body = {code: 0, msg: '两次密码不一致'}
    return
  }
  // 查询用户
  let user = await models.userModel.find({userName: reqData.userName})
  if (user.length) {
    ctx.response.body = {code: 0, msg: '用户已经存在,不可重复'}
    return
  }
  // 创建用户
  try {
    let res = await models.userModel.create({...reqData, password: reqData.password1})
    // console.log(res);
    ctx.response.body = {
      code: 1,
      data:res.userName,
      msg:'注册成功！'
    }
  } catch (e) {
    console.log('新增不成功', e);
    ctx.response.body = {code: 0, msg: e.message}
  }
}
// 用户登录
let login = async (ctx, next) => {
  let reqData = ctx.request.body
  try {
    let res = await models.userModel.find(reqData)
    console.log(res);
    if (res.length ===1) {
      let data = {
        userName: res[0].userName,
        id: res[0]._id
      }
      let token = jwt.createToken(data)
      ctx.set('Token', token)
      // ctx.set('KEY', res[0]._id)
      // ctx.set('User', res[0].userName)
      // ctx.response.headers.token = token
      ctx.response.body = {
        code:1,
        data: data,
        msg:'请求成功'
      }
    } else if (!res.length) {
      ctx.response.body = {
        code:0,
        msg:'用户名或密码不正确'
      }
    }
  }catch (e) {
    ctx.response.body = {
      code:0,
      msg:e.message
    }
  }
}
// 修改密码
let updatePassword = async (ctx, next) => {
  let reqData = ctx.request.body
  if (reqData.password1 !== reqData.password2) { // 接收到数据后 比较下密码是否一直  不一致 返回错误
    ctx.response.body = {code: 0, msg: '两次密码不一致'}
    return
  }
  let wherestr = {userName : reqData.userName}
  let updatestr = {password: reqData.password1};
  console.log('修改密码',reqData)
  try {
    let res = await models.userModel.update(wherestr, updatestr)
    if (res) {
      ctx.response.body = {
        code:1,
        data:'成功',
        msg:'修改成功！'
      }
    }
  }catch (e) {
    ctx.response.body = {
      code:0,
      msg:e.message
    }
  }
}
// 查询用户列表
let search = async (ctx, next) => {
  // let result = await verifyToken(ctx)
  // console.log(result);
  // if (result) {
    try {
      let res = await models.userModel.find({},{userName: 1})
      ctx.response.body = {
        code:1,
        data:res,
        msg:'Ok'
      }
    }catch (e) {
      ctx.response.body = {code:0, msg:e.message}
    }
  // } else {
  //   ctx.response.body = {code:0, msg:'登录过期'}
  // }
}
// 删除用户
let delUser = async (ctx, next) => {
  let req = ctx.request.body
  try {
    let res = await models.userModel.remove({userName: req.userName})
    ctx.response.body = {
      code:1,
      data:res,
      msg:'Ok'
    }
  }catch (e) {
    ctx.response.body = {code:0, msg:e.message}
  }
}
module.exports = {
  'POST-/users/login': login,
  'POST-/users/signIn': signIn,
  'POST-/users/search': search,
  'POST-/users/updatePassword': updatePassword,
  'POST-/users/delete': delUser,
}
