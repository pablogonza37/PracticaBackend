const serviceUsuario = require('../services/usuarios.sevices')
const {validationResult} = require('express-validator')


const registrarUsuario = async (req, res) => {
  try {
    const { errors }  = validationResult(req)

    if(errors.length){
      return res.status(400).json({msg: errors[0].msg})
    }
    const result = await serviceUsuario.nuevoUsuario(req.body)
    if (result === 201) {
      res.status(201).json({ msg: 'Usuario registrado con exito' })
    }else if(result === 409){
      res.status(409).json({msg: 'Error al crear usuario - rol incorrecto'})
    }
  } catch (error) {
    console.log(error)
  }
}

const iniciarSesionUsuario = async(req, res) => {
  try {
    const result = await serviceUsuario.inicioSesion(req.body)

    if(result.code === 400){
      res.status(400).json({msg:'Usuario y/o contraseña incorrecto'})
    }else{
      res.status(200).json({msg:'Usuario inicio sesion', toke: result.token })
    }
  } catch (error) {
    console.log(error)
  }
}

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await serviceUsuario.obtenerTodosLosUsuarios()
    res.status(200).json(usuarios)
  } catch (error) {
    console.log(error)
  }
}

const obtenerUnUsuario = async (req, res) => {
  try {
    const { errors }  = validationResult(req)

    if(errors.length){
      return res.status(400).json({msg: errors[0].msg})
    }
    const usuario = await serviceUsuario.obtenerUnUsuario(req.params.idUsuario)
    res.status(200).json({ msg: 'Usuario encontrado', usuario })
  } catch (error) {
    console.log(error)
  }
}

const bajaFisicaUsuario = async (req, res) => {
  try {
    const res = await serviceUsuario.bajaUsuarioFisica(req.params.idUsuario)
    if (res === 200) {
      res.status(200).json({ msg: 'Usuario borrado con exito' })
    }
  } catch (error) {
    console.log(error)
  }
}

const bajaLogicaUsuario = async (req, res) => {
  try {
    const usuario = await serviceUsuario.bajaUsuarioLogica(req.params.idUsuario)
    res.status(200).json({ usuario })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  registrarUsuario,
  iniciarSesionUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  bajaFisicaUsuario,
  bajaLogicaUsuario
}