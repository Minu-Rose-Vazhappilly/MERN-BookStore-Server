//import dotenv express cors
//loads .env file contents into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routing/router')
//create server
const bookstoreServer = express()
//enable cors protocol in server app
bookstoreServer.use(cors())
bookstoreServer.use(express.json())
bookstoreServer.use(router)

//create port for
const PORT = 3000

//RUN SERVER PORT
bookstoreServer.listen(PORT,()=>{
    console.log(`BookStore Server Started at PORT :${PORT},wait for client request`);
    
})

//resolving http request
bookstoreServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>BookStore Server Started </h1>`)
})
