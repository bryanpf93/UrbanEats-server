const mongoose = require("mongoose")
const { Schema, model } = mongoose

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true
    },
    category: {
      type: String,
      required: true,
      enum: ["italiano", "hamburguesas", "japones", "mexicano", "peruano", "otro"],
      default: "otro"
    },
    image: String,
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
)

const Restaurant = model("Restaurant", restaurantSchema)

module.exports = Restaurant


