const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../restaurant')
const resJson = require('./restaurant.json')
const resJsonItem = resJson.results
// const dotenv = require('dotenv')
// dotenv.config()


// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

// 設定連線到 mongoDB  
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')

  for (i = 0; i < 8; i++) {
    Restaurant.create({ 
    name: resJsonItem[i].name,
    category: resJsonItem[i].category,
    image: resJsonItem[i].image,
    location: resJsonItem[i].location,
    phone: resJsonItem[i].phone,
    google_map: resJsonItem[i].google_map,
    rating: resJsonItem[i].rating,
    description: resJsonItem[i].description})
}
console.log('done!')
})




