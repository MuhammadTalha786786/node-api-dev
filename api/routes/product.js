const express = require('express')
const router = express.Router();
const Product = require('../models/product')
const mongoose = require('mongoose')


router.get('/', (req, res, next) => {
    Product.find(). select('name price _id') .  exec().then((x) => {
        const response ={
            count:x.length,
            products:x
        }
        res.status(200).json(response)
    }).catch((err) => {
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
        res.status(201).json({
            message: "The product is added",
            createdProduct: product
        })
    }).catch((err) => {
        console.log(err)
        res.status(400).json({
            message:err,
        })
    })

})


router.get('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.findById(id).select('name price _id') . exec().then((x) => {
        // if(x ==  null){
        //     res.status(400).json({message:"not found"})
        // }
        res.status(200).json(x)
    }).catch((err) => {
        console.log(err)
        res.status(400).json({ message: err })

    })

})



router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.updateOne({ _id: id }, {
        $set: {
            name: req.body.name,
            price: req.body.price
        }
    }).exec().then((result)=>{

        res.status(200).json({
            message: "update the product",
            id: id,
            result:result
    
        })
    }).catch((err) =>{
        res.status(400).json({message:err})
    })

})



router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.deleteOne({ _id: id }).then((x) => {
        console.log(x, "deleted")
        res.status(200).json({ message: "the product is deleted" })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({})

    })
    res.status(200).json({
        message: "delete the product",
        id: id

    })

})

module.exports = router

