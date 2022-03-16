const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

//Middleware
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.static(path.join(__dirname, "/index.css")))

//Heroku port
const port = process.env.PORT || 4005

app.listen(port, ()=>{
    console.log(`Autobots rollin on port ${port}`)
})