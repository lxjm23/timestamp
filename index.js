// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require("moment")

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

app.get("/api/:dateInput", function(req, res){
  let dateInput = req.params.dateInput
  let date = new Date(dateInput)


  //if date is invalid, try to convert to int
  if(isInvalidDate(date)){
    date = new Date(parseInt(dateInput))
  }

  //if date is invalid, send error
  if(isInvalidDate(date)){
    res.json({error: "Invalid Date"})
    return
  } 

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})


// this endpoint returns current date
app.get("/api/", function(req, res){
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
