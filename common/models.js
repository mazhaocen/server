let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userModels = () => {
  let schema = new Schema({
    userName: String,
    password: String
  })
  return  mongoose.model('user', schema)
}

let portModel = () => {
  let schema = new Schema({
    path: String,
    field: String
  })
  return  mongoose.model('port', schema)
}
// let modelFn = (klass, chartName, data) => {
//   let schema = mongoose.Schema(klass)  // mongoose.Schema 创建个 Schema
//   let model = mongoose.model(chartName, schema) //chartName 表名
//   return new model(data)
// }

module.exports = {
  userModel: userModels(),
  portModel: portModel()
}
