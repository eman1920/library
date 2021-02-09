//only load env variables in the developement enviroment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const layouts = require('express-ejs-layouts')

const app = express()

//routes
const indexRouter = require('./routes/index')

//setup the app : view engine , layout, public files

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //views directory
app.set('layout', 'layouts/layout') //layouts are the reused templates
app.use(layouts)
app.use(express.static('public')) //public files path

//setup database 
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { //see .env file
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => console.log('Database connected'))
    .catch(err => console.log(err))
    // mongoose.connection.once('open', () => console.log('MongoDB connected'))
    //     // mongoose.connection.on('error', error => console.error(error))


//use routes
app.use('/', indexRouter)



app.listen(process.env.PORT || 3000)