const express = require('express')
const morgan = require('morgan')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order')


mongoose.connect('mongodb+srv://abcuser:'+process.env.MONGO_DB_PW+'@cluster0.dhkko2w.mongodb.net/?retryWrites=true&w=majority').then((e)=>{
    console.log('mongodb is connected')
})




app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin, *")
    res.header('Access-Control-Allow-Headers', 'Origin', 'Content-Type', 'X-Requested-With', 'Accept', 'Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST', 'GET', 'PUT', 'DELETE')
        return res.status(200).json({})
    }
    next()
})


app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use((req, res, next) => {
    const error = new Error("not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})




module.exports = app
