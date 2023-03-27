const express = require('express');
const app = express();
const {Request, Response} = require('express');
require('dotenv').config();

app.use(express.json({limit: '5mb'}));

const { users } = require('./src');

app.use("/users",users);


app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home :)'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server running on PORT ${process.env.PORT}`);
})