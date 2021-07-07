const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()

//configuring json reading
app.use(express.json())

//setting dotenv
dotenv.config()
const env = process.env

//importing routes
const baseRoute = require("./routes/baseRoutes")
const modelTestRoute = require('./routes/modelTestRoute')
const userRoute = require('./routes/userRoutes')

//server using
//routes use
app.use(baseRoute)
app.use(modelTestRoute)
app.use(userRoute)

//connecting to the mongo server
const dbURI = `mongodb+srv://${env.USER}:${env.PASSWORD}@cluster0.68ray.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`

mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true }).
    then(result => {
        console.log("DB Connected");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is listening !!!`);
        })
    }).catch(er => {
        if (er) {
            console.log(er);
        }
    })


