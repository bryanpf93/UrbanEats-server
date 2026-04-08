const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/Product.model")
const router = express.Router()


// POST /restaurants/:restaurantId/products

router.post("/restaurants/:restaurantId/products", async (req, res, next) => {

  try {
    const newProduct = req.body
    const response = await Product.create(newProduct)
    res.status(201).json(response)
  } catch (err) {
    console.error("Error creating a product", err)
    next(err)
  }
})