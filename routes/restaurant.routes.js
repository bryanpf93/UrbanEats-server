const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const Restaurant = require("../models/Restaurant.model")
const { isAuthenticated } = require("../middleware/jwt.middleware")

// POST /restaurants

router.post("/restaurants", isAuthenticated, async (req, res, next) => {

  try {
    const newRestaurant = req.body
    const response = await Restaurant.create(newRestaurant)
    res.status(201).json(response)
  } catch (err) {
    console.error("Error creating a restaurant", err)
    next(err)
  }
})

// GET /restaurants

router.get("/restaurants", async (req, res, next) => {

  try {
    const response = await Restaurant.find({})
    res.json(response)
  } catch (err) {
    console.error("Error getting restaurants", err)
    next(err)
  }
})

// GET /restaurants/:restaurantId

router.get("/restaurants/:restaurantId", async (req, res, next) => {

  try {
    const { restaurantId } = req.params

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      res.status(400).json({ message: "Specified id is not valid" })
      return
    }

    const response = await Restaurant.findById(restaurantId)

    if (!response) {
      res.status(404).json({ message: "Restaurant not found" })
      return
    }

    res.json(response)
  } catch (err) {
    console.error("Error getting a restaurant", err)
    next(err)
  }
})

// PUT /restaurants/:restaurantId

router.put("/restaurants/:restaurantId", isAuthenticated, async (req, res, next) => {

  try {
    const { restaurantId } = req.params
    const newDetails = req.body

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      res.status(400).json({ message: "Specified id is not valid" })
      return
    }

    const response = await Restaurant.findByIdAndUpdate(
      restaurantId,
      newDetails,
      { new: true, runValidators: true }
    )

    if (!response) {
      res.status(404).json({ message: "Restaurant not found" })
      return
    }

    res.json(response)
  } catch (err) {
    console.error("Error updating a restaurant", err)
    next(err)
  }
})

// DELETE /restaurants/:restaurantId
router.delete("/restaurants/:restaurantId", isAuthenticated, async (req, res, next) => {

  try {
    const { restaurantId } = req.params

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      res.status(400).json({ message: "Specified id is not valid" })
      return
    }

    const response = await Restaurant.findByIdAndDelete(restaurantId)

    if (!response) {
      res.status(404).json({ message: "Restaurant not found" })
      return
    }

    res.status(204).send()
  } catch (err) {
    console.error("Error deleting a restaurant", err)
    next(err)
  }
})

module.exports = router