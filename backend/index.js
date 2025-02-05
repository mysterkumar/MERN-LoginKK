const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
const Authrouter = require('./Routes/AuthRouter');
const Productrouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
});

app.use(bodyParser.json());
//to allow the localhost 3000 to work with server running on 8080
//here only you can pass the array of config from ip, people you want to allow from.
//currently we are taking request from anywhere
app.use(cors())
app.use('/auth', Authrouter);
app.use('/products', Productrouter);

app.listen(PORT, ()=>{
    console.log('server is running on ${PORT}')
})