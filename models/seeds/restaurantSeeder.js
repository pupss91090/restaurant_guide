const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const resJson = require('./restaurant.json')
const resJsonItem = resJson.results


// 連線成功
db.once('open', () => {
  
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




