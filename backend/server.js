// dependencies: express, nodemon, dotenv, bcryptjs, jsonwebtokens

const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

//run db
connectDB()

//routes
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')

// create express app
const app = express()

// middleware - fires during every request
app.use(express.json()) // any req (data) sent will be added to the req object so we can access it in the req handler
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
console.log(req.path, req.method)
next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})