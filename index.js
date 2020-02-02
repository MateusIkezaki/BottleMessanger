//////////////// SET UP ////////////////////
require('dotenv').config()

const express = require('express')
const app = express()
const fetch = require('node-fetch')
const Datastore = require('nedb')
const database = new Datastore('database.db')
database.loadDatabase()
const port = process.env.PORT || 3000

/////////////// SET UP SERVER /////////////
app.listen(port, () => {
    console.log(`Listening at ${port}`)
})

app.use(express.static('public'))
app.use(express.json({limit: '5mb'}))

////////////// POST REQUEST ///////////////
app.post('/messages', (request, response) => {
    database.insert(request.body)
    console.log(request.body)
    response.json(request.body)
})

////////////// GET REQUEST ////////////////
app.get('/messages', (request, response) => {
    database.find({}, (err, data) => {
        if(err)
        {
            response.end()
            return
        }
        
        response.json(data)
    })
})