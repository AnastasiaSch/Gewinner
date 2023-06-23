'use strict'

const fs = require('fs')
const express = require('express')
const app = express()

const ip = '127.0.0.1'
const port = 8081

app.set('view engine', 'ejs')
app.use(express.static('public'))

fs.readFile('nobel.csv', 'UTF8', (error, data) => {
    let nobel = data.split('\n')
    nobel.shift()

    let objects = nobel.filter(row => row !== '').map(recordToObject) 
   
    app.get('/', (req, res) => {
        res.render('index', { objects: objects })
    })

    app.get('/winners/:subject', (req, res) => {
        res.render('winners', { subject: req.params.subject,  objects: objects}) 
    })

    app.listen(port, ip, () => {
        console.log(`Server running at http://${ip}:${port}/`)
    })
})

const recordToObject = record => {
    const fields = record.split(',')
    return {
        yr: fields[0],
        subject: fields[1],
        winner: fields[2],
    }
}

