const serviciosProductos = require('../services/productos.services')
const {validationResult} = require('express-validator')

const obtenerUnProductoPorIdOTodos = async(req, res) => {
  try {
    
    const id = req.query.id 
    const limit = req.query.limit || 10
    const to = req.query.to || 0
    

    if (id) {
      const producto = await serviciosProductos.obtenerUnProducto(id)
      res.status(200).json(producto)
    } else {
      const productos = await serviciosProductos.obtenerTodosLosProductos(limit, to)
      
      res.status(200).json(productos)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const crearProducto = async (req, res) => {
  try {
    const { errors }  = validationResult(req)

    if(errors.length){
      return res.status(400).json({msg: errors[0].msg})
    }
    const nuevoProducto = await serviciosProductos.nuevoProducto(req.body)
    await nuevoProducto.save()
    res.status(201).json(nuevoProducto)

  } catch (error) {
    res.status(500).json(error)
  }
}

const editarProductoPorId = async(req, res) => {
  try {
    const id = req.params.idProducto
    const productoActualizado = await  serviciosProductos.editarProducto(id, req.body)
    res.status(200).json(productoActualizado)
  } catch (error) {
    res.status(500).json(error)
  }
}

const eliminarProductoPorId = async(req, res) => {
  try {
    const id = req.params.idProducto
    let res = await serviciosProductos.eliminarProducto(id)

    if (res === 200) {
      res.status(200).json({ msg: 'Producto eliminado' })
    }

  } catch (error) {
    res.status(500).json(error)
  }
}

const buscarProductoPorTermino = async (req, res) => {
  try {
    const resultado = await serviciosProductos.buscarProducto(req.query.termino)
    res.json(resultado)
  }catch (error) {
    console.log(error)
  }
}

const agregarImagenProductoPorId = async (req, res) => {
  try{
    
    const resultado = await serviciosProductos.agregarImagen(req.params.isProducto, req.file)
    if (resultado === 200){
    res.status(200).json({msg: 'se agrego la imagen del producto corrctamente'})
  }
    /* file - pathname - multer - cloudinary */
  }catch (error){
    console.log(error)
  }
}

const agregarProductoCarrito = async (req, res) => {
  
  try{
    const result = await serviciosProductos.agregarProducto(req.idUsuario, req.params.idProducto)

    if (result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else if (result.statusCode === 400){
      res.status(400).json({msg: result.msg})
    }

  }catch (error){
    console.log(error)
  }
}

const borrarProductoCarrito = async (req, res) => {
  try{
const result = await serviciosProductos.quitarProducto(req.idUsuario, req.params.idProducto)
if(result.statusCode === 200){
  res.status(200).json({msg: 'producto borrardo del carrito'})
}else if(result.statusCode === 400){
  res.status(400).json({msg: result.msg})
}
  }catch (error){
    console.log(error)
  }
}

const agregarProductoFavorito = async (req, res) => {
  
  try{
    const result = await serviciosProductos.agregarProductoFav(req.idUsuario, req.params.idProducto)

    if (result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else if (result.statusCode === 400){
      res.status(400).json({msg: result.msg})
    }

  }catch (error){
    console.log(error)
  }
}

const borrarProductoFavorito = async (req, res) => {
  try{
const result = await serviciosProductos.quitarProductoFAV(req.idUsuario, req.params.idProducto)
if(result.statusCode === 200){
  res.status(200).json({msg: 'producto borrardo del carrito'})
}else if(result.statusCode === 400){
  res.status(400).json({msg: result.msg})
}
  }catch (error){
    console.log(error)
  }
}

module.exports = {
  obtenerUnProductoPorIdOTodos,
  crearProducto,
  editarProductoPorId,
  eliminarProductoPorId,
  agregarImagenProductoPorId,
  buscarProductoPorTermino,
  agregarProductoCarrito,
  borrarProductoCarrito,
  agregarProductoFavorito,
  borrarProductoFavorito
}