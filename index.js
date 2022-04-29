const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const md5 = require('md5')
const PORT = 1337

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require('./routes')

const ws = require('webSockets')

app.use(routes);

app.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(ip)
    res.send(ip)
})

app.get('/*', (req, res) => {
    res.status(404).send("Ты кто GET")
})
app.post('/*', (req, res) => {
    res.status(404).send('ты кто POST')
})

console.log(PORT)

app.listen(PORT)
