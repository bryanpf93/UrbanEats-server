const mongoose = require("mongoose")
const { Schema, model } = mongoose

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 1,
      max: 999
    },

    description: String,

    image: {
      type: String,
      default: "https://fogardemaeloc.wordpress.com/wp-content/uploads/2019/09/chairs-cutlery-fork-9315.jpg"
    },

    category: {
      type: String,
      enum: ["Entrantes","Platos principales","Especialidades","Acompañamientos","Postres","Bebidas","Otro"],
      default: "Otro"
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    }
  },
  { timestamps: true }
)

const Product = model("Product", productSchema)

module.exports = Product