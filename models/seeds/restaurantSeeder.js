const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../restaurant')
const { seedUsers, seedRestaurants } = require('./seedData')
// const resJson = require('./restaurant.json')
// const resJsonItem = resJson.results

db.once('open', () => {
  new Promise((resolve, _reject) => {
    for (const [user_index, user] of seedUsers.entries()) {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          email: user.email,
          password: hash
        })
          .then(user => {
            // console.log(user)
            const userRestaurant = []
            seedRestaurants.forEach((restaurant, rest_index) => {
              if (user_index * 3 <= rest_index && rest_index < (user_index + 1) * 3) {
                restaurant.userId = user._id
                userRestaurant.push(restaurant)
              }
            })
            return Restaurant.create(userRestaurant)
          })
          .then(() => {
            Restaurant.find().count((err, count) => {
              if (count >= seedUsers.length * 3) {
                console.log("all users and restaurants created")
                resolve()
              }
            })
          })
        )
    }
  })
  .then(() => {
    process.exit()
  })
})
// db.once('open', () => {
//   //嘗試
//   Promise.all(
//     users.map((user, user_index) => {
//       return bcrypt
//         .genSalt(10)
//         .then(salt => bcrypt.hash(user.password, salt))
//         .then(hash => returnUser.create({
//           email: user.email,
//           password: hash
//         }))
//         .then((user) => {
//           const userRestaurant = []
//           restaurants.forEach((restaurant, rest_index) => {
//             if (user_index * 3 <= rest_index && rest_index < (user_index + 1) * 3) {
//               restaurant.userId = user._id
//               userRestaurant.push(restaurant)
//             }
//           })
//           console.log(userRestaurant)
//           return Restaurant.create(userRestaurant)
//         })
//     })
//   ).then(() => {
//     User.find().count((err, count) => {
//       if (count >= users.length) {
//         console.log("all users created")
//       }
//     })
//       .then(
//         Restaurant.find().count((err, count) => {
//           if (count >= users.length * 3) {
//             console.log("all users and restaurants created")
//             resolve()
//           }
//         })
//       )
//   })
//   //   ).then(() => {
//   //     User.find().count((err, count) => {
//   //       if (count >= SEED_USER.length) {
//   //         console.log("all users created")
//   //       }
//   //     })
//   //       .then(
//   //         Restaurant.find().count((err, count) => {
//   //           if (count >= SEED_USER.length * 3) {
//   //             console.log("all users and restaurants created")
//   //             resolve()
//   //           }
//   //         })
//   //       )
//   //   })
//   // }
// })
//   .then(() => {
//     //等待所有使用者的餐廳資料創建完成
//     console.log("DATA done!")
//     process.exit()
//   })



// // console.log(password)
// // 連線成功
// db.once('open', () => {
//   new Promise((resolve, _reject) => {
//     for (i = 0; i < 2; i++) {
//       bcrypt
//         .genSalt(10)
//         .then(salt => bcrypt.hash((SEED_USER[i].password), salt))
//         .then(hash => User.create({
//           email: SEED_USER[i].email,
//           password: hash
//         }))
//         .then(user => {
//           const userId = user._id
//           for (let j = 0; j < 3; i++) {
//             Restaurant.create({
//               name: resJsonItem[i * 3 + j].name,
//               category: resJsonItem[i].category,
//               image: resJsonItem[i * 3 + j].image,
//               location: resJsonItem[i].location,
//               phone: resJsonItem[i * 3 + j].phone,
//               google_map: resJsonItem[i + j].google_map,
//               rating: resJsonItem[i * 3 + j].rating,
//               description: resJsonItem[i * 3 + j].description,
//               userId: userId
//             })
//           }
//         })
//         .then(() => {
//           User.find().count((err, count) => {
//             if (count >= SEED_USER.length) {
//               console.log("all users created")
//             }
//           })
//             .then(
//               Restaurant.find().count((err, count) => {
//                 if (count >= SEED_USER.length * 3) {
//                   console.log("all users and restaurants created")
//                   resolve()
//                 }
//               })
//             )
//         })
//     }
//   })
//     .then(() => {
//       //等待所有使用者的餐廳資料創建完成
//       console.log("DATA done!")
//       process.exit()
//     })
// })
