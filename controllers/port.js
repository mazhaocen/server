
let models = require('../common/models').portModel

let addPort = async (ctx, next) => {
  let req = ctx.request.body
  // 查询用户
  let port = await models.find({path: req.path})
  if (port.length) {
    ctx.response.body = {code: 0, msg: '接口路径已经存在,不可重复'}
    return
  }
  // 创建用户
  try {
    let res = await models.create(req)
    console.log(res);
    ctx.response.body = {
      code: 1,
      data:res,
      msg:'ok'
    }
  } catch (e) {
    console.log('新增不成功', e);
    ctx.response.body = {code: 0, msg: e.message}
  }
}

/*let login = async (ctx, next) => {
  let reqData = ctx.request.body
  try {
    let res = await models.userModel.find(reqData)
    console.log(res);
    if (res.length ===1) {
      ctx.response.body = {
        code:1,
        data:'成功',
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

let search = async (ctx, next) => {
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

}*/
module.exports = {
  'POST-/ports/addPort': addPort,
  // 'POST-/users/signIn': signIn,
  // 'POST-/users/search': search,
  // 'POST-/users/updatePassword': updatePassword,
}
