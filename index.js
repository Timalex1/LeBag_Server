const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './.env' })
const createCheckoutSession = require('./api/checkout')
const paymentIntent = require('./api/paymentIntent')
const webhook = require('./api/webhook')

const app = express()
const port = process.env.PORT

app.use(express.json({
    verify: (req, res, buffer) => req['rawBody'] = buffer,
}));


app.use(cors({ origin: true }))

app.get('/hey', (req, res) => res.send('Hello, World'))

app.post('/webhook', webhook)

app.post('/create-checkout-session', createCheckoutSession)

app.post('/create-payment-intent', paymentIntent)

app.listen(port, () => console.log('server is listenig on port', port))