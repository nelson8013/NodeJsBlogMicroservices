require('dotenv').config()
const express = require('express')
const app = express()
const {randomBytes} = require('crypto')
const PORT = process.env.PORT || 5000


// middlewares
app.use(express.json())

const postData = {}

//routes
app.post('/posts', (req, res) => {
   const id = randomBytes(8).toString('hex')
   const {title}  = req.body
   postData[id] = {id, title}

   res.status(201).send(postData[id])
})


app.listen(PORT, ()=> {
 console.log(`posts-Service started on port ${PORT}`);
})

