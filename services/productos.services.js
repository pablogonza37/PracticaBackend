const UsuarioModel = require('../models/usuario.schema')
const ProductModel = require('../models/producto.schema')
const cloudinary = require('../helpers/cloudinary')

const obtenerTodosLosProductos = async(limit, to) => {
  /*const obtenerProductos = await ProductModel.find()
  return obtenerProductos*/
  

  /* Paginacion */
  const [productos, cantidadTotal] = await Promise.all([
    ProductModel.find().skip(to * limit).limit(limit),
    //ProductModel.find({activo: true}).skip(to * limit).limit(limit), devuelve solo los true
    ProductModel.countDocuments()
    // ProductModel.countDocuments({activo: true}) devuelve cantidad activos
  ])

  const paginacion = {
    productos,
    cantidadTotal
  }
return paginacion

}

const obtenerUnProducto = async(id) => {
  const producto = await ProductModel.findById({_id: id})
  return producto
}

const buscarProducto = async (termino) => {
  const reglaBusqueda = new RegExp(termino, i)
  // const productos = await ProductModel.find({nombre: reglaBusqueda}) // buscar por nombre
  const productos = await ProductModel.find({
    $or: [
      {nombre: reglaBusqueda},
      {descripcion: reglaBusqueda},
      {precio: reglaBusqueda}
    ]
  }) // busqueda multiple
  return productos
}

const nuevoProducto = (body) => {
  try {
     const newProduct = new ProductModel(body)
     return newProduct
   /*  const nuevoProducto = {
      id: productos[productos.length - 1].id + 1,
      ...body
    }

    productos.push(nuevoProducto)
    return nuevoProducto */
  } catch (error) {
    console.log(error)
  }
}

const editarProducto = async(idProducto, body) => {
  try {
    const productoEditado = await ProductModel.findByIdAndUpdate({_id: idProducto}, body, {new:true})
    return productoEditado
  } catch (error) {
    console.log(error)
  }
}

const eliminarProducto = async(idProducto) => {
  try {
    await ProductModel.findByIdAndDelete({_id: idProducto})
    return 200
  } catch (error) {
    console.log(error)
  }
}

const agregarImagen = async (idProducto, file) => {
  const producto = await ProductoModel.findOne({_id: idProducto})
  const resultado = await cloudinary.uploader.upload(file.path)
  
  producto.imagen = resultado.secure_url
await producto.save()

return 200

}

const agregarProducto = async (idUsuario, idProducto) => {
  const usuario = await UsuarioModel.findOne({_id: idUsuario})
  // const usuario = await UsuarioModel.findById(idUsuario) usando findById
  const producto = await ProductModel.findOne({_id: idProducto})
  const carrito = await CarritoModel.findOne({_id: usuario.idCarrito})

  const productoExiste = carrito.prodcutos.find((prod) => prod._id.toString() === producto._id.toString())

  if(productoExiste){
    return {
      msg: 'Producto ya esxiste en el carrito',
      statusCode: 400
    }
  }

  carrito.producto.push(producto)
  await carrito.save()
  return {
    msg: 'Producto cargado correctamente',
    statusCode: 200
  }
}

const quitarProducto = async (idUsuario, idProducto) => {
  const usuario = await UsuarioModel.findOne({_id: idUsuario})
  // const usuario = await UsuarioModel.findById(idUsuario) usando findById
  const producto = await ProductModel.findOne({_id: idProducto})
  const carrito = await CarritoModel.findOne({_id: usuario.idCarrito})

  const posicionProducto = carrito.productos.findIndex((prod) => prod._id.toString() === producto._id.toString())
  
  if(posicionProducto < 0){
    return{
      msg:'No se encontro el producto que desea eleiminar',
      statusCode: 400
    }
  }
  
  carrito.productos.splice(posicionProducto, 1)

  await carrito.save()
  return {
    msg: 'Producto eliminado correctamente',
    statusCode: 200
  }
}


const agregarProductoFav = async (idUsuario, idProducto) => {
  const usuario = await UsuarioModel.findOne({_id: idUsuario})
  // const usuario = await UsuarioModel.findById(idUsuario) usando findById
  const producto = await ProductModel.findOne({_id: idProducto})
  const favoritos = await FavModel.findOne({_id: usuario.idFavorito})

  const productoExiste = favoritos.prodcutos.find((prod) => prod._id.toString() === producto._id.toString())

  if(productoExiste){
    return {
      msg: 'Producto ya esxiste en favoritos',
      statusCode: 400
    }
  }

  favoritos.producto.push(producto)
  await favoritos.save()
  return {
    msg: 'Producto cargado correctamente',
    statusCode: 200
  }
}

const quitarProductoFav = async (idUsuario, idProducto) => {
  const usuario = await UsuarioModel.findOne({_id: idUsuario})
  // const usuario = await UsuarioModel.findById(idUsuario) usando findById
  const producto = await ProductModel.findOne({_id: idProducto})
  const favoritos = await FavModel.findOne({_id: usuario.idFavorito})

  const posicionProducto = favoritos.productos.findIndex((prod) => prod._id.toString() === producto._id.toString())
  
  if(posicionProducto < 0){
    return{
      msg:'No se encontro el producto que desea eleiminar',
      statusCode: 400
    }
  }
  
  favoritos.productos.splice(posicionProducto, 1)

  await favoritos.save()
  return {
    msg: 'Producto eliminado de favoritos correctamente',
    statusCode: 200
  }
}


module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  editarProducto,
  eliminarProducto,
  buscarProducto,
  agregarImagen,
  agregarProducto,
  quitarProducto,
  agregarProductoFav,
  quitarProductoFav
}
