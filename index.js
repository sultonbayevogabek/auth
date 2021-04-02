const express = require('express')
const {generateHash, compareHash} = require('./module/crypt')

require('dotenv').config()

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static('./public'))

server.set('view engine', 'ejs')

server.get('/', (req, res) => {
   res.render('index')
})

server.get('/login', (req, res) => {
   res.render('login', {
      erroe: ''
   })
})

server.get('/signup', (req, res) => {
   res.render('signup', {
      error: ''
   })
})

const data = []

server.post('/signup', async (req, res) => {
   try {
      let {login, password} = req.body
      login = login.toLowerCase()

      if (login && password) {
         const hash = await generateHash(password)

         if (data.find(x => x.login == login)) {
            throw new Error('User already exists')
         } else {
            data.push({
               login, password: hash
            })
            console.log(data);
         }
      }
      res.redirect('/')
   } catch (e) {
      res.render('signup', {
         error: e + ''
      })
   }
})

server.post('/login', async (req, res) => {
   try {
      let {login, password} = req.body
      login = login.toLowerCase()

      if (login && password) {
         const user = data.find(d => d.login == login)

         if (!user) throw new Error('User not found')

         const isTrue = await compareHash(password, user.password)

         if (isTrue) {
            res.redirect('/')
         } else {
            throw new Error('Incorect password')
         }
      } else {
         throw new Error('Login or Password not found')
      }
   } catch (e) {
      res.render('login', {
         error: e + ''
      })
   }
})

const PORT = process.env.PORT
server.listen(PORT, () => {
   console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`)
})