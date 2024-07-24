const  {Schema, model} = require('mongoose')
 const CarritoSchema = new Schema({
  idUsuario: {
    type: String
  },
  productos: []
 })

 const CarritoModel = model('cart', CarritoSchema)
 module.exports = CarritoModel