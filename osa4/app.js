const cors = require('cors')
const config = require("./utils/config")
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)



console.log('connecting to db')
mongoose.set('strictQuery', false)
mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('connected!')
  })
  .catch((error) => {
    console.log(`well... uh... seems like this happened: ${error.message}`)
  })

module.exports = app