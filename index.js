const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const md5 = require('md5')
const PORT = 1337
const FRONT_PORT = 13371

console.log(path.join(__dirname,"assets/worldObj"));
app.use("/worldObj", express.static(path.join(__dirname,"assets/worldObj")))
app.use("/img", express.static(path.join(__dirname,"assets/images")))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require('./routes')

const ws = require('webSockets')

if (process.env.NODE_ENV != 'production') {
  app.use(require('morgan')('dev'));
}

app.use(routes);

if (process.env.NODE_ENV != 'production') {
  app.use('/*', require('http-proxy-middleware').createProxyMiddleware({
    target: 'http://localhost:' + FRONT_PORT,
    changeOrigin: true
  }));
}

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

app.listen(PORT)

console.log('app listening', PORT)
