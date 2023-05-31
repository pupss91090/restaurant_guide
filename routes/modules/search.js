const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 依據名稱或餐廳類別搜尋餐廳 get /search
router.get('/', (req, res) => {
    console.log('request:', req.query.keyword)
    const keyword = req.query.keyword

    Restaurant.find()
        .lean()
        .then(restaurants => {
            const filteredRestaurant = restaurants.filter((restaurant) => {
                return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
            res.render('index', { keyword: keyword, restaurants: filteredRestaurant })
        })
        .catch(error => console.error(error))
})

module.exports = router