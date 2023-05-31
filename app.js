// //產品規格與功能：
// 使用者可以新增一家餐廳 
// 使用者可以瀏覽一家餐廳的詳細資訊
// 使用者可以瀏覽全部所有餐廳
// 使用者可以依據名稱或餐廳類別搜尋餐廳
// 使用者可以修改一家餐廳的資訊
// 使用者可以刪除一家餐廳

const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')// 載入method-override

require('./config/mongoose')




app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const routes = require('./routes/index')
const restaurantInfo = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})