const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 4005

const app = express()
app.use(cors())
app.use(express.json())

console.log(port)
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '6c87700e391141e69b17cbd1f8acfc09',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Tester!')


app.get('/test', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
          console.log(error)
        rollbar.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
})

app.get('/test/critical', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
          console.log(error)
        rollbar.critical("MAY DAY THIS IS A CRITICAL MESSAGE");
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
})

app.get('/test/warning', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
          console.log(error)
        rollbar.warning("WARNING: HIDE YO KIDS AND HIDE YO WIVES");
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
})


//Middleware
app.use(express.static(path.join(__dirname, "../public")))



app.use(rollbar.errorHandler())



//Heroku port


app.listen(port, ()=>{
    console.log(`Autobots rollin on port ${port}`)
})