const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { obtenerUnProductoPorIdOTodos, crearProducto, editarProductoPorId, eliminarProductoPorId, agregarImagenProductoPorId, buscarProductoPorTermino, agregarProductoCarrito, borrarProductoCarrito, agregarProductoFavorito } = require('../controllers/productos.controllers');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

/* GET - Obtener todos los productos o uno por ID */
router.get('/', obtenerUnProductoPorIdOTodos);
router.get('/:id', buscarProductoPorTermino)
router.get('/buscar', buscarProductoPorTermino)

/* POST - Crear un nuevo producto */
router.post('/', [
  check('nombre', 'Campo nombre vacío').not().isEmpty(),
  check('precio', 'Campo precio vacío').not().isEmpty(),
  check('descripcion', 'Campo descripción vacío').not().isEmpty(),
], auth('admin'), crearProducto);

router.post('/agregarProductoCarrito/:idProducto', auth('usuario'), agregarProductoCarrito)
router.post('/quitarProductoCarrito/:idProducto', auth('usuario'), borrarProductoCarrito)

router.post('/agregarProductoFav/:idProducto', auth('usuario'), agregarProductoFavorito)
router.post('/quitarProductoFav/:idProducto', auth('usuario'), agregarProductoFavorito)
/* POST - Agregar imagen a un producto específico por ID */
router.post('/agregarImagen/:idProducto', multer.single('imagen'), agregarImagenProductoPorId);
router.post('/buscar', buscarProductoPorTermino)
/* PUT - Editar un producto por ID */
router.put('/:idProducto', [
  check('nombre', 'Campo nombre vacío').not().isEmpty(),
  check('precio', 'Campo precio vacío').not().isEmpty(),
  check('descripcion', 'Campo descripción vacío').not().isEmpty(),
], auth('admin'), editarProductoPorId);

/* DELETE - Eliminar un producto por ID */
router.delete('/:idProducto', auth('admin'), eliminarProductoPorId);

module.exports = router;
