const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const md5 = require('md5')
const PORT = 1337

app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(ip)
    res.end()
})

app.get('/*', (req, res) => {
    res.status(404).send("Ты кто GET")
})
app.post('/*', (req, res) => {
    res.status(404).send('ты кто POST')
})

console.log(PORT)

app.listen(PORT)