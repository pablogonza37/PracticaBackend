const { Router } = require("express");
const {
  registrarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  bajaFisicaUsuario,
  bajaLogicaUsuario,
  iniciarSesionUsuario,
} = require("../controllers/usuarios.controllers");
const router = Router();
const { check } = require("express-validator");
const auth = require('../middlewares/auth')

router.post(
  "/",
  [
    check("nombreUsuario", "Campo usuario esta vacio").not().isEmpty(),
    check("nombreUsuario", "min:5 caracteres y max: 40 caracteres").isLength({
      min: 5,
      max: 40,
    }),
    check('contrasenia', 'Campo contrasenia esta vacio').not().isEmpty(),
    check('contrasenia', 'min: 8 max: 50').isLength({min:8, max:50})
  ],
  registrarUsuario
);
router.post("/login", [
  check("nombreUsuario", "Campo usuario esta vacio").not().isEmpty(),
  check("contrasenia", "Campo contraseña esta vacio").not().isEmpty()
], iniciarSesionUsuario);
router.get("/", auth('admin'), obtenerTodosLosUsuarios);
router.get("/:idUsuario", [
  check("_id", 'Formato de id no valido').isMongoId()
],auth('admin'), obtenerUnUsuario);
router.delete("/:idUsuario",auth('admin'), bajaFisicaUsuario);
router.put("/:idUsuario",auth('admin'), bajaLogicaUsuario);

module.exports = router;
