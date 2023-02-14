require('dotenv').config()
const express = require('express')
const app  = express()
const {randomBytes} = require('crypto')
const PORT = process.env.PORT || 5001


//middleware
app.use(express.json())

const commentsByPostId = {}

//routes
app.post('/posts/:id/comments', (req, res) => {
try{
  const commentId = randomBytes(8).toString('hex')
  const {comment} = req.body
  const comments  = commentsByPostId[req.params.id] || []
  comments.push({id: commentId, comment})
  commentsByPostId[req.params.id] = comments

  res.status(201).send(comments)
 }catch(error){
   console.log(error);
 }

})

app.get('/posts/:id/comments', (req, res) => {
 res.send(commentsByPostId[req.params.id] || [])
})



app.listen(PORT, () => {
 console.log(`comment-Service started on port ${PORT}`)
})