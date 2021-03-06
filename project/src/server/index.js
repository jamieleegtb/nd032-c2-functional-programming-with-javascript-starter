require('dotenv').config()
// Immutable
const { Map } = require('immutable')

const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// NASA API call
//curiosity
app.get('/rover/curiosity', async (req, res) => {
    try {
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`)
          .then(res => res.json())
        res.send({data})
    } catch (err) {
        console.log('error:', err)
        res.send("err")
    }
})

//opportunity
app.get('/rover/opportunity', async (req, res) => {
    try {
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${process.env.API_KEY}`)
          .then(res => res.json())
        res.send({data})
    } catch (err) {
        console.log('error:', err)
        res.send("err")
    }
})

//spirit
app.get('/rover/spirit', async (req, res) => {
    try {
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=1000&api_key=${process.env.API_KEY}`)
          .then(res => res.json())
        res.send({data})
    } catch (err) {
        console.log('error:', err)
        res.send("err")
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))



// example API call
/*
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
*/
