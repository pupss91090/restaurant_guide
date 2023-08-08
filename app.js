// //產品規格與功能：
// 使用者可以新增一家餐廳 
// 使用者可以瀏覽一家餐廳的詳細資訊
// 使用者可以瀏覽全部所有餐廳
// 使用者可以依據名稱或餐廳類別搜尋餐廳
// 使用者可以修改一家餐廳的資訊
// 使用者可以刪除一家餐廳

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')// 載入method-override
const flash = require('connect-flash')

require('./config/mongoose')

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//express-session
app.use(session(
    {secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true}
  ))

const routes = require('./routes/index')
// const restaurantInfo = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
// const restaurant = require('./models/restaurant')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())  // 掛載connect-flash套件

app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
  })

app.use(routes)


app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})