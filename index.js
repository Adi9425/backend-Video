require('dotenv').config()


const express = require('express');
const app = express();

const port = process.env.port;


app.get('/',(req,res)=>{
    res.send('Hello world!!')
})


app.get('/twitter',(req,res)=>{
    res.send()
})


app.get('/login',(req,res)=>{
    res.send('login kar lo')
})

app.get('/chai',(req,res)=>{

})
app.listen(port,()=>{
    console.log(`app connected ${port}`);
})