const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '6c87700e391141e69b17cbd1f8acfc09',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.get('/', (req, res) => {
    rollbar.info("html served successful")
    res.sendFile(path.join(__dirname, '../public/index.html'))
})



//Middleware
app.use(express.static(path.join(__dirname, "../public")))



app.use(rollbar.errorHandler())



//Heroku port
const port = process.env.PORT || 4005

app.listen(port, ()=>{
    console.log(`Autobots rollin on port ${port}`)
})