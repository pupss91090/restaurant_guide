// //產品規格與功能：
// 使用者可以新增一家餐廳 
// 使用者可以瀏覽一家餐廳的詳細資訊
// 使用者可以瀏覽全部所有餐廳
// 使用者可以修改一家餐廳的資訊
// 使用者可以刪除一家餐廳

const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') // 載入 mongoose

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
})



app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')

const restaurantInfo = require('./restaurant.json')
const Restaurant = require('./models/restaurant')

app.use(express.static('public'))

// //路由設計：
// 瀏覽所有餐廳 get /
// 進入新增餐廳的表單 get /restaurant/new
// 新增一家餐廳至資料庫 post /restaurant/new > /
// 瀏覽一家餐廳的詳細資訊 get /restaurant/id
// 進入修改特定一家餐廳的表單 get /restaurant/id/edit
// 將修改特定一家餐廳的資料更新至資料庫 post /restaurant/id/edit > /restaurant/id
// 刪除特定一家餐廳 post /restaurant/id/delete > /



// 瀏覽所有餐廳 get /
app.get('/',(req,res)=>{
    Restaurant.find()
    .lean()
    .then(restaurants => res.render('index',{restaurants}))
    .catch(error => console.error(error)) 
})

// 進入新增餐廳的表單 get /restaurant/new
// 新增一家餐廳至資料庫 post /restaurant/new > /

// 瀏覽一家餐廳的詳細資訊 get /restaurant/id
app.get('/restaurants/:id',(req,res)=>{
    const id = req.params.id
    console.log('request:', id)
    Restaurant.findById(id)
    .lean()
    .then( restaurant => res.render('show',{restaurant}))
    .catch(error => console.error(error)) 
})

// 進入修改特定一家餐廳的表單 get /restaurant/id/edit
// 將修改特定一家餐廳的資料更新至資料庫 post /restaurant/id/edit > /restaurant/id
// 刪除特定一家餐廳 post /restaurant/id/delete > /

app.get('/search',(req,res)=>{
    console.log('request:',req.query.keyword)
    const keyword = req.query.keyword
    
    const filteredRestaurant = restaurantInfo.results.filter((restaurant)=>{
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    })
    console.log(filteredRestaurant)
    res.render('index',{keyword: keyword, restaurants: filteredRestaurant})
})


app.listen(port,()=>{
    console.log(`Express is running on http://localhost:${port}`)
})