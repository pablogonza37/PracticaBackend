const  {Schema, model} = require('mongoose')
 const FavSchema = new Schema({
  idUsuario: {
    type: String
  },
  productos: []
 })

 const FavModel = model('favorito', FavSchema)
 module.exports = FavModel