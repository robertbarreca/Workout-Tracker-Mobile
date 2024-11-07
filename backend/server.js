/**
 * @fileoverview Server for whole backend
 * 
 * @description This file creates and connects the backend to the mongodb database and defines the API routes for performing CRUD operations.
 * 
 * @dependencies dotenv, express, ./routes/user
 */

require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")

// make express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// register all routes
app.use("/api/user/", userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log("connected to db and listening on port " + process.env.PORT)
    })
     })
    .catch((error) => {console.log(error)})

