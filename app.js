const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/about', function (req, res) {
      res.send('about ')
    })

 //redirect 
 app.get('/about-us',(req,res)=>{
      res.redirect('/about');
 })  

 //404 page
 app.use((req,res)=>{
      res.status(404).sendFile('404.html',{root:__dirname})
 })
app.listen(3000)