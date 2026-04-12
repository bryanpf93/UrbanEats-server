const mongoose = require("mongoose")
const { Schema, model } = mongoose

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."]
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required."],
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],

    total: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pendiente", "confirmado", "entregado", "cancelado"],
      default: "pendiente"
    }
  },
  { timestamps: true }
)

const Order = model("Order", orderSchema)

module.exports = Order