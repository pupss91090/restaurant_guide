const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 進入新增餐廳的表單 get /restaurant/new
router.get('/new', (req, res) => {
    res.render('new', {})
})
// 新增一家餐廳至資料庫 post /restaurant/new > /
router.post('/new', (req, res) => {
    const restaurant = req.body

    return Restaurant.create({
        name: restaurant.name,
        category: restaurant.category,
        image: restaurant.image,
        location: restaurant.location,
        phone: restaurant.phone,
        google_map: restaurant.google_map,
        rating: restaurant.rating,
        description: restaurant.description
    })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

// 瀏覽一家餐廳的詳細資訊 get /restaurant/id
router.get('/:id', (req, res) => {
    const id = req.params.id

    Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.error(error))
})

// 進入修改特定一家餐廳的表單 get /restaurant/id/edit
router.get('/:id/edit', (req, res) => {
    const id = req.params.id

    Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.error(error))
})

// 將修改特定一家餐廳的資料更新至資料庫 post /restaurant/id/edit > /restaurant/id
router.put('/:id', (req, res) => {
    const id = req.params.id
    const restaurantEdit = req.body

    return Restaurant.findById(id)
        .then(restaurant => {
            restaurant.name = restaurantEdit.name
            restaurant.category = restaurantEdit.category
            restaurant.image = restaurantEdit.image
            restaurant.location = restaurantEdit.location
            restaurant.phone = restaurantEdit.phone
            restaurant.google_map = restaurantEdit.google_map
            restaurant.rating = restaurantEdit.rating
            restaurant.description = restaurantEdit.description

            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurant/${id}`))
        .catch(error => console.error(error))
})

// 刪除特定一家餐廳 post /restaurant/id/delete > /
router.delete('/:id', (req, res) => {
    const id = req.params.id

    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

module.exports = router