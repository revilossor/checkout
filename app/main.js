require('dotenv').config()
const app = require('express')()



app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
})
