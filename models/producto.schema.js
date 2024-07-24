const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    default: ''
  }
})

const ProductModel = mongoose.model('product', ProductSchema)
module.exports = ProductModel