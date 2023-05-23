const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')

const restaurantInfo = require('./restaurant.json')

app.use(express.static('public'))

app.get('/',(req,res)=>{
    console.log(restaurantInfo.results)
    res.render('index',{restaurants: restaurantInfo.results})
})

app.get('/restaurants/:restaurant_id',(req,res)=>{
    console.log('request:',req.params.restaurant_id)
    res.render('show',{theRestaurant: restaurantInfo.results[req.params.restaurant_id-1]})
    console.log(restaurantInfo.results[req.params.restaurant_id])
})

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