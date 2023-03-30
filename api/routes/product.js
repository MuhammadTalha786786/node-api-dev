const express = require('express')
const router = express.Router();
const Product = require('../models/product')
const mongoose = require('mongoose')


router.get('/', (req, res, next) => {
    Product.find().exec().then((x)=>{
        console.log(x)
        res.status(200).json(x)
    }).catch((err)=>{
        console.log(err)
    })
})



router.post('/', (req, res, next) => {

    const product = new Product({
        // _Id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then((x) => {
        console.log(x)
    }).catch((err) => {
        console.log(err)
    })
    res.status(201).json({
        message: "Handling the post products",
        createdProduct: product
    })
})


router.get('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.findById(id).exec().then((x)=>{
        if(x ==  null){
            res.status(400).json({message:"not found"})
        }
        res.status(200).json(x)
    }).catch((err)=>{
        console.log(err)
    })

})



router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID
    res.status(200).json({
        message: "update the product",
        id: id

    })

})



router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.deleteOne({_id:id}).then((x)=>{
        console.log(x, "deleted")
        res.status(200).json({message:"the product is deleted"})
    }).catch((err)=>{
        console.log(err)
    })
    
    res.status(200).json({
        message: "delete the product",
        id: id

    })

})

module.exports = router

