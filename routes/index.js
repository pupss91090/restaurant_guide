const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const users = require('./modules/users')

// //路由設計：
// 瀏覽所有餐廳 get /
// 進入新增餐廳的表單 get /restaurant/new
// 新增一家餐廳至資料庫 post /restaurant/new > /
// 依據名稱或餐廳類別搜尋餐廳 get /search
// 進入修改特定一家餐廳的表單 get /restaurant/id/edit
// 將修改特定一家餐廳的資料更新至資料庫 post /restaurant/id/edit > /restaurant/id
// 刪除特定一家餐廳 post /restaurant/id/delete > /

router.use('/users',users)
router.use('/',home)
router.use('/restaurant',restaurant)
router.use('/search',search)

module.exports = router