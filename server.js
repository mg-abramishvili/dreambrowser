const express = require('express')

let a = express()

let server = a.listen(3000)

a.get('/', function(req, res) {
   
    res.send('Server is ready!')
    
})