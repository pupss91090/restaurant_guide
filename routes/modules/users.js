const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// // 引用 passport
// const passport = require('passport')
// const bcrypt = require('bcryptjs')  // 載入套件

// get 登入頁
router.get('/login', (req, res) => {
    res.render('login', {})
})

// // post 登入資料 // 加入 middleware，驗證 request 登入狀態
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login',
// })
// )
// //!!!!req.flash('success_msg','Login failed! Username or password is incorrect. Please try again.')
// // get 登出  
// router.get('/logout', (req, res) => {
//     req.logout() // Passport.js 提供的函式，會幫你清除 session
//     req.flash('success_msg', 'You have been logged out.')
//     res.redirect('/users/login')
// })

// get 註冊頁
router.get('/register', (req, res) => {
    res.render('register', {})
})


// // post 註冊資料
// router.post('/register', (req, res) => {
//     console.log('request:', req.body)
//     const errors = []
//     const { name, email, password, confirmPassword } = req.body
//     if (!name || !email || !password || !confirmPassword) {
//         errors.push({ message: 'All fields are required!' })
//     } if (password !== confirmPassword) {
//         errors.push({ message: 'Incorrect confirmpassword!' })
//     } if (errors.length) {
//         return res.render('register', {
//             errors,
//             name,
//             email,
//             password,
//             confirmPassword
//         })
//     }
//     // 檢查使用者是否已經註冊
//     User.findOne({ email: email })
//         .then(user => {
//             //若已註冊
//             if (user) {
//                 errors.push({ message: 'Email already exists.' })
//                 return res.render('register', {
//                     errors,
//                     name,
//                     email,
//                     password,
//                     confirmPassword
//                 })
//             } else {
//                 console.log('new user!')
              
//                 return bcrypt
//                     .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
//                     .then(salt => bcrypt.hash(password, salt))// 為使用者密碼「加鹽」，產生雜湊值
//                     .then(hash => User.create({
//                         name,
//                         email,
//                         password: hash // 用雜湊值取代原本的使用者密碼
//                     }))
//                     .then(() => res.redirect('/'))
//                     .catch(err => console.log(err))
//             }
//         })
//         .catch(err => console.log(err))

// })


// 匯出路由模組
module.exports = router