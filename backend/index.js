require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const configs = require('./config.js')
const user = require('./user.js')()

const app = express()

app.use(cors())
app.use( bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.all('/', (req, res) => {
    res.status(200).send({
        status: 'ok'
    })
})

app.post('/getToken', function (req, res) {
    const  { username } = req.body || { username: 'demo' }

    user.token(username).then(response => {
        res.status(200).send(response)
    }, error => {
        res.status(error?.status || 403).send({
            message: error.message || error
        })
    })
})



app.listen(configs.port, () => {
    console.log(`App listening on port ${configs.port}`)
})