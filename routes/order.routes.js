const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const Order = require("../models/Order.model")
const Product = require("../models/Product.model")
const Restaurant = require("../models/Restaurant.model")

const { isAuthenticated } = require("../middleware/jwt.middleware")


// POST /orders

router.post("/orders", isAuthenticated, async (req, res, next) => {

  try {
    const { restaurantId } = req.body

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant id" })
    }

    const restaurant = await Restaurant.findById(restaurantId)

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    const createdOrder = await Order.create({
      user: req.payload._id,
      restaurant: restaurantId,
      products: [],
      total: 0
    })

    res.status(201).json(createdOrder)

  } catch (err) {
    console.error("Error creating order", err)
    next(err)
  }
})


// PUT /orders/:orderId

router.put("/orders/:orderId", isAuthenticated, async (req, res, next) => {

  try {
    const { orderId } = req.params
    const { productId, quantity } = req.body

    if (
      !mongoose.Types.ObjectId.isValid(orderId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "Invalid id" })
    }

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.user.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // VALIDACIÓN CLAVE
    if (product.restaurant.toString() !== order.restaurant.toString()) {
      return res.status(400).json({
        message: "Product does not belong to this restaurant"
      })
    }

    // Buscar si ya existe en products
    const existingItem = order.products.find(item =>
      item.product.toString() === productId
    )

    if (existingItem) {
      existingItem.quantity += quantity || 1
    } else {
      order.products.push({
        product: productId,
        quantity: quantity || 1,
        price: product.price
      })
    }

    // recalcular total
    order.total = order.products.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    await order.save()

    res.json(order)

  } catch (err) {
    console.error("Error updating a order", err)
    next(err)
  }
})


// GET /orders/user

router.get("/orders/user", isAuthenticated, async (req, res, next) => {
  try {
    const orders = await Order
      .find({ user: req.payload._id })
      .populate("products.product")
      .populate("restaurant")
      .sort({ createdAt: -1 })

    res.json(orders)

  } catch (err) {
    next(err)
  }
})

// GET /orders/:orderId

router.get("/orders/:orderId", isAuthenticated, async (req, res, next) => {

  try {
    const { orderId } = req.params

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid id" })
    }

    const order = await Order
      .findById(orderId)
      .populate("products.product")
      .populate("restaurant")
      .populate("user", "-password")

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.user._id.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    res.json(order)

  } catch (err) {
    console.error("Error getting order", err)
    next(err)
  }
})


// DELETE /orders/:orderId/products/:productId

router.delete("/orders/:orderId/products/:productId", isAuthenticated, async (req, res, next) => {

  try {
    const { orderId, productId } = req.params

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.user.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    order.products = order.products.filter(item =>
      item.product.toString() !== productId
    )

    order.total = order.products.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    await order.save()

    res.json(order)

  } catch (err) {
    next(err)
  }
})

// DELETE /orders/:orderId

router.delete("/orders/:orderId", isAuthenticated, async (req, res, next) => {

  try {
    const { orderId } = req.params

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid id" })
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId)

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.status(204).send()

  } catch (err) {
    console.error("Error deleting restaurant", err)
    next(err)
  }
})

module.exports = router