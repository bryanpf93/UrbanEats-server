const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const Product = require("../models/Product.model")
const Restaurant = require("../models/Restaurant.model")

const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware")



// POST /restaurants/:restaurantId/products

router.post("/restaurants/:restaurantId/products", isAuthenticated, isAdmin, async (req, res, next) => {

  try {
    const { restaurantId } = req.params

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const restaurant = await Restaurant.findById(restaurantId)

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    const { name, price, description, image, category } = req.body

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" })
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" })
    }

    const newProduct = {
      name,
      price,
      description,
      image,
      category,
      restaurant: restaurantId
    }

    const createdProduct = await Product.create(newProduct)
    res.status(201).json(createdProduct)

  } catch (err) {
    console.error("Error creating a product", err)
    next(err)
  }
})


// GET /restaurants/:restaurantId/products

router.get("/restaurants/:restaurantId/products", async (req, res, next) => {

  try {
    const { restaurantId } = req.params

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const restaurant = await Restaurant.findById(restaurantId)

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    const products = await Product.find({ restaurant: restaurantId })  
    res.json(products)

  } catch (err) {
    console.error("Error getting products", err)
    next(err)
  }
})


// GET /products/:productId

router.get("/products/:productId", async (req, res, next) => {

  try {
    const { productId } = req.params

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)

  } catch (err) {
    console.error("Error getting product", err)
    next(err)
  }
})


// PUT /products/:productId

router.put("/products/:productId", isAuthenticated, isAdmin, async (req, res, next) => {

  try {
    const { productId } = req.params
    const newDetails = req.body

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      newDetails,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(updatedProduct)

  } catch (err) {
    console.error("Error updating product", err)
    next(err)
  }
})


// DELETE /products/:productId

router.delete("/products/:productId", isAuthenticated, isAdmin, async (req, res, next) => {

  try {
    const { productId } = req.params

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const deletedProduct = await Product.findByIdAndDelete(productId)

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(204).send()

  } catch (err) {
     console.error("Error deleting product", err)
    next(err)
  }

})

module.exports = router