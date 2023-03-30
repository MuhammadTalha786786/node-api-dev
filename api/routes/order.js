const express = require('express')
const router =  express.Router();


router.get('/', (req, res, next)=>{
    res.status(200).json({
        message:"getting the orders"
    })
})

router.post('/', (req, res, next)=>{
    const order ={
        orderID:Math.random() * 100,
        cust_name:req.body.name,
        product_name:req.body.product

    }
    res.status(201).json({
        message:"the order was created successfully",
        orderDetail:order
    })
})

router.get('/:orderID', (req, res, next)=>{
    const id  = req.params.orderID
    
    res.status(200).json({
        message:"the order was created successfully", 
        id:id
    })
})

router.delete('/:orderID', (req, res, next)=>{
    const id = req.params.orderID
    res.status(200).json({
        message:"the order was deleted successfully",
        id:id 
    })
})
    
module.exports = router

