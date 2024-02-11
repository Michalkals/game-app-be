const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

require("dotenv").config()
const mongoose = require('mongoose')
const {MONGO_URI} = process.env
const cors = require('cors')
app.use(cors())
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');

app.use('/users', userRoute);
app.use(express.json())
app.use(cors({origin:  'http://localhost:5173', credentials: true}));
app.use(cookieParser())

async function init() {
    try{
    const connection = await mongoose.connect(MONGO_URI)
    if (connection) {
      console.log('Connected to DB')
      server.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
      })
    }
}catch{
 console.error('Could not connect to the database:', error);
}
}
init()
    
    