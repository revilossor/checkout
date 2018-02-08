require('dotenv').config()

const app = require('express')()
const session = require('express-session')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use('/api', require('./router/api'))

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
})
