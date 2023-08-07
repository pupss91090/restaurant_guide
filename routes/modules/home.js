const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 瀏覽所有餐廳 get /
router.get('/', (req, res) => {
    const userId = req.user._id
    Restaurant.find({userId:userId})
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

router.get('/sort/:sortType', (req, res) => {
    const sortType = req.params.sortType
    const userId = req.user._id
    switch (sortType) {
        case "name_ascend":
            Restaurant.find({userId:userId})
            .lean()
            .sort({ name: "asc" })
            .then(restaurants => res.render('index', { restaurants }))
            .catch(error => console.error(error))
            break;
        case "name_descend":
            Restaurant.find({userId:userId})
            .lean()
            .sort({ name: "desc" })
            .then(restaurants => res.render('index', { restaurants }))
            .catch(error => console.error(error))
            break;
        case "category":
            Restaurant.find({userId:userId})
            .lean()
            .sort({ category: "asc" })
            .then(restaurants => res.render('index', { restaurants }))
            .catch(error => console.error(error))
            break;
        case "location":
            Restaurant.find({userId:userId})
            .lean()
            .sort({ location: "asc" })
            .then(restaurants => res.render('index', { restaurants }))
            .catch(error => console.error(error))           
    }
})



module.exports = router