const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const Restaurant = require("../models/Restaurant.model")

const { isAuthenticated } = require("../middleware/jwt.middleware")


// POST /restaurants

router.post("/restaurants", isAuthenticated, async (req, res, next) => {

  try {
    const { name, category, image, description } = req.body

    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required" })
    }

    const newRestaurant = {
      name,
      category,
      image,
      description
    }

    const createdRestaurant = await Restaurant.create(newRestaurant)
    res.status(201).json(createdRestaurant)

  } catch (err) {
    console.error("Error creating a restaurant", err)
    next(err)
  }
})


// GET /restaurants

router.get("/restaurants", async (req, res, next) => {

  try {
    const restaurants = await Restaurant.find({})
    res.json(restaurants)

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
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const restaurant = await Restaurant.findById(restaurantId)

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.json(restaurant)

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
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const updatedRestaurant  = await Restaurant.findByIdAndUpdate(
      restaurantId,
      newDetails,
      { new: true, runValidators: true }
    )

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.json(updatedRestaurant)

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
      return res.status(400).json({ message: "Specified id is not valid" })
    }

    const deletedRestaurant  = await Restaurant.findByIdAndDelete(restaurantId)

    if (!deletedRestaurant ) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.status(204).send()

  } catch (err) {
    console.error("Error deleting a restaurant", err)
    next(err)
  }
})

module.exports = router