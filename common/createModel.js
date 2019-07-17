let mongoose = require('mongoose')
class model {
  constructor(klass, chartName) {
    this.schema = mongoose.Schema(klass) // mongoose.Schema 创建个 Schema
    this.model = mongoose.model(chartName, this.schema) //chartName 表名  相当于是链接表并且定义好字段
  }
  create(klass, chartName, data) {
    // let schema = mongoose.Schema(klass)
    let Model = this.model.create(data)
    // return new model(data)
    return Model
  }
  add() {

  }
  find(klass, chartName, keys) {
    // let schema = mongoose.Schema(klass)  // mongoose.Schema 创建个 Schema
    // let Model = mongoose.model(chartName, schema) //chartName 表名  相当于是链接表并且定义好字段
    let Model = this.model.find(keys)
    return Model
  }
}
// let modelFn = (klass, chartName, data) => {
//   let schema = mongoose.Schema(klass)  // mongoose.Schema 创建个 Schema
//   let model = mongoose.model(chartName, schema) //chartName 表名
//   return new model(data)
// }

module.exports = model
