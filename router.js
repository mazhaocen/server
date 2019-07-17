'use strict'
const router = require('koa-router')()
const fs = require('fs')
// 获取routers 文件里的js
let routerJs = fs.readdirSync(`${__dirname}/controllers`).filter(f => {
  return f.endsWith('.js')
})
for (let f of routerJs) {
  // 引入所有js文件
  let methods = require(`${__dirname}/controllers/${f}`)
  console.log('方法：', methods);
  for (let m in methods) {
    let arr = m.split('-')
    let method = arr[0];
    let path = arr[1]
    if (method === 'POST') {
      router.post(path, methods[m])
      console.log(`register URL mapping: post ${path}`);
    } else if (method === 'GTE') {
      router.get(path, methods[m])
      console.log(`register URL mapping: get ${path}`);
    } else {
      console.error(`无效的url:${method}`)
    }
  }
}
module.exports = () => {
  return router
}
