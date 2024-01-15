require('dotenv').config();
const serverless = require('serverless-http');
const connectToDtabase = require("./db");
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;

connectToDtabase();
const app = express();

// middle-Ware
app.use(express.json());
app.use(cors());

//Available Routes
app.use('/.netlify/functions/server/api/auth', require('./routes/auth'));
app.use('/.netlify/functions/server/api/sales', require('./routes/sales'));


// Connect to the server
app.listen(port, ()=>{
    console.log(`Serveris running at port ${port}`);
});

module.exports.handler = serverless(app);

