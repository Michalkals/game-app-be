const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const jwt = require('jsonwebtoken')
require("dotenv").config()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const scoreRoute = require('./routes/scoreRoute');

app.use(cors({origin:  'http://localhost:5173', credentials: true}));
app.use(express.json())
app.use('/users', userRoute);
app.use('/scores', scoreRoute);


app.use(cookieParser())

async function init() {
    try{
    const connection = await mongoose.connect(process.env.MONGO_URI)
    if (connection) {
      console.log('Connected to DB')
      app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
      })
    }
}catch (err){
 console.error('Could not connect to the database:', err);
}
}
init()
    
    