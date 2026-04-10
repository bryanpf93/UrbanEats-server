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
      enum: ["Italiana", "Española", "Hamburguesas", "Japonesa", "Mexicana", "Peruana", "Otro"],
      default: "Otro"
    },

    image: {
      type: String,
      default: "https://media.timeout.com/images/106345079/750/562/image.jpg"
    },

    description: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    address: {
      type: String,
      required: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

    phone: String,

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  { timestamps: true }
)

const Restaurant = model("Restaurant", restaurantSchema)

module.exports = Restaurant


