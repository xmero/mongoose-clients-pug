const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Client = require('./models/Client')

const PORT = 3000
const app = express()

app.set('view engine', 'pug')
app.use( express.static('public') )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const url = 'mongodb://localhost:27017/test'
mongoose.connect(url)

app.get('/clients', (req,res) => {
  Client.find().then( clients => res.render('clients', { clients }) )
})

app.get('/client/new', (req,res) => {
  res.render('addClient')
})

app.get('/client/:id', (req,res) => {
  const { id } = req.params
  Client.findById(id).then( client => res.render('clientProfile', { client }) )
})

app.post('/clients', (req,res) => {
  const { name, address } = req.body
  const client = new Client({ name, address })

  client.save()
    .then( () => {
      res.redirect('/clients')
    })
})

app.listen(PORT, () => console.log(`🚀  Magic happens on PORT ${PORT}...`))