const mongoose  = require('mongoose')
const productSchema =  mongoose.Schema({
    // _Id: mongoose.Schema.Types.ObjectId,
     name:String,
     price:Number,
})


module.exports = mongoose.model('Product', productSchema)