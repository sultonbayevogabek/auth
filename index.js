const express = require('express')

require('dotenv').config()

const server = express()

server.use(express.static('public'))

server.set('view engine', 'ejs')

server.get('/', async (req, res) => {
   res.render('index')
})

server.get('/login', async (req, res) => {
   res.render('login', {
      title: 'Login',
   })
})

server.get('/signup', async (req, res) => {
   res.render('signup', {
      title: 'Sign Up',
   })
})

const PORT = process.env.PORT

server.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`)
})