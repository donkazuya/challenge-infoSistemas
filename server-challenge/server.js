const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
// create our express app
const app = express()
const routes = require('./src/router/router')
const port = 3333

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.use(express.json({extended: true}))

app.use('/', routes)
//start server
app.listen(port, ()=>{
    console.log(`listening at port:${port}`)
}) 